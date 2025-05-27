import {gql} from '../../src/__generated__/gql';

// Public Items
export const getPublicItems = gql(`
query GetPublicItems {
  getPublicItems {
    nodes {
      name
      imageUrls
      price
      starRating
    }
  }
}
`);

export const getPublicItemsById = gql(`
query GetPublicItemsById($id: String!) {
  getPublicItems(id: $id) {
    nodes {
      name
    }
  }
}
`);

// ProductCategories
export const productCategoryQueries = gql(`query productCategoryQueries {
  getProductCategories {
    pageInfo {
      hasNextPage
      hasPreviousPage
    }

    nodes {
      id
      isProduct
      name
      imageUrl
    }
  }
}`);

// Personal Items
export const getPersonalItems = gql(`query GetPersonalItems {
  getItems {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    nodes {
      name
      price
      starRating
    }
  }
}
`);

export const getPaginatedPersonalItems = gql(`
  query GetPaginatedPersonalItems($after: String) {
  getItems (after: $after) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    nodes {
      name
      price
      starRating
    }
  }
}
`);
