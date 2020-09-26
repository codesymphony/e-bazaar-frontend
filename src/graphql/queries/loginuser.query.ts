import { gql } from 'apollo-boost';

import { userFragment } from '../fragments';

export default gql`
  query signInUser($email: String!, $password: String!) {
    signinUser(email: $email, password: $password) {
      tokens {
        idToken
        accessToken
        refreshToken
      }
      user {
        ...UserInfo
      }
    }
  }
  ${userFragment}
`;
