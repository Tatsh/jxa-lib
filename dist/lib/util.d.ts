/** Convert an `NSError` type to a JavaScript error and throw it. */
export declare const throwErrorIfNotNil: (error?: NSError | undefined) => void;
/** Get an `Application` instance with `includeStandardAdditions` enabled. */
export declare function applicationWithStandardAdditions(spec: 'Finder'): FinderApplication;
export declare function applicationWithStandardAdditions(spec: 'iTunes'): ItunesApplication;
export declare function applicationWithStandardAdditions(spec: 'Music'): ItunesApplication;
export declare const chr: (x: number) => string;
export declare const ord: (xs: string | string[]) => number;
