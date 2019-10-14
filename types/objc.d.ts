interface nil {}

namespace ObjC {
  /** Convert a JavaScript typed value to a JXA typed value. */
  export function wrap(): nil;
  export function wrap(x: undefined | null): nil;
  export function wrap(input: string): NSString;
  export function wrap(n: number): NSNumber;
  export function wrap(xs: string[]): NSString[];
  /** Import a library. */
  var _import: (name: string) => void;
  export { _import as import };
  export function wrap<I = any, R = any>(x: I): R;
  /** Convert a JXA typed value to a JavaScript value. */
  export function unwrap(x: NSString): string;
  export function unwrap(x: NSNumber): number;
  export function unwrap(x: NSDate): Date;
  export function unwrap(x: NSBoolean): boolean;
  export function unwrap<I = any, R = any>(x: I): R;
  export function deepUnwrap(x: NSArray<NSString>): string[];
  export function deepUnwrap<T, U>(x: T): U;
  export function registerSubclass();
  export function dict();
  export const interactWithUser: boolean;
  export function castRefToObject();
  export function castObjectToRef();
  export function bindFunction(name: string, args: any[]);
  export function block();
  var _super: () => any;
  export { _super as super };
}

/**
 * Alias function to `ObjC.wrap()`.
 */
// declare function $(inValue: string): NSString;
// declare function $(inValue: number): NSNumber;
// declare function $(inValue: number[]): NSArray<NSNumber>;
// declare function $<T, U>(inValue: T[]): NSArray<U>;
// declare function $<I, R>(inValue: I): R;
