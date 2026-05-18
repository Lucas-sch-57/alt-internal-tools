import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const toolFiltersValidator = vine.create(
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

export const createToolValidator = vine.create({
  name: vine.string().minLength(2).maxLength(100).unique({ table: 'tools', column: 'name' }),
  description: vine.string().optional(),
  vendor: vine.string().minLength(1).maxLength(100),
  website_url: vine.string().minLength(1).maxLength(255).optional(),
  category_id: vine.number().min(1).exists({ table: 'categories', column: 'id' }),
  monthly_cost: vine.number().positive().decimal([0, 2]),
  owner_department: vine.enum([
    'Engineering',
    'Sales',
    'Marketing',
    'HR',
    'Finance',
    'Operations',
    'Design',
  ]),
})

export const updateToolValidator = vine.create({
  name: vine
    .string()
    .minLength(2)
    .maxLength(100)
    .unique({ table: 'tools', column: 'name' })
    .optional(),
  description: vine.string().optional(),
  vendor: vine.string().minLength(1).maxLength(100).optional(),
  website_url: vine.string().minLength(1).maxLength(255).optional(),
  category_id: vine.number().min(1).exists({ table: 'categories', column: 'id' }).optional(),
  monthly_cost: vine.number().positive().decimal([0, 2]).optional(),
  owner_department: vine
    .enum(['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations', 'Design'])
    .optional(),
  status: vine.enum(['active', 'deprecated', 'trial']),
})
export type CreateToolPayload = Infer<typeof createToolValidator>
export type UpdateToolPayload = Infer<typeof updateToolValidator>
