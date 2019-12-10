interface RefType<T> {
  readonly type?: string;
  [index: number]: T;
}
declare function Ref(val: 'char*'): RefType<string>;
declare function Ref<T>(val?: T): RefType<T>;
