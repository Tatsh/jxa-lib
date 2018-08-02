interface LimitedConsole {
  static log(...args: any[]): void;
}
declare readonly var console: LimitedConsole;

interface BridgedObject<T> {
  js: T;
  isNil(): boolean;
  getProperty(key: string);
  setProperty<U = any>(key: string, value: U);
}

interface IdType {
}

declare function delay(n: number): void;

type JXString = NSString | string;
