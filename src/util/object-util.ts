export class ObjectUtils {
  public static entries<T extends object>(obj: T) {
    return Object.entries(obj) as [keyof T, T[keyof T]][];
  }

  public static keys<T extends object>(obj: T) {
    return Object.keys(obj) as (keyof T)[];
  }

  public static values<T extends object>(obj: T) {
    return Object.values(obj) as T[keyof T][];
  }

  public static fromEntries<T extends object>(
    entries: [keyof T, T[keyof T]][]
  ) {
    return Object.fromEntries(entries) as T;
  }
}
