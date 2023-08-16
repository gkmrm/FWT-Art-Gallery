import React, { useCallback, useState } from 'react';

import cn from 'classnames/bind';
import _ from 'lodash';
import { uid } from 'uid';

import { ReactComponent as FilterIcon } from '@assets/icons/filter_icon.svg';
import { ReactComponent as PlusIcon } from '@assets/icons/plus_icon_large.svg';
import { ArtistEditPopUp } from '@components/ArtistEditPopUp';
import { Container } from '@components/Container';
import { DragGrid } from '@components/DragGrid';
import { FilterBar } from '@components/FilterBar';
import { Pagination } from '@components/Pagination';
import { useAuthContext } from '@context/AuthContext';
import { useThemeContext } from '@context/ThemeContext';
import { artistApi } from '@store/services/ArtistsService';
import { Button } from '@ui-components/Button';
import { Grid } from '@ui-components/Grid';
import { Search } from '@ui-components/Search';
import { Skeleton } from '@ui-components/Skeleton';

import styles from './MainPage.module.scss';

const cx = cn.bind(styles);

const MainPage: React.FC = () => {
  const { theme } = useThemeContext();
  const [isShow, setShow] = useState(false);
  const [isShowAdd, setShowAdd] = useState(false);
  const { isAuth } = useAuthContext();

  const { data: artistStatic = [], isLoading } = artistApi.useFetchArtistsQuery(
    {
      isAuth,
      params: {},
    }
  );

  const onCloseEditPopUp = () => {
    setShowAdd(!isShowAdd);
  };

  // todo check this
  const onOpen = () => setShow(true);
  const onClose = () => setShow(false);

  const onChange = useCallback((str: string) => {
    // eslint-disable-next-line no-console
    console.log(str);
  }, []);

  const debounceSearchQuery = _.debounce(onChange, 650);

  return (
    <div className={cx('mainPage', `mainPage_${theme}`)}>
      <Container
        className={cx('mainPage__wrapperPaint', {
          mainPage__wrapperPaint_nonAuth: !isAuth,
        })}
      >
        {isAuth && (
          <div className={cx('mainPage__control')}>
            <Button
              theme={theme}
              variant='text'
              onClick={() => setShowAdd(true)}
              className={cx('mainPage__control_button')}
            >
              <PlusIcon />
              Add artist
            </Button>
            <div className={cx('mainPage__control_input')}>
              <Search
                className={cx('mainPage__search')}
                theme={theme}
                errorMessage=''
                onChange={debounceSearchQuery}
              />
              <Button variant='icon' onClick={onOpen} theme={theme}>
                <FilterIcon />
              </Button>
            </div>
          </div>
        )}
        {isLoading ? (
          <Grid>
            {Array.from({ length: 9 }).map(() => (
              <Skeleton key={uid()} theme={theme} />
            ))}
          </Grid>
        ) : (
          <DragGrid array={artistStatic} theme={theme} variant='author' />
        )}
        <Pagination
          theme={theme}
          pagesAmount={9}
          currentPage={5}
          // eslint-disable-next-line no-console
          onChange={() => console.log('Переключили')}
        />
      </Container>
      <ArtistEditPopUp
        isShow={isShowAdd}
        onClose={onCloseEditPopUp}
        theme={theme}
      />
      <FilterBar isShow={isShow} onClose={onClose} theme={theme} />
    </div>
  );
};

export default MainPage;
