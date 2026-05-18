import { ToolService } from '#services/tool_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { createToolValidator, toolFiltersValidator, updateToolValidator } from '#validators/tool'
import { buildFiltersApplied } from '../helpers/filters.ts'
@inject()
export default class ToolsController {
  constructor(private toolService: ToolService) {}
  /**
   * @index
   * @summary Get tools list
   * @description Retrieve a paginated and filtered list of tools
   *
   * @requestQuery <toolFiltersValidator>
   *
   * @responseBody 200 - {
   *   "data": [
   *     {
   *       "id": 1,
   *       "name": "Linear",
   *       "vendor": "Linear",
   *       "monthly_cost": 8
   *     }
   *   ],
   *   "total": 24,
   *   "filtered": 5,
   *   "pagination": {
   *     "page": 1,
   *     "limit": 10,
   *     "total_pages": 3
   *   },
   *   "filters_applied": {
   *     "department": "Engineering"
   *   }
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

  /**
   * @show
   * @summary Get single tool
   * @description Retrieve a tool by its ID
   *
   * @paramPath id - Tool ID
   *
   * @responseBody 200 - <Tool>
   */
  async getSingle({ params }: HttpContext) {
    const id = params.id
    return await this.toolService.getSingleTool(id)
  }
  /**
   * @create
   * @summary Create tool
   * @description Create a tool and return its data
   *
   * @requestBody <createToolValidator>
   *
   * @responseBody 201 - <Tool>
   */
  async create({ request }: HttpContext) {
    const payload = await request.validateUsing(createToolValidator)
    const tool = await this.toolService.createTool(payload)
    return {
      data: tool,
    }
  }
  /**
   * @update
   * @summary Update tool
   *
   * @requestBody <updateToolValidator>
   *
   * @responseBody 200 - <Tool>
   */
  async update({ request, params }: HttpContext) {
    const payload = await request.validateUsing(updateToolValidator)
    const tool = await this.toolService.updateTool(payload, params.id)
    return {
      data: tool,
    }
  }
}
