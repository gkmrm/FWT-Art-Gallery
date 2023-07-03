import React from 'react';

import cn from 'classnames/bind';

import styles from './Image.module.scss';

const cx = cn.bind(styles);

export type ImageProps = {
  /**
   * Source of img - MAIN
   */
  src: string;
  /**
   * Source of webp img
   */
  webp?: string;
  /**
   * Source of src2x img for Retina display
   */
  src2x?: string;
  /**
   * Source of webp2x img for Retina display
   */
  webp2x?: string;
  /**
   * Source of original img
   */
  original?: string;
  /**
   * ALT text for img
   */
  alt: string;
  /**
   * Addition className for Image
   */
  className?: string;
} & React.HTMLAttributes<HTMLPictureElement>;

// Временное решение, исправлю, storybook не подтягивает сам -->
const BASE_API_URL = 'https://internship-front.framework.team';

const Image: React.FC<ImageProps> = ({
  src,
  webp,
  src2x,
  webp2x,
  original,
  alt,
  className,
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
    <img
      className={cx('Image', className)}
      src={`${BASE_API_URL}${src}`}
      alt={alt}
    />
  </picture>
);

export default Image;
