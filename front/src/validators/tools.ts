import { z } from 'zod';

export const createToolSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  description: z.string().optional(),
  vendor: z.string().min(1, 'Vendor is required').max(100),
  website_url: z.url('Must be a valid URL').optional().or(z.literal('')),
  category: z.string().min(1, 'Category is required'),
  owner_department: z.enum(
    [
      'Engineering',
      'Sales',
      'Marketing',
      'HR',
      'Finance',
      'Operations',
      'Design',
    ],
    { error: 'Please select a valid department' }
  ),
  monthly_cost: z.coerce.number().min(0, 'Cost must be positive'),
  status: z.enum(['active', 'unused', 'expiring']).default('active'),
});

export type ToolFormData = z.infer<typeof createToolSchema>;
