const db = require('../database/config')
const snoowrap = require('snoowrap')

class RedditService {
  constructor({ id, username, refreshToken }) {
    this.id = id
    this.username = username
    this.refreshToken = refreshToken

    this._r = new snoowrap({
      refreshToken: this.refreshToken,
      userAgent: process.env.REDDIT_USER_AGENT,
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
    })
  }

  async _updateSyncStatus(statusUpdate) {
    try {
      await db('users')
        .where({ id: this.id })
        .update(statusUpdate)
    } catch (error) {
      throw error
    }
  }

  async _reportSyncStatus() {
    try {
      return await db
        .select(['has_synced_with_reddit', 'sync_status'])
        .from('users')
        .where({ id: this.id })
        .first()
    } catch (error) {
      throw error
    }
  }

  async _fetchRedditSaves() {
    try {
      return await this._r
        .getUser(this.username)
        .getSavedContent()
        .fetchAll({
          skipReplies: true,
        })
    } catch (error) {
      console.error(
        '[RedditService] an error occurred while fetching the saves!',
      )
      throw error
    }
  }

  async _persistRedditSaves(saves) {
    try {
      await db('things').insert(
        [...saves].map(save => {
          const isUrl = new RegExp(/htt(p|ps):\/\//)
          return {
            id: save.id,
            subreddit: save.subreddit.display_name,
            selftext: save.selftext,
            author_fullname: save.author_fullname,
            title: save.title,
            subreddit_name_prefixed: save.subreddit_name_prefixed,
            name: save.name,
            category: save.category,
            thumbnail: isUrl.test(save.thumbnail) ? save.thumbnail : '',
            author: save.author.name,
            permalink: save.permalink,
            url: save.url,
            created_utc: save.created_utc,
            over_18: save.over_18,
            user_id: this.id,
            surfaced: false,
          }
        }),
      )
    } catch (error) {
      console.error(
        '[RedditService] an error occurred while inserting the saves!',
      )
      throw error
    }
  }

  async checkSyncStatus() {
    try {
      const userData = await db
        .select(['has_synced_with_reddit', 'sync_status'])
        .from('users')
        .where({ id: this.id })
        .first()
      return userData
    } catch (error) {
      throw error
    }
  }

  async syncRedditSaves() {
    try {
      await this._updateSyncStatus({
        has_synced_with_reddit: false,
        sync_status: 'in-progress',
      })
      const saves = await this._fetchRedditSaves()
      await this._persistRedditSaves(saves)
      await this._updateSyncStatus({
        has_synced_with_reddit: true,
        sync_status: 'successful',
      })
    } catch (error) {
      console.error('[RedditService] oof!')
      await this._updateSyncStatus({
        has_synced_with_reddit: true,
        sync_status: 'failed',
      })
    } finally {
      return await this._reportSyncStatus()
    }
  }
}

module.exports = RedditService
