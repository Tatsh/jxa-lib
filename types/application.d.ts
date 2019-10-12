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
  displayDialog(
    message: string,
    args?: {
      withTitle?: string;
      defaultAnswer?: string;
      buttons?: string[];
      defaultButton?: number; // starts at index 1
      withIcon?: number;
    }
  ): { buttonReturned?: string };
}
declare function Application(x: string | number): Application;

interface SelectionType {
  class(): string;
}

interface FileTrack extends SelectionType {
  location(): PathObject;
  name(): string;
  delete(): void;
}

interface ITunesLibrary {
  name(): string;
  tracks(): FileTrack[];
}

interface ItunesApplication extends Application {
  sources(): ITunesLibrary[];
  selection(): SelectionType[];
  refresh(track: FileTrack): void;
  currentTrack(): {};
  add(paths: PathObject[], args: { to?: ITunesLibrary }): void;
}

interface FinderApplication extends Application {
  exists(location: PathObject): boolean;
}

interface FinderFolder {
  entireContents(): {
    url(): string;
  }[];
}

interface SystemEventsProcess {
  visible: boolean;
  windows: {
    [name: string]: {
      radioGroups: {
        radioButtons: {
          click: () => void;
        }[];
      }[];
      tabGroups: {
        scrollAreas: {
          tables: {
            rows: {}[];
          }[];
        }[];
      }[];
    };
  };
}

interface SystemEventsApplication extends Application {
  processes: {
    [name: string]: SystemEventsProcess;
  };
  keyCode(n: number): void;
}

declare function Application(x: 'Finder'): FinderApplication;
declare function Application(x: 'iTunes'): ItunesApplication;
declare function Application(x: 'Music'): ItunesApplication;
declare function Application(x: 'System Events'): SystemEventsApplication;
