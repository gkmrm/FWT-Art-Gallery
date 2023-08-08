import React, { useCallback, useRef, useState } from 'react';

import cn from 'classnames/bind';

import { ReactComponent as Arrow } from '@assets/icons/expand_icon.svg';
import { ThemeType } from '@context/ThemeConext';
import useOutsideClick from '@hooks/useOutsideClick';
import { Checkbox } from '@ui-components/CheckBox';
import { ErrorMessage } from '@ui-components/ErrorMessage';
import { Genre } from '@ui-components/Genre';

import styles from './MultiDropDown.module.scss';
import { testData } from './TestData';

const cx = cn.bind(styles);

interface IOption {
  id: string;
  name: string;
}

type TMultiDropDownProps = {
  theme: ThemeType;
  labelName?: string;
  errorMessage: string;
  // todo заменить моделью данных
  options?: IOption[];
  selected: IOption[];
  onChange: (selected: IOption[]) => void;
};

const MultiDropDown: React.FC<TMultiDropDownProps> = ({
  labelName,
  theme,
  errorMessage,
  options = testData,
  selected,
  onChange,
}) => {
  const [isOpen, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] =
    React.useState<IOption[]>(selected);
  const ref = useRef<null | HTMLDivElement>(null);

  const handleChange = (obj: IOption) => {
    const newSelected = selectedValues.includes(obj)
      ? selectedValues.filter((item) => item.id !== obj.id)
      : [...selected, obj];

    setSelectedValues(newSelected);
    onChange(newSelected);
  };

  const onToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, [setOpen]);

  const handleToggle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  useOutsideClick(ref, handleToggle);

  const checkIsSelected = (obj: IOption) =>
    !!selectedValues.find((item) => item.id === obj.id);

  return (
    <div ref={ref}>
      {labelName && (
        <p className={cx('dropdown__label', `dropdown__label_${theme}`)}>
          {labelName}
        </p>
      )}
      <div
        role='presentation'
        onClick={onToggle}
        className={cx('dropdown', `dropdown_${theme}`, {
          dropdown_error: errorMessage,
          [`dropdown_${theme}_active`]: isOpen,
        })}
      >
        <div className={cx('dropdown__inner', `dropdown__inner_${theme}`)}>
          {selected && (
            <div className={cx('dropdown__select')}>
              {selectedValues.map((item) => (
                <Genre
                  key={item.id}
                  className={cx('dropdown__selected')}
                  theme={theme}
                  onClose={() => handleChange(item)}
                  onClick={(e) => e.stopPropagation()}
                >
                  {item.name}
                </Genre>
              ))}
            </div>
          )}
          <Arrow
            className={cx('dropdown__inner_arrow', {
              dropDown__inner_arrow_open: isOpen,
            })}
          />
        </div>
      </div>
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}

      {isOpen && (
        <div className={cx('dropdown__open', `dropdown__open_${theme}`)}>
          {options.map((item) => (
            <div
              key={item.id}
              className={cx('dropdown__item', `dropdown__item_${theme}`)}
              role='presentation'
              onClick={() => handleChange(item)}
            >
              <Checkbox
                theme={theme}
                checked={checkIsSelected(item)}
                name={item.id}
              />
              <p id={item.id}>{item.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiDropDown;
