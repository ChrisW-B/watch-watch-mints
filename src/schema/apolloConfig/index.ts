import * as Realm from 'realm-web';

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { concatPagination } from '@apollo/client/utilities';

// Connect to your MongoDB Realm app
const app = new Realm.App(process.env.REACT_APP_REALM_ID as string);
// Gets a valid Realm user access token to authenticate requests
async function getValidAccessToken() {
  await app.logIn(Realm.Credentials.anonymous());
  return app?.currentUser?.accessToken;
}
// Configure the ApolloClient to connect to your app's GraphQL endpoint
const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_API,

    fetch: async (uri, options) => {
      const accessToken = await getValidAccessToken();
      (options?.headers as Record<string, string>).Authorization = `Bearer ${accessToken ?? ''}`;
      return fetch(uri, options);
    },
  }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          chats: concatPagination(['timeStampGte']),
        },
      },
    },
  }),
});

export default client;
