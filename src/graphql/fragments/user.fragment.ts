import { gql } from 'apollo-boost';

export default gql`
  fragment UserInfo on UserDTO {
    id
    firstName
    lastName
    email
    gender
    mobileNumber
    createdAt
    updatedAt
  }
`;
