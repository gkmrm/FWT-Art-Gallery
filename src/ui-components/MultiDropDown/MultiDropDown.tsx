import React, { useState } from 'react';

import cn from 'classnames/bind';
// import { Control, FieldValues } from 'react-hook-form';
import { uid } from 'uid';

import { ReactComponent as Arrow } from '@assets/icons/expand_icon.svg';
import { ThemeType } from '@context/ThemeConext';
import { Checkbox } from '@ui-components/CheckBox';
import { Genre } from '@ui-components/Genre';

import styles from './MultiDropDown.module.scss';

const cx = cn.bind(styles);

interface IOption {
  id: string;
  name: string;
}

const testData = [
  { id: 'dfdvnsbdkvh33423', name: 'Romanticism' },
  { id: 'dfdvnsbd123kvh33423', name: 'Art' },
  { id: 'dfdvnsbdasddkvh33423', name: 'Nature' },
  { id: 'dfdvnsbdasdkvh33423', name: 'Bataille' },
  { id: 'dfdvnsbdasdkvh33423', name: 'Realistic' },
];

type TMultiDropDownProps = {
  theme: ThemeType;
  labelName?: string;
  errorMessage: string;
  // todo заменить моделью данных
  options?: IOption[];
  // selected?: IOption[];
  // name: string;
  // control: Control<FieldValues>;
};

const MultiDropDown: React.FC<TMultiDropDownProps> = ({
  labelName,
  theme,
  errorMessage,
  options = testData,
  // selected,
  // name,
  // control,
}) => {
  // const { field } = useController({ name, control });
  const [isOpen, setOpen] = useState(false);
  const [isSelect, setSelect] = useState(false);

  // React.useEffect(() => {
  //   if (selected?.length) {
  //     field.onChange(selected);
  //   }
  // }, []);

  const selected: IOption[] = [
    { id: 'dfdvnsbdkvh33423', name: 'Romanticism' },
    { id: 'dfdvnsbd123kvh33423', name: 'Art' },
    { id: 'dfdvnsbdasddkvh33423', name: 'Nature' },
    { id: 'dfdvnsbdasdkvh33423', name: 'Bataille' },
  ];

  const onSelectToggle = (option: IOption) => {
    if (selected.includes(option)) {
      console.log('Убрали');
      setSelect(false);
      selected.filter((item) => item.id === option.id);
    } else {
      console.log('Добавили');
      setSelect(true);
      selected.push(option);
    }
  };

  // const onSelect = (option: IOption) => {
  //   setSelect(true);
  //   selected.push(option);
  // };

  // const onDelete = (option: IOption) => {
  //   setSelect(false);
  //   selected.filter((item) => item.id === option.id);
  // };

  const onToggle = () => {
    setOpen(!isOpen);
  };

  return (
    <div className={cx('dropDown__wrapper', `dropDown__wrapper_${theme}`)}>
      {labelName && (
        <p className={cx('dropDown__label', `dropDown__label_${theme}`)}>
          {labelName}
        </p>
      )}
      <div
        role='presentation'
        onClick={onToggle}
        className={cx('dropDown', `dropDown_${theme}`, {
          dropDown_error: errorMessage,
          [`dropDown_${theme}_active`]: isOpen,
        })}
      >
        <div className={cx('dropDown__inner', `dropDown__inner_${theme}`)}>
          {selected && (
            <div className={cx('dropDown__select')}>
              {selected.map((item) => (
                <Genre
                  key={item.id}
                  className={cx('dropDown__selected')}
                  theme={theme}
                  onClose={() => console.log('Delete')}
                  onClick={(e) => e.stopPropagation()}
                >
                  {item.name}
                </Genre>
              ))}
            </div>
          )}
          <Arrow
            className={cx('dropDown__inner_arrow', {
              dropDown__inner_arrow_open: isOpen,
            })}
          />
        </div>
      </div>

      {isOpen && (
        <div className={cx('dropDown__open', `dropDown__open_${theme}`)}>
          {options.map((item) => (
            <div
              key={uid()}
              className={cx('dropDown__item', `dropDown__item_${theme}`)}
              role='presentation'
              onClick={() => onSelectToggle}
            >
              <Checkbox theme={theme} isChecked={isSelect} idFor={item.id} />
              <p id={item.id}>{item.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiDropDown;
