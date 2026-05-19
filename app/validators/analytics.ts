import vine from '@vinejs/vine'
export const analyticsFiltersValidator = vine.create({
  sort_by: vine.enum(['total_cost', 'department']).optional(),
  order: vine.enum(['asc', 'desc']).optional(),
  max_users: vine.number().min(0).optional(),
  min_cost: vine.number().min(0).optional(),
  limit: vine.number().min(1).max(100).optional(),
})
