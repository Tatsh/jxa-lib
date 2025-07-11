# Library for JXA

[![NPM Version](https://img.shields.io/npm/v/jxa-lib)](https://www.npmjs.com/package/jxa-lib)
[![GitHub tag (with filter)](https://img.shields.io/github/v/tag/Tatsh/jxa-lib)](https://github.com/Tatsh/jxa-lib/tags)
[![License](https://img.shields.io/github/license/Tatsh/jxa-lib)](https://github.com/Tatsh/jxa-lib/blob/master/LICENSE.txt)
[![GitHub commits since latest release (by SemVer including pre-releases)](https://img.shields.io/github/commits-since/Tatsh/jxa-lib/v0.1.7/master)](https://github.com/Tatsh/jxa-lib/compare/v0.1.7...master)
[![CodeQL](https://github.com/Tatsh/jxa-lib/actions/workflows/codeql.yml/badge.svg)](https://github.com/Tatsh/jxa-lib/actions/workflows/codeql.yml)
[![QA](https://github.com/Tatsh/jxa-lib/actions/workflows/qa.yml/badge.svg)](https://github.com/Tatsh/jxa-lib/actions/workflows/qa.yml)
[![pre-commit](https://img.shields.io/badge/pre--commit-enabled-brightgreen?logo=pre-commit&logoColor=white)](https://github.com/pre-commit/pre-commit)
[![Tests](https://github.com/Tatsh/jxa-lib/actions/workflows/tests.yml/badge.svg)](https://github.com/Tatsh/jxa-lib/actions/workflows/tests.yml)
[![Coverage Status](https://coveralls.io/repos/github/Tatsh/jxa-lib/badge.svg?branch=master)](https://coveralls.io/github/Tatsh/jxa-lib?branch=master)
[![GitHub Pages](https://github.com/Tatsh/jxa-lib/actions/workflows/pages/pages-build-deployment/badge.svg)](https://tatsh.github.io/jxa-lib/)
[![Stargazers](https://img.shields.io/github/stars/Tatsh/jxa-lib?logo=github&style=flat)](https://github.com/Tatsh/jxa-lib/stargazers)
[![NPM Downloads](https://img.shields.io/npm/dm/jxa-lib)](https://www.npmjs.com/package/jxa-lib)

[![@Tatsh](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fpublic.api.bsky.app%2Fxrpc%2Fapp.bsky.actor.getProfile%2F%3Factor%3Ddid%3Aplc%3Auq42idtvuccnmtl57nsucz72%26query%3D%24.followersCount%26style%3Dsocial%26logo%3Dbluesky%26label%3DFollow%2520%40Tatsh&query=%24.followersCount&style=social&logo=bluesky&label=Follow%20%40Tatsh)](https://bsky.app/profile/Tatsh.bsky.social)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109370961877277568?domain=hostux.social&style=social)](https://hostux.social/@Tatsh)

This is a helper library for AppleScript in JavaScript that works on macOS 10.10 and above. To
properly use this, a bundler must be used such as Webpack. It is recommended to install
[`jxa-types`](https://www.npmjs.com/package/jxa-types) as well.

This repository also demonstrates how to write tests mocking the JXA environment. See the `*.test.ts`
files in `src`.

## Example use

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

## Example with C functions

You do not have to use `ObjC.import()` because all modules will do this on their own.

```typescript
import { stdlib, string } from 'jxa-lib';

const size = 32;
const buf = stdlib.malloc(size); // returns Ref<number>
string.memset(buf, 0, size);
for (let i = 0, c = 'a'.charCodeAt(0); i < size; i++, c++) {
  buf[i] = c;
}

const asciiC = 'c'.charCodeAt(0);
const asciiD = 'd'.charCodeAt(0);

// memchr() returns Ref<number> or Ref to NULL
const result = string.memchr(buf, asciiC, size);
if (result[0]) {
  // this will be asciiC or null/undefined
  console.log(result[0] === asciiC); // true
  console.log(result[1] === asciiD); // true

  // Getting result[30] or above is not defined behaviour
}

stdlib.free(result);

// Do not print the result of the last expression
stdlib.exit(0);
```
