import React from 'react';

import cn from 'classnames/bind';

import { Card, TCardProps } from '@components/Card';

import styles from './CardGrid.module.scss';

const cx = cn.bind(styles);

type TCardGridProps = {
  /**
   * Array of TCardProps from API
   */
  arrayData: TCardProps[];
};

const CardGrid: React.FC<TCardGridProps> = ({ arrayData }) => (
  <div className={cx('CardGrid')}>
    {arrayData.map((item) => (
      <Card
        key={item.id}
        title={item.title}
        subtitle={item.subtitle}
        image={item.image}
        onClick={item.onClick}
        isDarkTheme={item.isDarkTheme}
      />
    ))}
  </div>
);

export default CardGrid;
