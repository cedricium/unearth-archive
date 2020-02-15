import styled, { css, createGlobalStyle } from 'styled-components'

import TopographyBackground from '../images/topography-background.svg'

export const IndexGlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    font-family: CircularStd, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: #000000;
  }
`

export const Main = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  @media (max-width: 400px) {
    height: unset;
    min-height: unset;
  }
`

export const Section = styled.section`
  flex-grow: 1;
  flex-basis: 0;
  flex-shrink: 0;
`

export const Hero = styled(Section)`
  padding: 0 0 0 40px;
  min-width: 720px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  @media (max-width: 720px) {
    min-width: unset;
    width: 100%;
  }

  @media (max-width: 680px) {
    padding: 20px 10px 0;
  }
`

export const BackgroundSection = styled(Section)`
  background-color: #ff5c00;
  background-image: url(${TopographyBackground});

  @media (max-width: 720px) {
    flex-grow: 0;
  }
`

export const Header = styled.h1`
  margin: 0 0 20px;
  max-width: 470px;
  font-style: normal;
  font-weight: 600;
  font-size: 46px;
  line-height: 58px;
  color: #000000;
`

export const Subheader = styled.p`
  margin: 0;
  max-width: 464px;
  font-style: normal;
  font-weight: 100;
  font-size: 24px;
  line-height: 36px;
  color: #000000;
`

export const Button = styled.a`
  display: inline-flex;
  text-align: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 10px;
  text-decoration: none;
  color: #000000;
  font-size: 18px;
  font-weight: 100;

  @media (max-width: 420px) {
    width: 100%;
    margin: 0 0 10px;
  }

  ${props =>
    props.primary &&
    css`
      background: #ff5c00;
      color: #ffffff;
    `}

  ${props =>
    props.link &&
    css`
      text-decoration: underline;
      text-decoration-style: dotted;
    `}
`
