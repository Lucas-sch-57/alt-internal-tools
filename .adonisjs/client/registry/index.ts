/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'tools.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/tools',
    tokens: [{"old":"/api/tools","type":0,"val":"api","end":""},{"old":"/api/tools","type":0,"val":"tools","end":""}],
    types: placeholder as Registry['tools.index']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
