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
    departmentCosts: typeof routes['analytics.department_costs']
    toolsByCategory: typeof routes['analytics.tools_by_category']
    lowUsageTools: typeof routes['analytics.low_usage_tools']
    expensiveTools: typeof routes['analytics.expensive_tools']
    vendorSummary: typeof routes['analytics.vendor_summary']
  }
}
