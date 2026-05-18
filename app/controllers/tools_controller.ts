import { ToolService } from '#services/tool_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { toolFiltersValidator } from '#validators/tool'
import { buildFiltersApplied } from '../helpers/filters.ts'
@inject()
export default class ToolsController {
  constructor(private toolService: ToolService) {}
  /**
   * Retrieves a paginated and filtered list of tools.
   *
   * Supports filtering by department, status, cost range, and category.
   * Returns the total count of all tools, the count after filters are applied,
   * and the active filters for transparency.
   *
   * @param ctx - The HTTP context containing the request object
   * @param ctx.request - Used to extract and validate query parameters
   *
   * @returns A JSON response containing:
   * - `data` - The list of tools matching the filters
   * - `total` - Total number of tools in the database (unfiltered)
   * - `filtered` - Number of tools matching the applied filters
   * - `filters_applied` - The active filters (omitted if no filters provided)
   *
   * @example
   * GET /api/tools?department=Engineering&min_cost=10&max_cost=50
   * {
   *   "data": [...],
   *   "total": 24,
   *   "filtered": 5,
   *   "filters_applied": { "department": "Engineering", "min_cost": 10, "max_cost": 50 }
   * }
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
  
  async getSingle({ params }: HttpContext) {
    const id = params.id
    return await this.toolService.getSingleTool(id)
  }
}
