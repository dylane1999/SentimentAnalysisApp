import { createGlobalStyle } from 'styled-components';

/**
 * Global styles for the application
 */
export const GlobalStyle = createGlobalStyle`

  html {
    box-sizing: border-box;
    overflow-x:hidden;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
  }

  #root {
    position: relative;
    min-height: 100vh;
  }
`;