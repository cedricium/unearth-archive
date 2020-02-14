import React from 'react'
import { Link } from 'gatsby'

import styled, { createGlobalStyle, css } from 'styled-components'
import { GitHub, Twitter, Users } from 'react-feather'

import Image from '../components/image'
import SEO from '../components/seo'
import SendToReddit from '../components/oauth/send-to-reddit'

import {} from '../styles/index.styles'

import TopographyBackground from '../images/topography-background.svg'
const IndexGlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    font-family: CircularStd, -apple-system, BlinkMacSystemFont, 'Segoe UI',
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

  @media (max-width: 400px) {
    height: unset;
    min-height: unset;
  }
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
    padding: 20px 10px 0;
  }
`

const BackgroundSection = styled(Section)`
  background-color: #ff5c00;
  background-image: url(${TopographyBackground});

  @media (max-width: 720px) {
    flex-grow: 0;
  }
`

const Header = styled.h1`
  margin: 0 0 20px;
  max-width: 470px;
  font-style: normal;
  font-weight: 600;
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
  text-align: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 10px;
  text-decoration: none;
  color: #000000;
  font-size: 18px;
  font-weight: 100;

  @media (max-width: 420px) {
    width: 100%;
    margin: 0 0 10px;
  }

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
  padding: 0 20px 0 0;
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

const FooterColumn = styled.div`
  display: inline-flex;
  align-items: center;

  @media (max-width: 420px) {
    ${props =>
      props.right &&
      css`
        & {
          flex-wrap: wrap;
          justify-content: center;
        }

        & a {
          margin: 10px;
        }
      `}
  }
`

const CTAButton = <Button primary>Get Started Using Reddit</Button>

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
          <SendToReddit component={Button} value='Get Started Using Reddit' />
          {` `}
          <Button link href=''>
            View the Source Code
          </Button>
        </div>
      </article>
      <Footer>
        <FooterColumn>
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
        </FooterColumn>
        <FooterColumn right>
          <Link to='/acknowledgements'>Acknowledgements</Link>
          <Link to='/privacy'>Privacy Policy</Link>
          <Link to='/terms'>Terms of Service</Link>
        </FooterColumn>
      </Footer>
    </Hero>
    <BackgroundSection />
  </Main>
)

export default IndexPage
