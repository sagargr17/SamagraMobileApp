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
    Authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Im15LWhhcmRjb2RlZC1rZXktaWQiLCJ0eXAiOiJhdCtqd3QifQ.eyJpc3MiOiJodHRwOi8vaWRlbnRpdHkuc2FtYWdyYW5lcGFsLmNvbSIsIm5iZiI6MTc0ODU5NDcwMiwiaWF0IjoxNzQ4NTk0NzAyLCJleHAiOjE3NTExODY3MDIsImF1ZCI6Im1hcmtldHBsYWNlIiwic2NvcGUiOlsibWFya2V0cGxhY2UuYWNjZXNzIiwib3BlbmlkIiwicHJvZmlsZSIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJjdXN0b20iXSwiY2xpZW50X2lkIjoiI3NnYXJhcCoiLCJzdWIiOiI0ZTFlNzcyOC1kZWZhLTQxOTEtOGZkOS03MGRkNmZkMmNhZmMiLCJhdXRoX3RpbWUiOjE3NDg1OTQ3MDIsImlkcCI6ImxvY2FsIiwibmFtZSI6InNhZ2FyICIsInByZWZlcnJlZF91c2VybmFtZSI6InNhZ2FyIiwianRpIjoiMURDNENGRURBMDM1MjZGNERCOEI3RTVDRDk4N0YxRDMifQ.Gcq5xW60H8BOsVJyWNA2SSd4iqidTVRYVacJZ9SyzMUnJgSogfN8i1pnbYdhdnx6-7qBavj1Qv7ZyuavX9tXG6pdhPmEWqtQDI7vPkC3DdAcK0Q_uVrTByvSk9i7QNS3NCjohQk6JbGruHa5NgOMqwmu4_1b61QCnOyJ5GfmUi0`,
  },
  cache: new InMemoryCache(),
});
