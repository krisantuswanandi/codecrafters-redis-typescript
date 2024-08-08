const storage = new Map<string, StorageConfig & { value: Value }>();

type Value = string;

export type StorageConfig = {
  expiredAt?: number;
};

export function set(key: string, value: Value, config: StorageConfig) {
  storage.set(key, { value, ...config });
}

export function get(key: string) {
  const item = storage.get(key);

  if (!item) return null;

  if (item.expiredAt && item.expiredAt < Date.now()) {
    storage.delete(key);
    return null;
  }

  return item.value;
}
