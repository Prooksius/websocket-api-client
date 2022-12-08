type ExpiringStorageItem = {
  value: any
  expires: Date
}

class ExpiringStorage {
  get(key: string): any {
    const item = localStorage.getItem(key)
    if (!item) return null

    const cached = <ExpiringStorageItem>JSON.parse(item)

    if (!cached) return null

    const expires = new Date(cached.expires)

    if (expires < new Date()) {
      localStorage.removeItem(key)
      return null
    }

    return cached.value
  }

  getTimeLeft(key: string): number {
    const item = localStorage.getItem(key)
    if (!item) return 0

    const cached = JSON.parse(item)

    if (!cached) return 0

    const now = new Date()
    const expires = new Date(cached.expires)

    if (expires < new Date()) {
      localStorage.removeItem(key)
      return 0
    }

    return Math.round((expires.getTime() - now.getTime()) / 1000)
  }

  set(key: string, value: any, lifeTimeInMinutes: number): void {
    const currentTime = new Date().getTime()

    const expires = new Date(currentTime + lifeTimeInMinutes * 60*1000)

    localStorage.setItem(key, JSON.stringify({ value, expires }))
  }
}

export default new ExpiringStorage()
