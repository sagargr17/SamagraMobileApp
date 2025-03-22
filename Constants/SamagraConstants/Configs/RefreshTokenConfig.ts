import {CLIENT_ID, CLIENT_SECRET} from '@env';

export const config = {
  issuer: 'http://identity.samagranepal.com',
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUrl: 'app.newequilibria.com:/oauth2redirect',
  grantTypes: ['authorization_code'],
  scopes: ['marketplace.access', 'openid', 'offline_access', 'profile'],
  usePKCE: true,
};
