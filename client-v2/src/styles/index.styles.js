import styled, { createGlobalStyle } from 'styled-components'

export const IndexGlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Heebo', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-style: normal;
    font-weight: 400;
    overflow-x: hidden;
  }
`

export const Hero = styled.div`
  margin: 2rem auto 6rem;
  width: 100%;
  min-height: 70vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 890px) {
    flex-wrap: wrap;
  }
`

export const FeatureWrapper = styled.div`
  width: 100%;
  max-width: 310px;

  @media (max-width: 990px) {
    max-width: 100%;
    width: 100%;
    margin: 0 0 2rem;
  }
`

export const Heading = styled.h1`
  margin: 0 auto 1rem;
  font-weight: 800;
  font-size: 54px;
  line-height: 70px;
  color: #030047;

  @media (max-width: 600px) {
    font-size: 40px;
    line-height: unset;
  }
`

export const Subheading = styled.p`
  margin: 0 auto 2rem;
  max-width: 800px;
  font-weight: 400;
  font-size: 22px;
  line-height: 31px;
  color: #22292f;

  @media (max-width: 600px) {
    font-size: 18px;
    line-height: 26px;
  }
`

export const LoginCTA = styled.a`
  margin: 0;
  padding: 12px 20px;
  background: #5f5fff;
  border-radius: 8px;
  color: #ffffff;
  font-size: 18px;
  line-height: 28px;
  text-decoration: none;

  @media (max-width: 600px) {
    font-size: 16px;
    line-height: unset;
  }

  @media (max-width: 890px) {
    text-align: center;
    width: 100%;
  }
`

export const SecondaryCTA = styled.a`
  margin: 0 0 0 1rem;
  color: #5f5fff;
  font-size: 18px;
  line-height: 28px;
  text-decoration: none;

  @media (max-width: 600px) {
    font-size: 16px;
    line-height: unset;
  }

  @media (max-width: 890px) {
    text-align: center;
    width: 100%;
    margin: 1rem auto 0;
  }
`

export const HeroImageWrapper = styled.div`
  margin: 0 2rem 0 0;
  max-width: 645px;
  width: 100%;
  order: 2;

  @media (max-width: 890px) {
    max-width: 100%;
    margin: 4rem 0 0;
  }
`

export const HeroContentWrapper = styled.div`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;

  @media (max-width: 890px) {
    max-width: 100%;
  }
`
