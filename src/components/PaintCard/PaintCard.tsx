import React, { useCallback, useEffect, useRef, useState } from 'react';

import cn from 'classnames/bind';

import { ReactComponent as GearIcon } from '@assets/icons/gear_icon.svg';
import { DeletePopUp } from '@components/DeletePopUp';
import { PaintEditPopUp } from '@components/PaintEditPopUp';
import { useAuthContext } from '@context/AuthContext';
import { ThemeType } from '@context/ThemeContext';
import useOutsideClick from '@hooks/useOutsideClick';
import { IImageModel } from '@models/PaintModel';
import { artistApi } from '@store/services/ArtistsService';
import { Button } from '@ui-components/Button';
import { Card } from '@ui-components/Card';
import { Popover } from '@ui-components/Popover';

import styles from './PaintCard.modules.scss';

const cx = cn.bind(styles);

type TPaintCardProps = {
  isMainPainting: boolean;
  authorId: string;
  paintId: string;
  title: string;
  subtitle: string;
  /**
   * Object with image source {string, string...}
   */
  image: IImageModel;
  pathTo?: string;
  theme: ThemeType;
  onClick?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

const PaintCard: React.FC<TPaintCardProps> = ({
  isMainPainting,
  authorId,
  paintId,
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

  const [updateMainPaint, { isSuccess }] =
    artistApi.useUpdateMainPaintMutation();

  const handleChange = useCallback(() => {
    updateMainPaint({ authorId, paintId });
  }, [authorId, paintId, updateMainPaint]);

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess]);

  return (
    <>
      <Card
        onClick={onClick}
        pathTo={pathTo}
        title={title}
        subtitle={subtitle}
        image={image || undefined}
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
                    onClick={handleChange}
                  >
                    {isMainPainting ? 'Remove cover' : 'Make cover'}
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
        paintId={paintId}
        authorId={authorId}
        variant='paint'
        isShow={isShowDelete}
        onClose={onCloseDeletePopUp}
        theme={theme}
      />
      <PaintEditPopUp
        authorId={authorId}
        paintId={paintId}
        isShow={isShowEdit}
        onClose={onCloseEditPopUp}
        theme={theme}
        paint={{ name: title, years: subtitle, paint: image }}
      />
    </>
  );
};

export default PaintCard;
