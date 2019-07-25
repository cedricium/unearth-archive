import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getThings } from '../../actions'

import { Link } from 'react-router-dom'

const Container = styled.div`
  margin: 0 auto;
  /* width: 100%; */
  max-width: 760px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
`

const SubredditWrapper = styled(Link)`
  width: 40%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 5px 0 0;
  padding: 10px;
  text-decoration: none;
  color: inherit;
  border-radius: 5px;

  &:hover {
    background: #f5f5f5;
  }

  @media(max-width: 680px) {
    & {
      width: 100%;
    }
  }
`

const SubredditAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  margin: 0 10px 0 0;
`

const Dashboard = props => {
  /* <button onClick={props.getThings}>Sync Saved Things</button> */
  const subreddits = Object.values(props.subreddits)
  return (
    <main>
      <Container>
        {subreddits.map(s => (
          <SubredditWrapper to={s.subreddit} key={s.id}>
            <SubredditAvatar
              src={`https://avatars.changefeed.app/?i=${s.subreddit}`}
              alt={s.subreddit}
            />
            <p>{s.subreddit}</p>
          </SubredditWrapper>
        ))}
      </Container>
    </main>
  )
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  username: state.user.username,
  subreddits: state.things.subreddits,
})

export default connect(mapStateToProps, { getThings })(Dashboard)
