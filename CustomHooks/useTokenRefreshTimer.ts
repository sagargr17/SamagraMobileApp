import React, {useEffect, useRef, useState} from 'react';
import {clearTokens, getTokens} from '../client/Token/TokenAccess';
import {isTokenExpired} from '../client/Token/TokeValidator';
import {accessTokenGenerator} from '../client/Token/AccessTokenGenerator';

type useTokenRefreshTimer = () => React.FC;
export function useTokenRefreshTimer(refreshingTime: number) {
  const intervalIdRef = useRef<number | null>(null);

  useEffect(() => {
    async function startTimer() {
      const {refreshToken, userStatus, accessToken} = await getTokens();
      // console.log('Refreshing the Token', refreshingTime, accessToken);

      if (userStatus === 'true')
        if ((await isTokenExpired()) === true) {
          if (typeof window !== 'undefined') {
            intervalIdRef.current = window.setInterval(async () => {
              if (refreshToken) {
                let result = await accessTokenGenerator(refreshToken);
                return result;
              } else {
                await clearTokens();
              }
            }, refreshingTime);
          } else {
            console.log('No Window FOund');
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
  return 200;
}
