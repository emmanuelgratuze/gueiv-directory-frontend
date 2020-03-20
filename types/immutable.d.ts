export interface ImmutableMap<T> extends Map<string, unknown> {
  toJS(): T;
  get<K extends keyof T>(key: K): T[K];

  // set<S>(o: S): Immutable<T & S>;
  set<K extends keyof T>(key: K, value: T[K]): this;
  setIn<K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], V extends T[K1][K2][K3]>(
    keys: [K1, K2, K3],
    val: V
  );
  getIn<K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(path: [K1, K2, K3]): T[K1][K2][K3];
  getIn<K1 extends keyof T, K2 extends keyof T[K1]>(path: [K1, K2]): T[K1][K2];
  getIn<K1 extends keyof T>(path: [K1]): T[K1];
  merge(...collections: Array<Partial<TProps> | Iterable<[string, unknown]>>): this;
}
