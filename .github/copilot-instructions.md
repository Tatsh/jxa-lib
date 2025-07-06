# Copilot Instructions

jxa-lib is a library for JXA (JavaScript for Automation) that provides various utilities and
functions to simplify automation tasks on macOS.

## General

- Do not explain project structure or conventions in comments or docstrings.
- Use 2 spaces for indentation except in Python.
- Files must end with a single newline character.
- Keep lines shorter than 100 characters.
- Line endings must be Unix-style (LF).
- Use UTF-8 encoding for all files.
- Use spaces instead of tabs for indentation.
- Use British spelling in comments and docstrings.
- Use American spelling for all identifiers and string literals, except in docstrings.
- Never mention the spelling or other project conventions in comments or docstrings.
- Use full sentences in comments and docstrings.
- Use the Oxford comma in lists.
- Use single quotes for strings, except where double quotes are required (e.g., JSON).
- Full words should be preferred over abbreviations, except for well-known acronyms. Some words may
  be abbreviated:
  - `config` for configuration.
- Prefer to use immutable data structures over mutable ones.

## JSON and YAML

- By default, output should be recursively sorted by key.

## Markdown guidelines

- `MD033`: `<kbd>` tags are allowed.
- `MD024`: Headers do not have to be unique if they are in different sections.
- Line length does not apply to code blocks.

## SQL guidelines

- Dialect is PostgreSQL.
- Use 2 spaces for indentation.
- Use uppercase for SQL keywords (e.g., `SELECT`, `FROM`, `WHERE`).
- Use single quotes for string literals.
- Use double quotes for identifiers (e.g., table names, column names) if they contain special
  characters or are reserved words.
- Use `snake_case` for table and column names.
- If the file contains `%(variable)s` placeholders, assume it is a template file.
- If the file is a template, it must use `%(variable)s` style for placeholders.

## TOML and INI-like file guidelines

- `=` must be surrounded by a single space on both sides.
