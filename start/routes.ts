/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'

const ToolsController = () => import('#controllers/tools_controller')
const AnalyticsController = () => import('#controllers/analytics_controller')

router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})
// Renders Swagger-UI and passes YAML-output of /swagger
router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger', swagger)
  // return AutoSwagger.default.scalar("/swagger"); to use Scalar instead. If you want, you can pass proxy url as second argument here.
  // return AutoSwagger.default.rapidoc("/swagger", "view"); to use RapiDoc instead (pass "view" default, or "read" to change the render-style)
})
router
  .group(() => {
    router
      .group(() => {
        router.get('/', [ToolsController, 'index'])
        router.get(':id', [ToolsController, 'getSingle'])
        router.post('/', [ToolsController, 'create'])
        router.put('/:id', [ToolsController, 'update'])
      })
      .prefix('tools')
    router
      .group(() => {
        router.get('/department-costs', [AnalyticsController, 'getDepartmentCosts'])
        router.get('tools-by-category', [AnalyticsController, 'getToolsByCategory'])
        router.get('low-usage-tools', [AnalyticsController, 'getLowUsageTools'])
        router.get('expensive-tools', [AnalyticsController, 'getExpensiveTools'])
        router.get('vendor-summary', [AnalyticsController, 'getVendorSummary'])
      })
      .prefix('analytics')
  })
  .prefix('api')
