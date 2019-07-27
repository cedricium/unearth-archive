import keyBy from 'lodash.keyby'

const COMMENT_KIND = 't1'
const POST_KIND = 't3'

export const extractSubreddits = things => {
  const subreddits = things.map(d => {
    return {
      id: d.data.subreddit_id,
      nsfw: d.data.over_18,
      subreddit: d.data.subreddit_name_prefixed,
      description: d.data.sr_detail && d.data.sr_detail.public_description 
        ? d.data.sr_detail.public_description
        : 'No description defined our it could not be found...',
    }
  })
  const subredditsById = collectionById(subreddits)
  return subredditsById
}

export const extractPosts = things => {
  const posts = things
    .filter(t => t.kind === POST_KIND)
    .map(post => {
      return {
        id: post.data.id,
        author: post.data.author,
        score: post.data.score,
        nsfw: post.data.over_18,
        title: post.data.title,
        body: post.data.selftext,
        subreddit: post.data.subreddit_name_prefixed,
        subredditId: post.data.subreddit_id,
        permalink: post.data.permalink,
        created: post.data.created,
        gilded: post.data.gilded,
      }
    })
  const postsBySubredditId = groupBySubreddit(posts)
  return postsBySubredditId
}

export const extractComments = things => {
  const comments = things
    .filter(t => t.kind === COMMENT_KIND)
    .map(comment => {
      return {
        id: comment.data.id,
        author: comment.data.author,
        score: comment.data.score,
        nsfw: comment.data.over_18,
        subredditId: comment.data.subreddit_id,
        subreddit: comment.data.subredit_name_prefixed,
        permalink: comment.data.permalink,
        body: comment.data.body,
        postTitle: comment.data.link_title,
        created: comment.data.created,
        gilded: comment.data.gilded,
      }
    })
  const commentsBySubredditId = groupBySubreddit(comments)
  return commentsBySubredditId
}

const collectionById = (collection, key = 'id') => {
  return keyBy(collection, key)
}

const groupBySubreddit = things => {
  const subredditSet = {}
  for (let i = 0; i < things.length; i++) {
    if (subredditSet.hasOwnProperty(things[i].subredditId)) {
      subredditSet[things[i].subredditId] = [
        ...subredditSet[things[i].subredditId],
        things[i],
      ]
    } else {
      subredditSet[things[i].subredditId] = []
      subredditSet[things[i].subredditId].push(things[i])
    }
  }
  return subredditSet
}
