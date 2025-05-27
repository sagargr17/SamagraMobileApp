import {gql} from '../../src/__generated__/gql';

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

export const productQueries = gql(`query productQueries {
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

export const getPersonalItems = gql(`query GetPersonalItems {
  getItems {
    nodes {
      name
      price
      starRating
    }
  }
}
`);
