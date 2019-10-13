# Typings for JXA

This is a set of typings for AppleScript in JavaScript that works on macOS 10.10 and above.

This is a work in progress and is not yet stable.

## Build

To run the examples, run `webpack` in the root of the project. Then Execute `dist/main.js` like so:

```sh
osascript -l JavaScript dist/main.js
```

A prompt window will appear for the Finder application.

## Library

In the `lib` directory, a helper library is available to make this easier to use in TypeScript (or ES6). It removes prefixes where possible to be more like Swift and removes long method names. Example:

```typescript
import { FileManager } from 'jxa-lib';

const fm = new FileManager();
let attr;
try {
  attr = fm.attributesOfItem('/some-file');
} catch (e) {
  // Instead of having to pass &error (Ref object) like in Objective-C,
  // an exception is thrown
  console.log('Maybe /some-file does not exist?');
}

// attr type is FileAttributes or undefined, which does not have prefixes removed
if (attr) {
  console.log(attr.NSFileGroupOwnerAccountID); // string
  console.log(attr.NSFileModificationDate); // Date object
}
```

### Examples

See the [examples](examples) directory.

### Example with C functions

You do not have to use `ObjC.import()` because all modules will do this on their own.

```typescript
import { exit, free, malloc } from 'jxa-lib/stdlib';
import { memchr, memset } from 'jxa-lib/string';

const size = 32;
const buf = malloc(size); // returns Ref<number>
memset(buf, 0, size);
for (let i = 0, c = 'a'.charCodeAt(0); i < size; i++, c++) {
  buf[i] = c;
}

const asciiC = 'c'.charCodeAt(0);
const asciiD = 'd'.charCodeAt(0);

// memchr() returns Ref<number> or Ref to NULL
const result = memchr(buf, asciiC, size);
if (result[0]) {
  // this will be asciiC or null/undefined
  console.log(result[0] === asciiC); // true
  console.log(result[1] === asciiD); // true

  // Getting result[30] or above is not defined behaviour
}

free(result);

// Do not print the result of the last expression
exit(0);
```
