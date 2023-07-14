import React from 'react';

import cn from 'classnames/bind';
import { Link } from 'react-router-dom';

import { ThemeTypes } from '@hooks/ThemeConext';

import styles from './Link.module.scss';

const cx = cn.bind(styles);

type TLinkProps = {
  theme: ThemeTypes;
  className?: string;
  to: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const Links: React.FC<TLinkProps> = ({
  /**
   * Boolean value for change theme
   */
  theme,
  /**
   * Addition className for Link
   */
  className,
  /**
   * standart Anchor props <a></a>
   */
  to,
  ...others
}) => {
  const classNames = cx(className, 'link', `link_${theme}`);

  return (
    <Link to={to} className={classNames} {...others}>
      {others.children}
    </Link>
  );
};

export default Links;
