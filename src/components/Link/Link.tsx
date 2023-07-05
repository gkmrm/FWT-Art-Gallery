import React from 'react';

import cn from 'classnames/bind';

import styles from './Link.module.scss';

const cx = cn.bind(styles);

type TLinkProps = {
  isDarkTheme: boolean;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const Link: React.FC<TLinkProps> = ({
  /**
   * Boolean value for change theme
   */
  isDarkTheme,
  /**
   * ReactNode
   */
  children,
  /**
   * Addition className for Link
   */
  className,
  /**
   * standart Anchor props <a></a>
   */
  ...other
}) => {
  const classNames = cx(className, 'Link', { Link_dark: isDarkTheme });

  return (
    <a
      className={classNames}
      href={other.href}
      target='_blank'
      rel='noreferrer'
    >
      {children}
    </a>
  );
};

export default Link;
