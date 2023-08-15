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

const AuthModal: React.FC<TAuthModalProps> = ({ variant }) => {
  const navigate = useNavigate();
  const { theme } = useThemeContext();

  const { linkPath, linkText, paragraph, greeting } = modalText[variant];

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
            {greeting}
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
            {paragraph}
            {/* todo background прокидывать */}
            <Link theme={theme} to={linkPath} className={cx('authModal__link')}>
              {linkText}
            </Link>
          </p>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AuthModal;
