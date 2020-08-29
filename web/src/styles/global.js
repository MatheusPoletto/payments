import { createGlobalStyle } from "styled-components";


import "font-awesome/css/font-awesome.css";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    outline: 0;
  }

  body {
    font: 14px sans-serif;
  }

  #root {
    margin: 0 auto;
    max-width: 330px;
    width: 100%;
    padding: 40px 0;
  }

  .error{
    color: red;
  }

`;

export default GlobalStyle;