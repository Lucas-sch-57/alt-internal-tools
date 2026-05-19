import vine from '@vinejs/vine'
export const analyticsFiltersValidator = vine.create({
  sort_by: vine.enum(['total_cost', 'department']).optional(),
  order: vine.enum(['asc', 'desc']).optional(),
  max_users: vine.number().min(0).optional(),
})
