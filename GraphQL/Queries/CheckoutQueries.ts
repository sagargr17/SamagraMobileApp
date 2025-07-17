import {gql} from '../../src/__generated__';

export const GetBasketItemsQuery =
  gql(`query GetBasketItemsQuery($after: String) {
  getBasketItems(after: $after) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        item {
          id
          name
          imageUrls
          price
          starRating
          isProduct
          shop {
            name
            user {
              username
            }
            phoneNumber
            location
          }
        }
      }
    }
  }
}

`);
