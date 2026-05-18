import { BaseTransformer } from '@adonisjs/core/transformers'
import Tool from '#models/tool'

export default class ToolTransformer extends BaseTransformer<Tool> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'name',
        'description',
        'vendor',
        'websiteUrl',
        'monthlyCost',
        'activeUsersCount',
        'ownerDepartment',
        'status',
        'createdAt',
        'updatedAt',
      ]),
      category: this.resource.category?.name ?? null,
    }
  }
}
