import Tool from '#models/tool'
import { Departments, ToolStatus } from '../enums/tools.ts'
export interface ToolFilters {
  department?: Departments
  status?: ToolStatus
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
  owner_department: Departments
  status: string
  active_users_count: number
  created_at: DateTime
}

export interface ToolItem {
  id: number
  name: string
  description: string | null
  vendor: string | null
  website_url: string | null
  category: string | null
  monthly_cost: number
  owner_department: Departments | null
  status: ToolStatus | null
  active_users_count: number
  created_at: DateTime | null
}
export interface ToolDetailsResponse extends ToolItem {
  usage_metrics: {
    last_30_days: {
      total_sessions: number
      avg_session_minutes: number
    }
  }
}

export interface PaginatedToolsResponse {
  tools: ToolItem[]
  total: number
  filtered: number
  pagination: {
    current_page: number
    last_page: number
    per_page: number
  }
}

export interface ToolMutationResponse extends ToolItem {
  updated_at: DateTime | null
}
