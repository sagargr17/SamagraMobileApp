import {gql} from '@apollo/client';

export const getPublicItems = gql`
  query {
    getPublicItems {
      nodes {
        name
      }
    }
  }
`;
