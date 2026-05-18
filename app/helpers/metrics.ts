import UsageLog from '#models/usage_log'
export function getAvgSessionsTime(logs: UsageLog[]) {
  return logs.length
    ? Math.round(
        logs.reduce((sum, l) => sum + (l.usageMinutes ? l.usageMinutes : 0), 0) / logs.length
      )
    : 0
}
