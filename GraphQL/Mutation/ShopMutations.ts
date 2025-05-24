import {gql} from '../../src/__generated__';

// Adding  Shop
export const createNewShop = gql(`mutation createNewShop (
  $shopName: String!
  $aboutShop: String!
  $coverImageUrl: String!
  $profileImageUrl: String!
  $location: String!
  $phoneNumber: String!
) {
  createShop(
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
