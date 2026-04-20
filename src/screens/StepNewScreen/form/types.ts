import { z } from 'zod';
import { stepNewFormSchema } from './schema';

export type StepNewFormValues = z.infer<typeof stepNewFormSchema>;
