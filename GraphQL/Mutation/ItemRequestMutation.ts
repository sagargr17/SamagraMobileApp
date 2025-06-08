import {gql} from '../../src/__generated__';

export const CreateItemRequestMutation =
  gql(`mutation CreateItemRequestMutation{
  createItemRequest{
    id
  }
}
`);

export const createItemRequestOfferMutation = gql(`
mutation createItemRequestOfferMutation($requestId: String!, $itemId:String!) {
  createItemRequestOffer(itemRequestId: $requestId, itemId: $itemId) {
    id
  }
}
`);
