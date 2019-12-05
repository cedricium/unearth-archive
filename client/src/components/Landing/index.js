import React from 'react'
import {
  GlobalStyle,
  Wrapper,
  Container,
  Header,
  Navbar,
  NavLink,
  Main,
  CTAButton,
  Footer,
  Title,
  Subtitle,
} from './style'
import Logo from './unearth-logo.svg'

const Landing = ({ url }) => {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Container>
          <Header>
            <Navbar>
              <div className='nav-main'>
                <img src={Logo} alt='unearth' />
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
            <CTAButton href={url} className='animated fadeInUp fast'>
              Get Started using Reddit
            </CTAButton>
          </Main>
          <Footer />
        </Container>
      </Wrapper>
    </>
  )
}

export default Landing
