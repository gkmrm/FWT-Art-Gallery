import React, { useCallback, useState } from 'react';

import cn from 'classnames/bind';
import { useLocation, useNavigate } from 'react-router-dom';

import { AuthForm } from '@components/AuthForm';
import { useAuthContext } from '@context/AuthContext';
import { useThemeContext } from '@context/ThemeContext';
import { useFingerprint } from '@hooks/useFingerprint';
import { authApi } from '@store/services/AuthService';
import { Link } from '@ui-components/Link';
import { ModalWrapper } from '@ui-components/ModalWrapper';

import styles from './AuthModal.module.scss';

const cx = cn.bind(styles);

type TAuthModalProps = {
  variant: 'login' | 'signup';
};

const AuthModal: React.FC<TAuthModalProps> = ({ variant }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useThemeContext();
  const { onLogin } = useAuthContext();
  const [isReset, setReset] = useState(false);

  const modalText = {
    login: {
      greeting: 'Welcome back',
      paragraph: "If you don't have an account yet, please ",
      linkText: 'sign up',
      linkPath: '/signup',
    },
    signup: {
      greeting: 'Create your profile',
      paragraph: 'If you already have an account, please ',
      linkText: 'login',
      linkPath: '/login',
    },
  };

  const { linkPath, linkText, paragraph, greeting } = modalText[variant];

  const fingerprint = useFingerprint();

  const [login, { isSuccess: isSuccessLogin }] = authApi.useLoginMutation();

  const [signup, { isSuccess: isSuccessRegister }] =
    authApi.useSignupMutation();

  const onSubmitRegistration = (username: string, password: string) => {
    signup({ username, password, fingerprint });
  };

  const onSubmitLogin = (username: string, password: string) => {
    login({ username, password, fingerprint });
  };

  const onSubmit = variant === 'login' ? onSubmitLogin : onSubmitRegistration;

  const onCloseClick = useCallback(
    () => navigate(location.state.background),
    [location.state.background, navigate]
  );

  React.useEffect(() => {
    if (isSuccessLogin || isSuccessRegister) {
      onLogin();
      setReset(true);
      onCloseClick();
    }
  }, [onLogin, onCloseClick, isSuccessLogin, isSuccessRegister]);

  return (
    <ModalWrapper
      className={cx('authModal', `authModal_${theme}`)}
      isShow
      onClose={onCloseClick}
      theme={theme}
    >
      <div className={cx('authModal__inner', `authModal__inner_${theme}`)}>
        <div className={cx('authModal__img', `authModal__img_${variant}`)} />
        <div
          className={cx(
            'authModal__textBlock',
            `authModal__textBlock_${variant}`
          )}
        >
          <h2 className={cx('authModal__header', `authModal__header_${theme}`)}>
            {greeting}
          </h2>
          <div className={cx('authModal__form')}>
            <AuthForm
              theme={theme}
              variant={variant}
              onCubmit={onSubmit}
              isReset={isReset}
            />
          </div>
          <p
            className={cx(
              'authModal__paragraph',
              `authModal__paragraph_${theme}`
            )}
          >
            {paragraph}
            <Link
              theme={theme}
              className={cx('authModal__link')}
              to={linkPath}
              state={{ background: location.state.background }}
            >
              {linkText}
            </Link>
          </p>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AuthModal;
