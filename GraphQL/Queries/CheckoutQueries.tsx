import {gql} from '../../src/__generated__';

export const GetBasketItemsQuery = gql(`query GetBasketItemsQuery {
  getBasketItems {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    nodes {
      id
      item {
        id
        name
        imageUrls
        price
        starRating
      }
    }
  }
}`);
