import React, {
  ChangeEvent,
  DragEvent,
  useCallback,
  useRef,
  useState,
} from 'react';

import cn from 'classnames/bind';

import { ThemeType } from '@context/ThemeContext';
import { DropField } from '@ui-components/DropField';
import { DropImagePreview } from '@ui-components/DropImagePreview';
import { ErrorMessage } from '@ui-components/ErrorMessage';
import BASE_URL from '@utils/BASE_URL';
import getBase64 from '@utils/functions/getBase64';

import styles from './DropZone.module.scss';

const cx = cn.bind(styles);

type TDropZoneProps = {
  onReset: () => void;
  className?: string;
  theme: ThemeType;
  idFor?: string;
  labelName?: string;
  errorMessage: string;
  variant: 'avatar' | 'paint';
  isDraggable: boolean;
  onDragLeave: React.DragEventHandler<HTMLInputElement>;
  onChange: (file: File | '') => void;
  initialValue?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const DropZone: React.FC<TDropZoneProps> = ({
  onReset,
  className,
  theme,
  labelName = '',
  idFor = '',
  variant,
  isDraggable,
  onDragLeave,
  errorMessage = '',
  onChange,
  initialValue,
  ...other
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [image, setImage] = useState(
    initialValue ? `${BASE_URL}${initialValue}` : ''
  );

  const uploadImage = async (file: File | undefined) => {
    if (file) {
      const base64 = await getBase64(file);
      setImage(base64);
      onChange(file);
    }
  };

  const handleDeleteImage = () => {
    setImage('');
    onReset();
  };

  const handleChangeImage = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      await uploadImage(file);
    },
    []
  );

  const handleLoadImage = () => inputRef.current?.click();

  const handleDragImage = (event: DragEvent<HTMLElement>) =>
    event.preventDefault();

  const handleDropImage = useCallback(
    async (event: DragEvent<HTMLInputElement>) => {
      event.preventDefault();
      const file = event.dataTransfer.files?.[0];
      await uploadImage(file);

      if (onDragLeave) {
        onDragLeave(event);
      }
    },
    []
  );

  React.useEffect(() => console.log(image), [image]);

  return (
    <div
      className={cx('dropzone', `dropzone__${variant}`)}
      role='presentation'
      onDrop={handleDropImage}
      onDragOver={handleDragImage}
      onDragLeave={onDragLeave}
      onClick={handleLoadImage}
    >
      <section
        className={cx(
          className,
          `dropzone__section_${variant}`,
          `dropzone__section_${variant}_${theme}`,
          { [`dropzone__section_${variant}_full`]: isDraggable }
        )}
      >
        {image && !errorMessage && (
          <DropImagePreview
            isDraggable={isDraggable}
            variant={variant}
            theme={theme}
            image={image}
            handleDeleteImage={handleDeleteImage}
          />
        )}
        <DropField
          variant={variant}
          theme={theme}
          isDraggable={isDraggable}
          idFor={idFor}
          handleChangeImage={handleChangeImage}
          labelName={labelName}
          {...other}
        />
      </section>
      {errorMessage && (
        <ErrorMessage
          className={cx(`dropzone__error`)}
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
};

export default DropZone;
