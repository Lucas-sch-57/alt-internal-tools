import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

import Tool from '#models/tool'
import Category from '#models/category'

import { AnalyticsService } from '#services/analytics_service'

test.group('AnalyticsService', (group) => {
  group.each.setup(() => testUtils.db().wrapInGlobalTransaction())

  test('getDepartmentTotalCost retourne les coûts par département', async ({ assert }) => {
    const category = await Category.create({
      name: `Analytics-${Date.now()}`,
      description: 'Analytics category',
      colorHex: '#ffffff',
    })

    await Tool.createMany([
      {
        name: 'Slack',
        vendor: 'Slack',
        categoryId: category.id,
        monthlyCost: '100',
        activeUsersCount: 10,
        ownerDepartment: 'Engineering',
        status: 'active',
      },
      {
        name: 'Notion',
        vendor: 'Notion',
        categoryId: category.id,
        monthlyCost: '50',
        activeUsersCount: 5,
        ownerDepartment: 'Marketing',
        status: 'active',
      },
    ])

    const service = new AnalyticsService()

    const result = await service.getDepartmentTotalCost()

    assert.isArray(result.data)
    assert.exists(result.summary)

    assert.isTrue(result.data.some((d) => d.department === 'Engineering'))

    assert.properties(result.data[0], [
      'department',
      'total_cost',
      'tools_count',
      'total_users',
      'average_cost_per_tool',
      'cost_percentage',
    ])
  })

  test('getDepartmentTotalCost trie les départements par coût décroissant', async ({ assert }) => {
    const category = await Category.create({
      name: `Sorting-${Date.now()}`,
      description: 'Sorting category',
      colorHex: '#ffffff',
    })

    await Tool.createMany([
      {
        name: 'Expensive Tool',
        vendor: 'Vendor',
        categoryId: category.id,
        monthlyCost: '200',
        activeUsersCount: 10,
        ownerDepartment: 'Engineering',
        status: 'active',
      },
      {
        name: 'Cheap Tool',
        vendor: 'Vendor',
        categoryId: category.id,
        monthlyCost: '50',
        activeUsersCount: 10,
        ownerDepartment: 'HR',
        status: 'active',
      },
    ])

    const service = new AnalyticsService()

    const result = await service.getDepartmentTotalCost()

    assert.isAtLeast(result.data[0].total_cost, result.data[1].total_cost)
  })

  test('getToolsByCategory retourne les analytics catégories', async ({ assert }) => {
    const category = await Category.create({
      name: `Category-${Date.now()}`,
      description: 'Category test',
      colorHex: '#ffffff',
    })

    await Tool.create({
      name: 'Figma',
      vendor: 'Figma',
      categoryId: category.id,
      monthlyCost: '80',
      activeUsersCount: 8,
      ownerDepartment: 'Design',
      status: 'active',
    })

    const service = new AnalyticsService()

    const result = await service.getToolsByCategory()

    assert.isArray(result.data)
    assert.exists(result.insights)

    assert.isTrue(result.data.some((c) => c.category_name === category.name))

    assert.properties(result.data[0], [
      'category_name',
      'tools_count',
      'total_cost',
      'total_users',
      'percentage_of_budget',
      'average_cost_per_user',
    ])
  })

  test('getLowUsageTools retourne uniquement les outils sous le max_user', async ({ assert }) => {
    const category = await Category.create({
      name: `LowUsage-${Date.now()}`,
      description: 'Low usage category',
      colorHex: '#ffffff',
    })

    await Tool.createMany([
      {
        name: 'Unused Tool',
        vendor: 'Vendor',
        categoryId: category.id,
        monthlyCost: '100',
        activeUsersCount: 2,
        ownerDepartment: 'Engineering',
        status: 'active',
      },
      {
        name: 'Popular Tool',
        vendor: 'Vendor',
        categoryId: category.id,
        monthlyCost: '100',
        activeUsersCount: 50,
        ownerDepartment: 'Engineering',
        status: 'active',
      },
    ])

    const service = new AnalyticsService()

    const result = await service.getLowUsageTools(5)

    assert.isTrue(result.data.every((tool) => tool.active_users_count <= 5))
  })

  test('getLowUsageTools calcule les économies potentielles', async ({ assert }) => {
    const category = await Category.create({
      name: `Savings-${Date.now()}`,
      description: 'Savings category',
      colorHex: '#ffffff',
    })

    await Tool.create({
      name: 'Very Expensive Tool',
      vendor: 'Vendor',
      categoryId: category.id,
      monthlyCost: '500',
      activeUsersCount: 1,
      ownerDepartment: 'Finance',
      status: 'active',
    })

    const service = new AnalyticsService()

    const result = await service.getLowUsageTools()

    assert.isNumber(result.savings_analysis.potential_monthly_savings)

    assert.isNumber(result.savings_analysis.potential_annual_savings)

    assert.isTrue(result.savings_analysis.potential_monthly_savings > 0)
  })

  test('getExpensiveTools respecte le min_cost en parametre', async ({ assert }) => {
    const category = await Category.create({
      name: `Expensive-${Date.now()}`,
      description: 'Expensive category',
      colorHex: '#ffffff',
    })

    await Tool.createMany([
      {
        name: 'Cheap Tool',
        vendor: 'Vendor',
        categoryId: category.id,
        monthlyCost: '20',
        activeUsersCount: 5,
        ownerDepartment: 'HR',
        status: 'active',
      },
      {
        name: 'Expensive Tool',
        vendor: 'Vendor',
        categoryId: category.id,
        monthlyCost: '200',
        activeUsersCount: 5,
        ownerDepartment: 'Engineering',
        status: 'active',
      },
    ])

    const service = new AnalyticsService()

    const result = await service.getExpensiveTools(100)

    assert.isTrue(result.data.every((tool) => tool.monthly_cost >= 100))
  })

  test('getExpensiveTools respecte limit passée en parametre', async ({ assert }) => {
    const service = new AnalyticsService()

    const result = await service.getExpensiveTools(undefined, 2)

    assert.isAtMost(result.data.length, 2)
  })

  test('getVendorSummary retourne les analytics vendors', async ({ assert }) => {
    const category = await Category.create({
      name: `Vendor-${Date.now()}`,
      description: 'Vendor category',
      colorHex: '#ffffff',
    })

    await Tool.create({
      name: 'Linear',
      vendor: 'Linear',
      categoryId: category.id,
      monthlyCost: '120',
      activeUsersCount: 12,
      ownerDepartment: 'Engineering',
      status: 'active',
    })

    const service = new AnalyticsService()

    const result = await service.getVendorSummary()

    assert.isArray(result.data)
    assert.exists(result.vendor_insights)

    assert.isTrue(result.data.some((v) => v.vendor === 'Linear'))

    assert.properties(result.data[0], [
      'vendor',
      'tools_count',
      'total_monthly_cost',
      'total_users',
      'departments',
      'average_cost_per_user',
      'vendor_efficiency',
    ])
  })

  test('getVendorSummary trie les vendors par coût décroissant', async ({ assert }) => {
    const category = await Category.create({
      name: `VendorSorting-${Date.now()}`,
      description: 'Vendor sorting',
      colorHex: '#ffffff',
    })

    await Tool.createMany([
      {
        name: 'Cheap Vendor Tool',
        vendor: 'CheapVendor',
        categoryId: category.id,
        monthlyCost: '20',
        activeUsersCount: 5,
        ownerDepartment: 'HR',
        status: 'active',
      },
      {
        name: 'Expensive Vendor Tool',
        vendor: 'ExpensiveVendor',
        categoryId: category.id,
        monthlyCost: '500',
        activeUsersCount: 5,
        ownerDepartment: 'Engineering',
        status: 'active',
      },
    ])

    const service = new AnalyticsService()

    const result = await service.getVendorSummary()

    assert.isAtLeast(result.data[0].total_monthly_cost, result.data[1].total_monthly_cost)
  })
})
