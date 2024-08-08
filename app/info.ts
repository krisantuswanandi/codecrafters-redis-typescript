const info = new Map<string, string>();

export function set(key: string, value: string) {
  info.set(key, value);
}

export function get(key: string) {
  return info.get(key);
}
