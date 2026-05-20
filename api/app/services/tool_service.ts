import Tool from '#models/tool'
import { DateTime } from 'luxon'
import {
  PaginatedToolsResponse,
  ToolDetailsResponse,
  ToolFilters,
  ToolItem,
  ToolMutationResponse,
} from '../types/tool.js'
import { getAvgSessionsTime } from '../helpers/metrics.ts'
import { CreateToolPayload, UpdateToolPayload } from '#validators/tool'
import { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import { Departments, ToolStatus } from '../enums/tools.ts'

export class ToolService {
  async getTools(filters: ToolFilters = {}): Promise<PaginatedToolsResponse> {
    const query = Tool.query().preload('category')
    const total = await this.getTotalTools()
    const page = filters.page ?? 1
    const limit = filters.limit ?? 20

    this.applyFilters(query, filters)

    const tools = await query.paginate(page, limit)
    const meta = tools.getMeta()
    return {
      tools: tools.all().map(this.formatTool),
      total,
      filtered: meta.total,
      pagination: {
        current_page: meta.currentPage,
        last_page: meta.lastPage,
        per_page: limit,
      },
    }
  }

  async getSingleTool(id: number): Promise<ToolDetailsResponse> {
    const tool = await Tool.query()
      .where('id', id)
      .preload('category')
      .preload('usageLogs', (q) => {
        q.where('session_date', '>=', DateTime.now().minus({ days: 30 }).toSQLDate())
      })
      .firstOrFail()

    return this.formatToolDetails(tool)
  }

  async getTotalTools(): Promise<number> {
    const result = await Tool.query().count('* as total').first()
    return Number(result?.$extras.total ?? 0)
  }

  async createTool(payload: CreateToolPayload): Promise<ToolMutationResponse> {
    const tool = await Tool.create(payload)
    await tool.refresh()
    await tool.load('category')

    return this.formatMutationResponse(tool)
  }

  async updateTool(payload: UpdateToolPayload, id: number): Promise<ToolMutationResponse> {
    const existingTool = await Tool.findOrFail(id)
    existingTool.merge(payload)
    await existingTool.save()
    await existingTool.load('category')

    return this.formatMutationResponse(existingTool)
  }

  private formatTool(tool: Tool): ToolItem {
    return {
      id: tool.id,
      name: tool.name,
      description: tool.description,
      vendor: tool.vendor,
      website_url: tool.websiteUrl,
      category: tool.category?.name ?? null,
      monthly_cost: Number(tool.monthlyCost),
      owner_department: tool.ownerDepartment as Departments,
      status: tool.status as ToolStatus,
      active_users_count: tool.activeUsersCount,
      created_at: tool.createdAt,
    }
  }

  private formatToolDetails(tool: Tool): ToolDetailsResponse {
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

  private applyFilters(query: ModelQueryBuilderContract<typeof Tool>, filters: ToolFilters) {
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
      query.whereHas('category', (q) => {
        q.where('name', filters.category!)
      })
    }

    if (filters.sort_by) {
      query.orderBy(filters.sort_by, filters.sort_order ?? 'asc')
    }
  }

  private formatMutationResponse(tool: Tool): ToolMutationResponse {
    return {
      ...this.formatTool(tool),
      updated_at: tool.updatedAt,
    }
  }
}
