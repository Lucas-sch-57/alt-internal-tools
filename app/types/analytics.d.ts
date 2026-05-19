import { ApiEmptyResponse } from '../helpers/response.ts'

export interface DepartmentCostItem {
  department: string
  total_cost: number
  tools_count: number
  total_users: number
  average_cost_per_tool: number
  cost_percentage: number
}

export interface DepartmentCostSummary {
  total_company_cost: number
  departments_count: number
  most_expensive_department: string | null
}

export interface DepartmentCostResponse {
  data: DepartmentCostItem[]
  summary: DepartmentCostSummary
}

export type EmptyDepartmentCostResponse = ApiEmptyResponse<
  'summary',
  {
    departments_count: number
    most_expensive_department: string | null
  }
>

export type WarningLevel = 'low' | 'medium' | 'high'

export type EfficiencyRating = 'excellent' | 'good' | 'average' | 'low'

export type VendorEfficiency = 'excellent' | 'good' | 'average' | 'poor'

export interface CategoryAnalyticsItem {
  category_name: string
  tools_count: number
  total_cost: number
  total_users: number
  percentage_of_budget: number
  average_cost_per_user: number
}

export interface CategoryAnalyticsResponse {
  data: CategoryAnalyticsItem[]
  message?: string
  insights: {
    most_expensive_category: string | null
    most_efficient_category: string | null
  }
}

export interface LowUsageToolItem {
  id: number
  name: string
  monthly_cost: number
  active_users_count: number
  cost_per_user: number
  department: string
  vendor: string
  warning_level: WarningLevel
  potential_action: string
}

export interface LowUsageToolsResponse {
  data: LowUsageToolItem[]
  message?: string
  savings_analysis: {
    total_underutilized_tools: number
    potential_monthly_savings: number
    potential_annual_savings: number
  }
}

export interface ExpensiveToolItem {
  id: number
  name: string
  monthly_cost: number
  active_users_count: number
  cost_per_user: number | null
  department: string
  vendor: string
  efficiency_rating: EfficiencyRating
}

export interface ExpensiveToolsResponse {
  data: ExpensiveToolItem[]
  message?: string
  analysis: {
    total_tools_analyzed: number
    avg_cost_per_user_company: number
    potential_savings_identified: number
  }
}

export interface VendorSummaryItem {
  vendor: string
  tools_count: number
  total_monthly_cost: number
  total_users: number
  departments: string
  average_cost_per_user: number | null
  vendor_efficiency: VendorEfficiency
}

export interface VendorSummaryResponse {
  data: VendorSummaryItem[]
  message?: string
  vendor_insights: {
    most_expensive_vendor: string | null
    most_efficient_vendor: string | null
    single_tool_vendors: number
  }
}
