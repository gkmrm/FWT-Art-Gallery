import React from 'react';

import cn from 'classnames/bind';

import { ThemeType } from '@context/ThemeConext';

import styles from './Genre.module.scss';

const cx = cn.bind(styles);

type TGenreProps = { theme: ThemeType } & React.HTMLAttributes<HTMLDivElement>;

const Genre: React.FC<TGenreProps> = ({ theme, children }) => (
  <div className={cx('genre', `genre_${theme}`)}>{children}</div>
);

export default Genre;
