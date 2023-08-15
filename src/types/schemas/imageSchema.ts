import { z } from 'zod';

const MAX_FILE_SIZE = 3145728;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const imageSchema = z
  .any()
  .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 3MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    'Only .jpg, .jpeg, .png formats are supported.'
  );

export default imageSchema;
