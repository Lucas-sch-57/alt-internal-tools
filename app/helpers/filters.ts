import { ToolFilters } from '../types/tool.js'

export function buildFiltersApplied(filters: ToolFilters) {
  return Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== undefined))
}
