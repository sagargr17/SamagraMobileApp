import React, {useEffect, useRef} from 'react';
import {clearTokens, getTokens} from '../Client/Token/TokenAccess';
import {isTokenExpired} from '../Client/Token/TokeValidator';
import {accessTokenGenerator} from '../Client/Token/AccessTokenGenerator';

type useTokenRefreshTimer = () => React.FC;
export function useTokenRefreshTimer(refreshingTime: number) {
  const intervalIdRef = useRef<number | null>(null);

  useEffect(() => {
    async function startTimer() {
      const {refreshToken, userStatus} = await getTokens();
      console.log('Refreshing the Token', refreshingTime);

      if (userStatus === 'true')
        if ((await isTokenExpired()) === true) {
          if (typeof window !== 'undefined') {
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
