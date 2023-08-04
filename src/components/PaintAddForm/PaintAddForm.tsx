import React, { useCallback, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import cn from 'classnames/bind';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import { ThemeType } from '@context/ThemeConext';
import { Button } from '@ui-components/Button';
import { DropZone } from '@ui-components/DropZone';
import { Input } from '@ui-components/Input';

import styles from './PaintAddForm.module.scss';

const cx = cn.bind(styles);

type TPaintAddFormProps = { theme: ThemeType };

const MAX_FILE_SIZE = 3145728;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const schema = z.object({
  paint: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 3MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png formats are supported.'
    ),
  name: z
    .string()
    .min(6, { message: 'Name must contain at least 6 characters' })
    .max(60, {
      message: 'Name must contain at most 60 characters',
    }),
  years: z
    .string()
    .min(4, { message: 'Min 4 num' })
    .max(36, { message: 'Max 36 number' }),
});

const PaintAddForm: React.FC<TPaintAddFormProps> = ({ theme }) => {
  const [isDraggable, setDraggable] = useState(false);

  const handleDragOver = useCallback(() => setDraggable(true), []);
  const handleDragLeave = useCallback(() => setDraggable(false), []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    resetField,
  } = useForm({
    mode: 'all',
    resolver: zodResolver(schema),
  });

  return (
    <form
      className={cx('paintForm')}
      onSubmit={handleSubmit((d) => console.log(d))}
      onDragOver={handleDragOver}
    >
      <div className={cx('textBlock')}>
        <Input
          {...register('name')}
          labelName='The name of the picture'
          errorMessage={errors.name?.message as string}
          theme={theme}
          className={cx('textBlock__name')}
        />
        <Input
          {...register('years')}
          labelName='Years of creation'
          errorMessage={errors.years?.message as string}
          theme={theme}
          className={cx('textBlock__years')}
        />
      </div>
      <Controller
        name='paint'
        control={control}
        render={({ field }) => (
          <DropZone
            onReset={() => resetField('paint')}
            onChange={field.onChange}
            errorMessage={errors.paint?.message as string}
            variant='paint'
            theme={theme}
            idFor='paint'
            isDraggable={isDraggable}
            onDragLeave={handleDragLeave}
            // initialValue=''
          />
        )}
      />
      <Button variant='default' theme={theme} type='submit'>
        SAVE
      </Button>
    </form>
  );
};

export default PaintAddForm;
