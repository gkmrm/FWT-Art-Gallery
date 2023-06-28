import React from 'react';

import styles from './Image.module.scss';

export type ImageProps = {
  src: string;
  webp?: string;
  src2x?: string;
  webp2x?: string;
  original?: string;
  alt: string;
} & React.HTMLAttributes<HTMLPictureElement>;

// Временное решение, справлю, storybook не подтягивает сам -->
const BASE_API_URL = 'https://internship-front.framework.team/';

const Image: React.FC<ImageProps> = ({
  src,
  webp,
  src2x,
  webp2x,
  original,
  alt,
}) => (
  <picture>
    {webp && (
      <source
        srcSet={`${BASE_API_URL}${webp}`}
        media='(min-width: 600px)'
        type='image/webp'
      />
    )}
    {src2x && (
      <source
        srcSet={`${BASE_API_URL}${src2x}`}
        media='(min-width: 600px)'
        type='image/jpeg'
      />
    )}
    {webp2x && (
      <source
        srcSet={`${BASE_API_URL}${webp2x}`}
        media='(min-width: 600px)'
        type='image/webp'
      />
    )}
    {original && (
      <source
        srcSet={`${BASE_API_URL}${original}`}
        media='(min-width: 600px)'
        type='image/jpeg'
      />
    )}
    <img className={styles.Image} src={`${BASE_API_URL}${src}`} alt={alt} />
  </picture>
);

export default Image;
