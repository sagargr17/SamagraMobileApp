import {gql} from '../../src/__generated__';

export const CreateItemRequestMutation =
  gql(`mutation CreateItemRequestMutation{
  createItemRequest{
    id
  }
}
`);

export const acceptMutation = gql(`
mutation($requestId:String!){
  createItemRequestOffer(itemRequestId: $requestId){
    id
  }
}
`);
