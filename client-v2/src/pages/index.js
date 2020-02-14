import React from 'react'
import { Link } from 'gatsby'

import styled, { createGlobalStyle, css } from 'styled-components'
import { GitHub, Twitter, Users } from 'react-feather'

import Image from '../components/image'
import SEO from '../components/seo'
import SendToReddit from '../components/oauth/send-to-reddit'

import {} from '../styles/index.styles'

const IndexGlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    font-family: 'CircularStd', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: #000000;
  }
`

const Main = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`

const Section = styled.section`
  flex-grow: 1;
  flex-basis: 0;
  flex-shrink: 0;
`

const Hero = styled(Section)`
  padding: 0 0 0 40px;
  min-width: 720px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  @media (max-width: 720px) {
    min-width: unset;
    width: 100%;
  }

  @media (max-width: 680px) {
    padding: 60px 10px 0;
  }
`

const BackgroundSection = styled(Section)`
  background: #ff5c00;

  @media (max-width: 720px) {
    flex-grow: 0;
  }
`

const Header = styled.h1`
  margin: 0 0 20px;
  max-width: 470px;
  font-style: normal;
  font-weight: bold;
  font-size: 46px;
  line-height: 58px;
  color: #000000;
`

const Subheader = styled.p`
  margin: 0;
  max-width: 464px;
  font-style: normal;
  font-weight: 100;
  font-size: 24px;
  line-height: 36px;
  color: #000000;
`

const Button = styled.a`
  display: inline-flex;
  padding: 10px 20px;
  border-radius: 10px;
  text-decoration: none;
  color: #000000;
  font-weight: 100;

  ${props =>
    props.primary &&
    css`
      background: #ff5c00;
      color: #ffffff;
    `}

  ${props =>
    props.link &&
    css`
      text-decoration: underline;
      text-decoration-style: dotted;
    `}
`

const Footer = styled.footer`
  padding: 0 10px 0 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;

  & a {
    margin: 0 0 0 20px;
    color: #000000;
    text-decoration-style: dotted;
  }

  @media (max-width: 680px) {
    flex-direction: column;
  }
`

const IndexPage = () => (
  <Main>
    <SEO title='Home' />
    <IndexGlobalStyle />
    <Hero>
      <header style={{ maxWidth: '236px', margin: '0 0 40px' }}>
        <Image filename='unearth-logo.png' />
      </header>
      <article>
        <Header>Stop forgetting about your Reddit saves</Header>
        <Subheader>
          Receive personalized newsletters with a handful of your Reddit saves
          at the interval of your choosing and rediscover all the amazing
          content you’ve forgotten about.
        </Subheader>
        <div style={{ margin: '40px 0' }}>
          <Button primary href=''>
            Get Started Using Reddit
          </Button>
          {` `}
          <Button link href=''>
            View the Source Code
          </Button>
        </div>
      </article>
      <Footer>
        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
          <p>© 2020 · Unearth</p>
          <a href='https://twitter.com/tryunearth'>
            <Twitter />
          </a>
          <a href='https://github.com/cedricium/unearth'>
            <GitHub />
          </a>
          <a href='https://reddit.com/r/tryunearth'>
            <Users />
          </a>
        </div>
        <div>
          <Link to='/acknowledgements'>Acknowledgements</Link>
          <Link to='/privacy'>Privacy Policy</Link>
          <Link to='/terms'>Terms of Service</Link>
        </div>
      </Footer>
    </Hero>
    <BackgroundSection />
  </Main>
)

export default IndexPage
