/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  tools: {
    index: typeof routes['tools.index']
    getSingle: typeof routes['tools.get_single']
    create: typeof routes['tools.create']
    update: typeof routes['tools.update']
  }
  analytics: {
    getDepartmentCosts: typeof routes['analytics.get_department_costs']
    getToolsByCategory: typeof routes['analytics.get_tools_by_category']
    getLowUsageTools: typeof routes['analytics.get_low_usage_tools']
    getExpensiveTools: typeof routes['analytics.get_expensive_tools']
    getVendorSummary: typeof routes['analytics.get_vendor_summary']
  }
}
