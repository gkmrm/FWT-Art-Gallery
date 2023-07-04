import React from 'react';

import cn from 'classnames/bind';

import { Container } from '@components/Container';
// import { Link } from '@components/Link';
// import { ReactComponent as } from '@assets/'
// import { ReactComponent as } from '@assets/'
// import { ReactComponent as } from '@assets/'
// import { useThemeContext } from '@hooks/ThemeContext';

import styles from './Footer.module.scss';

const cx = cn.bind(styles);

export type TFooterProps = {
  className?: string;
  isDarkTheme: boolean;
};

const Footer: React.FC<TFooterProps> = ({ className, isDarkTheme }) => (
  // const { isDarkTheme } = useThemeContext();
  <div className={cx(className, 'Footer', { [`Footer_dark`]: isDarkTheme })}>
    <Container>
      <div className={cx(className, 'Footer__text')}>
        <p>
          Проект реализован в рамках стажировки для Frontend-разработчиков от
          {/* компании <Link>Framework Team</Link> */}
        </p>
        <p className={cx('Footer__text_name')}>Картавцев Глеб, 2023</p>
      </div>
      <div className={cx(className, 'Footer__icons')}>
        картинка картинка картинка
      </div>
    </Container>
  </div>
);

export default Footer;
