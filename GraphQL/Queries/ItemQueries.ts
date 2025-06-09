import {gql} from '../../src/__generated__/gql';

// Public Items
export const getPublicItems = gql(`
query GetPublicItems {
  getPublicItems {
    nodes {
      id
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
      imageUrls
      price
      description
      stockQuantity
      description
      starRating
      shop {
        id
        aboutShop
        stars {
          stars
        }
      }
      comments {
        commentString
        user {
          username
          profileImageUrl
        }
      }
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
export const getPersonalItems = gql(`
query GetPersonalItems {
  getItems {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    nodes {
      id
      name
      price
      starRating
      stockQuantity
      shop {
        name
      }
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
