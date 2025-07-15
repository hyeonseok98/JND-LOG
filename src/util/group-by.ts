export function groupBy<T, K extends PropertyKey>(list: T[], fn: (item: T) => K) {
  return list.reduce((acc, cur) => {
    const key = fn(cur);
    (acc[key] = acc[key] || []).push(cur);
    return acc;
  }, {} as Record<K, T[]>);
}
