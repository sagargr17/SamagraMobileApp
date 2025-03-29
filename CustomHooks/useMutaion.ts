// import {ApolloClient, gql} from '@apollo/client';
// import {useEffect, useState} from 'react';

// interface UseQueryEffectsProps<TVariables> {
//   client: ApolloClient<any>;
//   query: string;
//   variables?: TVariables;
// }

// interface UseQueryEffects<TData, TError> {
//   loading: boolean;
//   data: TData | null;
//   error: TError | null;
// }

// function useGraphQLQuery<
//   TData = any,
//   TVariables = Record<string, never>,
//   TError = Error,
// >(props: UseQueryEffectsProps<TVariables>): UseQueryEffects<TData, TError> {
//   const {client, query, variables} = props;
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState<TData | null>(null);
//   const [error, setError] = useState<TError | null>(null);

//   useEffect(() => {
//     let isMounted = true;

//     async function fetchData() {
//       setLoading(true);
//       setError(null);

//       try {
//         const result = variables
//           ? await client.mutate({
//               mutation: gql(query),
//               variables: variables,
//             })
//           : await client.mutate({
//               mutation: gql(query),
//             });

//         if (isMounted) {
//           setData(result.data);
//           setLoading(false);
//         }
//       } catch (err) {
//         if (isMounted) {
//           setError(err as TError);
//           setLoading(false);
//         }
//       }
//     }

//     fetchData();

//     return () => {
//       isMounted = false;
//     };
//   }, [client, query, JSON.stringify(variables)]);

//   return {loading, data, error};
// }

// export default useGraphQLQuery;
