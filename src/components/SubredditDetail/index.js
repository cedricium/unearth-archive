import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1150px;
`

const ThingWrapper = styled.div`
  flex: 1 1;
  display: flex;
  align-items: center;
  margin: 0 0 10px 0;
  padding: 10px;
  border-radius: 8px;
  color: #050505;
  text-decoration: none;

  &:hover {
    background: #F9F9F9;
  }
`

const ThingInfo = styled.div`
  margin: 0;
  font-size: 13px;
  font-weight: 300;

  & > p {
    margin: 0;
    padding: 0;
  }
`

const ThingTitle = styled.a`
  color: #050505;
  text-decoration: none;
  font-weight: 500;
`

const ThingBody = styled.section`
  margin: 5px 0 0 !important;
`

const Thing = ({ thing }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  let thingExpansion;

  if (thing.body) {
    isExpanded
      ? thingExpansion = <ReactMarkdown source={thing.body} />
      : thingExpansion = <p onClick={() => setIsExpanded(true)}>Expand...</p>
  } else {
    thingExpansion = null
  }

  return (
    <ThingWrapper>
      <ThingInfo>
        <ThingTitle
          href={`https://reddit.com${thing.permalink}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {thing.title}
        </ThingTitle>
        <ThingBody>
          {thingExpansion}
        </ThingBody>
      </ThingInfo>
    </ThingWrapper>
  )
}

const SubredditDetail = ({ things, match }) => {
  const path = `${match.params.prefix}/${match.params.subreddit}`
  const subreddit = Object.values(things.subreddits).find(s => s.subreddit === path)
  const posts = things.posts[subreddit.id]
  const comments = things.comments[subreddit.id]

  return (
    <Container>
      <h1>{subreddit.subreddit}</h1>
      {posts && posts.map(p => (
        <Thing thing={p} />
      ))}
    </Container>
  )
}

const mapStateToProps = state => ({
  things: state.things,
})

export default connect(mapStateToProps)(SubredditDetail)
