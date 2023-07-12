import React from 'react';

import cn from 'classnames/bind';

import { ReactComponent as FacebookIcon } from '@assets/icons/facebook_icon.svg';
import { ReactComponent as InstagramIcon } from '@assets/icons/instagram_icon.svg';
import { ReactComponent as VkIcon } from '@assets/icons/vk_icon.svg';
import { Container } from '@components/Container';
import { useThemeContext } from '@context/ThemeConext';
import { Link } from '@ui-components/Link';

import styles from './Footer.module.scss';

const cx = cn.bind(styles);

const Footer: React.FC = () => {
  const { theme } = useThemeContext();

  return (
    <footer className={cx('footer', `footer_${theme}`)}>
      <Container className={cx('footer__container')}>
        <div className={cx('footer__text')}>
          <p className={cx('footer__text_paragraph')}>
            Проект реализован в рамках стажировки
            <br /> для Frontend-разработчиков от компании{' '}
            <Link
              className={cx('footer__text_link')}
              href='https://framework.team'
              theme={theme}
            >
              Framework Team
            </Link>
          </p>
          <p className={cx('footer__text_name')}>Картавцев Глеб, 2023</p>
        </div>
        <div className={cx('footer__icons')}>
          <Link href='https://www.facebook.com/framework.team' theme={theme}>
            <FacebookIcon />
          </Link>
          <Link href='https://vk.com/frameworkteam' theme={theme}>
            <VkIcon />
          </Link>
          <Link href='https://www.instagram.com/framework.team/' theme={theme}>
            <InstagramIcon />
          </Link>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
