import React from 'react';

import cn from 'classnames/bind';

import { ThemeType } from '@context/ThemeContext';

import styles from './ArtistNotFound.module.scss';

const cx = cn.bind(styles);

type TArtistNotFoundProps = {
  searchQuary: string;
  theme: ThemeType;
};

const ArtistNotFound: React.FC<TArtistNotFoundProps> = ({
  searchQuary,
  theme,
}) => (
  <span className={cx('notfound')}>
    <p className={cx('notfound__title', `notfound__title_${theme}`)}>
      No matches for
      <span className={cx('notfound__title_query')}>{` ${searchQuary}`}</span>
    </p>
    <p className={cx('notfound__subtitle')}>
      Please try again with a different spelling or keywords.
    </p>
  </span>
);

export default ArtistNotFound;
