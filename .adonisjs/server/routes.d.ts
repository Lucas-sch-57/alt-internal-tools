import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'tools.index': { paramsTuple?: []; params?: {} }
    'tools.get_single': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tools.create': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'tools.index': { paramsTuple?: []; params?: {} }
    'tools.get_single': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'tools.index': { paramsTuple?: []; params?: {} }
    'tools.get_single': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'tools.create': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}