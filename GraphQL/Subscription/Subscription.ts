import {gql} from '../../src/__generated__/gql';

export const getSubscribedData = gql(`
  subscription GetData {
  events {
    id
    eventName
    sender{
      username
    }

   
    data {
      itemRequestReceived {
        id
        name
        categoryId
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
        itemName
        dateTime
      }
    }
  }
}

`);
