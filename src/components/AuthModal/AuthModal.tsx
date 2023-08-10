import React from 'react';

import cn from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import { AuthForm } from '@components/AuthForm';
import { useThemeContext } from '@context/ThemeContext';
import { Link } from '@ui-components/Link';
import { ModalWrapper } from '@ui-components/ModalWrapper';

import styles from './AuthModal.module.scss';

const cx = cn.bind(styles);

type TAuthModalProps = {
  variant: 'login' | 'signup';
};

const AuthModal: React.FC<TAuthModalProps> = ({ variant }) => {
  const navigate = useNavigate();
  const { theme } = useThemeContext();

  const text = {
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

  const headerText =
    variant === 'login' ? text.login.greeting : text.signup.greeting;

  const paragraphText =
    variant === 'login' ? text.login.paragraph : text.signup.paragraph;

  const linkText =
    variant === 'login' ? text.login.linkText : text.signup.linkText;

  const linkTo =
    variant === 'login' ? text.login.linkPath : text.signup.linkPath;

  return (
    <ModalWrapper
      className={cx('authModal', `authModal_${theme}`)}
      isShow
      onClose={() => navigate(-1)}
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
            {headerText}
          </h2>
          <div className={cx('authModal__form')}>
            <AuthForm theme={theme} variant={variant} />
          </div>
          <p
            className={cx(
              'authModal__paragraph',
              `authModal__paragraph_${theme}`
            )}
          >
            {paragraphText}
            {/* todo background прокидывать */}
            <Link theme={theme} to={linkTo} className={cx('authModal__link')}>
              {linkText}
            </Link>
          </p>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AuthModal;
