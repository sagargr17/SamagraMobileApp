import {CodegenConfig} from '@graphql-codegen/cli';
import {GRAPHQL_ENDPOINT} from './Constants/SamagraConstants/SamagraEndpoints';

const config: CodegenConfig = {
  schema: 'http://api.samagranepal.com/graphql/',
  // documents: ['src/**/*.ts?(x)'],
  documents: [
    '/home/sagar/Documents/Samagra/samagra-mobile-app/GraphQL/Queries/ItemQueries.ts',
  ],

  generates: {
    './src/__generated__/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: false,
};

export default config;
