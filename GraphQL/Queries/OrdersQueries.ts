import {gql} from '../../src/__generated__/gql';

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
