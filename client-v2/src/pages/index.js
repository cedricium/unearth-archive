import React from 'react'
import { Box, Clock, Loader } from 'react-feather'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import SendToReddit from '../components/oauth/send-to-reddit'

import {
  IndexGlobalStyle,
  Hero,
  FeatureWrapper,
  Heading,
  Subheading,
  LoginCTA,
  SecondaryCTA,
  HeroImageWrapper,
  HeroContentWrapper,
} from '../styles/index.styles'

const features = [
  {
    icon: 'loader',
    title: 'Experience nostalgia',
    body:
      'Remember saving that one really cute cat gif because it reminded you of your own cat? Prepare to experience a range of emotions as you are reminded of the things you have saved.',
  },
  {
    icon: 'box',
    title: 'Manage your saved content',
    body:
      'All of the links in your personalized newsletter link directly to the Reddit post or comment you saved, making it easy to unsave things you no longer need.',
  },
  {
    icon: 'clock',
    title: 'Go at your own pace',
    body:
      'Choose between receiving daily, weekly, or monthly emails. Perfect for the person who has a lot of saves and wants to sift through them quickly or the person who just likes delaying instant gratification.',
  },
]

const namesToIcon = {
  loader: <Loader size={48} strokeWidth={2} />,
  box: <Box size={48} strokeWidth={2} />,
  clock: <Clock size={48} strokeWidth={2} />,
}

const Feature = ({ icon, title, body }) => (
  <FeatureWrapper>
    {namesToIcon[icon]}
    <p style={{ fontWeight: 'bold' }}>{title}</p>
    <p>{body}</p>
  </FeatureWrapper>
)

const IndexPage = () => (
  <Layout hideHeader>
    <SEO title='Home' />
    <IndexGlobalStyle />
    <section>
      <Hero>
        <HeroImageWrapper>
          <Image />
        </HeroImageWrapper>
        <HeroContentWrapper>
          <Heading>Stop forgetting about your Reddit saves</Heading>
          <Subheading>
            Receive personalized newsletters with a handful of your Reddit saves
            at the interval of your choosing and rediscover the amazing content
            you’ve forgotten all about.
          </Subheading>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <SendToReddit component={LoginCTA} />
            {` `}
            <SecondaryCTA href='https://github.com/cedricium/unearth'>
              View the Source Code
            </SecondaryCTA>
          </div>
        </HeroContentWrapper>
      </Hero>
    </section>
    <section
      style={{
        margin: '3rem 0',
        width: '100vw',
        position: 'relative',
        left: 'calc(-50vw + 50%)',
        minHeight: '300px',
        background: '#030047',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <div></div>
      <div></div>
    </section>
    <section>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
          alignItems: 'flex-start',
        }}
      >
        {features.map((f, idx) => (
          <Feature id={idx} {...f} />
        ))}
      </div>
    </section>
  </Layout>
)

export default IndexPage
