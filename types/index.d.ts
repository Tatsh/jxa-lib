declare namespace $ {
  // NSBeep
  function NSBeep(): void;

  // stdio
  function printf(format: string, ...args): number;

  // stdlib
  function atof(x: string): number;
  function atoi(x: string): number;
  function atoll(x: string): number;
  function strtof(s: string, se: number | void): number;
  function strtod(x: string, se: number | void): number;
  function strtold(x: string, se: number | void): number;
  function rand(): number;
  function srand(seed: number): void;
  function arc4random(): number;
  function arc4random_uniform(max: number): number;
  function arc4random_buf<T>(buf: RefType<T>, size: number): void;
  function arc4random_stir(): void;
  function arc4random_addrandom(dat: RefType<string>, datlen: number): void;
  function exit(code: number): void;
  function getenv(name: string): string | void;
  function setenv(name: string, value: string, overwrite: number): number;
  function putenv(s: string): number;
  function unsetenv(name: string): number;
  function abort(): void;
  function _Exit(code: number): void;
  function atexit(func: any): number;
  function system(cmd: string): number;
  function malloc(n: number): RefType<number>;
  function free(p: RefType<number>): void;

  // string
  function memchr(p: RefType<number>, c: number, n: number): RefType<number>;
  function memcmp(p: RefType<number>, q: RefType<number>, n: number): number;
  function memcpy(
    dst: RefType<number>,
    src: RefType<number>,
    n: number
  ): RefType<number>;
  function memset(p: RefType<number>, val: number, len: number): RefType<number>;

  // unistd
  function sleep(n: number): number;

  // CoreFoundation
  function CFRunLoopRun(): never;

  // Dispatch
  const NSEC_PER_SEC: number;
  const QOS_CLASS_BACKGROUND: number;
  const QOS_CLASS_USER_INTERACTIVE: number;
  const DISPATCH_QUEUE_PRIORITY_DEFAULT: number;
  const DISPATCH_TIME_NOW: number;
  const DISPATCH_TIME_FOREVER: number;
  function dispatch_get_global_queue(
    identifier: number,
    flags: number
  ): dispatch_queue_global_t;
  function dispatch_async(queue: dispatch_queue_t, block: () => void): void;
  function dispatch_main(): never;
  function dispatch_semaphore_create(n: number): dispatch_semaphore_t;
  function dispatch_semaphore_signal(sema: dispatch_semaphore_t): number;
  function dispatch_semaphore_wait(
    sema: dispatch_semaphore_t,
    timeout: number
  ): number;
  function dispatch_time(t: number, delta: number): number;

  // NSApplicationMain
  function NSApplicationMain(argc: number, argv: RefType<number>): number;

  // Generic constants
  const NSNumericSearch: number;
  const NSOrderedDescending: number;

  // NSFile*
  const NSFileSize: NSString;
  const NSFileManager: NSFileManager;
  const NSFileHandle: NSFileHandle;

  // NSNumber*
  const NSNumberFormatterBehaviorDefault: number;
  const NSNumberFormatterBehavior10_0: number;
  const NSNumberFormatterBehavior10_4: number;
  const NSNumber: NSNumber;
  const NSNumberFormatter: NSNumberFormatter;

  // NSObject
  const NSObject: NSObject;

  // NSRange
  function NSStringFromRange(range: NSRange): NSString;
  function NSUnionRange(range1: NSRange, range2: NSRange): NSRange;
  const NSNotFound: number;
  function NSMakeRange(loc: number, length: number): NSRange;

  // NSString
  const NSASCIIStringEncoding: number;
  const NSUTF8StringEncoding: number;
  const NSString: NSString;

  // NSArray
  const NSArray: NSArray;

  // NSDictionary
  const NSDictionary: NSDictionary;

  // NSData
  const NSData: NSData;

  // NSTask
  const NSTask: NSTask;

  // NSPipe
  const NSPipe: NSPipe;

  // NSWorkspace
  const NSWorkspace: NSWorkspace;

  // NSPasteboard
  const NSPasteboard: NSPasteboard;
  const NSPasteboardTypeString: NSPasteboardType;

  // NSRunLoop
  const NSRunLoop: NSRunLoop;

  // NSURL
  const NSURL: NSURL;

  // NSURLSession
  const NSURLSession: NSURLSession;
  const NSURLSessionTaskStateRunning: number;
  const NSURLSessionTaskStateSuspended: number;
  const NSURLSessionTaskStateCanceling: number;
  const NSURLSessionTaskStateCompleted: number;
  const NSURLSessionTaskPriorityDefault: number;
  const NSURLSessionTaskPriorityLow: number;
  const NSURLSessionTaskPriorityHigh: number;
}
