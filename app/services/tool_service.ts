import Tool from '#models/tool'
import { DateTime } from 'luxon'
import { ToolFilters } from '../types/tool.js'
import { getAvgSessionsTime } from '../helpers/metrics.ts'
import { CreateToolPayload } from '#validators/tool'

export class ToolService {
  async getTools(filters: ToolFilters = {}) {
    const query = Tool.query().preload('category')
    const total = await this.getTotalTools()
    const page = filters.page ?? 1
    const limit = filters.limit ?? 20

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

    const tools = await query.paginate(page, limit)
    const meta = tools.getMeta()
    return {
      tools: tools.all().map(this.formatTool.bind(this)),
      total: Number(total?.$extras.total ?? 0),
      filtered: meta.total,
      pagination: {
        current_page: meta.currentPage,
        last_page: meta.lastPage,
        per_page: limit,
      },
    }
  }

  async getSingleTool(id: number) {
    const tool = await Tool.query()
      .where('id', id)
      .preload('category')
      .preload('usageLogs', (q) => {
        q.where('session_date', '>=', DateTime.now().minus({ days: 30 }).toSQLDate())
      })
      .firstOrFail()

    return this.formatToolDetails(tool)
  }

  async getTotalTools() {
    return Tool.query().count('* as total').first()
  }

  async createTool(payload: CreateToolPayload) {
    const tool = await Tool.create(payload)
    await tool.refresh()
    await tool.load('category')

    console.log(tool)
    return {
      ...this.formatTool(tool),
      updated_at: tool.updatedAt,
    }
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

  private formatToolDetails(tool: Tool) {
    const logs = tool.usageLogs ?? []

    return {
      ...this.formatTool(tool),
      usage_metrics: {
        last_30_days: {
          total_sessions: logs.length,
          avg_session_minutes: getAvgSessionsTime(logs),
        },
      },
    }
  }
}
