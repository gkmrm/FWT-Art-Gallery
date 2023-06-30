import React from 'react';

import cn from 'classnames/bind';

import BaseButton, { TBaseButtonProps } from './BaseButton';
import styles from './Button.module.scss';
// import { ReactComponent as FilterIcon } from './filter_icon.svg';
// import { ReactComponent as PlusIcon } from './plus_icon.svg';
// import { ReactComponent as TrashIcon } from './trash_icon.svg';
// import { ReactComponent as Toggle } from './light_icon.svg';
// import { Icon, IconType } from '../Icon';

const cx = cn.bind(styles);

type TButtonProps = {
  props: TBaseButtonProps;
  value?: string;
  icon?: React.ReactNode;
  isDarkTheme?: boolean;
  isDisabled?: boolean;
  className?: 'default' | 'text' | 'up' | 'functional';
};

const Button: React.FC<TButtonProps> = ({
  className = 'default',
  icon,
  props,
  value,
  isDarkTheme = false,
  isDisabled,
}) => {
  const classNamesButton = cx('Button', `Button_${className}`, {
    [`Button_${className}_dark`]: isDarkTheme,
    [`Button_${className}_disabled`]: isDisabled,
  });

  return (
    <div>
      <BaseButton className={classNamesButton} {...props} value={value}>
        {icon}
      </BaseButton>
    </div>
  );
};

export default Button;
