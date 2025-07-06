import { equals } from 'ramda';

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

export const chr = String.fromCharCode;
export const ord = (xs: string | string[]): number => String.prototype.charCodeAt.call(xs, 0);

export const propExecEq =
  <S extends keyof T, VT, T extends Record<S, (args?: AT) => VT>, AT = object>(
    name: S,
    value: VT,
  ) =>
  (x: T, args?: AT) =>
    equals(x[name](args), value);
