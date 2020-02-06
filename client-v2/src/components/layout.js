/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './header'
import './layout.css'

const Layout = ({ hideHeader, hideFooter, children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      {!hideHeader && <Header siteTitle={data.site.siteMetadata.title} />}
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: hideFooter ? `0 0` : `0 0 1.45rem`,
        }}
      >
        <main>{children}</main>
        {!hideFooter && (
          <footer>
            <p>
              © {new Date().getFullYear()}
              {` `}&middot;{` `}Unearth
            </p>
            <p>
              For any questions or concerns, please feel free to reach out to
              {` `}
              <a href='mailto:hello@tryunearth.com'>hello@tryunearth.com</a>
            </p>
          </footer>
        )}
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
