import React, { useState } from 'react';

import cn from 'classnames/bind';

import { ReactComponent as ResetIcon } from '@assets/icons/close_icon_small.svg';
import { ReactComponent as LoupeIcon } from '@assets/icons/search_icon.svg';
import { ThemeType } from '@context/ThemeContext';
import { ErrorMessage } from '@ui-components/ErrorMessage';

import styles from './Search.module.scss';

const cx = cn.bind(styles);

type TSearchProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  onChange: (value: string) => void;
  theme: ThemeType;
  errorMessage: string;
  values?: string;
  classNameInput?: string;
};

const Search: React.FC<TSearchProps> = ({
  values = '',
  className = '',
  classNameInput = '',
  onChange,
  theme,
  errorMessage,
  ...other
}) => {
  const [value, setValue] = useState(values);
  const handleInputChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setValue(target.value);
    onChange(target.value);
  };

  const onClear = () => {
    setValue('');
    onChange(value);
  };

  return (
    <div className={cx(className, 'search__wrapper')}>
      <input
        value={value}
        onChange={handleInputChange}
        placeholder='Search'
        className={cx(classNameInput, 'search', `search_${theme}`, {
          input_error: errorMessage,
        })}
        {...other}
      />
      <LoupeIcon className={cx('search__icon', `search__icon_${theme}`)} />
      {value && (
        <ResetIcon
          onClick={onClear}
          className={cx('search__reset', `search__reset_${theme}`)}
        />
      )}
      {errorMessage && (
        <ErrorMessage
          className={cx('search__error')}
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
};

export default Search;
