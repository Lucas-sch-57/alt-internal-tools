import Tool from '#models/tool'

export class ToolService {
  async getTools() {
    return Tool.query().preload('category')
  }
}
