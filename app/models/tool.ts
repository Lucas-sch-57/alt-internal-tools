import { ToolSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import Category from './category.ts'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Tool extends ToolSchema {
  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>
}
