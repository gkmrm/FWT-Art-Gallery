import React, { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import cn from 'classnames/bind';
import { useForm } from 'react-hook-form';

import { ThemeType } from '@context/ThemeContext';
import authSchema from '@schemas/authSchema';
import { Button } from '@ui-components/Button';
import { Input } from '@ui-components/Input';
import { InputPass } from '@ui-components/InputPass';

import styles from './AuthForm.module.scss';

const cx = cn.bind(styles);

type TAuthFormProps = {
  theme: ThemeType;
  variant: 'login' | 'signup';
  className?: string;
  isReset: boolean;
  onCubmit: (username: string, password: string) => void;
} & React.HTMLAttributes<HTMLFormElement>;

const AuthForm: React.FC<TAuthFormProps> = ({
  theme,
  variant,
  className,
  onCubmit,
  isReset,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(authSchema),
    mode: 'onBlur',
  });

  useEffect(() => {
    if (isReset) {
      reset();
    }
  }, [isReset, reset]);

  return (
    <form
      className={cx(className, 'form')}
      // eslint-disable-next-line no-console
      onSubmit={handleSubmit((data) => {
        onCubmit(data.email, data.password);
        console.log(data);
      })}
    >
      <Input
        {...register('email')}
        labelName='Email'
        errorMessage={errors.email?.message as string}
        theme={theme}
      />
      <InputPass
        register={register('password')}
        labelName='Password'
        errorMessage={errors.password?.message as string}
        theme={theme}
        type='password'
      />
      <Button
        type='submit'
        variant='default'
        theme={theme}
        className={cx('form__button')}
      >
        {variant === 'login' ? 'log in' : 'sign up'}
      </Button>
    </form>
  );
};

export default AuthForm;
