import {gql} from '../../src/__generated__';

// Getting the login User
export const getLoginUser = gql(`
  query GetLoginUser {
  getUser {
    username
    pofileImageUrl
  }
}
`);
