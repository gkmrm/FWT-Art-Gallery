import React, { useState } from 'react';

import cn from 'classnames/bind';

import { ReactComponent as Arrow } from '@assets/icons/expand_icon.svg';
import { ThemeType } from '@context/ThemeContext';
import { Button } from '@ui-components/Button';
import getCropText from '@utils/functions/getCropText';

import styles from './Accordion.module.scss';

const cx = cn.bind(styles);

type TAccordionProps = {
  className?: string;
  theme: ThemeType;
  text: string;
} & React.HTMLAttributes<HTMLDivElement>;

const MAX_LENGTH_TEXT = 265;

const Accordion: React.FC<TAccordionProps> = ({ className, theme, text }) => {
  const [isLongText] = useState(text.length > MAX_LENGTH_TEXT);
  const [isOpen, setOpen] = useState(false);

  const onClick = () => setOpen(!isOpen);

  const cropText = getCropText(text);

  return (
    <div className={cx(className, 'accordion', `accordion_${theme}`)}>
      {isLongText ? (
        <>
          <div
            className={cx('accordion__text', {
              [`accordion__text_active_${theme}`]: !isOpen,
            })}
          >
            {isOpen ? text : cropText}
          </div>
          <Button
            variant='text'
            onClick={onClick}
            theme={theme}
            className={cx('accordion__button', `accordion__button_${theme}`)}
          >
            {isOpen ? 'READ LESS' : 'READ MORE'}
            <Arrow className={cx({ button__arrow: isOpen })} />
          </Button>
        </>
      ) : (
        <div className={cx('accordion__text')}>{text}</div>
      )}
    </div>
  );
};

export default Accordion;
