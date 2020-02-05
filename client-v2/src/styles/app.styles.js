import { createGlobalStyle } from 'styled-components'

const AppGlobalStyle = createGlobalStyle`
  @import url('https://rawcdn.githack.com/kognise/water.css/7e86e4f67c8a90d581df8926e77fbe9534752c9e/dist/light.min.css');

  /**
   * Water.css overrides can go below. For additional information, checkout the
   * Water.css GitHub page.
   *
   * References:
   *  - https://github.com/kognise/water.css?ref=devawesome.io#theming
   */

  :root {
    --background-body: #fff;
    --background: #efefef;
    --background-alt: #f7f7f7;
    --background-danger: #F56565;
    --background-danger-hover: #E53E3E;
    --selection: lightblue;
    --text-main: #363636;
    --text-bright: #000;
    --text-muted: #999;
    --text-danger: #FFF5F5;
    --links: #0076d1;
    --focus: #0096bfab;
    --border: #dbdbdb;
    --code: #000;
    --animation-duration: 0.1s;
    --button-hover: #ddd;
    --scrollbar-thumb: color-mod(var(--button-hover) lightness(-3%));
    --scrollbar-thumb-hover: color-mod(var(--button-hover) lightness(-10%));
    --form-placeholder: #949494;
    --form-text: #000;
    --variable: #39a33c;
    --highlight: #ff0;
  }

  body {
    margin: 0;
    padding: 0;
    max-width: none;
  }

  input[type="button"].danger,
  input[type="submit"].danger,
  button.danger {
    color: var(--text-danger);
    background: var(--background-danger);
  }

  input[type="button"].danger:hover,
  input[type="submit"].danger:hover,
  button.danger:hover {
    background: var(--background-danger-hover);
  }

  u {
    text-decoration-style: dotted;
  }

  footer {
    margin-top: 2rem;
  }

  .hr-text {
    margin: auto 0;
    line-height: 1em;
    position: relative;
    outline: 0;
    border: 0;
    color: black;
    text-align: center;
    height: 1.5em;
    max-width: 250px;
    opacity: .5;

    &:before {
      content: '';
      /* background: linear-gradient(to right, transparent, #818078, transparent); */
      background: #aaaaaa;
      position: absolute;
      left: 0;
      top: 50%;
      width: 100%;
      height: 1px;
    }

    &:after {
      content: attr(data-content);
      position: relative;
      display: inline-block;
      color: black;

      padding: 0 .5em;
      line-height: 1.5em;
      color: #818078;
      background-color: #ffffff;
    }
  }
`

export default AppGlobalStyle
