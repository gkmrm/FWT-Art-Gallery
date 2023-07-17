import React from 'react';

import cn from 'classnames/bind';

import { ReactComponent as Line } from '@assets/icons/textBlockLine.svg';
import { Accordion } from '@components/Accordion';
import { Container } from '@components/Container';
import { Genre } from '@components/ui-components/Genre';
import { Picture } from '@components/ui-components/Picture';
import { ThemeTypes } from '@hooks/ThemeConext';
import { IGenre } from '@store/models/ArtistStaticByIdModel';
import { IImage } from '@store/models/PaintModel';

import styles from './ArtistInfo.module.scss';

const cx = cn.bind(styles);

type TArtistInfoProps = {
  avatar: IImage;
  theme: ThemeTypes;
  name: string;
  year: string;
  description: string;
  genres: IGenre[];
} & React.HTMLAttributes<HTMLDivElement>;

const ArtistInfo: React.FC<TArtistInfoProps> = ({
  avatar,
  theme,
  name,
  year,
  description,
  genres,
}) => (
  <div className={cx('artist', `artist_${theme}`)}>
    <div className={cx('artist__wrapper')}>
      <div className={cx('artist__avatar')}>
        <Picture
          {...avatar}
          alt={`${name} - portrait`}
          className={cx('artist__avatar_image')}
        />
        <div
          className={cx('artist__avatar_text', `artist__avatar_text_${theme}`)}
        >
          <div className={cx('artist__year')}>{year}</div>
          <div className={cx('artist__name', `artist__name_${theme}`)}>
            {name}
          </div>
        </div>
      </div>
      <Container className={cx('artist__container')}>
        <div className={cx('artist__textBlock', `artist__textBlock_${theme}`)}>
          <Line className={cx('artist__textBlock_line')} />
          <div className={cx('artist__accordion')}>
            <Accordion theme={theme} text={description} />
          </div>
          <div className={cx('artist__genres')}>
            {genres.map((item) => (
              <Genre theme={theme}>{item.name}</Genre>
            ))}
          </div>
        </div>
      </Container>
    </div>
  </div>
);

export default ArtistInfo;
