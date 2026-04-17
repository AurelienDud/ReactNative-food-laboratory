import { z } from 'zod';
import { projectStepNewFormSchema } from './schema';

export type ProjectStepNewFormValues = z.infer<typeof projectStepNewFormSchema>;
