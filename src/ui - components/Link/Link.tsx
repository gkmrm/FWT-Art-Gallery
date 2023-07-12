import React from 'react';

import cn from 'classnames/bind';

import { ThemeTypes } from 'src/context/ThemeConext';

import styles from './Link.module.scss';

const cx = cn.bind(styles);

type TLinkProps = {
  theme: ThemeTypes;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const Link: React.FC<TLinkProps> = ({
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
  ...others
}) => {
  const classNames = cx(className, 'link', `link_${theme}`);

  return (
    <a
      className={classNames}
      href={others.href}
      target='_blank'
      rel='noreferrer'
      {...others}
    >
      {others.children}
    </a>
  );
};

export default Link;
