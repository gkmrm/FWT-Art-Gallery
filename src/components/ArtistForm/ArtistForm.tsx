import React, { useCallback, useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import cn from 'classnames/bind';
import { Controller, useForm } from 'react-hook-form';

import { ThemeType } from '@context/ThemeContext';
import { normalizeDateRequset } from '@models/ArtistsModel';
import { IGenreModel } from '@models/GenreModel';
import { IImageModel } from '@models/PaintModel';
import artistSchema from '@schemas/artistFormSchema';
import { artistApi } from '@store/services/ArtistsService';
import { genreApi } from '@store/services/GenresService';
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
  avatar: IImageModel | null;
  id: string;
};

type TArtistFormProps = {
  theme: ThemeType;
  artistValues?: TArtistFormValues;
  onClose: () => void;
};

const defaultEmpty: TArtistFormValues = {
  id: '',
  name: '',
  years: '',
  description: '',
  genres: [],
  avatar: { id: '', src: '' },
};

const ArtistForm: React.FC<TArtistFormProps> = ({
  theme,
  artistValues = defaultEmpty,
  onClose,
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

  const { data: allGenres = [] } = genreApi.useFetchGenresQuery(null);

  const [
    createArtist,
    { isSuccess: isCreateSuccess, isLoading: isLoadingCreate },
  ] = artistApi.useCreateArtistMutation();
  const [editArtist, { isSuccess: isEditSuccess, isLoading: isLoadingEdit }] =
    artistApi.useEditArtistMutation();

  const isSuccess = isCreateSuccess || isEditSuccess;

  const isLoading = isLoadingCreate || isLoadingEdit;

  const onCreateArtist = handleSubmit(
    async ({ name, years, description, genres, avatar }) => {
      const data = new FormData();
      data.append('name', name);
      data.append('yearsOfLife', normalizeDateRequset(years));
      data.append('description', description);
      data.append('genres', genres.map((genre) => genre.id).join());
      data.append('avatar', avatar as unknown as Blob);

      createArtist({ data });
    }
  );

  const onEditArtist = handleSubmit(
    async ({ name, years, description, genres, avatar }) => {
      const data = new FormData();
      data.append('name', name);
      data.append('yearsOfLife', years);
      data.append('description', description);
      data.append('genres', genres.map((genre) => genre.id).join());
      data.append('avatar', avatar as unknown as Blob);

      editArtist({ id: artistValues.id, data });
    }
  );

  const onSubmit = artistValues.name === '' ? onCreateArtist : onEditArtist;

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, onClose]);

  return (
    <form
      className={cx('form', `form_${theme}`)}
      onSubmit={handleSubmit(() => onSubmit())}
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
            initialValue={field.value ? field.value.src : undefined}
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
              options={allGenres}
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
          {isLoading ? 'Saving...' : 'SAVE'}
        </Button>
      </div>
    </form>
  );
};

export default ArtistForm;
