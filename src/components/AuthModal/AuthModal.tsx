import React from 'react';

import cn from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import { ThemeType } from '@context/ThemeConext';
import { Button } from '@ui-components/Button';
import { Link } from '@ui-components/Link';
import { Modal } from '@ui-components/Modal';

import styles from './AuthModal.module.scss';

const cx = cn.bind(styles);

type TAuthModalProps = {
  theme: ThemeType;
  variant: 'login' | 'signup';
};

const AuthModal: React.FC<TAuthModalProps> = ({ theme, variant }) => {
  const navigate = useNavigate();

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
          <h2 className={cx('authModal__header')}>Welcome back</h2>
          <div className={cx('authModal__form')}>
            <div>тут email</div>
            <div>тут password</div>
            <Button variant='default' onClick={() => {}}>
              log in
            </Button>
          </div>
          <p className={cx('authModal__paragraph')}>
            If you don&apos;t have an account yet, please{' '}
            <Link theme={theme} to='/signup' className={cx('authModal__link')}>
              sign up
            </Link>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;
