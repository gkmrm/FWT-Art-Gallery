import { z } from 'zod';

const authSchema = z.object({
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

export default authSchema;
