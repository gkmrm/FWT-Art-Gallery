import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import cn from 'classnames/bind';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { ThemeType } from '@context/ThemeConext';
import { Button } from '@ui-components/Button';
import Input from '@ui-components/Input/Input';
import { InputPass } from '@ui-components/InputPass';

import styles from './AuthForm.module.scss';

const cx = cn.bind(styles);

const schema = z.object({
  email: z.coerce
    .string()
    .min(6, { message: 'Email address must be at least 6 characters long' })
    .max(36, {
      message:
        'The length of the email address should not exceed 36 characters',
    })
    .email({ message: 'Incorrect email address' }),

  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(36, { message: 'Password must be no more than 36 characters long' }),
});

type TAuthFormProps = {
  theme: ThemeType;
  variant: 'login' | 'signup';
  className?: string;
} & React.HTMLAttributes<HTMLFormElement>;

const AuthForm: React.FC<TAuthFormProps> = ({ theme, variant, className }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  return (
    <form
      className={cx(className, 'form')}
      onSubmit={handleSubmit((d) => console.log(d))}
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
