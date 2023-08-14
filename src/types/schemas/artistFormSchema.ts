import { z } from 'zod';

import imageSchema from './imageSchema';

const artistSchema = z.object({
  avatar: imageSchema,
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

export default artistSchema;
