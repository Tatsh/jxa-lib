interface Application {
  running(): boolean;
  activate(): void;
  strictPropertyScope: boolean;
  commandsOfClass(): any;
  version(): string;
  id(): any;
  frontmost(): boolean;
  strictCommandScope: boolean;
  propertiesOfClass(): any[];
  parentOfClass(): any;
  includeStandardAdditions: boolean;
  strictParameterType: boolean;
  quit(): void;
  displayNameForPropertyOfClass(cls?: any): string | void;
  displayNameForElementOfClass(): string | void;
  displayNameForCommand(): string | void;
  elementsOfClass(): any[];
  name(): string;
  launch(): void;
  say(s: string): void;
  displayDialog(message: string, args?: {
    withTitle?: string;
    defaultAnswer?: string;
  });
}
declare function Application(x: string | number): Application;
