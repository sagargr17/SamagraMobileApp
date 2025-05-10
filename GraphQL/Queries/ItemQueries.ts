import {gql} from '../../src/__generated__/gql';

export const getPublicItems = gql(`
  query GetPublicItems{
    getPublicItems {
      nodes {
        name
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
