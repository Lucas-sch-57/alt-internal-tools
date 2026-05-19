import { AnalyticsService } from '#services/analytics_service'
import { analyticsFiltersValidator } from '#validators/analytics'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
@inject()
export default class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}
  async getDepartmentCosts({ request }: HttpContext) {
    const { sort_by, order } = await request.validateUsing(analyticsFiltersValidator)
    const result = await this.analyticsService.getDepartmentTotalCost(sort_by, order)
    return result
  }

  async getToolsByCategory() {
    return this.analyticsService.getToolsByCategory()
  }
}
