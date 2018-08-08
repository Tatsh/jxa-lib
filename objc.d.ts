interface nil {
}

interface ObjCGlobal {
  wrap(): nil;
  wrap(x: undefined | null): nil;
  wrap(input: string): NSString;
  wrap(n: number): NSNumber;
  wrap(xs: string[]): NSString[];
  wrap<I = any, R = any>(x: I): R;
  ['import'](name: string): void;
  unwrap(x: NSString): string;
  unwrap(x: NSNumber): number;
  unwrap(x: NSDate): Date;
  unwrap(x: NSBoolean): boolean;
  unwrap<I = any, R = any>(x: I): R;
  deepUnwrap(x: NSArray<NSString>): string[];
  deepUnwrap<I = any, R = any>(x: I): R;
  registerSubclass();
  dict();
  interactWithUser: boolean;
  castRefToObject();
  castObjectToRef();
  bindFunction(name: string, args: any[]);
  block();
  super();
}
declare readonly var ObjC: ObjCGlobal;

/**
 * Alias function to `ObjC.wrap()`.
 */
// declare function $(inValue: string): NSString;
// declare function $(inValue: number): NSNumber;
// declare function $(inValue: number[]): NSArray<NSNumber>;
// declare function $<T, U>(inValue: T[]): NSArray<U>;
// declare function $<I, R>(inValue: I): R;
