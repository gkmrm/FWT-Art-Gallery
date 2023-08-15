import React from 'react';

import cn from 'classnames/bind';

import { Container } from '@components/Container';
import { ThemeType } from '@context/ThemeContext';
import { IGenreModel } from '@store/models/ArtistStaticByIdModel';
import { IImage } from '@store/models/PaintModel';
import { AvatarPlaceholder } from '@ui-components/AvatarPlaceholder';
import { Picture } from '@ui-components/Picture';

import styles from './ArtistInfo.module.scss';
import ArtistInfoBlock from './ArtistInfoBlock';

const cx = cn.bind(styles);

type TArtistInfoProps = {
  avatar: IImage | undefined;
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
}) => {
  const avatarImage = avatar ? (
    <Picture
      {...avatar}
      alt={`${name} - portrait`}
      className={cx('artist__avatar_image')}
    />
  ) : (
    <AvatarPlaceholder theme={theme} className={cx('artist__avatar_image')} />
  );

  return (
    <div className={cx('artist', `artist_${theme}`)}>
      <div className={cx('artist__wrapper')}>
        <div className={cx('artist__avatar')}>
          {avatarImage}
          <div
            className={cx(
              'artist__avatar_text',
              `artist__avatar_text_${theme}`
            )}
          >
            <div className={cx('artist__year')}>{year}</div>
            <div className={cx('artist__name', `artist__name_${theme}`)}>
              {name}
            </div>
          </div>
        </div>
        <Container className={cx('artist__container')}>
          <ArtistInfoBlock
            theme={theme}
            description={description}
            genres={genres}
          />
        </Container>
      </div>
    </div>
  );
};

export default ArtistInfo;
