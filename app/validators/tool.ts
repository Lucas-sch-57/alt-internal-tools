import vine from '@vinejs/vine'

export const toolFiltersValidator = vine.compile(
  vine.object({
    department: vine
      .enum(['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations', 'Design'])
      .optional(),
    status: vine.enum(['active', 'deprecated', 'trial']).optional(),
    min_cost: vine.number().min(0).optional(),
    max_cost: vine.number().min(0).optional(),
    category: vine.string().optional(),
    sort_by: vine.enum(['monthly_cost', 'name', 'created_at']).optional(),
    sort_order: vine.enum(['asc', 'desc']).optional(),
    page: vine.number().min(1).optional(),
    limit: vine.number().min(1).max(100).optional(),
  })
)
