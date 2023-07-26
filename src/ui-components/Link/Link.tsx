import React from 'react';

import cn from 'classnames/bind';
import { Link, LinkProps } from 'react-router-dom';

import { ThemeType } from 'src/context/ThemeConext';

import styles from './Link.module.scss';

const cx = cn.bind(styles);

type TLinkProps = {
  theme: ThemeType;
} & LinkProps;

const Links: React.FC<TLinkProps> = ({ theme, className, to, ...others }) => {
  const classNames = cx(className, 'link', `link_${theme}`);

  return (
    <Link to={to} className={classNames} {...others}>
      {others.children}
    </Link>
  );
};

export default Links;
