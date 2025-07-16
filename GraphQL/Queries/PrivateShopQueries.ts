// List of Personal SHop

import {gql} from '../../src/__generated__';

export const myShops = gql(`
query GetMySHops($after: String) {
  getShops(after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
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
}
`);

export const getMyOrdersItem = gql(`
query GetPendingOrders($after: String) {
  getOrders(where: { isCompleted: { eq: false } }, after: $after, first:5) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
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
}
`);
