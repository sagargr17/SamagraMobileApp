import {CLIENT_ID, CLIENT_SECRET} from '@env';
import {config} from '../../Constants/SamagraConstants/Configs/RefreshTokenConfig';

type accessTokenGenerator = (refreshToken: string) => void;
//  {
//   accessToken: string;
//   refreshToken: string;
//   expiresIn: number;
// };

export const accessTokenGenerator = async (refreshToken: string) => {
  console.log('RefreshToken', refreshToken);
  

  try {
    const response = await fetch(`${config.issuer}/connect/token`, {
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

    console.log('LOGGGg', response);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error while Refreshing:', errorData);
      throw new Error(`Token refresh failed with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('DATAAAAa', data);

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token || refreshToken,
      expiresIn: data.expires_in,
    };
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
};
