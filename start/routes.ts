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
    router.get('tools', [ToolsController, 'index'])
  })
  .prefix('api')
