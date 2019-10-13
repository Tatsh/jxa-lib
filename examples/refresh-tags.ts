import { filter } from 'ramda';

import { getenv } from '../lib/stdlib';

class ItunesHelper {
  private finder = Application('Finder');
  private itunes: ItunesApplication;
  private library?: ITunesLibrary;

  constructor(itunesApp: ItunesApplication) {
    this.itunes = itunesApp;

    Object.defineProperties(this, {
      library: {
        get: () => {
          if (this.library) {
            return this.library;
          }
          for (const source of this.itunes.sources()) {
            if (source.name() === 'Library') {
              this.library = source;
              break;
            }
          }

          return this.library;
        }
      }
    });
  }

  clearOrphanedTracks(): FileTrack[] {
    if (!this.library) {
      return [];
    }

    const ret = [];

    for (const track of this.library.tracks()) {
      const name = track.name();
      let loc: PathObject;
      try {
        loc = track.location();
      } catch (e) {
        $.printf(`Removing ${name} (catch)\n`);
        ret.push(track);
        track.delete();
        continue;
      }

      if (!loc || !this.finder.exists(loc)) {
        $.printf(`Removing ${name} (not loc)`);
        ret.push(track);
        track.delete();
      }
    }

    return ret;
  }

  addTracksAtPath(root: FinderFolder) {
    if (!this.library) {
      return;
    }
    const paths: PathObject[] = [];
    for (const x of root.entireContents()) {
      paths.push(x.url().replace(/^file\:\/\//, ''));
    }
    this.itunes.add(paths, { to: this.library });
    for (const track of this.library.tracks()) {
      this.itunes.refresh(track);
    }
  }
}

export default function refreshTags() {
  const tunesApp = Application('Music');
  const itunes = new ItunesHelper(tunesApp);
  const selections = filter(
    x => x.class() === 'fileTrack',
    tunesApp.selection() as FileTrack[]
  );
  itunes.clearOrphanedTracks();
  for (const track of selections) {
    tunesApp.refresh(track);
  }
  return 0;
}

if ((getenv('_') as string).endsWith('refresh-tags.ts')) {
  refreshTags();
}
