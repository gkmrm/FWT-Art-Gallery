import React from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import cn from 'classnames/bind';

import { ReactComponent as DragIcon } from '@assets/icons/drag_icon.svg';
import { useThemeContext } from '@context/ThemeContext';
import { Button } from '@ui-components/Button';

import styles from './DragCard.module.scss';

const cx = cn.bind(styles);

type TDragCardProps = {
  id: string;
} & React.HTMLAttributes<HTMLDivElement>;

const DragCard: React.FC<TDragCardProps> = ({ id, children, ...other }) => {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const { theme } = useThemeContext();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  };

  return (
    <div
      className={cx('drag', { drag_dragging: isDragging })}
      ref={setNodeRef}
      style={style}
      {...other}
    >
      <Button
        theme={theme}
        variant='icon'
        className={cx('button', `button_${theme}`)}
        {...attributes}
        {...listeners}
      >
        <DragIcon />
      </Button>
      {children}
    </div>
  );
};

export default DragCard;
