import { ToolService } from '#services/tool_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { toolFiltersValidator } from '#validators/tool'
import { buildFiltersApplied } from '../helpers/filters.ts'
@inject()
export default class ToolsController {
  constructor(private toolService: ToolService) {}
  /**
   *
   * @param request - The request param from HttpContext
   * @returns
   */
  async index({ request }: HttpContext) {
    const filters = await request.validateUsing(toolFiltersValidator)
    const { tools, total, filtered, pagination } = await this.toolService.getTools(filters)
    const filters_applied = buildFiltersApplied(filters)

    return {
      data: tools,
      total,
      filtered,
      pagination,
      ...(Object.keys(filters_applied).length && { filters_applied }),
    }
  }
}
