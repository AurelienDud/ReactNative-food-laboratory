import { z } from 'zod';
import { projectNewFormSchema } from './schema';

export type ProjectNewFormValues = z.infer<typeof projectNewFormSchema>;
