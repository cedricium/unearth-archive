import styled, { css, createGlobalStyle } from 'styled-components'

export const IndexGlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    font-family: 'Heebo', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-style: normal;
    font-weight: 400;
    overflow-x: hidden;
  }

  p {
    margin: 0;
    padding: 0;
  }
`

export const Section = styled.section`
  width: 100%;
  padding: 0 20px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${props =>
    props.fullHeight &&
    css`
      min-height: 80vh;
    `}

  ${props =>
    props.primary &&
    css`
      padding: 40px 0;
      position: relative;
      width: 100vw;
      left: calc(-50vw + 50%);

      font-size: 16px;
      color: #ffffff;
      background: #030047;
    `}
`

export const SectionWrapper = styled.div`
  margin: 20px 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: ${props => props.justifyContent || 'space-around'};
  align-items: center;

  @media (max-width: 860px) {
    flex-direction: column;
  }
`

export const HeroContent = styled.div`
  max-width: 450px;

  @media (max-width: 860px) {
    max-width: 500px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

export const ImageWrapper = styled.div`
  width: 100%;
  max-width: ${props => props.width || '400px'};

  @media (max-width: 860px) {
    margin: ${props => props.margin || '50px 0'};
  }
`

export const Title = styled.h1`
  margin: 30px 0 10px;
  font-size: 42px;
  line-height: 62px;
  color: #030047;

  @media (max-width: 860px) {
    font-size: 34px;
    line-height: unset;
  }
`

export const Subheading = styled.p`
  font-size: 20px;
  line-height: 29px;
  color: #22292f;
`

export const ExternalLink = styled.a`
  margin: 20px 0;
  display: flex;
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
  color: #ff3e6c;
  text-decoration-style: dotted;
`

export const LinkButton = styled.a`
  margin: 20px 0;
  width: 260px;
  display: flex;
  justify-content: center;

  font-weight: bold;
  font-size: 18px;
  line-height: 26px;
  color: #ffffff;
  padding: 10px 20px;
  background: #ff3e6c;
  border-radius: 8px;

  text-decoration: none;
`

export const FeatureContent = styled.div`
  max-width: 350px;
  margin: 120px 0;

  @media (max-width: 860px) {
    order: 0 !important;
    max-width: 600px;
    margin: 30px 0 0;

    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

export const Header = styled.h2`
  margin: 0 0 10px;
  font-weight: bold;
  font-size: 28px;
  line-height: 41px;
  color: #030047;

  @media (max-width: 860px) {
    font-size: 24px;
    line-height: unset;
  }
`

export const Text = styled.p`
  font-size: 18px;
  line-height: 26px;
  color: #22292f;
`

export const HorizontalRule = styled.hr`
  border: none;
  height: 1px;
  background: #e8e8e8;
  position: relative;
  width: 100vw;
  left: calc(-50vw + 50%);
`

export const CreatorText = styled.p`
  color: #94a1b8;

  & a {
    color: #ffffff;
    text-decoration: underline;
    text-decoration-style: dotted;
  }
`

export const Footer = styled.footer`
  margin: 20px 0 0;
  padding: 0 20px;
  width: 100%;
  max-width: 960px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 860px) {
    flex-direction: column;
  }
`

export const FooterSectionLeft = styled.div`
  width: 100%;
  max-width: 280px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const FooterSectionRight = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 860px) {
    margin: 20px 0 0;
    padding: 0 20px;
  }

  & a {
    text-decoration: none;
    color: #ffffff;

    &:hover {
      text-decoration: underline;
      text-decoration-style: dotted;
    }
  }
`

export const FooterIconsWrapper = styled.div`
  & a {
    color: #ffffff;
    margin: 0 0 0 20px;
  }
`
