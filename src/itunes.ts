import filter from 'ramda/es/filter';
import { propExecEq } from './util';

/** iTunes/Music must be started before constructing this. */
export class ItunesHelper {
  private _devicesMenuItems: Entries<MenuItem>;
  private _finder = Application('Finder');
  private _itunes: ItunesApplication;
  private _library?: LibraryPlaylist;

  constructor(itunesApp: ItunesApplication) {
    this._itunes = itunesApp;
    this._library = filter(
      propExecEq<'name', string, Source>('name', 'Library'),
      this._itunes.sources(),
    )[0].libraryPlaylists()[0];
    this._devicesMenuItems = Application('System Events')
      .processes.byName('iTunes')
      .menuBars[0].menuBarItems.byName('File')
      .menus[0].menuItems.byName('Devices')
      .menus[0].menuItems();
  }

  clearOrphanedTracks(): FileTrack[] {
    if (!this._library) {
      return [];
    }
    const ret = [];
    for (const track of this._library.fileTracks()) {
      const name = track.name();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let loc: any;
      try {
        loc = track.location();
      } catch (e) {
        $.printf(`Removing ${name} (caught ${e}).\n`);
        ret.push(track);
        track.delete();
        continue;
      }

      if (!loc || !this._finder.exists(loc)) {
        $.printf(`Removing ${name} (not loc).\n`);
        ret.push(track);
        track.delete();
      }
    }
    return ret;
  }

  addTracksAtPath(root: FinderFolder) {
    if (!this._library) {
      return;
    }
    const paths: string[] = [];
    for (const x of root.entireContents()) {
      paths.push(x.url().replace(/^file:\/\//, ''));
    }
    this._itunes.add(paths, { to: this._library });
    for (const track of this._library.fileTracks()) {
      this._itunes.refresh(track);
    }
  }

  get fileTracks() {
    return this._library!.fileTracks();
  }

  get library(): Source | undefined {
    for (const source of this._itunes.sources()) {
      if (source.name() === 'Library') {
        return source;
      }
    }
    return undefined;
  }

  get currentTrack(): Track | undefined {
    try {
      return this._itunes.currentTrack();
    } catch (_) {
      return undefined;
    }
  }

  deleteOrphanedTracks(): FileTrack[] {
    const ret: FileTrack[] = [];
    for (const track of (this._library?.tracks() ?? []) as JXReadonlyArray<FileTrack>) {
      const name = track.name();
      let loc;
      try {
        loc = track.location();
      } catch (_) {
        console.log(`Removing ${name}.`);
        ret.push(track);
        track.delete();
        continue;
      }
      if (!loc || !this._finder.exists(loc)) {
        console.log(`Removing ${name}.`);
        ret.push(track);
        track.delete();
      }
    }
    return ret;
  }

  private clickDevicesMenuItem(regex: RegExp): boolean {
    this._itunes.activate();
    for (let i = 0; i < this._devicesMenuItems.length; i++) {
      const item = this._devicesMenuItems[i];
      if (regex.test(item.title()) && item.enabled()) {
        item.click();
        return true;
      }
    }
    return false;
  }

  syncDevice(): boolean {
    return this.clickDevicesMenuItem(/^Sync /);
  }

  backupDevice(): boolean {
    return this.clickDevicesMenuItem(/^Back Up$/);
  }

  transferPurchasesFromDevice(): boolean {
    return this.clickDevicesMenuItem(/^Transfer Purchases from /);
  }
}
