import {gql} from '../../src/__generated__';

// Adding  Shop Items
export const createNewProduct = gql(`
 mutation createNewProduct(
  $name: String!
  $price: Decimal!
  $description: String!
  $categoryId: String!
  $stockQuantity: Int!
  $imageUrls: [String!]!
  $unit: String!
  $location: String!
) {
  createProduct(
    product: {
      name: $name
      price: $price
      description: $description
      categoryId: $categoryId
      stockQuantity: $stockQuantity
      imageUrls: $imageUrls
      currencyCode: "NPR"
      location: $location
      unit: $unit
      condition: "new"
    }
  ) {
    id
  }
}
  `);

export const updateStock = gql(`
mutation UpdateStock($itemId: String!, $updatedQuantity: Int!) {
  updateStockQuantity(itemId: $itemId, quantity: $updatedQuantity)
}
`);
