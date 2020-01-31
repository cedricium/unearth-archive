// import React from 'react'
// import { Link } from 'gatsby'

// import Layout from '../components/layout'
// import Image from '../components/image'
// import SEO from '../components/seo'

// const IndexPage = () => (
//   <Layout>
//     <SEO title='Home' />
//     <h1>Hi people</h1>
//     <p>Welcome to your new Gatsby site.</p>
//     <p>Now go build something great.</p>
//     <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
//       <Image />
//     </div>
//     <Link to='/app/'>Go to App</Link>
//   </Layout>
// )

// export default IndexPage

import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
// import {
//   GlobalStyle,
//   Wrapper,
//   Container,
//   Header,
//   Navbar,
//   NavLink,
//   Main,
//   CTAButton,
//   Footer,
//   Title,
//   Subtitle,
// } from './style'
// import Logo from './unearth-logo.svg'
// import topographyBackground from './topography.svg'
// import 'animate.css'

import SendToReddit from '../components/oauth/send-to-reddit'

export const GlobalStyle = createGlobalStyle`
  @import url('https://rsms.me/inter/inter.css');

  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-display: swap;
    font-weight: 400;
    background: #22292f;
    background-size: cover;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Merriweather', Georgia, 'Times New Roman', Times, serif;
    font-display: swap;
  }
`

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

export const Container = styled.div`
  margin: 0 auto;
  padding: 0;
  width: 100%;
  height: 100vh;
  max-width: 1152px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 1152px) {
    padding: 0 20px;
  }
`

export const Header = styled.header`
  width: 100%;
  height: 100px;
  color: #ffffff;
  font-size: 16px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (max-width: 425px) {
    /* height: 80px; */
  }
`

export const Navbar = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  & > .nav-main {
    flex: 1;
  }
  & > .nav-secondary {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    flex: 2;
  }

  @media (max-width: 685px) {
    /* show hamburger menu */
    & > .nav-secondary {
      display: none;
    }
  }
`

export const NavLink = styled.a`
  margin: 0 0 0 30px;
  color: #ffffff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export const Main = styled.main`
  max-width: 960px;
  width: 100%;
  color: #ffffff;
  flex: 5;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media (max-width: 425px) {
    justify-content: flex-start;
  }
`

export const Title = styled.h1`
  font-size: 50px;

  @media (max-width: 425px) {
    font-size: 36px;
    text-align: left;
  }

  @media (max-width: 972px) {
    font-size: 30px;
  }
`

export const Subtitle = styled.p`
  color: #e0e0e0;
  margin: 0;
  padding: 0;
  font-size: 24px;
  line-height: 150%;
  width: 100%;
  max-width: 816px;

  @media (max-width: 425px) {
    text-align: left;
  }

  @media (max-width: 972px) {
    font-size: 20px;
  }
`

export const CTAButton = styled.a`
  /*
    S/O to the OGs at CSS Tricks
    References: https://css-tricks.com/css-basics-styling-links-like-boss/
  */
  margin: 30px 0 0 0;
  font-size: 18px;
  font-weight: bold;
  background-color: #ff4500;
  box-shadow: 0 5px 0 darkred;
  color: #ffffff;
  padding: 16px 24px;
  text-decoration: none;

  &:hover {
    background-color: #ce0606;
    cursor: pointer;
  }

  &:active {
    box-shadow: none;
  }

  @media (max-width: 425px) {
    width: 100%;
  }
`

export const Footer = styled.footer`
  width: 100%;
  flex: 1;
`

const IndexPage = ({ url }) => {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Container>
          <Header>
            <Navbar>
              <div className='nav-main'>
                {/* <img src={Logo} alt='unearth' /> */}
              </div>
              <div className='nav-secondary'>
                {/* <NavLink href='' className='nav-link'>
                  About
                </NavLink>
                <NavLink href='' className='nav-link'>
                  Open Source
                </NavLink> */}
                <NavLink
                  href='https://twitter.com/tryunearth'
                  className='nav-link'
                >
                  Twitter
                </NavLink>
                <NavLink
                  href='https://www.reddit.com/r/tryunearth/'
                  className='nav-link'
                >
                  Official Subreddit
                </NavLink>
                <NavLink href={url} className='nav-link'>
                  Sign up using Reddit
                </NavLink>
              </div>
            </Navbar>
          </Header>
          <Main>
            <Title className='animated fadeInUp fast'>
              Personalized emails with your Reddit saves delivered right to your
              inbox.
            </Title>
            <Subtitle className='animated fadeInUp fast'>
              Recurring emails personalized with your Reddit saves are delivered
              at the interval of your choosing, making Unearth a great way to
              rediscover all those memes and cat photos you’ve saved over the
              years.
            </Subtitle>
            <SendToReddit />
            {/* <CTAButton href={url} className='animated fadeInUp fast'>
              Get Started using Reddit
            </CTAButton> */}
          </Main>
          <Footer />
        </Container>
      </Wrapper>
    </>
  )
}

export default IndexPage
