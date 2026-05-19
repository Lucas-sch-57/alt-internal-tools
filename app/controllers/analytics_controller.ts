import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { AnalyticsService } from '#services/analytics_service'
import { analyticsFiltersValidator } from '#validators/analytics'

@inject()
export default class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  /**
   * @departmentCosts
   * @summary Get costs by department
   * @description Returns cost breakdown per department with percentages, averages and summary. Only includes active tools.
   * @paramQuery sort_by - Sort by field - @type(string)
   * @paramQuery order_by - Order direction - @type(string)
   * @responseBody 200 - {
   *   "data": [
   *     {
   *       "department": "Engineering",
   *       "total_cost": 209.00,
   *       "tools_count": 7,
   *       "total_users": 69,
   *       "average_cost_per_tool": 29.86,
   *       "cost_percentage": 26.3
   *     }
   *   ],
   *   "summary": {
   *     "total_company_cost": 795.14,
   *     "departments_count": 7,
   *     "most_expensive_department": "Marketing"
   *   }
   * }
   * @responseBody 200 - { "data": [], "message": "No analytics data available - ensure tools data exists", "summary": { "total_company_cost": 0 } }
   */
  async departmentCosts({ request }: HttpContext) {
    const { sort_by, order } = await request.validateUsing(analyticsFiltersValidator)
    return this.analyticsService.getDepartmentTotalCost(sort_by, order)
  }

  /**
   * @expensiveTools
   * @summary Get most expensive tools
   * @description Returns top costly tools with efficiency rating based on cost per user vs company average. Only active tools.
   * @paramQuery limit - The limit number of the query - @type(string)
   * @paramQuery min_cost - The min monthly_cost - @type(number)
   * @responseBody 200 - {
   *   "data": [
   *     {
   *       "id": 21,
   *       "name": "Specialized Analytics Pro",
   *       "monthly_cost": 159.99,
   *       "active_users_count": 1,
   *       "cost_per_user": 159.99,
   *       "department": "Marketing",
   *       "vendor": "DataCorp",
   *       "efficiency_rating": "low"
   *     }
   *   ],
   *   "analysis": {
   *     "total_tools_analyzed": 24,
   *     "avg_cost_per_user_company": 3.13,
   *     "potential_savings_identified": 544.98
   *   }
   * }
   * @responseBody 400 - { "error": "Invalid analytics parameter", "details": { "limit": "Must be positive integer between 1 and 100" } }
   */
  async expensiveTools({ request }: HttpContext) {
    const { limit, min_cost } = await request.validateUsing(analyticsFiltersValidator)
    return this.analyticsService.getExpensiveTools(min_cost, limit)
  }

  /**
   * @toolsByCategory
   * @summary Get tools breakdown by category
   * @description Returns tool distribution across categories with budget percentages and efficiency insights. Only active tools.
   *
   * @responseBody 200 - {
   *   "data": [
   *     {
   *       "category_name": "Analytics",
   *       "tools_count": 3,
   *       "total_cost": 229.99,
   *       "total_users": 16,
   *       "percentage_of_budget": 28.9,
   *       "average_cost_per_user": 14.37
   *     }
   *   ],
   *   "insights": {
   *     "most_expensive_category": "Analytics",
   *     "most_efficient_category": "Productivity"
   *   }
   * }
   */
  async toolsByCategory({}: HttpContext) {
    return this.analyticsService.getToolsByCategory()
  }

  /**
   * @lowUsageTools
   * @summary Get underutilized tools
   * @description Returns tools with low active users count, with warning levels and potential savings analysis. Only active tools.
   * @paramQuery max_users - The max active_users_count in tool - @type(number)
   * @responseBody 200 - {
   *   "data": [
   *     {
   *       "id": 21,
   *       "name": "Specialized Analytics Pro",
   *       "monthly_cost": 159.99,
   *       "active_users_count": 1,
   *       "cost_per_user": 159.99,
   *       "department": "Marketing",
   *       "vendor": "DataCorp",
   *       "warning_level": "high",
   *       "potential_action": "Consider canceling or downgrading"
   *     }
   *   ],
   *   "savings_analysis": {
   *     "total_underutilized_tools": 11,
   *     "potential_monthly_savings": 589.98,
   *     "potential_annual_savings": 7079.76
   *   }
   * }
   * @responseBody 400 - { "error": "Invalid analytics parameter", "details": { "max_users": "Must be a positive integer" } }
   */
  async lowUsageTools({ request }: HttpContext) {
    const { max_users } = await request.validateUsing(analyticsFiltersValidator)
    return this.analyticsService.getLowUsageTools(max_users)
  }

  /**
   * @vendorSummary
   * @summary Get vendor analysis
   * @description Returns cost and efficiency breakdown per vendor with department distribution and consolidation opportunities. Only active tools.
   *
   * @responseBody 200 - {
   *   "data": [
   *     {
   *       "vendor": "DataCorp",
   *       "tools_count": 1,
   *       "total_monthly_cost": 159.99,
   *       "total_users": 1,
   *       "departments": "Marketing",
   *       "average_cost_per_user": 159.99,
   *       "vendor_efficiency": "poor"
   *     }
   *   ],
   *   "vendor_insights": {
   *     "most_expensive_vendor": "DataCorp",
   *     "most_efficient_vendor": "Okta Inc.",
   *     "single_tool_vendors": 20
   *   }
   * }
   */
  async vendorSummary({}: HttpContext) {
    return this.analyticsService.getVendorSummary()
  }
}
