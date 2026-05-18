import { ToolService } from '#services/tool_service'
import ToolTransformer from '#transformers/tool_transformer'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
@inject()
export default class ToolsController {
  constructor(private toolService: ToolService) {}
  async index({ response, serialize }: HttpContext) {
    const tools = await this.toolService.getTools()
    return serialize(ToolTransformer.transform(tools))
  }
}
