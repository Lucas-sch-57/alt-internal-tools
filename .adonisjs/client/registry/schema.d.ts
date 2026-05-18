/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'tools.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/tools'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/tool').toolFiltersValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tools_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tools_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'tools.get_single': {
    methods: ["GET","HEAD"]
    pattern: '/api/tools/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tools_controller').default['getSingle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tools_controller').default['getSingle']>>>
    }
  }
  'tools.create': {
    methods: ["POST"]
    pattern: '/api/tools'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/tool').createToolValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/tool').createToolValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tools_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tools_controller').default['create']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'tools.update': {
    methods: ["PUT"]
    pattern: '/api/tools/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/tool').updateToolValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/tool').updateToolValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tools_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tools_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
}
