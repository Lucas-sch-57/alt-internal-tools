export type ApiEmptyResponse<TKey extends string, TSummary> = {
  data: []
  message: string
} & {
  [K in TKey]: TSummary
}
export function emptyResponse<TKey extends string, TSummary extends Record<string, unknown>>(
  summaryKey: TKey,
  summaryData: TSummary
): ApiEmptyResponse<TKey, TSummary> {
  return {
    data: [],
    message: 'No data available',
    [summaryKey]: summaryData,
  } as ApiEmptyResponse<TKey, TSummary>
}
