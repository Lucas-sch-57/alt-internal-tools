import { test } from '@japa/runner'
import { ToolService } from '#services/tool_service'
import testUtils from '@adonisjs/core/services/test_utils'
import Category from '#models/category'
import Tool from '#models/tool'
import { Departments } from '../../app/enums/tools.ts'

test.group('ToolService', (group) => {
  group.each.setup(() => testUtils.db().wrapInGlobalTransaction())

  test('getTools retourne tous les outils sans filtres', async ({ assert }) => {
    const service = new ToolService()
    const { tools, total } = await service.getTools()

    assert.isArray(tools)
    assert.isNumber(total)
    assert.isTrue(total > 0)
  })

  test('getTools filtre par département', async ({ assert }) => {
    const service = new ToolService()
    const { tools } = await service.getTools({ department: 'Engineering' })

    assert.isTrue(tools.every((t) => t.owner_department === 'Engineering'))
  })

  test('getTools filtre par coût min et max', async ({ assert }) => {
    const service = new ToolService()
    const { tools } = await service.getTools({ min_cost: 10, max_cost: 50 })

    assert.isTrue(tools.every((t) => t.monthly_cost >= 10 && t.monthly_cost <= 50))
  })

  test('getTools retourne tableau vide si aucun résultat', async ({ assert }) => {
    const service = new ToolService()
    const { tools, filtered } = await service.getTools({ department: 'undefined' as Departments })

    assert.isEmpty(tools)
    assert.equal(filtered, 0)
  })

  test('getToolById retourne le bon outil', async ({ assert }) => {
    const service = new ToolService()
    const category = await Category.create({
      name: `test_category ${Date.now()}`,
      description: 'Test category',
      colorHex: '#ffffff',
    })

    const created = await Tool.create({
      name: 'Slack',
      vendor: 'Slack Technologies',
      categoryId: category.id,
      monthlyCost: '8.0',
      activeUsersCount: 25,
      ownerDepartment: 'Engineering',
      status: 'active',
    })

    const tool = await service.getSingleTool(created.id)

    assert.equal(tool.id, created.id)
    assert.equal(tool.name, 'Slack')
  })

  test('getToolById lève une erreur si outil inexistant', async ({ assert }) => {
    const service = new ToolService()
    await assert.rejects(() => service.getSingleTool(9999))
  })
})
