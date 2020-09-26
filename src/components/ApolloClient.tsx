import ApolloClient from 'apollo-boost';

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  request: operation => {
    const idToken = localStorage.getItem('idToken') || '';
    const accessToken = localStorage.getItem('accessToken') || '';
    const refreshToken = localStorage.getItem('refreshToken') || '';

    const header = {
      idToken,
      accessToken,
      refreshToken,
    };

    operation.setContext({
      headers: header,
    });
  },
});
