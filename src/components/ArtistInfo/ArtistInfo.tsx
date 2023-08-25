import React from 'react';

import cn from 'classnames/bind';

import { ReactComponent as Line } from '@assets/icons/textBlockLine.svg';
import { Accordion } from '@components/Accordion';
import { Container } from '@components/Container';
import { ThemeType } from '@context/ThemeContext';
import { IGenreModel } from '@models/GenreModel';
import { IImageModel } from '@models/PaintModel';
import { AvatarPlaceholder } from '@ui-components/AvatarPlaceholder';
import { Genre } from '@ui-components/Genre';
import { Picture } from '@ui-components/Picture';

import styles from './ArtistInfo.module.scss';

const cx = cn.bind(styles);

type TArtistInfoProps = {
  avatar: IImageModel | null;
  theme: ThemeType;
  name: string;
  year: string;
  description: string;
  genres: IGenreModel[];
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
        {avatar ? (
          <Picture
            {...avatar}
            alt={`${name} - portrait`}
            className={cx('artist__avatar_image')}
          />
        ) : (
          <AvatarPlaceholder
            theme={theme}
            className={cx('artist__avatar_image')}
          />
        )}

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
              <Genre key={item.id} theme={theme}>
                {item.name}
              </Genre>
            ))}
          </div>
        </div>
      </Container>
    </div>
  </div>
);

export default ArtistInfo;
