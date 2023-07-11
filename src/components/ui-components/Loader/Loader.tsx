import React from 'react';

import classNames from 'classnames';

import styles from './Loader.module.scss';

export enum LoaderSize {
  s = 's',
  m = 'm',
  l = 'l',
}

export type LoaderProps = {
  /**
   * Loader has 3 sizes 's' = 20px | 'l' = 40px | 'm' = 60px
   * Inside the component, an enum is exported with the dimensions of the Loader
   */
  size?: LoaderSize;
  /**
   * Additional clases for CSS
   */
  className?: string;
};

// TODO Сделать по макету
// Сделал пока самый простой, чтобы протестировать вместе с получением данных из RTK Query

const Loader: React.FC<LoaderProps> = ({ size = 'm', className }) => (
  <div className={classNames(styles.loader, styles[size], className)} />
);

export default Loader;
