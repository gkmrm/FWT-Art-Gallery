import React from 'react';

import cn from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import { AuthForm } from '@components/AuthForm';
import { useThemeContext } from '@context/ThemeConext';
import { Link } from '@ui-components/Link';
import { Modal } from '@ui-components/Modal';

import styles from './AuthModal.module.scss';

const cx = cn.bind(styles);

type TAuthModalProps = {
  variant: 'login' | 'signup';
};

const AuthModal: React.FC<TAuthModalProps> = ({ variant }) => {
  const navigate = useNavigate();
  const { theme } = useThemeContext();

  const headerText =
    variant === 'login' ? 'Welcome back' : 'Create your profile';

  const paragraphText =
    variant === 'login'
      ? "If you don't have an account yet, please "
      : 'If you already have an account, please ';

  const linkText = variant === 'login' ? 'sign up' : 'log in';

  const linkTo = variant === 'login' ? '/signup' : '/login';

  return (
    <Modal isShow onHide={() => navigate(-1)} theme={theme}>
      <div
        className={cx(
          'authModal',
          `authModal__${variant}`,
          `authModal_${theme}`
        )}
      >
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
            <Link theme={theme} to={linkTo} className={cx('authModal__link')}>
              {linkText}
            </Link>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;
