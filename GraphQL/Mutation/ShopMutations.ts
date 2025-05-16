import {gql} from '../../src/__generated__';

// Adding  Shop
export const addShop = gql(`mutation addShop (
  $shopName: String!
  $aboutShop: String!
  $coverImageUrl: String!
  $profileImageUrl: String!
  $location: String!
  $phoneNumber: String!
) {
  addShop(
    shop: {
      name: $shopName
      aboutShop: $aboutShop
      coverImageUrl: $coverImageUrl
      profileImageUrl: $profileImageUrl
      location: $location
      phoneNumber: $phoneNumber
    }
  ) {
    id
  }
}
`);
