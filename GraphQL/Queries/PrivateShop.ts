// List of Personal SHop

import {gql} from '../../src/__generated__';

export const myShops = gql(`
query GetMySHops {
  getShops {
    nodes {
      name
      aboutShop
      stars {
        stars
      }
      location
    }
  }
}
`);
