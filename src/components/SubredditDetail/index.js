import React from 'react'
import { connect } from 'react-redux'

const SubredditDetail = ({ things, match }) => {
  const path = `${match.params.prefix}/${match.params.subreddit}`
  const subreddit = Object.values(things.subreddits).find(s => s.subreddit === path)
  const posts = things.posts[subreddit.id]
  const comments = things.comments[subreddit.id]

  return (
    <div>
      <h1>{subreddit.subreddit}</h1>
      {posts && posts.map(p => (
        <a 
          href={`https://reddit.com${p.permalink}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {p.title}
        </a>
      ))}
    </div>
  )
}

const mapStateToProps = state => ({
  things: state.things,
})

export default connect(mapStateToProps)(SubredditDetail)
