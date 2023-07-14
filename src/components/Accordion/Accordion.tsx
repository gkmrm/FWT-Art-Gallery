import React, { useState } from 'react';

import cn from 'classnames/bind';

import { ReactComponent as Arrow } from '@assets/icons/expand_icon.svg';
import { Button } from '@components/ui-components/Button';
import { ThemeTypes } from '@hooks/ThemeConext';

import styles from './Accordion.module.scss';

const cx = cn.bind(styles);

type TAccordionProps = {
  className?: string;
  theme: ThemeTypes;
  text: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Accordion: React.FC<TAccordionProps> = ({ className, theme, text }) => {
  const [isLongText] = useState(text.length > 265);
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => setIsOpen(!isOpen);

  const getCropText = (textData: string) => `${textData.slice(0, 265)}...`;

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
