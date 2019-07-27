import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getThings } from '../../actions'

import { Link } from 'react-router-dom'

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1150px;
`

const SubredditWrapper = styled(Link)`
  flex: 1 1;
  display: inline-flex;
  align-items: center;
  margin: 0 3% 50px 0;
  padding: 10px;
  width: 28%;
  border-radius: 8px;
  color: #050505;
  text-decoration: none;

  &:hover {
    background: #F9F9F9;
  }

  @media(max-width: 855px) {
    & { width: 40%; }
  }

  @media(max-width: 640px) {
    & {
      margin: 0 0 25px;
      width: 92%;
    }
  }
`

const SubInfo = styled.div`
  margin: 0;
  font-size: 13px;
  font-weight: 300;

  & > p {
    margin: 0;
    padding: 0;
  }
`

const SubTitle = styled.p`
  font-weight: 500;
`

const SubDesc = styled.p`
  margin: 5px 0 0 !important;
`

const SubMeta = styled.p`
  margin: 8px 0 0 !important;
  font-size: 11px;
  font-weight: 400;

  & > span {
    padding: 2px 4px;
    border-radius: 4px;
    background: #ffadaf;
  }
`

const Dashboard = props => {
  const subreddits = Object.values(props.subreddits || {})
  return (
    <main>
      <button onClick={props.getThings}>Sync Saved Things</button>
      <Container>
        {subreddits.map(s => (
          <SubredditWrapper to={s.subreddit} key={s.id}>
            <SubInfo>
              <SubTitle>{s.subreddit}</SubTitle>
              <SubDesc>
                {s.description}
              </SubDesc>
              {s.nsfw && <SubMeta><span className="nsfw">🔞 nsfw</span></SubMeta>}
            </SubInfo>
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
