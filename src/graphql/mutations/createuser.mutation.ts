import { gql } from 'apollo-boost';

import { userFragment } from '../fragments';

export default gql`
  mutation createUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $gender: String!
    $mobileNumber: String!
  ) {
    createUser(
      input: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
        gender: $gender
        mobileNumber: $mobileNumber
      }
    ) {
      ...UserInfo
    }
  }
  ${userFragment}
`;
