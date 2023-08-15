import { z } from 'zod';

import imageSchema from './imageSchema';

const paintFormSchema = z.object({
  paint: imageSchema,
  name: z
    .string()
    .min(4, { message: 'Name must contain at least 4 characters' })
    .max(60, {
      message: 'Name must contain at most 60 characters',
    }),
  years: z
    .string()
    .min(4, { message: 'Min 4 num' })
    .max(36, { message: 'Max 36 number' }),
});

export default paintFormSchema;
