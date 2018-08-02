interface $Global {
  // NSBeep
  static NSBeep(): void;

  // stdlib
  static atof(x: string): number;
  static atoi(x: string): number;
  static atoll(x: string): number;
  static strtof(s: string, se: number | void): number;
  static strtod(x: string, se: number | void): number;
  static strtold(x: string, se: number | void): number;
  static rand(): number;
  static srand(seed: number): void;
  static arc4random(): number;
  static arc4random_uniform(max: number): number;
  static arc4random_buf<T>(buf: RefType<T>, size: number): void;
  static arc4random_stir(): void;
  static arc4random_addrandom(dat: RefType<string>, datlen: number): void;
  static exit(code: number): void;
  static getenv(name: string): string | void;
  static setenv(name: string, value: string, overwrite: number): number;
  static putenv(s: string): number;
  static unsetenv(name: string): number;
  static abort(): void;
  static _Exit(code: number): void;
  static atexit(func: any): number;
  static system(cmd: string): number;
  static malloc<T>(n: number): RefType<T>;
  // string
  static memset<T>(p: RefType<T>, val: number | string, len: number): RefType<T>;

  // Generic constants
  static readonly NSNumericSearch: number;
  static readonly NSOrderedDescending: number;

  // NSFile*
  static readonly NSFileSize: NSString;
  static readonly NSFileManager: NSFileManager;
  static readonly NSFileHandle: NSFileHandle;

  // NSNumber*
  static readonly NSNumberFormatterBehaviorDefault: number;
  static readonly NSNumberFormatterBehavior10_0: number;
  static readonly NSNumberFormatterBehavior10_4: number;
  static readonly NSNumber: NSNumber;
  static readonly NSNumberFormatter: NSNumberFormatter;

  // NSRange
  static NSStringFromRange(range: NSRange): NSString;
  static NSUnionRange(range1: NSRange, range2: NSRange): NSRange;
  static readonly NSNotFound: number;
  static NSMakeRange(loc: number, length: number): NSRange;

  // NSString
  static readonly NSUTF8StringEncoding: number;
  static readonly NSString: NSString;

  // NSArray
  static readonly NSArray: NSArray;

  // NSDictionary
  static readonly NSDictionary: NSDictionary;

  // NSData
  static readonly NSData: NSData;

  // NSTask
  static readonly NSTask: NSTask;

  // NSPipe
  static readonly NSPipe: NSPipe;
}
declare readonly var $: $Global;
