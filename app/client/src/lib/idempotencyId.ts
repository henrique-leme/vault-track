import ShortUniqueId from 'short-unique-id'

export function idempotentRouteId(uniqueId: string) {
  const time = new Date().getTime()
  const { randomUUID } = new ShortUniqueId({
    length: 8,
  })

  return `/${randomUUID()}-${time}-${uniqueId}`
}
