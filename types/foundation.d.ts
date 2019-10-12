interface NSError extends BridgedObject<IdType> {
  static alloc: NSError;
  readonly code: string;
  readonly domain: NSString;
  readonly localizedDescription: NSString;
}

interface NSNumber extends BridgedObject<number> {
  static alloc: NSNumber;
}

interface NSString extends BridgedObject<string> {
  static alloc: NSString;
  initWithDataEncoding(d: NSData, encoding: number): NSString;
  compareOptions(s: JXString, n: number): number;
  writeToFileAtomically(filename: JXString, atomically: boolean): boolean;
  stringWithString(s: JXString): NSString;
}

interface NSDictionary<K = NSString, V> extends BridgedObject<{}> {
  static alloc: NSDictionary<K, V>;
  objectForKey<R = V>(s: K): R;
}

interface NSArray<T> extends BridgedObject<Array> {
  static alloc: NSArray<T>;
  containsObject(obj: T): boolean;
}

interface NSFileManager extends BridgedObject<IdType> {
  static defaultManager: NSFileManager;
  attributesOfItemAtPathError(
    path: NSString | string,
    error: nil | void
  ): NSDictionary<NSString, NSString>;
  contentsOfDirectoryAtPathError(
    path: NSString | string,
    error: nil | void
  ): NSArray<NSString>;
  fileExistsAtPath(path: string | NSString): boolean;
}

interface NSDate extends BridgedObject<IdType> {}

interface NSBoolean extends BridgedObject<boolean> {}

interface NSData extends BridgedObject<IdType> {
  static alloc: NSData;
  static dataWithBytesLength<T>(buf: RefType<T>, len: number): NSData;
  writeToFileAtomically(path: JXString, atomically: boolean): boolean;
}

interface NSFileHandle extends BridgedObject<IdType> {
  static alloc: NSFileHandle;
  readonly readDataToEndOfFile: NSData;
  readonly closeFile: void;
}

interface NSTask extends BridgedObject<IdType> {
  static readonly alloc: NSTask;
  readonly init: NSTask;
  launchPath: NSString | string;
  arguments: (NSString | string)[];
  standardOutput?: NSPipe;
  standardError?: NSPipe;
  readonly launch: void;
  readonly waitUntilExit: void;
  readonly terminationStatus: number;
}

interface NSPipe extends BridgedObject<IdType> {
  static alloc: NSPipe;
  readonly fileHandleForReading: NSFileHandle;
}

interface NSRange {
  readonly length: number;
  readonly location: number;
}

interface NSNumberFormatter extends BridgedObject<IdType> {
  static alloc: NSNumberFormatter;
  readonly init: NSNumberFormatter;
  formatterBehavior: number;
  numberStyle: number;
  generatesDecimalNumbers: boolean;
  getObjectValueForStringRangeError(
    obj: RefType<{}>,
    str: JXString,
    range: NSRange,
    error: nil | void
  );
}

interface NSWorkspace {
  static sharedWorkspace: NSWorkspace;
  runningApplications: {
    bundleIdentifier: NSString;
  }[];
}

interface NSURLResponse {
  readonly statusCode: number;
}

interface NSURL {
  static URLWithString: (url: string) => NSURL;
}

interface NSDataTask {
  resume: any;
  cancel: any;
  suspend: any;
  priority: number;
  readonly state: number;
}

interface NSURLSession {
  static sharedSession: NSURLSession;
  dataTaskWithURLCompletionHandler: (
    url: NSURL,
    handler: (data?: NSData, response?: NSURLResponse, error?: NSError) => void
  ) => NSDataTask;
}

interface NSRunLoop {
  static currentRunLoop: NSRunLoop;
  static currentMode: any;
  static mainRunLoop: NSRunLoop;
  getCFRunLoop: any;
  run: any;
}
