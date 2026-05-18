/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
import ToolsController from '#controllers/tools_controller'
router
  .group(() => {
    router.get('/', [ToolsController, 'index'])
    router.get(':id', [ToolsController, 'getSingle'])
  })
  .prefix('tools')
  .prefix('api')
