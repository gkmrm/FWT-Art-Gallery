import React, { useCallback, useState } from 'react';

import cn from 'classnames/bind';
import _ from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';
import { uid } from 'uid';

import { ReactComponent as FilterIcon } from '@assets/icons/filter_icon.svg';
import { ReactComponent as PlusIcon } from '@assets/icons/plus_icon_large.svg';
import { ArtistEditPopUp } from '@components/ArtistEditPopUp';
import { Container } from '@components/Container';
import { DragGrid } from '@components/DragGrid';
import { FilterBar } from '@components/FilterBar';
import { useAuthContext } from '@context/AuthContext';
import { useFilterContext } from '@context/FilterContext';
import { useThemeContext } from '@context/ThemeContext';
import { artistApi } from '@store/services/ArtistsService';
import { ArtistNotFound } from '@ui-components/ArtistNotFound';
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
  const { filters, setAllFilters } = useFilterContext();

  const { data: { data: artists = [], meta } = {}, isFetching } =
    artistApi.useFetchArtistsQuery({
      isAuth,
      params: filters,
    });

  const onCloseEditPopUp = () => {
    setShowAdd(!isShowAdd);
  };

  // todo check this
  const onOpen = () => setShow(true);
  const onClose = () => setShow(false);

  const onChange = useCallback(
    (str: string) => {
      setAllFilters({ ...filters, search: str });
    },
    [filters, setAllFilters]
  );

  const onResetSearch = useCallback(() => {
    setAllFilters({ ...filters, search: '' });
  }, [filters, setAllFilters]);

  const debounceSearchQuery = _.debounce(onChange, 650);

  const onNextPage = useCallback(() => {
    setAllFilters({ ...filters, perPage: Number(filters.perPage) + 6 });
  }, [filters, setAllFilters]);

  const dataLength = meta?.count ?? 9;

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
                values={filters.search}
                errorMessage=''
                onChange={debounceSearchQuery}
                handleReset={onResetSearch}
              />
              <Button variant='icon' onClick={onOpen} theme={theme}>
                <FilterIcon />
              </Button>
            </div>
          </div>
        )}
        {filters.search && artists.length < 1 && (
          <ArtistNotFound searchQuary={filters.search} theme={theme} />
        )}
        <InfiniteScroll
          next={onNextPage}
          hasMore={dataLength - artists.length > 1}
          loader={
            isFetching && (
              <Grid className={cx('mainPage__loader')}>
                {Array.from({
                  length:
                    dataLength - artists.length < 6
                      ? dataLength - artists.length
                      : 6,
                }).map(() => (
                  <Skeleton key={uid()} theme={theme} />
                ))}
              </Grid>
            )
          }
          dataLength={dataLength}
        >
          <DragGrid
            array={artists}
            theme={theme}
            variant='author'
            authorId=''
          />
        </InfiniteScroll>
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
