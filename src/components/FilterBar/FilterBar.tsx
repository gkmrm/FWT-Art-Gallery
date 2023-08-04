import React from 'react';

import cn from 'classnames/bind';

import { ReactComponent as CloseIcon } from '@assets/icons/close_icon.svg';
import { ThemeType } from '@context/ThemeConext';
import { Button } from '@ui-components/Button';
import { DropDown } from '@ui-components/DropDown';
import { Modal } from '@ui-components/Modal';

import styles from './FilterBar.module.scss';

const cx = cn.bind(styles);

type TFilterBarProps = {
  isShow: boolean;
  onClose: () => void;
  theme: ThemeType;
};

interface IOption {
  id: string;
  name: string;
}

const testData: IOption[] = [
  {
    id: '64761911c25ef9fb3e0cdad9',
    name: 'Realism',
  },
  {
    id: '64761912c25ef9fb3e0cdaed',
    name: 'Modernism',
  },
  {
    id: '64761912c25ef9fb3e0cdaef',
    name: 'Expressionism',
  },
  {
    id: '64761912c25ef9fb3e0cdaf1',
    name: 'Cubism',
  },
  {
    id: '64761912c25ef9fb3e0cdaf3',
    name: 'Art Deco',
  },
  {
    id: '64761912c25ef9fb3e0cdaf5',
    name: 'Avant-garde',
  },
  {
    id: '64761912c25ef9fb3e0cdaf7',
    name: 'Baroque',
  },
];

const FilterBar: React.FC<TFilterBarProps> = ({ isShow, onClose, theme }) => {
  // const [isClear, setClear] = useState(false);

  // const onClear = () => {
  //   setClear(true);
  // };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const a = '';

  return (
    <Modal
      isShow={isShow}
      onHide={onClose}
      theme={theme}
      className={cx('filterbar', `filterbar_${theme}`)}
    >
      <Button
        onClick={onClose}
        className={cx('filterbar__icon', `filterbar__icon_${theme}`)}
      >
        <CloseIcon />
      </Button>
      <div className={cx('filterbar__wrapper')}>
        <div className={cx('filterbar__dropdowns')}>
          <DropDown
            name='Genres'
            values={[]}
            options={testData}
            theme={theme}
          />
          <DropDown
            name='Sort by'
            values={[]}
            options={testData}
            theme={theme}
          />
        </div>
      </div>
      <div className={cx('filterbar__buttons')}>
        <Button variant='text' theme={theme}>
          show the result
        </Button>
        <Button variant='text' theme={theme}>
          clear
        </Button>
      </div>
    </Modal>
  );
};

export default FilterBar;
