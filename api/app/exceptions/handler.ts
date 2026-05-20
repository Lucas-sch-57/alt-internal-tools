import app from '@adonisjs/core/services/app'
import { type HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import { errors } from '@adonisjs/lucid'

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: any, ctx: HttpContext) {
    const isAnalyticsRoute = ctx.request.url().startsWith('/api/analytics')
    if (error.code === 'E_VALIDATION_ERROR') {
      console.log(error.messages)
      const details = error.messages.reduce((acc: Record<string, string>, m: any) => {
        acc[m.field] = m.message
        return acc
      }, {})

      if (isAnalyticsRoute) {
        return ctx.response.badRequest({
          error: 'Invalid analytics parameter',
          details,
        })
      }

      return ctx.response.badRequest({
        error: 'Validation failed',
        details,
      })
    }

    // 404 Lucid
    if (error instanceof errors.E_ROW_NOT_FOUND) {
      const id = ctx.request.param('id')

      if (isAnalyticsRoute) {
        return ctx.response.notFound({
          error: 'Resource not found',
          message: 'The requested resource does not exist',
        })
      }

      return ctx.response.notFound({
        error: 'Tool not found',
        message: `Tool with ID ${id} does not exist`,
      })
    }

    // 500 fallback
    return ctx.response.internalServerError({
      error: 'Internal server error',
      message: app.inDev ? error.message : 'Database connection failed',
    })
  }

  /**
   * The method is used to report error to the logging service or
   * the a third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
