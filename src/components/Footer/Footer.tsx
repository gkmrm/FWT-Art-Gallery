import React from 'react';

import cn from 'classnames/bind';

import { FacebookIcon, InstagramIcon, VkIcon } from '@assets/icons';
import { Container } from '@components/Container';
import { ThemeTypes } from '@hooks/ThemeConext';
import { Link } from '@ui-components/Link';

import styles from './Footer.module.scss';

const cx = cn.bind(styles);

export type TFooterProps = {
  /**
   * Additional classNames for Footer
   */
  className?: string;
  /**
   * Theme from parent component = 'light' | 'dark'
   */
  theme: ThemeTypes;
};

const Footer: React.FC<TFooterProps> = ({ className, theme }) => (
  <footer className={cx(className, 'footer', `footer_${theme}`)}>
    <Container className={cx('footer__container')}>
      <div className={cx(className, 'footer__text')}>
        <p className={cx('footer__text_paragraph')}>
          Проект реализован в рамках стажировки
          <br /> для Frontend-разработчиков от компании{' '}
          <Link
            className={cx('footer__text_link')}
            to='https://framework.team'
            theme={theme}
            target='_blank'
          >
            Framework Team
          </Link>
        </p>
        <p className={cx('footer__text_name')}>Картавцев Глеб, 2023</p>
      </div>
      <div className={cx(className, 'footer__icons')}>
        <Link
          to='https://www.facebook.com/framework.team'
          theme={theme}
          target='_blank'
        >
          <FacebookIcon />
        </Link>
        <Link to='https://vk.com/frameworkteam' theme={theme} target='_blank'>
          <VkIcon />
        </Link>
        <Link
          to='https://www.instagram.com/framework.team/'
          theme={theme}
          target='_blank'
        >
          <InstagramIcon />
        </Link>
      </div>
    </Container>
  </footer>
);

export default Footer;
