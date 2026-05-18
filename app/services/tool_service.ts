import Tool from '#models/tool'
import { ToolFilters } from '../types/tool.js'

export class ToolService {
  async getTools(filters: ToolFilters = {}) {
    const query = Tool.query().preload('category')

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

    return query
  }
}
