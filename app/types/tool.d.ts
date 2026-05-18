import Tool from '#models/tool'

export interface ToolFilters {
  department?: string
  status?: string
  min_cost?: number
  max_cost?: number
  category?: string
  // pagination
  page?: number
  limit?: number
  // tri
  sort_by?: 'monthly_cost' | 'name' | 'created_at'
  sort_order?: 'asc' | 'desc'
}

export interface FormattedTool {
  id: number
  name: string
  website_url: string | null
  category: string | null
  monthly_cost: number
  owner_department: string
  status: string
  active_users_count: number
  created_at: DateTime
}
