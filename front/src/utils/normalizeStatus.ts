const VALID_STATUSES = ['active', 'unused', 'expiring'] as const;
type ToolStatus = (typeof VALID_STATUSES)[number];

export function normalizeStatus(status: string): ToolStatus {
  const normalized = status.toLowerCase();
  return VALID_STATUSES.includes(normalized as ToolStatus)
    ? (normalized as ToolStatus)
    : 'active';
}
