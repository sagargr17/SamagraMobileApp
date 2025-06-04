import {gql} from '../../src/__generated__/gql';

export const getSubscribedData = gql(`
    subscription GetData{
        events{
            id
            eventName
            data{
            itemRequestCreated{
                id
                itemRequest{
                    id
            }
            }
            }
    }
} 
`);
