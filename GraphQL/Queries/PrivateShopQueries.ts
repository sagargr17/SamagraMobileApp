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

export const getMyOrdersItem = gql(`
query GetPendingOrders {
  getOrders(where: { isCompleted: { eq: false } }) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    nodes {
      id
      itemName
      isCompleted
      price
      address
      quantity
      dateTime
      completionDateTime
      phoneNumber
      fullName
      message
    }
  }
}
`);
