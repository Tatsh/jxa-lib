declare namespace console {
  /** Log a value to the console. Very few types will be expanded in this
   * function so it's best to be as specific as possible. */
  function log(...args: any[]): void;
}

interface BridgedObject<T> {
  js: T;
  isNil(): boolean;
  getProperty(key: string);
  setProperty<U = any>(key: string, value: U);
}

interface IdType {}

declare function delay(n: number): void;

type JXString = NSString | string;
