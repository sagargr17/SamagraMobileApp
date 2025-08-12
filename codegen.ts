import {CodegenConfig} from '@graphql-codegen/cli';
import {GRAPHQL_ENDPOINT} from './Constants/SamagraConstants/SamagraEndpoints';

const config: CodegenConfig = {
  schema: 'http://api.samagranepal.com/graphql/',
  // documents: ['src/**/*.ts?(x)'],
  documents: [
    '/home/arniko/Documents/Projects/SoftwareDevelopment/Samagra/samagra-mobile-app/GraphQL/Queries/CheckoutQueries.ts',
    '/home/arniko/Documents/Projects/SoftwareDevelopment/Samagra/samagra-mobile-app/GraphQL/Queries/ItemQueries.ts',
    '/home/arniko/Documents/Projects/SoftwareDevelopment/Samagra/samagra-mobile-app/GraphQL/Queries/OrdersQueries.ts',

    '/home/arniko/Documents/Projects/SoftwareDevelopment/Samagra/samagra-mobile-app/GraphQL/Queries/UserQueries.ts',

    '/home/arniko/Documents/Projects/SoftwareDevelopment/Samagra/samagra-mobile-app/GraphQL/Mutation/CheckOutMutation.ts',
    '/home/arniko/Documents/Projects/SoftwareDevelopment/Samagra/samagra-mobile-app/GraphQL/Mutation/ItemMutation.ts',
    '/home/arniko/Documents/Projects/SoftwareDevelopment/Samagra/samagra-mobile-app/GraphQL/Mutation/ItemRequestMutation.ts',
    '/home/arniko/Documents/Projects/SoftwareDevelopment/Samagra/samagra-mobile-app/GraphQL/Mutation/UserMutation.ts',

    '/home/arniko/Documents/Projects/SoftwareDevelopment/Samagra/samagra-mobile-app/GraphQL/Subscription/Subscription.ts',
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
