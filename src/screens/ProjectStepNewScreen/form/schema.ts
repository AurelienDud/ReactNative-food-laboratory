import { z } from 'zod';

export const projectStepNewFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  occurred_at: z.date(),
})