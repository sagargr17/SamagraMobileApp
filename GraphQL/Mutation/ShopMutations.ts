import {gql} from '../../src/__generated__';

// Adding  Shop
export const createNewShop = gql(`mutation createNewShop(
  $shopName: String!
  $aboutShop: String!
  $latitude: Decimal!
  $longitude: Decimal!
  $phoneNumber: String!
  $totalItemsCount: Int!
) {
  createStore(
    store: {
      name: $shopName
      aboutShop: $aboutShop
      longitude: $longitude
      latitude: $latitude
      phoneNumber: $phoneNumber
      totalItemsCount: $totalItemsCount
    }
  ) {
    id
  }
}
`);
