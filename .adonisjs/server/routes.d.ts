import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'tools.index': { paramsTuple?: []; params?: {} }
    'tools.get_single': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tools.create': { paramsTuple?: []; params?: {} }
    'tools.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'analytics.get_department_costs': { paramsTuple?: []; params?: {} }
    'analytics.get_tools_by_category': { paramsTuple?: []; params?: {} }
    'analytics.get_low_usage_tools': { paramsTuple?: []; params?: {} }
    'analytics.get_expensive_tools': { paramsTuple?: []; params?: {} }
    'analytics.get_vendor_summary': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'tools.index': { paramsTuple?: []; params?: {} }
    'tools.get_single': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'analytics.get_department_costs': { paramsTuple?: []; params?: {} }
    'analytics.get_tools_by_category': { paramsTuple?: []; params?: {} }
    'analytics.get_low_usage_tools': { paramsTuple?: []; params?: {} }
    'analytics.get_expensive_tools': { paramsTuple?: []; params?: {} }
    'analytics.get_vendor_summary': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'tools.index': { paramsTuple?: []; params?: {} }
    'tools.get_single': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'analytics.get_department_costs': { paramsTuple?: []; params?: {} }
    'analytics.get_tools_by_category': { paramsTuple?: []; params?: {} }
    'analytics.get_low_usage_tools': { paramsTuple?: []; params?: {} }
    'analytics.get_expensive_tools': { paramsTuple?: []; params?: {} }
    'analytics.get_vendor_summary': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'tools.create': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'tools.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}