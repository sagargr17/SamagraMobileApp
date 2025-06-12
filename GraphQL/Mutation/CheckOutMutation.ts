import {gql} from '../../src/__generated__';

// Adding  Shop Items
export const createOrderMutation = gql(`
 mutation createOrderMutation(
  $fullName: String!
  $address: String!
  $itemId: String!
  $phoneNumber: String!
  $quantity: Int!
  $message: String!
) {
  orderItem(
    fullName: $fullName
    address: $address
    itemId: $itemId
    phoneNumber: $phoneNumber
    quantity: $quantity
    message: $message
  )
}
  `);

export const addItemToBasket = gql(`
mutation addItemToBasketeMutation ($itemID: String!) {
  addItemToBasket(id: $itemID) {
    id
  }
}
`);
