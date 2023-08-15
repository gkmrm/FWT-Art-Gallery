import React from 'react';

import cn from 'classnames/bind';

import { ThemeType } from '@context/ThemeContext';

import styles from './MissPaintMessage.module.scss';

const cx = cn.bind(styles);

type TMissPaintMessageProps = {
  theme: ThemeType;
};

const MissPaintMessage: React.FC<TMissPaintMessageProps> = ({ theme }) => (
  <div className={cx('message')}>
    <div className={cx('message__stripe', `message__stripe_${theme}`)} />
    <p className={cx('message__text', `message__text_${theme}`)}>
      The paintings of this artist have not been uploaded yet.
    </p>
  </div>
);

export default MissPaintMessage;
