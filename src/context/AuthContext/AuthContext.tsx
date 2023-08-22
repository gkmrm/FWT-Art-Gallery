import React, { createContext, useMemo, useState } from 'react';

import { AuthResponse } from '@store/models/AuthModel';

export type AuthType = boolean;

export type AuthProps = {
  isAuth: AuthType;
  onLogin: () => void;
  onLogout: () => void;
};

export const authDefaultValue: AuthProps = {
  isAuth: false,
  onLogin: () => true,
  onLogout: () => false,
};

export const AuthContext = createContext<AuthProps>(authDefaultValue);

interface Auth {
  get: () => { accessToken: string | null; refreshToken: string | null };
  set: (data: AuthResponse) => void;
  remove: () => void;
}

export const authLocalStorage: Auth = {
  get: () => {
    const accessToken = localStorage.getItem('jwt-access');
    const refreshToken = localStorage.getItem('jwt-refresh');

    return { accessToken, refreshToken };
  },
  set: (data: AuthResponse) => {
    localStorage.setItem('jwt-access', data.accessToken);
    localStorage.setItem('jwt-refresh', data.refreshToken);
  },
  remove: () => {
    localStorage.removeItem('jwt-access');
    localStorage.removeItem('jwt-refresh');
  },
};

const checkAuth = (): AuthType => {
  const authStorage = authLocalStorage.get().accessToken;

  if (authStorage) {
    return true;
  }

  return false;
};

type TAuthProvider = React.HTMLAttributes<HTMLDivElement>;

const AuthProvider: React.FC<TAuthProvider> = ({ children }) => {
  const [isAuth, setAuth] = useState<AuthType>(checkAuth());

  const onLogin = () => {
    setAuth(true);
  };

  const onLogout = () => {
    setAuth(false);
    authLocalStorage.remove();
  };

  const themeValue = useMemo(
    () => ({
      isAuth,
      onLogin,
      onLogout,
    }),
    [isAuth]
  );

  return (
    <AuthContext.Provider value={themeValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
