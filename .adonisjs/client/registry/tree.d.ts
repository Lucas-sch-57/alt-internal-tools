/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  tools: {
    index: typeof routes['tools.index']
    getSingle: typeof routes['tools.get_single']
  }
}
