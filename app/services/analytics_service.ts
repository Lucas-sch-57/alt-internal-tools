import db from '@adonisjs/lucid/services/db'

export class AnalyticsService {
  async getDepartmentTotalCost(
    sortBy: 'total_cost' | 'department' = 'total_cost',
    order: 'asc' | 'desc' = 'desc'
  ) {
    const rows = await db
      .from('tools')
      .where('status', 'active')
      .groupBy('owner_department')
      .select(
        'owner_department as department',
        db.raw('ROUND(SUM(monthly_cost),2) as total_cost'),
        db.raw('COUNT(*) as tools_count'),
        db.raw('SUM(active_users_count) as total_users')
      )
      .orderBy(sortBy, order)

    const totalCompanyCost = rows.reduce((sum, r) => sum + Number(r.total_cost), 0)
    const data = rows.map((r) => {
      const totalCost = Number(r.total_cost)
      const toolsCount = Number(r.tools_count)
      const totalUsers = Number(r.total_users)

      return {
        department: r.department,
        total_cost: totalCost,
        tools_count: toolsCount,
        total_users: totalUsers,
        average_cost_per_tool: this.avgCostPerTool(toolsCount, totalCost),
        cost_percentage: this.costPercentage(totalCompanyCost, totalCost),
      }
    })

    const mostExpensive = [...data].sort((a, b) => {
      return b.total_cost - a.total_cost
    })[0]

    return {
      data,
      summary: {
        total_company_cost: Math.round(totalCompanyCost * 100) / 100,
        departments_count: data.length,
        most_expensive_department: mostExpensive.department,
      },
    }
  }

  private avgCostPerTool(toolsCount: number, totalCost: number) {
    return toolsCount > 0 ? Math.round((totalCost / toolsCount) * 100) / 100 : 0
  }

  private costPercentage(totalCompanyCost: number, totalCost: number) {
    return totalCompanyCost > 0 ? Math.round((totalCost / totalCompanyCost) * 1000) / 10 : 0
  }
}
