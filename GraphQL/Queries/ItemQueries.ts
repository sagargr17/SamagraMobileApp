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

// public Items on the basis of by ID
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

// All Personal Items
export const getAllPersonalItems = gql(`
query GetAllPersonalItems($after: String) {
  getItems(after: $after) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }

    edges {
      node {
        id
        name
        price
        starRating
        imageUrls
        stockQuantity
        isProduct
      }
    }
  }
}
`);

// Items accordig to the shop
// export const GetItemsByShopId = gql(`
//   query GetPersonalItemsByShopId($shopId: String!, $after:String) {
//   getItems(shopId: $shopId, after: $after) {
//     pageInfo {
//       hasNextPage
//       hasPreviousPage
//       startCursor
//       endCursor
//     }

//     edges {
//       node {
//         id
//         name
//         price
//         isProduct
//         starRating
//         stockQuantity
//         imageUrls
//       }
//     }
//   }
// }
//   `);

// Search Queries Api
export const GetPublicItemsBySearchString = gql(`
  query GetPublicItemsBySearch($searchString: String) {
  getPublicItems(searchString: $searchString) {
    pageInfo {
      hasNextPage
      endCursor
    }

    edges {
      node {
        name
        id
        imageUrls
        price
        isProduct
        stockQuantity
       
      }
    }
  }
}

`);

// GetPrivateItems
export const GetPrivateItemsBySearchString = gql(`
 query GetPrivateItemsBySearch($searchString: String) {
  getItems(name: $searchString) {
    pageInfo {
      hasNextPage
      endCursor
    }

    edges {
      node {
        name
        id
        imageUrls
        price
        isProduct
        stockQuantity
      }
    }
  }
}
`);
