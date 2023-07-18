import React from 'react';

import { ThemeTypes } from '@hooks/ThemeConext';
import cn from 'classnames/bind';

import styles from './Genre.module.scss';

const cx = cn.bind(styles);

type TGenreProps = { theme: ThemeTypes } & React.HTMLAttributes<HTMLDivElement>;

const Genre: React.FC<TGenreProps> = ({ theme, children }) => (
  <div className={cx('genre', `genre_${theme}`)}>{children}</div>
);

export default Genre;
