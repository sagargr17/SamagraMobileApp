import {gql} from '../../src/__generated__';

export const createNewUser = gql(
  `
  mutation createUser($username: String!, $profileImageUrl: String!) {
  createUser(profileImageUrl: $profileImageUrl, username: $username) {
    id
  }
}
  `,
);
