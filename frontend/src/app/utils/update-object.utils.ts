export function updateObject<T extends object>(target: T, source: Partial<T>, keysToUpdate: (keyof T)[]): void {
  for (const key of keysToUpdate) {
    if (key in source) {
      target[key] = source[key]!;
    }
  }
}

export function updateObjectExcluding<T extends object>(
  target: T,
  source: Partial<T>,
  excludeKeys: (keyof T)[]
): void {
  for (const key in source) {
    if (!excludeKeys.includes(key as keyof T)) {
      target[key] = source[key]!;
    }
  }
}

export function updateObjectExcludingId<T extends object>(
  target: T,
  source: Partial<T>
): void {
  updateObjectExcluding<T>(target, source, ["id"] as (keyof T)[])
}
