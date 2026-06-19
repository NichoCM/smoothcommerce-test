/**
 * Universal comparison logic for JS types
 * @param a
 * @param b
 */
export function comparison(a: any, b: any): number {
  if (a == null && b == null) return 0
  if (a == null) return -1
  if (b == null) return 1

  if (typeof a === "string" && typeof b === "string") {
    return a.localeCompare(b)
  }

  if (typeof a === "number" && typeof b === "number") {
    return a - b
  }

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() - b.getTime()
  }

  if (typeof a === "boolean" && typeof b === "boolean") {
    return Number(a) - Number(b)
  }

  return String(a).localeCompare(String(b))
}
