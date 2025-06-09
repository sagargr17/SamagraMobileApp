import {gql} from '../../src/__generated__/gql';

export const getSubscribedData = gql(`
  subscription GetData {
  events {
    id
    eventName
    sender {
      username
      profileImageUrl
    }
    data {
      itemRequestReceived {
        id
      }
      itemRequestOfferReceived {
        id
        itemId
        itemRequestId
      }
      orderReceived {
        fullName
        completionDateTime
        isCompleted
        address
        message
        phoneNumber
        price
        quantity
        currency
      }
    }
  }
}
`);
