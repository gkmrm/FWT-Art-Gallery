import React from 'react';

import cn from 'classnames/bind';

import { ReactComponent as FacebookIcon } from '@assets/icons/facebook_icon.svg';
import { ReactComponent as InstagramIcon } from '@assets/icons/instagram_icon.svg';
import { ReactComponent as VkIcon } from '@assets/icons/vk_icon.svg';
import { Container } from '@components/Container';
import { useThemeContext } from '@context/ThemeContext';
import { Link } from '@ui-components/Link';

import styles from './Footer.module.scss';

const cx = cn.bind(styles);

const links = {
  mainSite: 'https://framework.team',
  facebook: 'https://www.facebook.com/framework.team',
  vk: 'https://vk.com/frameworkteam',
  instagram: 'https://www.instagram.com/framework.team/',
};

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
              to={links.mainSite}
              theme={theme}
              target='_blank'
            >
              Framework Team
            </Link>
          </p>
          <p className={cx('footer__text_name')}>Картавцев Глеб, 2023</p>
        </div>
        <div className={cx('footer__icons')}>
          <Link theme={theme} to={links.facebook} target='_blank'>
            <FacebookIcon />
          </Link>
          <Link to={links.vk} theme={theme} target='_blank'>
            <VkIcon />
          </Link>
          <Link to={links.instagram} theme={theme} target='_blank'>
            <InstagramIcon />
          </Link>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
