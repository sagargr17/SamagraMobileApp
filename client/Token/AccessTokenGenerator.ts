import {CLIENT_ID, CLIENT_SECRET} from '@env';
import {refreshTokneConfig} from '../../Constants/SamagraConstants/Configs/RefreshTokenConfig';
import {saveTokens} from './Authenticator';

type accessTokenGenerator = (refreshToken: string) => void | number;

export const accessTokenGenerator = async (refreshToken: string) => {
  try {
    const response = await fetch(`${refreshTokneConfig.issuer}/connect/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }).toString(),
    });

    console.log('SuccessFull Refreshing:', response);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error while Refreshing:', errorData);
      throw new Error(`Token refresh failed with status: ${response.status}`);
    }

    const data = await response.json();
    await saveTokens(data);
  } catch (error) {
    console.error('Error refreshing token:', error);
    return 400;
  }
};
