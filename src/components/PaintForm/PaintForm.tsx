import React, { useCallback, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import cn from 'classnames/bind';
import { Controller, useForm } from 'react-hook-form';

import { ThemeType } from '@context/ThemeContext';
import { IImage } from '@models/PaintModel';
import paintFormSchema from '@schemas/paintFormSchema';
import { Button } from '@ui-components/Button';
import { DropZone } from '@ui-components/DropZone';
import { Input } from '@ui-components/Input';

import styles from './PaintForm.module.scss';

const cx = cn.bind(styles);

export type TPaintEditValues = {
  name: string;
  years: string;
  paint: IImage;
};

type TPaintFormProps = { theme: ThemeType; paintValues?: TPaintEditValues };

const defaultEmpty: TPaintEditValues = {
  name: '',
  years: '',
  paint: { src: '' },
};

const PaintForm: React.FC<TPaintFormProps> = ({
  theme,
  paintValues = defaultEmpty,
}) => {
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
    resolver: zodResolver(paintFormSchema),
    defaultValues: paintValues,
  });

  return (
    <form
      className={cx('paintForm')}
      // eslint-disable-next-line no-console
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
            initialValue={field.value.src}
          />
        )}
      />
      <Button variant='default' theme={theme} type='submit'>
        SAVE
      </Button>
    </form>
  );
};

export default PaintForm;
