interface $Global {
  // NSBeep
  static NSBeep(): void;

  // stdio
  static printf(format: string, ...args): number;

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
  static malloc(n: number): RefType<number>;
  static free(p: RefType<number>): void;

  // string
  static memchr(p: RefType<number>, c: number, n: number): RefType<number>;
  static memcmp(p: RefType<number>, q: RefType<number>, n: number): number;
  static memcpy(
    dst: RefType<number>,
    src: RefType<number>,
    n: number
  ): RefType<number>;
  static memset(p: RefType<number>, val: number, len: number): RefType<number>;

  // unistd
  static sleep(n: number): number;

  // CoreFoundation
  static CFRunLoopRun(): never;

  // Dispatch
  static NSEC_PER_SEC: number;
  static QOS_CLASS_BACKGROUND: number;
  static QOS_CLASS_USER_INTERACTIVE: number;
  static DISPATCH_QUEUE_PRIORITY_DEFAULT: number;
  static DISPATCH_TIME_NOW: number;
  static DISPATCH_TIME_FOREVER: number;
  static dispatch_get_global_queue(
    identifier: number,
    flags: number
  ): dispatch_queue_global_t;
  static dispatch_async(queue: dispatch_queue_t, block: () => void): void;
  static dispatch_main(): never;
  static dispatch_semaphore_create(n: number): dispatch_semaphore_t;
  static dispatch_semaphore_signal(sema: dispatch_semaphore_t): number;
  static dispatch_semaphore_wait(
    sema: dispatch_semaphore_t,
    timeout: number
  ): number;
  static dispatch_time(t: number, delta: number): number;

  // NSApplicationMain
  static NSApplicationMain(argc: number, argv: RefType<number>): number;

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
  static readonly NSASCIIStringEncoding: number;
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

  // NSWorkspace
  static readonly NSWorkspace: NSWorkspace;

  // NSPasteboard
  static readonly NSPasteboard: NSPasteboard;
  static readonly NSPasteboardTypeString: NSPasteboardType;

  // NSRunLoop
  static readonly NSRunLoop: NSRunLoop;

  // NSURL
  static readonly NSURL: NSURL;

  // NSURLSession
  static readonly NSURLSession: NSURLSession;
  static readonly NSURLSessionTaskStateRunning: number;
  static readonly NSURLSessionTaskStateSuspended: number;
  static readonly NSURLSessionTaskStateCanceling: number;
  static readonly NSURLSessionTaskStateCompleted: number;
  static readonly NSURLSessionTaskPriorityDefault: number;
  static readonly NSURLSessionTaskPriorityLow: number;
  static readonly NSURLSessionTaskPriorityHigh: number;
}
declare var $: $Global;
