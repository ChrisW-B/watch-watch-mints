import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from '@apollo/client';
import { Global, css } from '@emotion/react';

import App from './App';
import apolloClient from './schema/apolloConfig';

const globalCss = css`
  :root {
    --bezier-transition: cubic-bezier(0.4, 0, 0.2, 1);

    /* font families */
    --font-family-body: 'Helvetica', 'Arial', sans-serif;

    /* light mode colors */
    --light-mode-dark: #1a0b00;
    --light-mode-light-grey: #c2c5c5;
    --light-mode-link-blue: #565cdc;
    --light-mode-white: #ffff;

    /* dark mode colors */
    --dark-mode-dark: #ffff;
    --dark-mode-light-grey: #708696;
    --dark-mode-link-blue: #565cdc;
    --dark-mode-white: #2f3136;

    /* set defaults to be overridden */
    --dark: var(--dark-mode-dark);
    --light-grey: var(--dark-mode-light-grey);
    --link-blue: var(--dark-mode-link-blue);
    --white: var(--dark-mode-white);

    @media (prefers-color-scheme: dark) {
      --dark: var(--dark-mode-dark);
      --light-grey: var(--dark-mode-light-grey);
      --link-blue: var(--dark-mode-link-blue);
      --white: var(--dark-mode-white);
    }

    @media (prefers-color-scheme: light) {
      --dark: var(--light-mode-dark);
      --light-grey: var(--light-mode-light-grey);
      --link-blue: var(--light-mode-link-blue);
      --white: var(--light-mode-white);
    }
  }

  html,
  body {
    font-family: var(--font-family-body);
    margin: 0;
    padding: 0;
    background-color: var(--white);
  }

  h1,
  h2,
  h3,
  p {
    color: var(--dark);
    margin: 0;
    padding: 0;
  }

  div,
  span,
  a {
    color: currentColor;
  }

  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <Global styles={globalCss} />
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
