import { gql } from 'apollo-boost';

import { userFragment } from '../fragments';

export default gql`
  mutation signUpUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $gender: UserGender!
    $mobileNumber: String!
  ) {
    signUpUser(
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
