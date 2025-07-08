import equals from 'ramda/es/equals';

/** Convert an `NSError` type to a JavaScript error and throw it. */
export const throwErrorIfNotNil = (error?: NSError) => {
  if (error && !(error as NSError).isNil()) {
    throw new Error((error as NSError).localizedDescription.js);
  }
};

/** Get an `Application` instance with `includeStandardAdditions` enabled. */
export function applicationWithStandardAdditions(spec: 'Finder'): FinderApplication;
export function applicationWithStandardAdditions(spec: 'iTunes' | 'Music'): ItunesApplication;
export function applicationWithStandardAdditions(spec: number | string): Application {
  const app = Application(spec);
  app.includeStandardAdditions = true;
  return app;
}

/** Get the character for a code. */
export const chr = (x: number) => String.fromCharCode(x);
/** Get a character code. */
export const ord = (xs: string | string[]): number => String.prototype.charCodeAt.call(xs, 0);

/**
 * Create a function that checks if evaluating a property on the passed in object as a function is
 * equal to the second argument.
 * @param name The name of the property to evaluate.
 * @param value The value to compare against.
 * @returns A function that takes an object and optional arguments, evaluates the property as a
 * function, and checks if the result is equal to the value.
 */
export const propExecEq =
  <S extends keyof T, VT, T extends Record<S, (args?: AT) => VT>, AT = object>(
    name: S,
    value: VT,
  ) =>
  (x: T, args?: AT) =>
    equals(x[name](args), value);
