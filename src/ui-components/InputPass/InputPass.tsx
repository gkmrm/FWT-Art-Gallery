import React from 'react';

import { UseFormRegisterReturn } from 'react-hook-form';

import { ReactComponent as EyeIconHide } from '@assets/icons/eye-hide_icon.svg';
import { ReactComponent as EyeIcon } from '@assets/icons/eye_icon.svg';
import { Input, TInputProps } from '@ui-components/Input';

type TInputPass = {
  register?: UseFormRegisterReturn<string>;
} & TInputProps;

const InputPass: React.FC<TInputPass> = ({
  labelName,
  errorMessage,
  theme,
  register,
}) => {
  const [isShow, setShow] = React.useState(false);

  const toggleShow = () => {
    setShow(!isShow);
  };

  return (
    <Input
      {...register}
      labelName={labelName}
      errorMessage={errorMessage}
      theme={theme}
      type={isShow ? 'text' : 'password'}
      inner={isShow ? <EyeIconHide /> : <EyeIcon />}
      onInnerClick={toggleShow}
    />
  );
};

export default InputPass;