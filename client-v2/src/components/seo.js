/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

function SEO({ description, lang, meta, title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `,
  )

  const metaDescription = description || site.siteMetadata.description
  const siteUrl = 'https://www.tryunearth.com'

  return (
    <>
      <Helmet
        defer={false}
        defaultTitle={title}
        titleTemplate={`%s | ${site.siteMetadata.title}`}
      >
        <html lang={lang} />
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1,shrink-to-fit=no,viewport-fit=cover'
        />

        {/* General */}
        <title>{title}</title>
        <meta name='description' content={metaDescription} />
        <meta name='image' content={`${siteUrl}/og-image.png`} />

        {/* Open Graph */}
        <meta property='og:title' content={site.siteMetadata.title} />
        <meta property='og:type' content='website' />
        <meta property='og:image' content={`${siteUrl}/og-image.png`} />
        <meta property='og:url' content={siteUrl} />
        <meta property='og:description' content={metaDescription} />
        <meta property='og:locale' content={lang} />
        <meta property='og:site_name' content={site.siteMetadata.title} />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />

        {/* Twitter Card */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:creator' content='@CedricAmaya' />
        <meta name='twitter:title' content={site.siteMetadata.title} />
        <meta name='twitter:description' content={metaDescription} />
        <meta name='twitter:image' content={`${siteUrl}/og-image.png`} />
      </Helmet>
    </>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
