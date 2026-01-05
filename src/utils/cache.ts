const cache: Record<string, any> = {}

export const getCache = (key: string) => cache[key]
export const setCache = (key: string, value: any) => (cache[key] = value)
