interface WhosePredicate {
  [key: string]:
    | {
        _equals?: string | number | null | undefined;
        _contains?: string;
        _beginsWith?: string;
        _endsWith?: string;
        _greaterThan?: number;
        _greaterThanEquals?: number;
        _lessThan?: number;
        _lessThanEquals?: number;
        _match?: [any, string];
        _and?: WhosePredicate[];
        _not?: WhosePredicate[];
        _or?: WhosePredicate[];
        ["="]?: string | number;
        [">"]?: number;
        [">="]?: number;
        ["<"]?: number;
        ["<="]?: number;
      }
    | string;
}

interface JXArray<T> extends Array<T>, JXReadonlyArray<T> {
  [name: string]: T;
  [id: number]: T;
}

interface JXReadonlyArray<T> extends ReadonlyArray<T> {
  [Symbol.iterator](): Iterator<T>;
  readonly [name: string]: T;
  readonly [id: number]: T;
  at(index: number): T;
  byName(name: string): T;
  byId(id: number): T;
  /**
   * Returns the elements of an array that meet the condition specified in a
   * filter predicate.
   */
  whose(predicate: WhosePredicate): JXReadonlyArray<T>;
}
