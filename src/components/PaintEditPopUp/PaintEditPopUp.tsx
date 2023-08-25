import React from 'react';

import cn from 'classnames/bind';

import { PaintForm, TPaintEditValues } from '@components/PaintForm';
import { ThemeType } from '@context/ThemeContext';
import { ModalWrapper } from '@ui-components/ModalWrapper';

import styles from './PaintEditPopUp.modules.scss';

const cx = cn.bind(styles);

type TPaintEditPopUpProps = {
  isShow: boolean;
  onClose: () => void;
  theme: ThemeType;
  paint?: TPaintEditValues;
  authorId: string;
  paintId: string;
};

const PaintEditPopUp: React.FC<TPaintEditPopUpProps> = ({
  paintId,
  authorId,
  theme,
  onClose,
  isShow,
  paint,
}) => (
  <ModalWrapper
    className={cx('popup')}
    isShow={isShow}
    onClose={onClose}
    theme={theme}
  >
    <div className={cx('popup__inner', `popup__inner_${theme}`)}>
      <PaintForm
        theme={theme}
        paintValues={paint}
        onClose={onClose}
        paintId={paintId}
        authorId={authorId}
      />
    </div>
  </ModalWrapper>
);

export default PaintEditPopUp;
