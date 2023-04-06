export default class LocalStorage {
  static SetItem(key: string, value: string): void {
    if (process.browser) localStorage.setItem(key, value)
  }
  static GetItem(key: string): string | null | undefined {
    if (process.browser) return localStorage.getItem(key)
  }
  static RemoveItem(key: string): void {
    if (process.browser) localStorage.removeItem(key)
  }
}
