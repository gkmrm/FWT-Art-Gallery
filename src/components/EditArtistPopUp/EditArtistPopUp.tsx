import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import cn from 'classnames/bind';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { ReactComponent as CloseIcon } from '@assets/icons/close_icon.svg';
import { ThemeType } from '@context/ThemeConext';
import { Button } from '@ui-components/Button';
import { Input } from '@ui-components/Input';
import { Modal } from '@ui-components/Modal';
import { MultiDropDown } from '@ui-components/MultiDropDown';
import { TextArea } from '@ui-components/TextArea';

import styles from './EditArtistPopUp.module.scss';

const cx = cn.bind(styles);

const schema = z.object({
  name: z.string().min(6, { message: '' }).max(60, {
    message: '',
  }),
  years: z.string().min(8, { message: '' }).max(36, { message: '' }),
  location: z.string().min(8, { message: '' }).max(36, { message: '' }),
  description: z.string().min(50, { message: '' }).max(1000, { message: '' }),
});

type TEditArtistPopUpProps = {
  isShow: boolean;
  onClose: () => void;
  theme: ThemeType;
};

const EditArtistPopUp: React.FC<TEditArtistPopUpProps> = ({
  isShow,
  onClose,
  theme,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  return (
    <Modal
      isShow={isShow}
      onHide={onClose}
      theme={theme}
      className={cx('popup__modal', `popup__modal_${theme}`)}
    >
      <div className={cx('popup', `popup_${theme}`)}>
        <Button
          onClick={onClose}
          className={cx(
            'popup__icon',
            `popup__icon_${theme}`,
            'popup__icon_close'
          )}
        >
          <CloseIcon />
        </Button>
        <div>
          <form
            className={cx('form')}
            onSubmit={handleSubmit((d) => console.log(d))}
          >
            <div>Картинка</div>
            <Input
              {...register('name')}
              labelName='Name*'
              errorMessage={errors.name?.message as string}
              theme={theme}
            />
            <Input
              {...register('years')}
              labelName='Years of life'
              errorMessage={errors.years?.message as string}
              theme={theme}
            />
            <Input
              {...register('location')}
              labelName='Location'
              errorMessage={errors.location?.message as string}
              theme={theme}
            />
            <TextArea
              {...register('description')}
              labelName='Description'
              errorMessage={errors.description?.message as string}
              theme={theme}
            />
            <MultiDropDown
              theme={theme}
              labelName='Genres*'
              errorMessage='undefined'
            />
            <Button
              type='submit'
              variant='default'
              theme={theme}
              className={cx('form__button')}
            >
              SAVE
            </Button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default EditArtistPopUp;
