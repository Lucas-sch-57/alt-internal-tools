import { ToolSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import Category from './category.ts'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import UsageLog from './usage_log.ts'

export default class Tool extends ToolSchema {
  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>

  @hasMany(() => UsageLog)
  declare usageLogs: HasMany<typeof UsageLog>
}
