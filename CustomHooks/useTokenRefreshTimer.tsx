import {useEffect, useRef} from 'react';
import {clearTokens, getTokens} from '../Client/Token/TokenAccess';
import {isTokenExpired} from '../Client/Token/TokeValidator';
import {accessTokenGenerator} from '../Client/Token/AccessTokenGenerator';

export async function useTokenRefreshTimer(refreshingTime: number) {
  const intervalIdRef = useRef<number | null>(null);
  const {userStatus} = await getTokens();
  if (userStatus === 'true')
    useEffect(() => {
      async function startTimer() {
        console.log('Refreshing the Token', refreshingTime);
        const {refreshToken, userStatus} = await getTokens();

        if (userStatus === 'true')
          if ((await isTokenExpired()) === true) {
            if (typeof window !== 'undefined') {
              // window is available, use it.
              intervalIdRef.current = window.setInterval(async () => {
                console.log('Time Refreshingggg', refreshingTime);

                if (refreshToken) {
                  console.log('Refreshing', refreshingTime);
                  accessTokenGenerator(refreshToken);
                } else {
                  await clearTokens();
                }
              }, refreshingTime);
            } else {
              console.log('Nno Window FOund');
            }
          }
      }

      startTimer();

      return () => {
        if (intervalIdRef.current && typeof window !== 'undefined') {
          window.clearInterval(intervalIdRef.current);
          intervalIdRef.current = null;
        }
      };
    }, [refreshingTime]);
}

// ... your other functions
