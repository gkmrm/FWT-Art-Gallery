import React from 'react';

import cn from 'classnames/bind';

import styles from './Picture.module.scss';

const cx = cn.bind(styles);

export type TPictureProps = {
  /**
   * Source of img - MAIN
   */
  src?: string;
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
  alt: string;
  className?: string;
} & React.HTMLAttributes<HTMLPictureElement>;

const BASE_API_URL = process.env.REACT_APP_BASE_URL;

const Picture: React.FC<TPictureProps> = ({
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
        media='(min-width: 280px)'
        type='image/webp'
      />
    )}
    {src2x && (
      <source
        srcSet={`${BASE_API_URL}${src2x}`}
        media='(min-width: 280px)'
        type='image/jpeg'
      />
    )}
    {webp2x && (
      <source
        srcSet={`${BASE_API_URL}${webp2x}`}
        media='(min-width: 280px)'
        type='image/webp'
      />
    )}
    {original && (
      <source
        srcSet={`${BASE_API_URL}${original}`}
        media='(min-width: 280px)'
        type='image/jpeg'
      />
    )}
    <img
      className={cx('picture', className)}
      src={`${BASE_API_URL}${src}`}
      alt={alt}
    />
  </picture>
);

export default Picture;
