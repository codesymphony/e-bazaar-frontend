import { gql } from 'apollo-boost';

import { userFragment } from '../fragments';

export default gql`
  query {
    users {
      ...UserInfo
    }
  }
  ${userFragment}
`;
