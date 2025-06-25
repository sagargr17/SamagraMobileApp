// ReUsable Code for the Autheticate Client
// USECASE : Automation for Repeated calling the authenticated API

import {ApolloClient, InMemoryCache} from '@apollo/client';
import {GRAPHQL_ENDPOINT} from '../../Constants/SamagraConstants/SamagraEndpoints';
import {getTokens} from '../Token/TokenAccess';

async function tokenHandler() {
  const {accessToken} = await getTokens();
  return accessToken;
}

export const GetAuthenticateClient = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  headers: {
    'content-type': 'application/json',
    // Authorization: `Bearer ${tokenHandler() !== null ? tokenHandler() : null}`,
    Authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Im15LWhhcmRjb2RlZC1rZXktaWQiLCJ0eXAiOiJhdCtqd3QifQ.eyJpc3MiOiJodHRwOi8vaWRlbnRpdHkuc2FtYWdyYW5lcGFsLmNvbSIsIm5iZiI6MTc0ODU3MzIzOCwiaWF0IjoxNzQ4NTczMjM4LCJleHAiOjE3NTExNjUyMzgsImF1ZCI6Im1hcmtldHBsYWNlIiwic2NvcGUiOlsibWFya2V0cGxhY2UuYWNjZXNzIiwib3BlbmlkIiwicHJvZmlsZSIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJjdXN0b20iXSwiY2xpZW50X2lkIjoiI3NnYXJhcCoiLCJzdWIiOiI0ZTFlNzcyOC1kZWZhLTQxOTEtOGZkOS03MGRkNmZkMmNhZmMiLCJhdXRoX3RpbWUiOjE3NDg1NzMyMzgsImlkcCI6ImxvY2FsIiwibmFtZSI6InNhZ2FyICIsInByZWZlcnJlZF91c2VybmFtZSI6InNhZ2FyIiwianRpIjoiMEU0MUMzNTgwM0UwREUyMzhGNDE3MDEzMjQ4RTk4NDUifQ.oAWo1dbYf0j3CZBndyxGXvTuFABNdtq4sjrS-vavtY2seqXetwN69dEdzIQrtShG5ILIF0MklfpqdbciwQhOuC9zRNcEndB6jLO_5W2npHwpOIU1Ps6dzOgWRVYT0aZAyOQQvE8hUwpK402de8EFaGbQlO-7-Y3uTbpzrOYOTlw`,
  },
  cache: new InMemoryCache(),
});
