const db = require('../database/config')
const data = require('../res/saved_things_ced.json')

const insertSavesToDB = async () => {
  try {
    const { children } = data.data
    await db('things').insert(
      children.map(child => {
        const isUrl = new RegExp(/htt(p|ps):\/\//)
        return {
          id: child.data.id,
          subreddit: child.data.subreddit,
          selftext: child.data.selftext,
          author_fullname: child.data.author_fullname,
          title: child.data.title,
          subreddit_name_prefixed: child.data.subreddit_name_prefixed,
          name: child.data.name,
          category: child.data.category,
          thumbnail: isUrl.test(child.data.thumbnail)
            ? child.data.thumbnail
            : '',
          author: child.data.author,
          permalink: child.data.permalink,
          url: child.data.url,
          created_utc: child.data.created_utc,
          over_18: child.data.over_18,
          user_id: 'a9cqu',
          surfaced: false,
        }
      }),
    )
    db.destroy()
  } catch (error) {
    console.error(error)
    db.destroy()
    process.exit(1)
  }
}

insertSavesToDB()
