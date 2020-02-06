import React from 'react'
import { Link, graphql } from 'gatsby'
import SEO from '../components/seo'

import Layout from '../components/layout'
import Footer from '../components/footer'

export default function Template({ data }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark

  return (
    <Layout hideFooter hideHeader>
      <SEO title={frontmatter.title} />
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://rawcdn.githack.com/kognise/water.css/7e86e4f67c8a90d581df8926e77fbe9534752c9e/dist/light.standalone.min.css');

        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 20px auto 0;
          padding: 0;
          color: #2a2829;
        }

        @media (max-width: 860px) {
          body {
            padding: 0 20px;
          }
        }

        footer {
          border: none;
          padding-top: unset;
          font-size: inherit;
          color: inherit;
        }
      `,
        }}
      />
      <div className='content-container'>
        <div className='content'>
          <div style={{ margin: '0 0 10px' }}>
            <Link to='/'>&lsaquo; Back Home</Link>
          </div>
          <h1>{frontmatter.title}</h1>
          <div className='body' dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
      <Footer />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`
