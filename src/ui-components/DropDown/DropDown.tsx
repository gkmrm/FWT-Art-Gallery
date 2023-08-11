import React, { useState } from 'react';

import cn from 'classnames/bind';

import { ReactComponent as MinusIcon } from '@assets/icons/minus_icon.svg';
import { ReactComponent as PlusIcon } from '@assets/icons/plus_icon_large.svg';
import { ThemeType } from '@context/ThemeContext';
import { FilterItem } from '@ui-components/FilterItem';

import styles from './DropDown.module.scss';

const cx = cn.bind(styles);

interface IOption {
  id: string;
  name: string;
}

type TDropDownProps = {
  name: string;
  values: IOption[] | null;
  options: IOption[];
  theme: ThemeType;
  onFilterChange: (obj: IOption[]) => void;
  gridVariant?: 'twoCol' | 'oneCol';
  isClear: boolean;
};

const DropDown: React.FC<TDropDownProps> = ({
  name,
  values,
  options,
  theme,
  isClear,
  onFilterChange,
  gridVariant = 'twoCol',
}) => {
  const [value, setValue] = useState<IOption[]>(
    values || [{ id: '', name: '' }]
  );

  const [isOpen, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!isOpen);

  const onChange = (obj: IOption[]) => {
    setValue(obj);
    onFilterChange(obj);
  };

  const onClear = () => setValue([{ id: '', name: '' }]);

  const handleChange = (obj: IOption) => {
    if (value.includes(obj)) {
      const filtered = value.filter((item) => item.id !== obj.id);
      onChange(filtered);
    } else {
      onChange([...value, obj]);
    }
  };

  React.useEffect(() => onClear(), [isClear]);

  const getSelected = (obj: IOption) =>
    !!value.find((item) => item.id === obj.id);

  return (
    <div className={cx('dropdown')}>
      <div
        className={cx('dropdown__name', `dropdown__name_${theme}`)}
        role='presentation'
        onClick={toggleOpen}
      >
        <p className={cx('dropdown__name_title')}>{name}</p>
        {isOpen ? <MinusIcon /> : <PlusIcon />}
      </div>
      {isOpen && (
        <div
          className={cx(
            'dropdown__wrapper',
            `dropdown__wrapper_${gridVariant}`
          )}
        >
          {options.map((item) => (
            <FilterItem
              key={item.id}
              theme={theme}
              handleChange={handleChange}
              isSelected={getSelected(item)}
              data={item}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
