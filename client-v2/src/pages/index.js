import React from 'react'

import Image from '../components/image'
import Footer from '../components/footer'
import SEO from '../components/seo'
import SendToReddit from '../components/oauth/send-to-reddit'

import {
  IndexGlobalStyle,
  Main,
  Header,
  Subheader,
  Button,
  Hero,
  BackgroundSection,
} from '../styles/index.styles'

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
          <Button link href='https://github.com/cedricium/unearth'>
            View the Source Code
          </Button>
        </div>
      </article>
      <Footer />
    </Hero>
    <BackgroundSection />
  </Main>
)

export default IndexPage
