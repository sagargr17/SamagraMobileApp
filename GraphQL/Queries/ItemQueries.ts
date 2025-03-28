import {DocumentNode} from 'graphql';
// import gql from 'graphql-tag';
import {gql} from '../../src/__generated__/gql';

export const getPublicItems = gql(`
  query GetPublicItems{
    getPublicItems {
      nodes {
        name
      }
    }
  }
`);

export const getPublicItemsById = gql(`
query GetPublicItemsById($id: String!) {
  getPublicItems(id: $id) {
    nodes {
      name
    }
  }
}
`);
