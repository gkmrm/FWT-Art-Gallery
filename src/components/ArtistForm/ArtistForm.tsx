import React, { useCallback, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import cn from 'classnames/bind';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import { ThemeType } from '@context/ThemeContext';
import { IGenreModel } from '@store/models/ArtistStaticByIdModel';
import { IImage } from '@store/models/PaintModel';
import { Button } from '@ui-components/Button';
import { DropZone } from '@ui-components/DropZone';
import { Input } from '@ui-components/Input';
import { MultiDropDown } from '@ui-components/MultiDropDown';
import { TextArea } from '@ui-components/TextArea';

import styles from './ArtistForm.module.scss';

const cx = cn.bind(styles);

const MAX_FILE_SIZE = 3145728;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const schema = z.object({
  avatar: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 3MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png formats are supported.'
    )
    .optional(),
  name: z
    .string()
    .min(6, { message: 'String must contain at least 6 characters' })
    .max(60, {
      message: 'String must contain at most 60 characters',
    }),
  years: z
    .string()
    .min(8, { message: 'Years must contain at least 8 characters' })
    .max(36, { message: 'Years must contain at most 36 characters' }),
  description: z
    .string()
    .min(20, { message: 'Description must contain at least 20 characters' })
    .max(1000, { message: 'Description must contain at most 1000 characters' }),
  genres: z
    .array(z.object({ id: z.string(), name: z.string() }))
    .min(1, { message: 'At least 1 element is required' }),
});

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
    resolver: zodResolver(schema),
    defaultValues: artistValues,
  });

  return (
    <form
      className={cx('form', `form_${theme}`)}
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
