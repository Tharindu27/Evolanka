'use client';

import { useEffect, useState } from 'react';
import { getErrorMessage, loginTouristWithApple, loginTouristWithGoogle } from '@/lib/api';

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const APPLE_CLIENT_ID = process.env.NEXT_PUBLIC_APPLE_CLIENT_ID;
const APPLE_REDIRECT_URI = process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI;

const GOOGLE_SCRIPT = 'https://accounts.google.com/gsi/client';
const APPLE_SCRIPT = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';

type GoogleTokenResponse = { access_token?: string; error?: string };

type AppleSignInResult = {
  authorization: { id_token: string };
  user?: { name?: { firstName?: string; lastName?: string } };
};

declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (response: GoogleTokenResponse) => void;
            error_callback: (error: { type: string }) => void;
          }) => { requestAccessToken: () => void };
        };
      };
    };
    AppleID?: {
      auth: {
        init: (config: { clientId: string; scope: string; redirectURI: string; usePopup: boolean }) => void;
        signIn: () => Promise<AppleSignInResult>;
      };
    };
  }
}

const CANCELLED = Symbol('cancelled');

const loadScript = (src: string) =>
  new Promise<void>((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });

type SocialAuthButtonsProps = {
  buttonClassName: string;
  iconClassName: string;
  onSuccess: () => void;
  onError: (message: string) => void;
};

export default function SocialAuthButtons({ buttonClassName, iconClassName, onSuccess, onError }: SocialAuthButtonsProps) {
  const [busy, setBusy] = useState<'google' | 'apple' | null>(null);

  // Scripts are preloaded so the popup can open straight from the click, which browsers require.
  useEffect(() => {
    if (GOOGLE_CLIENT_ID) loadScript(GOOGLE_SCRIPT).catch(() => undefined);
    if (APPLE_CLIENT_ID) {
      loadScript(APPLE_SCRIPT)
        .then(() =>
          window.AppleID?.auth.init({
            clientId: APPLE_CLIENT_ID,
            scope: 'name email',
            redirectURI: APPLE_REDIRECT_URI || window.location.origin,
            usePopup: true,
          }),
        )
        .catch(() => undefined);
    }
  }, []);

  const finish = async (signIn: () => Promise<unknown>) => {
    try {
      await signIn();
      onSuccess();
    } catch (error) {
      setBusy(null);
      if (error !== CANCELLED) onError(getErrorMessage(error));
    }
  };

  const handleGoogle = () => {
    if (!GOOGLE_CLIENT_ID) return onError('Google sign-in is not configured yet.');
    if (!window.google) return onError('Google sign-in is still loading. Please try again.');

    setBusy('google');
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: 'openid email profile',
      callback: (response) => {
        if (!response.access_token) {
          setBusy(null);
          return onError('Google sign-in failed. Please try again.');
        }
        void finish(() => loginTouristWithGoogle(response.access_token as string));
      },
      error_callback: () => setBusy(null),
    });
    client.requestAccessToken();
  };

  const handleApple = () => {
    if (!APPLE_CLIENT_ID) return onError('Apple sign-in is not configured yet.');
    if (!window.AppleID) return onError('Apple sign-in is still loading. Please try again.');

    setBusy('apple');
    void finish(async () => {
      let result: AppleSignInResult;
      try {
        result = await window.AppleID!.auth.signIn();
      } catch (error) {
        const code = (error as { error?: string })?.error;
        throw code === 'popup_closed_by_user' || code === 'user_cancelled_authorize' ? CANCELLED : error;
      }
      const name = [result.user?.name?.firstName, result.user?.name?.lastName].filter(Boolean).join(' ');
      await loginTouristWithApple({ idToken: result.authorization.id_token, name: name || undefined });
    });
  };

  return (
    <>
      <button type="button" disabled={busy !== null} onClick={handleGoogle} className={buttonClassName}>
        <img src="/images/Auth/google.png" alt="Google" className={iconClassName} />
        {busy === 'google' ? 'Connecting...' : 'Continue with Google'}
      </button>
      <button type="button" disabled={busy !== null} onClick={handleApple} className={buttonClassName}>
        <img src="/images/Auth/apple.png" alt="Apple" className={iconClassName} />
        {busy === 'apple' ? 'Connecting...' : 'Continue with Apple'}
      </button>
    </>
  );
}
