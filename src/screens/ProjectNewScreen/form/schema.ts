import { z } from 'zod';

export const projectNewFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  created_at: z.date(),
});
