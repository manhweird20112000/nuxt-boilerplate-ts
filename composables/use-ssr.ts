import { join } from 'pathe'

export function useSSR(key: string, url: string, query?: Record<string, any>) {
  return useAsyncData(key, () =>
    $fetch(join(import.meta.env.VITE_API_URL, url), {
      headers: {
        Authorization: 'Bearer '
      },
      query
    })
  )
}
