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
