import { filter } from 'ramda';

import { getenv } from '../lib/stdlib';
import { propExecEq } from '../lib/util';

class ItunesHelper {
  private finder = Application("Finder");
  private itunes: ItunesApplication;
  private library?: LibraryPlaylist;

  constructor(itunesApp: ItunesApplication) {
    this.itunes = itunesApp;
    this.library = filter(
      propExecEq<"name", string, Source>("name", "Library"),
      this.itunes.sources()
    )[0].libraryPlaylists()[0];
  }

  clearOrphanedTracks(): FileTrack[] {
    if (!this.library) {
      return [];
    }
    const ret = [];
    for (const track of this.library.fileTracks()) {
      const name = track.name();
      let loc: PathObject;
      try {
        loc = track.location();
      } catch (e) {
        $.printf(`Removing ${name} (caught ${e})\n`);
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
    const paths: string[] = [];
    for (const x of root.entireContents()) {
      paths.push(x.url().replace(/^file\:\/\//, ""));
    }
    this.itunes.add(paths, { to: this.library });
    for (const track of this.library.fileTracks()) {
      this.itunes.refresh(track);
    }
  }

  fileTracks() {
    return this.library!.fileTracks();
  }
}

export default function refreshTags() {
  const tunesApp = Application("Music");
  const itunes = new ItunesHelper(tunesApp);
  itunes.clearOrphanedTracks();
  console.log("Please be patient!");
  for (const track of itunes.fileTracks()) {
    tunesApp.refresh(track);
  }
  return 0;
}

if ((getenv("_") as string).endsWith("refresh-tags.ts")) {
  refreshTags();
}
