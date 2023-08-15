import React from 'react';

import cn from 'classnames/bind';

import { ReactComponent as Line } from '@assets/icons/textBlockLine.svg';
import { Accordion } from '@components/Accordion';
import { ThemeType } from '@context/ThemeContext';
import { IGenreModel } from '@store/models/ArtistStaticByIdModel';
import { Genre } from '@ui-components/Genre';

import styles from './ArtistInfoBlock.module.scss';

const cx = cn.bind(styles);

type TArtistInfoBlockProps = {
  theme: ThemeType;
  description: string;
  genres: IGenreModel[];
};

const ArtistInfoBlock: React.FC<TArtistInfoBlockProps> = ({
  theme,
  description,
  genres,
}) => (
  <div className={cx('textBlock', `textBlock_${theme}`)}>
    <Line className={cx('textBlock_line')} />
    <div className={cx('textBlock__accordion')}>
      <Accordion theme={theme} text={description} />
    </div>
    <div className={cx('textBlock__genres')}>
      {genres.map((item) => (
        <Genre key={item.id} theme={theme}>
          {item.name}
        </Genre>
      ))}
    </div>
  </div>
);

export default ArtistInfoBlock;
