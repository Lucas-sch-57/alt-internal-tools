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
  'tools.get_single': {
    methods: ["GET","HEAD"],
    pattern: '/api/tools/:id',
    tokens: [{"old":"/api/tools/:id","type":0,"val":"api","end":""},{"old":"/api/tools/:id","type":0,"val":"tools","end":""},{"old":"/api/tools/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['tools.get_single']['types'],
  },
  'tools.create': {
    methods: ["POST"],
    pattern: '/api/tools',
    tokens: [{"old":"/api/tools","type":0,"val":"api","end":""},{"old":"/api/tools","type":0,"val":"tools","end":""}],
    types: placeholder as Registry['tools.create']['types'],
  },
  'tools.update': {
    methods: ["PUT"],
    pattern: '/api/tools/:id',
    tokens: [{"old":"/api/tools/:id","type":0,"val":"api","end":""},{"old":"/api/tools/:id","type":0,"val":"tools","end":""},{"old":"/api/tools/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['tools.update']['types'],
  },
  'analytics.get_department_costs': {
    methods: ["GET","HEAD"],
    pattern: '/api/analytics/department-costs',
    tokens: [{"old":"/api/analytics/department-costs","type":0,"val":"api","end":""},{"old":"/api/analytics/department-costs","type":0,"val":"analytics","end":""},{"old":"/api/analytics/department-costs","type":0,"val":"department-costs","end":""}],
    types: placeholder as Registry['analytics.get_department_costs']['types'],
  },
  'analytics.get_tools_by_category': {
    methods: ["GET","HEAD"],
    pattern: '/api/analytics/tools-by-category',
    tokens: [{"old":"/api/analytics/tools-by-category","type":0,"val":"api","end":""},{"old":"/api/analytics/tools-by-category","type":0,"val":"analytics","end":""},{"old":"/api/analytics/tools-by-category","type":0,"val":"tools-by-category","end":""}],
    types: placeholder as Registry['analytics.get_tools_by_category']['types'],
  },
  'analytics.get_low_usage_tools': {
    methods: ["GET","HEAD"],
    pattern: '/api/analytics/low-usage-tools',
    tokens: [{"old":"/api/analytics/low-usage-tools","type":0,"val":"api","end":""},{"old":"/api/analytics/low-usage-tools","type":0,"val":"analytics","end":""},{"old":"/api/analytics/low-usage-tools","type":0,"val":"low-usage-tools","end":""}],
    types: placeholder as Registry['analytics.get_low_usage_tools']['types'],
  },
  'analytics.get_expensive_tools': {
    methods: ["GET","HEAD"],
    pattern: '/api/analytics/expensive-tools',
    tokens: [{"old":"/api/analytics/expensive-tools","type":0,"val":"api","end":""},{"old":"/api/analytics/expensive-tools","type":0,"val":"analytics","end":""},{"old":"/api/analytics/expensive-tools","type":0,"val":"expensive-tools","end":""}],
    types: placeholder as Registry['analytics.get_expensive_tools']['types'],
  },
  'analytics.get_vendor_summary': {
    methods: ["GET","HEAD"],
    pattern: '/api/analytics/vendor-summary',
    tokens: [{"old":"/api/analytics/vendor-summary","type":0,"val":"api","end":""},{"old":"/api/analytics/vendor-summary","type":0,"val":"analytics","end":""},{"old":"/api/analytics/vendor-summary","type":0,"val":"vendor-summary","end":""}],
    types: placeholder as Registry['analytics.get_vendor_summary']['types'],
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
