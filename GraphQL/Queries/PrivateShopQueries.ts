// List of Personal SHop

import {gql} from '../../src/__generated__';

export const myShops = gql(`
query GetMySHops {
  getShops {
    nodes {
      id
      name
      aboutShop
      stars {
        stars
      }
      location
      phoneNumber
      profileImageUrl
    }
  }
}
`);
