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
    --light-mode-dark: hsl(223, 6%, 23%);
    --light-mode-off-dark: hsl(223, 7%, 20%);
    --light-mode-light-grey: hsl(180, 3%, 77%);
    --light-mode-dark-grey: hsl(180, 3%, 28%);
    --light-mode-link-blue: hsl(237, 66%, 60%);
    --light-mode-white: hsl(0, 0%, 100%);

    /* dark mode colors */
    --dark-mode-dark: hsl(0, 0%, 100%);
    --dark-mode-off-dark: hsl(223, 7%, 20%);
    --dark-mode-light-grey: hsl(205, 15%, 51%);
    --dark-mode-dark-grey: hsl(205, 10%, 90%);
    --dark-mode-link-blue: hsl(237, 66%, 60%);
    --dark-mode-white: hsl(223, 6%, 27%);

    /* set defaults to be overridden */
    --dark: var(--dark-mode-dark);
    --light-grey: var(--dark-mode-light-grey);
    --dark-grey: var(--light-mode-dark-grey);
    --link-blue: var(--dark-mode-link-blue);
    --white: var(--dark-mode-white);
    --off-dark: var(---dark-mode-off-dark);

    @media (prefers-color-scheme: dark) {
      --dark: var(--dark-mode-dark);
      --light-grey: var(--dark-mode-light-grey);
      --dark-grey: var(--dark-mode-dark-grey);
      --link-blue: var(--dark-mode-link-blue);
      --white: var(--dark-mode-white);
      --off-dark: var(--dark-mode-off-dark);
    }

    @media (prefers-color-scheme: light) {
      --dark: var(--light-mode-dark);
      --light-grey: var(--light-mode-light-grey);
      --link-blue: var(--light-mode-link-blue);
      --white: var(--light-mode-white);
      --off-dark: var(--light-mode-off-dark);
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
