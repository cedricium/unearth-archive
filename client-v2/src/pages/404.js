import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

/**
 * Adds a simple check to see if `browser` is available, ultimately preventing
 * the cursed 404 flash[0] when deployed somewhere like Netlify. Huge thanks to
 * Sam Featherstone (GitHub @samburgers) for the suggestion.[1]
 *
 * [0]: https://github.com/gatsbyjs/gatsby/issues/5329
 * [1]: https://github.com/gatsbyjs/gatsby/issues/5329#issuecomment-484741119
 */
const browser = typeof window !== 'undefined' && window

const NotFoundPage = () => {
  return (
    browser && (
      <Layout>
        <SEO title='404: Not found' />
        <h1>NOT FOUND</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </Layout>
    )
  )
}

export default NotFoundPage
