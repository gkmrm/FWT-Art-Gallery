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
              to='https://framework.team'
              theme={theme}
              target='_blanc'
            >
              Framework Team
            </Link>
          </p>
          <p className={cx('footer__text_name')}>Картавцев Глеб, 2023</p>
        </div>
        <div className={cx('footer__icons')}>
          <Link
            theme={theme}
            to='https://www.facebook.com/framework.team'
            target='_blanc'
          >
            <FacebookIcon />
          </Link>
          <Link to='https://vk.com/frameworkteam' theme={theme} target='_blanc'>
            <VkIcon />
          </Link>
          <Link
            to='https://www.instagram.com/framework.team/'
            theme={theme}
            target='_blanc'
          >
            <InstagramIcon />
          </Link>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
