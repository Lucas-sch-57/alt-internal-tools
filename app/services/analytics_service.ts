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

  async getLowUsageTools(maxUsers: number = 5) {
    const rows = await db
      .query()
      .from('tools')
      .where('status', 'active')
      .where('active_users_count', '<=', maxUsers)
      .select(
        'id',
        'name',
        'monthly_cost',
        'active_users_count',
        'owner_department as department',
        'vendor'
      )
      .orderBy('monthly_cost', 'desc')

    const data = rows.map((r) => {
      const monthlyCost = Number(r.monthly_cost)
      const users = Number(r.active_users_count)
      const costPerUser = users > 0 ? Math.round((monthlyCost / users) * 100) / 100 : 0
      const warningLevel = this.getWarningLevel(users, costPerUser)
      return {
        id: r.id,
        name: r.name,
        monthly_cost: monthlyCost,
        active_users_count: users,
        cost_per_user: costPerUser,
        department: r.department,
        vendor: r.vendor,
        warning_level: warningLevel,
        potential_action: this.getPotentialAction(warningLevel),
      }
    })

    // savings = outils high + medium uniquement
    const potentialMonthlySavings =
      Math.round(
        data
          .filter((r) => r.warning_level === 'high' || r.warning_level === 'medium')
          .reduce((sum, r) => sum + r.monthly_cost, 0) * 100
      ) / 100

    return {
      data,
      savings_analysis: {
        total_underutilized_tools: data.length,
        potential_monthly_savings: potentialMonthlySavings,
        potential_annual_savings: Math.round(potentialMonthlySavings * 12 * 100) / 100,
      },
    }
  }

  async getExpensiveTools(minCost?: number, limit: number = 10) {
    const avgRow = await db
      .from('tools')
      .where('status', 'active')
      .where('active_users_count', '>', 0)
      .select(db.raw('SUM(monthly_cost)/SUM(active_users_count) as avg_cost_per_user'))
      .first()

    const avgCostPerUserCompany = Math.round(Number(avgRow.avg_cost_per_user ?? 0) * 100) / 100

    const rows = await db
      .from('tools')
      .where('status', 'active')
      .where((q) => {
        if (minCost !== undefined) {
          q.where('monthly_cost', '>=', minCost)
        }
      })
      .select(
        'id',
        'name',
        'monthly_cost',
        'active_users_count',
        'owner_department as department',
        'vendor'
      )
      .orderBy('monthly_cost', 'desc')
      .limit(limit)

    const totalAnalyzed = await db
      .from('tools')
      .where('status', 'active')
      .count('* as total')
      .first()

    const data = rows.map((r) => {
      const monthlyCost = Number(r.monthly_cost)
      const users = Number(r.active_users_count)
      const costPerUser = users > 0 ? Math.round((monthlyCost / users) * 100) / 100 : null
      const efficiencyRating = this.getEfficiencyRating(costPerUser, avgCostPerUserCompany)
      return {
        id: r.id,
        name: r.name,
        monthly_cost: monthlyCost,
        active_users_count: users,
        cost_per_user: costPerUser,
        department: r.department,
        vendor: r.vendor,
        efficiency_rating: efficiencyRating,
      }
    })

    const potentialSavings =
      Math.round(
        data
          .filter((r) => r.efficiency_rating === 'low')
          .reduce((sum, r) => sum + r.monthly_cost, 0) * 100
      ) / 100

    return {
      data,
      analysis: {
        total_tools_analyzed: Number(totalAnalyzed?.total ?? 0),
        avg_cost_per_user_company: avgCostPerUserCompany,
        potential_savings_identified: potentialSavings,
      },
    }
  }

  private getEfficiencyRating(
    costPerUser: number | null,
    avgCostPerUser: number
  ): 'excellent' | 'good' | 'average' | 'low' {
    if (costPerUser === null) return 'low' // 0 users = low
    const ratio = costPerUser / avgCostPerUser
    if (ratio < 0.5) return 'excellent'
    if (ratio < 0.8) return 'good'
    if (ratio <= 1.2) return 'average'
    return 'low'
  }

  private getWarningLevel(users: number, costPerUser: number | null): 'low' | 'medium' | 'high' {
    if (users === 0 || costPerUser === null) return 'high'
    if (costPerUser > 50) return 'high'
    if (costPerUser >= 20) return 'medium'
    return 'low'
  }

  private getPotentialAction(warningLevel: 'low' | 'medium' | 'high'): string {
    const actions = {
      high: 'Consider canceling or downgrading',
      medium: 'Review usage and consider optimization',
      low: 'Monitor usage trends',
    }
    return actions[warningLevel]
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
