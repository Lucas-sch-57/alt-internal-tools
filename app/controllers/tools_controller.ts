import { ToolService } from '#services/tool_service'
import ToolTransformer from '#transformers/tool_transformer'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { ToolFilters } from '../types/tool.js'
@inject()
export default class ToolsController {
  constructor(private toolService: ToolService) {}
  async index({ serialize, request }: HttpContext) {
    const filters = request.qs() as ToolFilters
    const tools = await this.toolService.getTools({
      department: filters.department,
      status: filters.status,
      min_cost: filters.min_cost ? Number(filters.min_cost) : undefined,
      max_cost: filters.max_cost ? Number(filters.max_cost) : undefined,
      category: filters.category,
      sort_by: filters.sort_by,
      sort_order: filters.sort_order,
    })
    return serialize(ToolTransformer.transform(tools))
  }
}
