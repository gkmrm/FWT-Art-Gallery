import React, { useCallback, useRef, useState } from 'react';

import cn from 'classnames/bind';

import { ReactComponent as GearIcon } from '@assets/icons/gear_icon.svg';
import { DeletePopUp } from '@components/DeletePopUp';
import { PaintEditPopUp } from '@components/PaintEditPopUp';
import { useAuthContext } from '@context/AuthContext';
import { ThemeType } from '@context/ThemeContext';
import useOutsideClick from '@hooks/useOutsideClick';
import { IImage } from '@models/PaintModel';
import { Button } from '@ui-components/Button';
import { Card } from '@ui-components/Card';
import { Popover } from '@ui-components/Popover';

import styles from './PaintCard.modules.scss';

const cx = cn.bind(styles);

type TPaintCardProps = {
  id?: string;
  title: string;
  subtitle: string;
  /**
   * Object with image source {string, string...}
   */
  image: IImage;
  pathTo?: string;
  theme: ThemeType;
  onClick?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

const PaintCard: React.FC<TPaintCardProps> = ({
  title,
  subtitle,
  image,
  pathTo = '',
  theme = 'light',
  onClick,
  ...other
}) => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef<null | HTMLDivElement>(null);
  const { isAuth } = useAuthContext();

  const [isShowDelete, setShowDelete] = useState(false);
  const [isShowEdit, setShowEdit] = useState(false);

  const onCloseDeletePopUp = () => {
    setShowDelete(!isShowDelete);
  };
  const onCloseEditPopUp = () => {
    setShowEdit(!isShowEdit);
  };

  const toggleOpen = useCallback(() => setOpen((prev) => !prev), []);

  const onClose = () => setOpen(false);

  useOutsideClick(ref, onClose);

  return (
    <>
      <Card
        onClick={onClick}
        pathTo={pathTo}
        title={title}
        subtitle={subtitle}
        image={image}
        theme={theme}
        {...other}
      >
        {isAuth && (
          <div ref={ref}>
            <Button
              className={cx('card__button', `card__button_${theme}`)}
              onClick={toggleOpen}
              theme={theme}
              variant='icon'
            >
              <GearIcon className={cx('s')} />
            </Button>
            {isOpen && (
              <Popover theme={theme}>
                <ul className={cx('card__popover')}>
                  <li
                    className={cx(
                      'card__popover_item',
                      `card__popover_item_${theme}`
                    )}
                    role='presentation'
                    onClick={() => {
                      // eslint-disable-next-line no-console
                      console.log('Cover change');
                      onClose();
                    }}
                  >
                    Remove cover
                  </li>
                  <li
                    className={cx(
                      'card__popover_item',
                      `card__popover_item_${theme}`
                    )}
                    role='presentation'
                    onClick={() => {
                      setShowEdit(true);
                      onClose();
                    }}
                  >
                    Edit
                  </li>
                  <li
                    className={cx(
                      'card__popover_item',
                      `card__popover_item_${theme}`
                    )}
                    role='presentation'
                    onClick={() => {
                      setShowDelete(true);
                      onClose();
                    }}
                  >
                    Delete
                  </li>
                </ul>
              </Popover>
            )}
          </div>
        )}
      </Card>
      <DeletePopUp
        variant='paint'
        isShow={isShowDelete}
        onClose={onCloseDeletePopUp}
        theme={theme}
      />
      <PaintEditPopUp
        isShow={isShowEdit}
        onClose={onCloseEditPopUp}
        theme={theme}
        paint={{ name: title, years: subtitle, paint: image }}
      />
    </>
  );
};

export default PaintCard;
