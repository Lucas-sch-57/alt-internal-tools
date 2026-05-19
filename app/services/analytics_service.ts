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
      return b.total_cost !== a.total_cost
        ? b.total_cost - a.total_cost
        : a.department.localeCompare(b.department)
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

  async getToolsByCategory() {
    const rows = await db
      .query()
      .from('tools')
      .join('categories', 'tools.category_id', 'categories.id')
      .where('tools.status', 'active')
      .groupBy('categories.id', 'categories.name')
      .select(
        'categories.name as category_name',
        db.raw('COUNT(*) as tools_count'),
        db.raw('ROUND(SUM(tools.monthly_cost),2) as total_cost'),
        db.raw('SUM(tools.active_users_count) as total_users')
      )
      .orderBy('total_cost', 'desc')

    const totalCompanyCost = rows.reduce((sum, r) => sum + Number(r.total_cost), 0)

    const data = rows.map((r) => {
      const totalCost = Number(r.total_cost)
      const totalUsers = Number(r.total_users)

      return {
        category_name: r.category_name,
        tools_count: Number(r.tools_count),
        total_cost: totalCost,
        total_users: totalUsers,
        percentage_of_budget: this.costPercentage(totalCompanyCost, totalCost),
        average_cost_per_user: this.avgCostPerUser(totalCost, totalUsers),
      }
    })

    // most_efficient = plus bas average_cost_per_user (sans les 0 users)
    const withUsers = data.filter((r) => r.total_users > 0)
    const mostEfficient = [...withUsers].sort((a, b) =>
      a.average_cost_per_user !== b.average_cost_per_user
        ? a.average_cost_per_user - b.average_cost_per_user
        : a.category_name.localeCompare(b.category_name)
    )[0]

    const mostExpensive = data[0]

    return {
      data,
      insights: {
        most_expensive_category: mostExpensive?.category_name ?? null,
        most_efficient_category: mostEfficient?.category_name ?? null,
      },
    }
  }

  private avgCostPerUser(totalCost: number, totalUsers: number) {
    return totalUsers > 0 ? Math.round((totalCost / totalUsers) * 100) / 100 : 0
  }

  private avgCostPerTool(toolsCount: number, totalCost: number) {
    return toolsCount > 0 ? Math.round((totalCost / toolsCount) * 100) / 100 : 0
  }

  private costPercentage(totalCompanyCost: number, totalCost: number) {
    return totalCompanyCost > 0 ? Math.round((totalCost / totalCompanyCost) * 1000) / 10 : 0
  }
}
