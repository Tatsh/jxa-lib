# Library for JXA

[![NPM Version](https://img.shields.io/npm/v/jxa-lib)](https://www.npmjs.com/package/jxa-lib)
[![GitHub tag (with filter)](https://img.shields.io/github/v/tag/Tatsh/jxa-lib)](https://github.com/Tatsh/jxa-lib/tags)
[![License](https://img.shields.io/github/license/Tatsh/jxa-lib)](https://github.com/Tatsh/jxa-lib/blob/master/LICENSE.txt)
[![GitHub commits since latest release (by SemVer including pre-releases)](https://img.shields.io/github/commits-since/Tatsh/jxa-lib/v0.1.9/master)](https://github.com/Tatsh/jxa-lib/compare/v0.1.9...master)
[![CodeQL](https://github.com/Tatsh/jxa-lib/actions/workflows/codeql.yml/badge.svg)](https://github.com/Tatsh/jxa-lib/actions/workflows/codeql.yml)
[![QA](https://github.com/Tatsh/jxa-lib/actions/workflows/qa.yml/badge.svg)](https://github.com/Tatsh/jxa-lib/actions/workflows/qa.yml)
[![Tests](https://github.com/Tatsh/jxa-lib/actions/workflows/tests.yml/badge.svg)](https://github.com/Tatsh/jxa-lib/actions/workflows/tests.yml)
[![Coverage Status](https://coveralls.io/repos/github/Tatsh/jxa-lib/badge.svg?branch=master)](https://coveralls.io/github/Tatsh/jxa-lib?branch=master)
[![Dependabot](https://img.shields.io/badge/Dependabot-enabled-blue?logo=dependabot)](https://github.com/dependabot)
[![GitHub Pages](https://github.com/Tatsh/jxa-lib/actions/workflows/pages/pages-build-deployment/badge.svg)](https://tatsh.github.io/jxa-lib/)
[![pre-commit](https://img.shields.io/badge/pre--commit-enabled-brightgreen?logo=pre-commit&logoColor=white)](https://github.com/pre-commit/pre-commit)
[![NPM Downloads](https://img.shields.io/npm/dm/jxa-lib)](https://www.npmjs.com/package/jxa-lib)
[![Stargazers](https://img.shields.io/github/stars/Tatsh/jxa-lib?logo=github&style=flat)](https://github.com/Tatsh/jxa-lib/stargazers)
[![Prettier](https://img.shields.io/badge/Prettier-enabled-black?logo=prettier)](https://prettier.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-black?logo=typescript)](https://www.typescriptlang.org/)
[![Yarn](https://img.shields.io/badge/Yarn-4c335c?logo=yarn)](https://yarnpkg.com/)
[![eslint](https://img.shields.io/badge/eslint-black?logo=eslint)](https://www.npmjs.com/package/eslint)
[![jest](https://img.shields.io/badge/jest-black?logo=jest)](https://www.npmjs.com/package/jest)

[![@Tatsh](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fpublic.api.bsky.app%2Fxrpc%2Fapp.bsky.actor.getProfile%2F%3Factor=did%3Aplc%3Auq42idtvuccnmtl57nsucz72&query=%24.followersCount&label=Follow+%40Tatsh&logo=bluesky&style=social)](https://bsky.app/profile/Tatsh.bsky.social)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-Tatsh-black?logo=buymeacoffee)](https://buymeacoffee.com/Tatsh)
[![Libera.Chat](https://img.shields.io/badge/Libera.Chat-Tatsh-black?logo=liberadotchat)](irc://irc.libera.chat/Tatsh)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109370961877277568?domain=hostux.social&style=social)](https://hostux.social/@Tatsh)
[![Patreon](https://img.shields.io/badge/Patreon-Tatsh2-F96854?logo=patreon)](https://www.patreon.com/Tatsh2)

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
