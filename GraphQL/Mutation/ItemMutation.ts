import {gql} from '../../src/__generated__';

// Adding  Shop Items
export const createNewProduct = gql(`
 mutation createNewProduct(
  $name: String!
  $price: Decimal!
  $description: String!
  $shopId: String!
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
      shopId: $shopId
      categoryId: $categoryId
      stockQuantity: $stockQuantity
      imageUrls: $imageUrls
      currency: "रु"
      location: $location
      unit: $unit
      condition: "new"
    }
  ) {
    id
  }
}
  `);
