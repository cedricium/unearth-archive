import React from 'react'
import { Link } from 'gatsby'
import { GitHub, Twitter, Users } from 'react-feather'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import SendToReddit from '../components/oauth/send-to-reddit'

import {
  IndexGlobalStyle,
  Section,
  SectionWrapper,
  HeroContent,
  ImageWrapper,
  Title,
  Subheading,
  ExternalLink,
  LinkButton,
  FeatureContent,
  Header,
  Text,
  HorizontalRule,
  CreatorText,
  Footer,
  FooterSectionLeft,
  FooterSectionRight,
  FooterIconsWrapper,
} from '../styles/index.styles'

const IndexPage = () => (
  <Layout hideHeader hideFooter>
    <SEO title='Home' />
    <IndexGlobalStyle />
    <Section fullHeight>
      <SectionWrapper justifyContent={'space-between'}>
        <HeroContent>
          <ImageWrapper width='195px' margin='0'>
            <Image filename='unearth-logo.png' />
          </ImageWrapper>
          <Title>Stop forgetting about your Reddit saves</Title>
          <Subheading>
            Receive personalized newsletters with a handful of your Reddit saves
            at the interval of your choosing and rediscover all the amazing
            content you’ve forgotten about.
          </Subheading>
          <SendToReddit
            component={LinkButton}
            value='Get Started Using Reddit'
          />
        </HeroContent>
        <ImageWrapper maxWidth='390px'>
          <Image filename='115.png' />
        </ImageWrapper>
      </SectionWrapper>
    </Section>
    <HorizontalRule />

    <Section>
      <SectionWrapper>
        <FeatureContent>
          <Header>Manage your saved content</Header>
          <Text>
            All links in your personalized newsletter link directly to the
            Reddit post or comment you saved, making it easy to unsave things
            you no longer wish to keep.
          </Text>
          <SendToReddit
            component={ExternalLink}
            value='Try now using Reddit &rarr;'
          />
        </FeatureContent>
        <ImageWrapper width='500px'>
          <Image filename='176.png' />
        </ImageWrapper>
      </SectionWrapper>
      <SectionWrapper>
        <FeatureContent style={{ order: 1 }}>
          <Header>Go at your own pace</Header>
          <Text>
            Choose between receiving daily, weekly, or monthly emails. Perfect
            for the person who has a lot of saves and wants to sift through them
            quickly or the person who just likes delaying instant gratification.
          </Text>
          <SendToReddit
            component={ExternalLink}
            value='Try now using Reddit &rarr;'
          />
        </FeatureContent>
        <ImageWrapper width='500px'>
          <Image filename='045.png' />
        </ImageWrapper>
      </SectionWrapper>
    </Section>

    <Section primary>
      <div style={{ margin: '0 0 20px' }}>
        <CreatorText>
          Made with love by{' '}
          <a href='https://twitter.com/cedricamaya'>Cedric Amaya</a>
        </CreatorText>
      </div>
      <ImageWrapper width='700px' style={{ padding: '0 20px', opacity: '0.3' }}>
        <Image filename='footer-illustration.png' />
      </ImageWrapper>
      <Footer>
        <FooterSectionLeft>
          <p>&#169; 2020 Unearth</p>
          <FooterIconsWrapper>
            <a href='https://twitter.com/tryunearth'>
              <Twitter />
            </a>
            <a href='https://github.com/cedricium/unearth'>
              <GitHub />
            </a>
            <a href='https://reddit.com/r/tryunearth'>
              <Users />
            </a>
          </FooterIconsWrapper>
        </FooterSectionLeft>
        <FooterSectionRight>
          <Link to='/open-source-licenses'>Open Source Licenses</Link>
          <Link to='/privacy-policy'>Privacy Policy</Link>
          <Link to='/terms-and-conditions'>Terms & Conditions</Link>
        </FooterSectionRight>
      </Footer>
    </Section>
  </Layout>
)

export default IndexPage
