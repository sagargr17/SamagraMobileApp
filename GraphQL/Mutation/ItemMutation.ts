import {gql} from '../../src/__generated__';

// Adding  Shop Items
export const addItems = gql(`
 mutation addItems (
  $name: String!
  $price: Decimal!
  $description: String!
  $shopId: String!
  $categoryId: String!
  $stockQuantity: Int!
  $imageUrls: [String!]!
  $unit: String!
  $currency: String!
  $location: String!
  $prefrenceItemName: [String!]!
  $isCondition: String!

) {
  addProduct(
    product: {
      name: $name
      price: $price
      description: $description
      shopId: $shopId
      categoryId: $categoryId
      stockQuantity: $stockQuantity
      imageUrls: $imageUrls
      currency: $currency
      location: $location
      unit: $unit
      preferredItemNames: $prefrenceItemName
      condition: $isCondition
      itemId: "lksajdlajsldkjasldkj"
    }
  ) {
    id
  }
}
  `);
