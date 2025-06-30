import {gql} from '../../src/__generated__/gql';

// Public Items
export const getPublicItems = gql(`
query GetPublicItems($endCursor: String) {
  getPublicItems(after: $endCursor) {
    pageInfo {
      startCursor
      endCursor
      hasNextPage
    }
    edges {
      node {
        id
        name
        imageUrls
        price
        starRating
      }
    }
  }
}
`);

export const getPublicItemsById = gql(`
query GetPublicItemsById($id: String!) {
  getPublicItems(id: $id) {
    nodes {
      id
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
         name
        user {
          username
        }
        phoneNumber
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
        id
        name
      }
      imageUrls
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

export const GetItemsByShopId = gql(`
  query GetPersonalItemsByShopId($shopId: String!) {
  getItems(shopId: $shopId) {
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
        id
        name
      }
    }
  }
}
  `);
