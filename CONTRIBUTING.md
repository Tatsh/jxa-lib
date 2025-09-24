# How to contribute to jxa-lib

Thank you for your interest in contributing to jxa-lib! Please follow these guidelines to help
maintain code quality and consistency.

## General Guidelines

- Follow the coding standards and rules described below for each file type.
- Ensure all code passes linting and tests before submitting a pull request.
- Write clear commit messages and document your changes in the changelog if relevant.
- Contributors are listed in `package.json`.
- Update relevant fields in `.wiswa.jsonnet` such as authors, dependencies, etc.
- All contributed code must have a license compatible with the project's license (MIT).
- Add missing words to `.vscode/dictionary.txt` as necessary (sorted and lower-cased).

## Development Environment

- Use [Yarn](https://yarnpkg.com/) to install Node.js based dependencies:
  - Install Node.js dependencies: `yarn`
- Install [pre-commit](https://pre-commit.com/) and make sure it is enabled by running
  `pre-commit install` in the repository checkout.

## Quality Assurance & Scripts

The following scripts are available via `yarn` (see `package.json`):

- `yarn qa`: Run all QA checks (type checking, linting, spelling, formatting).
- `yarn check-formatting`: Check code formatting.
- `yarn format`: Auto-format code.
- `yarn check-spelling`: Run spell checker.

The above all need to pass for any code changes to be accepted.

## Markdown Guidelines

- `<kbd>` tags are allowed.
- Headers do not have to be unique if in different sections.
- Line length rules do not apply to code blocks.
- See [Markdown instructions] for more.

## JSON, YAML, TOML, INI Guidelines

- JSON and YAML files should generally be recursively sorted by key.
- In TOML/INI, `=` must be surrounded by a single space on both sides.
- See [JSON/YAML guidelines] and [TOML/INI guidelines] for more details.

## Submitting Changes

Do not submit PRs solely for dependency bumps. Dependency bumps are either handled by running Wiswa
locally or allowing Dependabot to do them.

1. Fork the repository and create your branch from `master`.
2. Ensure your code follows the above guidelines.
3. Run all tests (`yarn test`) and QA scripts (`yarn qa`). Be certain pre-commit runs on your
   commits.
4. Submit a pull request with a clear description of your changes.

[Markdown instructions]: .github/instructions/markdown.instructions.md
[JSON/YAML guidelines]: .github/instructions/json-yaml.instructions.md
[TOML/INI guidelines]: .github/instructions/toml-ini.instructions.md
