import Tool from '#models/tool'
import { ToolFilters } from '../types/tool.js'

export class ToolService {
  async getTools(filters: ToolFilters = {}) {
    const query = Tool.query().preload('category')
    const total = await this.getTotalTools()

    if (filters.department) {
      query.where('owner_department', filters.department)
    }
    if (filters.status) {
      query.where('status', filters.status)
    }
    if (filters.min_cost !== undefined) {
      query.where('monthly_cost', '>=', filters.min_cost)
    }
    if (filters.max_cost !== undefined) {
      query.where('monthly_cost', '<=', filters.max_cost)
    }
    if (filters.category) {
      query.whereHas('category', (q) => q.where('name', filters.category!))
    }
    if (filters.sort_by) {
      query.orderBy(filters.sort_by, filters.sort_order ?? 'asc')
    }

    const tools = await query

    return {
      tools: tools.map(this.formatTool),
      total: Number(total?.$extras.total ?? 0),
      filtered: tools.length,
    }
  }

  async getTotalTools() {
    return Tool.query().count('* as total').first()
  }

  private formatTool(tool: Tool) {
    return {
      id: tool.id,
      name: tool.name,
      description: tool.description,
      vendor: tool.vendor,
      website_url: tool.websiteUrl,
      category: tool.category?.name ?? null,
      monthly_cost: Number(tool.monthlyCost),
      owner_department: tool.ownerDepartment,
      status: tool.status,
      active_users_count: tool.activeUsersCount,
      created_at: tool.createdAt,
    }
  }
}
