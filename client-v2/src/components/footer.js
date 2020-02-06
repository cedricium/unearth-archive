import React from 'react'
import { Link } from 'gatsby'
import { GitHub, Twitter, Users } from 'react-feather'

import Image from '../components/image'

import {
  Section,
  ImageWrapper,
  CreatorText,
  Footer,
  FooterSectionLeft,
  FooterSectionRight,
  FooterIconsWrapper,
} from '../styles/index.styles'

const SiteFooter = () => (
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
        <p>&#169; 2020 &middot; Unearth</p>
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
        <Link to='/acknowledgements'>Acknowledgements</Link>
        <Link to='/privacy-policy'>Privacy Policy</Link>
        <Link to='/terms-of-service'>Terms of Service</Link>
      </FooterSectionRight>
    </Footer>
  </Section>
)

export default SiteFooter
