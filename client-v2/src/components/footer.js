import React from 'react'
import { Link } from 'gatsby'
import { GitHub, Twitter, Users } from 'react-feather'
import styled, { css } from 'styled-components'

const Footer = styled.footer`
  margin: 20px 0;
  padding: 0 35px 0 0;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  font-family: CircularStd, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 14px;

  & a {
    margin: 0 0 0 15px;
    color: #000000;
    text-decoration: underline;
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

const SiteFooter = () => (
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
)

export default SiteFooter
