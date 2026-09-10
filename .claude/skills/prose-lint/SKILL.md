# Prose lint

Audit prose against [.claude/rules/prose.md](../../rules/prose.md) and apply the fixes.

Read that rules file in full before the first edit. This skill describes the procedure only; the
rules file is the authority on what is banned.

Audit adversarially. When a sentence is defensible under a loose reading and a violation under a
strict one, treat it as a violation. A borderline construction is rewritten, not excused, and doubt
resolves toward the edit. Under-reporting is the failure mode to avoid. A grep hit stands until you
can state which exemption in this file covers it.

## Scope

### Default target

Audit files with pending changes, from `git status --porcelain` and `git diff --name-only HEAD`.
When the user gives paths or a diff range, use those instead.

Audit every piece of prose inside each target file:

- Markdown body text, including headings, list items, table cells, and admonitions.
- Plain comments in any language.
- Formal documentation comments (Numpydoc, JSDoc, Doxygen, Javadoc, XML doc comments). The same
  standard applies to them as to Markdown body text.
- User-facing string literals such as log messages, help text, error messages, and CLI output.
- Commit messages under review.

Do not edit:

- Identifiers, code, URLs, file paths, and dependency names.
- Fenced blocks and italic examples inside `.claude/rules/prose.md`. They exist to demonstrate
  violations.
- Released `CHANGELOG.md` sections. Only the `Unreleased` section is in scope.
- Quoted material from an external source. Flag it for the user instead.

## Detection

Run the greps below over the target files, then review every hit by hand. Each grep over-matches by
design; a noun spelled like a banned verb is valid, and the fix depends on the sentence.

```shell
grep -nP '\x{2013}|\x{2014}' <files>
```

```shell
grep -nEi "[[:alpha:]]+n[’']t\b|[[:alpha:]]+[’'](re|ll|ve|m)\b|\b(it|that|there|here|let|what|who)[’']s\b" <files>
```

```shell
grep -nEiw "gate|gates|gated|gating|stamp|stamps|stamped|stamping|answer|answers|answered|answering|say|says|said|saying|contain|contains|contained|containing|carry|carries|carried|carrying|hold|holds|held|holding|keep|keeps|kept|keeping|reach|reaches|reached|reaching|name|names|named|naming|lay|lays|laid|laying|leave|leaves|left|leaving|confine|confines|confined|confining|manufacture|manufactures|manufactured|manufacturing|claim|claims|claimed|claiming|ask|asks|asked|asking|transport|transports|transported|transporting" <files>
```

```shell
grep -nEi "\banyway\b|\banyone\b|\bnobody\b|\bno[ -]?one\b|\bobligatory\b|ground truth|elephant in the room|writing on the wall|beat around the bush|call it a day|cut to the chase|hit the nail on the head|jump on the bandwagon|think outside the box" <files>
```

```shell
grep -nEi ", (which|so|since|because)\b|says nothing|say nothing|for such|left alone|written by hand|that matters is|\bsomething\b|of (its|their|his|her) own|their own" <files>
```

Headings and titles need a separate pass:

```shell
grep -nE "^#{1,6} (The|What|Which|Whose)\b" <files>
```

```shell
grep -nEi 'either[.,;:!?)]*$' <files>
```

```shell
grep -nE "[a-z][a-z)\`_]: +[a-z]" <files>
```

```shell
grep -nE "\b(Ascii|Nasa|Nato|Unesco|Html|Css|Url|Api|Cli|Json|Yaml|Ssh|Http|Xml|Sql)\b" <files>
```

A colon that introduces a list of items is valid. Review each hit. A colon followed by a clause is
the banned form, and the only permitted elaboration is a second sentence opening with _That is,_.

Two patterns need a read pass rather than a grep. Headings take the gerund-plus-pronoun form
(_Pointing an agent at it_), and body text substitutes _that_, _this_, _these_, or _those_ for a
noun already available. A grep over the demonstratives over-matches so heavily as to be useless.
Every restrictive clause and every legitimate determiner hits.

## Fixing

1. Rewrite each confirmed hit in place with `Edit`. Preserve the meaning, the wrap width of the
   surrounding file, and the existing indentation.
2. Prefer deletion. A trailing justification clause, a vague follow-on sentence, and a
   _(number) things worth ...:_ preamble are all removed rather than reworded.
3. A banned verb usually disappears with the sentence restructured, not with a synonym dropped into
   the same slot. Verify the replacement reads naturally.
4. Re-wrap any paragraph whose length changed, at the width the file already uses (100 characters
   for Markdown and Python in this repository).
5. Never alter code, identifiers, or test expectations to make prose fit. When a string literal is
   asserted in a test, update the test in the same edit.

## Verification

Run both commands and confirm exit code 0:

```shell
yarn format
```

```shell
yarn qa
```

Then re-run the detection greps. Report the remaining hits with a one-line justification each, or
report a clean result.

## Reporting

Give the user a short list of file, line, banned pattern, and the fix applied. Group by file. Do not
add a summary paragraph beyond the list.
