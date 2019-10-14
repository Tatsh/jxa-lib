interface Application {
  running(): boolean;
  /** Activate the application or the specified window. */
  activate(specifier?: any): void;
  strictPropertyScope: boolean;
  commandsOfClass(): any;
  /** The version number of the application. */
  version(): string;
  id(): any;
  /** Is this the frontmost (active) application? */
  frontmost(): boolean;
  strictCommandScope: boolean;
  propertiesOfClass(): any[];
  parentOfClass(): any;
  includeStandardAdditions: boolean;
  strictParameterType: boolean;
  /** Quit the application. */
  quit(saving?: 'ask' | 'yes' | 'no'): void;
  displayNameForPropertyOfClass(cls?: any): string | void;
  displayNameForElementOfClass(): string | void;
  displayNameForCommand(): string | void;
  elementsOfClass(): any[];
  /**  The name of the application. */
  name(): string;
  launch(): void;
  say(s: string): void;
  /** Display a message, possibly with choices as buttons. */
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
  /** Displays a dialog with choices. If the user chooses to cancel, `false` is
   * returned. Otherwise, a list of items selected is returned. */
  chooseFromList(
    l: (number | string)[],
    args?: {
      withTitle?: string;
      withPrompt?: string;
      defaultItems?: (number | string)[];
      okButtonName?: string;
      cancelButtonName?: string;
      multipleSelectionsAllowed?: boolean;
      emptySelectionAllowed?: boolean;
    }
  ): false | (number | string)[];
}
declare function Application(x: string | number): Application;

interface Item {
  /** Get the class (string) of a selected item. */
  class(): any;
  container(): any;
  id(): number;
  index(): number;
  /** Name of the item (song title, etc). */
  name(): string;
  persistentID(): string;
  properties(): any;
}

interface Track extends Item {}

interface FileTrack extends Track {
  /** The location of the file represented by this track. */
  location(): PathObject;
  delete(): void;
}

interface ITunesLibrary {
  name(): string;
  tracks(): FileTrack[];
}

interface AudioCDTrack extends Track {
  location: PathObject;
}

interface AudioCDPlaylist {
  artist(): string;
  compilation(): boolean;
  composer(): string;
  discCount(): number;
  discNumber(): number;
  genre(): string;
  year(): number;
  audioCDTracks(): AudioCDTrack[];
}

interface Playlist {
  description(): string;
  disliked(): boolean;
  duration(): boolean;
  name(): string;
  loved(): boolean;
  parent(): Playlist | void;
  size(): number;
  specialKind():
    | 'none'
    | 'folder'
    | 'Genius'
    | 'Library'
    | 'Music'
    | 'Purchased Music';
  time(): string;
  visible(): boolean;
  tracks(): Track[];
}

/** The master library playlist. */
interface LibraryPlaylist extends Playlist {
  /** Tracks which are local files. */
  fileTracks(): FileTrack[];
  /** Tracks which are from remote URLs. */
  urlTracks(): any[];
  sharedTracks(): any[];
}

interface Source extends Item {
  capacity(): number;
  freeSpace(): number;
  kind():
    | 'library'
    | 'audio CD'
    | 'MP3 CD'
    | 'radio tuner'
    | 'shared library'
    | 'iTunes Store'
    | 'unknown';
  audioCDPlaylists(): AudioCDPlaylist[];
  /** Master library playlists. Usually there is only one. */
  libraryPlaylists(): LibraryPlaylist[];
  playlists(): any[];
  radioTunerPlaylists(): any[];
  subscriptionPlaylists(): any[];
  userPlaylists(): any[];
}

interface ItunesApplication extends Application {
  airplayEnabled(): boolean;
  converting(): boolean;
  currentStreamTitle(): string;
  currentStreamURL(): string;
  eqEnabled(): boolean;
  fixedIndexing(): boolean;
  fullScreen(): boolean;
  mute(): boolean;
  playerPosition(): number;
  playerState():
    | 'stopped'
    | 'playing'
    | 'paused'
    | 'fast forwarding'
    | 'rewinding';
  shuffleEnabled(): boolean;
  shuffleMode(): 'songs' | 'albums' | 'groupings';
  songRepeat(): 'off' | 'one' | 'all';
  soundVolume(): number;
  visualsEnabled(): boolean;
  sources(): Source[];
  /** Gets the currently selected items. */
  selection(): Item[];
  /** Uupdate file track information from the current information in the
   * track’s file. */
  refresh(track: FileTrack): void;
  currentTrack(): Track;
  add(paths: PathObject[], args: { to?: LibraryPlaylist }): Track[];
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
