import React, { useCallback, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import cn from 'classnames/bind';
import { Controller, useForm } from 'react-hook-form';

import { ThemeType } from '@context/ThemeContext';
import artistSchema from '@schemas/artistFormSchema';
import { IGenreModel } from '@store/models/ArtistStaticByIdModel';
import { IImage } from '@store/models/PaintModel';
import { Button } from '@ui-components/Button';
import { DropZone } from '@ui-components/DropZone';
import { Input } from '@ui-components/Input';
import { MultiDropDown } from '@ui-components/MultiDropDown';
import { TextArea } from '@ui-components/TextArea';

import styles from './ArtistForm.module.scss';

const cx = cn.bind(styles);

export type TArtistFormValues = {
  name: string;
  years: string;
  description: string;
  genres: IGenreModel[];
  avatar: IImage;
};

type TArtistFormProps = {
  theme: ThemeType;
  artistValues?: TArtistFormValues;
};

const defaultEmpty: TArtistFormValues = {
  name: '',
  years: '',
  description: '',
  genres: [],
  avatar: { src: '' },
};

const ArtistForm: React.FC<TArtistFormProps> = ({
  theme,
  artistValues = defaultEmpty,
}) => {
  const [isDraggable, setDraggable] = useState(false);

  const handleDragOver = useCallback(() => setDraggable(true), []);
  const handleDragLeave = useCallback(() => setDraggable(false), []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    resetField,
  } = useForm<TArtistFormValues>({
    mode: 'all',
    resolver: zodResolver(artistSchema),
    defaultValues: artistValues,
  });

  return (
    <form
      className={cx('form', `form_${theme}`)}
      // eslint-disable-next-line no-console
      onSubmit={handleSubmit((d) => console.log(d))}
      onDragOver={handleDragOver}
    >
      <Controller
        name='avatar'
        control={control}
        render={({ field }) => (
          <DropZone
            onReset={() => resetField('avatar')}
            onChange={field.onChange}
            labelName='Browse profile photo'
            errorMessage={errors.avatar?.message as string}
            variant='avatar'
            theme={theme}
            idFor='avatar'
            isDraggable={isDraggable}
            onDragLeave={handleDragLeave}
            initialValue={field.value.src}
          />
        )}
      />

      <div className={cx('form__wrapper')}>
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
        <TextArea
          {...register('description')}
          labelName='Description'
          errorMessage={errors.description?.message as string}
          theme={theme}
        />
        <Controller
          name='genres'
          control={control}
          render={({ field }) => (
            <MultiDropDown
              onChange={field.onChange}
              selected={field.value}
              theme={theme}
              labelName='Genres*'
              errorMessage={errors.genres?.message as string}
            />
          )}
        />

        <Button
          type='submit'
          variant='default'
          theme={theme}
          className={cx('form__button')}
        >
          SAVE
        </Button>
      </div>
    </form>
  );
};

export default ArtistForm;
