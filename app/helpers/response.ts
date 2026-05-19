export function emptyResponse(summaryKey: string, summaryData: Record<string, any> = {}) {
  return {
    data: [],
    message: 'No data available',
    [summaryKey]: summaryData,
  }
}
