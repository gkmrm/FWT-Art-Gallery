import React, { useCallback, useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import cn from 'classnames/bind';
import { Controller, useForm } from 'react-hook-form';

import { ThemeType } from '@context/ThemeContext';
import { IImageModel } from '@models/PaintModel';
import paintFormSchema from '@schemas/paintFormSchema';
import { artistApi } from '@store/services/ArtistsService';
import { Button } from '@ui-components/Button';
import { DropZone } from '@ui-components/DropZone';
import { Input } from '@ui-components/Input';

import styles from './PaintForm.module.scss';

const cx = cn.bind(styles);

export type TPaintEditValues = {
  name: string;
  years: string;
  paint: IImageModel | null;
};

type TPaintFormProps = {
  theme: ThemeType;
  paintValues?: TPaintEditValues;
  paintId: string;
  authorId: string;
  onClose: () => void;
};

const defaultEmpty: TPaintEditValues = {
  name: '',
  years: '',
  paint: { id: '', src: '' },
};

const PaintForm: React.FC<TPaintFormProps> = ({
  theme,
  paintValues = defaultEmpty,
  onClose,
  paintId,
  authorId,
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

  const [
    editPaint,
    { isSuccess: isSuccessEditPaint, isLoading: isLoadingEdit },
  ] = artistApi.useEditPaintMutation();

  const [addPaint, { isSuccess: isSuccessAddPaint, isLoading: isLoadingAdd }] =
    artistApi.useAddPaintMutation();

  const isSuccess = isSuccessAddPaint || isSuccessEditPaint;

  const isLoading = isLoadingAdd || isLoadingEdit;

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, onClose]);

  const onAddPaint = handleSubmit(async ({ name, years, paint }) => {
    const data = new FormData();
    data.append('name', name);
    data.append('yearOfCreation', years);
    data.append('image', paint as unknown as Blob);

    addPaint({ authorId, data });
  });

  const onEditPaint = handleSubmit(async ({ name, years, paint }) => {
    const data = new FormData();
    data.append('name', name);
    data.append('yearOfCreation', years);
    data.append('image', paint as unknown as Blob);

    editPaint({ authorId, paintId, data });
  });

  const onSubmit = paintValues.name === '' ? onAddPaint : onEditPaint;

  return (
    <form
      className={cx('paintForm')}
      onSubmit={onSubmit}
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
            initialValue={field.value ? field.value.src : undefined}
          />
        )}
      />
      <Button variant='default' theme={theme} type='submit'>
        {isLoading ? 'Saving...' : 'SAVE'}
      </Button>
    </form>
  );
};

export default PaintForm;
