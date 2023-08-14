import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
} from 'react';

export type AuthType = boolean;

export type AuthProps = {
  isAuth: AuthType;
  setAuth: Dispatch<SetStateAction<AuthType>>;
};

export const authDefaultValue: AuthProps = {
  isAuth: false,
  setAuth: () => false,
};

export const AuthContext = createContext<AuthProps>(authDefaultValue);

const getAuth = (): AuthType => {
  const authLocalStorage = localStorage.getItem('auth');

  if (authLocalStorage) {
    return true;
  }

  return false;
};

type TAuthProvider = React.HTMLAttributes<HTMLDivElement>;

const AuthProvider: React.FC<TAuthProvider> = ({ children }) => {
  const [isAuth, setAuth] = useState<AuthType>(getAuth);

  const themeValue = useMemo(
    () => ({
      isAuth,
      setAuth,
    }),
    [isAuth, setAuth]
  );

  return (
    <AuthContext.Provider value={themeValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
