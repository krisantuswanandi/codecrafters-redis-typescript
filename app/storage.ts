const storage = new Map<string, string>();

export function set(key: string, value: string) {
  storage.set(key, value);
}

export function get(key: string) {
  return storage.get(key);
}
