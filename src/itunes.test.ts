import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { ItunesHelper } from './itunes';

const mockSources = jest.fn();
const mockLibraryPlaylists = jest.fn();
const mockFileTracks = jest.fn();
const mockTracks = jest.fn();
const mockAdd = jest.fn();
const mockRefresh = jest.fn();
const mockCurrentTrack = jest.fn();
const mockActivate = jest.fn();
const mockFinderExists = jest.fn();
const mockMenuItemClick = jest.fn();

const mockDevicesMenuItems = [
  { title: jest.fn(() => 'Sync iPhone'), enabled: jest.fn(() => true), click: mockMenuItemClick },
  { title: jest.fn(() => 'Back Up'), enabled: jest.fn(() => true), click: mockMenuItemClick },
  {
    title: jest.fn(() => 'Transfer Purchases from iPhone'),
    enabled: jest.fn(() => true),
    click: mockMenuItemClick,
  },
];

jest.mock('ramda/es/filter', () =>
  jest.fn((fn, arr) =>
    (arr as unknown[]).filter(fn as (value: unknown, index: number, array: unknown[]) => unknown),
  ),
);

jest.mock('./util', () => ({
  propExecEq: (prop: string, value: string) => (obj: Record<string, () => string>) =>
    obj[prop]() === value,
}));

(global as unknown as { Application: (name: string) => unknown }).Application = jest.fn(
  (name: string) => {
    if (name === 'Finder') {
      return { exists: mockFinderExists };
    }
    if (name === 'System Events') {
      return {
        processes: {
          byName: jest.fn(() => ({
            menuBars: [
              {
                menuBarItems: {
                  byName: jest.fn(() => ({
                    menus: [
                      {
                        menuItems: {
                          byName: jest.fn(() => ({
                            menus: [
                              {
                                menuItems: jest.fn(() => mockDevicesMenuItems),
                              },
                            ],
                          })),
                        },
                      },
                    ],
                  })),
                },
              },
            ],
          })),
        },
      };
    }
    return {};
  },
);

describe('ItunesHelper', () => {
  interface MockItunesApp {
    sources: jest.Mock;
    add: jest.Mock;
    refresh: jest.Mock;
    currentTrack: jest.Mock;
    activate: jest.Mock;
  }
  let itunesApp: MockItunesApp;
  let helper: ItunesHelper;
  let libraryPlaylist: { fileTracks: jest.Mock; tracks: jest.Mock };
  let fileTrack: {
    name: jest.Mock;
    location: jest.Mock;
    delete: jest.Mock;
  };
  let finderFolder: { entireContents: jest.Mock } | undefined;

  beforeEach(() => {
    fileTrack = {
      name: jest.fn(() => 'Track 1'),
      location: jest.fn(() => '/Users/test/Music/Track1.mp3'),
      delete: jest.fn(),
    };
    libraryPlaylist = {
      fileTracks: mockFileTracks,
      tracks: mockTracks,
    };
    mockFileTracks.mockReturnValue([fileTrack]);
    mockTracks.mockReturnValue([fileTrack]);
    mockLibraryPlaylists.mockReturnValue([libraryPlaylist]);
    mockSources.mockReturnValue([
      {
        name: jest.fn(() => 'Library'),
        libraryPlaylists: mockLibraryPlaylists,
      },
    ]);
    itunesApp = {
      sources: mockSources,
      add: mockAdd,
      refresh: mockRefresh,
      currentTrack: mockCurrentTrack,
      activate: mockActivate,
    };
    helper = new ItunesHelper(itunesApp as unknown as ItunesApplication);
    mockFinderExists.mockReset();
    mockAdd.mockReset();
    mockRefresh.mockReset();
    mockCurrentTrack.mockReset();
    fileTrack.delete.mockReset();
  });

  describe('clearOrphanedTracks', () => {
    beforeEach(() => {
      global.$ = { printf: jest.fn() } as unknown as typeof global.$;
    });
    it('removes tracks with missing location', () => {
      fileTrack.location.mockImplementationOnce(() => {
        throw new Error('No location');
      });
      const removed = helper.clearOrphanedTracks();
      expect(removed).toContain(fileTrack);
      expect(fileTrack.delete).toHaveBeenCalled();
    });

    it('removes tracks if Finder.exists returns false', () => {
      mockFinderExists.mockReturnValue(false);
      const removed = helper.clearOrphanedTracks();
      expect(removed).toContain(fileTrack);
      expect(fileTrack.delete).toHaveBeenCalled();
    });

    it('does not remove tracks if location exists', () => {
      mockFinderExists.mockReturnValue(true);
      const removed = helper.clearOrphanedTracks();
      expect(removed).toEqual([]);
      expect(fileTrack.delete).not.toHaveBeenCalled();
    });
  });

  describe('addTracksAtPath', () => {
    it('adds tracks and refreshes them', () => {
      finderFolder = {
        entireContents: jest.fn(() => [
          { url: jest.fn(() => 'file:///Users/test/Music/Track1.mp3') },
        ]),
      };
      helper.addTracksAtPath(finderFolder as unknown as FinderFolder);
      expect(mockAdd).toHaveBeenCalledWith(['/Users/test/Music/Track1.mp3'], {
        to: libraryPlaylist,
      });
      expect(mockRefresh).toHaveBeenCalledWith(fileTrack);
    });
  });

  describe('fileTracks getter', () => {
    it('returns fileTracks from library', () => {
      expect(helper.fileTracks).toBe(mockFileTracks());
    });
  });

  describe('library getter', () => {
    it('returns the library source', () => {
      expect(helper.library).toBeDefined();
      expect(helper.library?.name()).toBe('Library');
    });

    it('returns undefined if no Library source', () => {
      helper = new ItunesHelper(itunesApp as unknown as ItunesApplication);
      mockSources.mockReturnValue([{ name: jest.fn(() => 'Other') }]);
      expect(helper.library).toBeUndefined();
    });
  });

  describe('currentTrack getter', () => {
    it('returns current track if available', () => {
      mockCurrentTrack.mockReturnValue('track');
      expect(helper.currentTrack).toBe('track');
    });

    it('returns undefined if currentTrack throws', () => {
      mockCurrentTrack.mockImplementation(() => {
        throw new Error();
      });
      expect(helper.currentTrack).toBeUndefined();
    });
  });

  describe('deleteOrphanedTracks', () => {
    it('removes orphaned tracks', () => {
      mockFinderExists.mockReturnValue(false);
      const removed = helper.deleteOrphanedTracks();
      expect(removed).toContain(fileTrack);
      expect(fileTrack.delete).toHaveBeenCalled();
    });

    it('removes tracks if location throws', () => {
      fileTrack.location.mockImplementationOnce(() => {
        throw new Error();
      });
      const removed = helper.deleteOrphanedTracks();
      expect(removed).toContain(fileTrack);
      expect(fileTrack.delete).toHaveBeenCalled();
    });

    it('does not remove tracks if location exists', () => {
      mockFinderExists.mockReturnValue(true);
      const removed = helper.deleteOrphanedTracks();
      expect(removed).toEqual([]);
      expect(fileTrack.delete).not.toHaveBeenCalled();
    });
  });

  describe('Device menu actions', () => {
    it('syncDevice clicks the correct menu item', () => {
      expect(helper.syncDevice()).toBe(true);
      expect(mockMenuItemClick).toHaveBeenCalled();
    });

    it('backupDevice clicks the correct menu item', () => {
      expect(helper.backupDevice()).toBe(true);
      expect(mockMenuItemClick).toHaveBeenCalled();
    });

    it('transferPurchasesFromDevice clicks the correct menu item', () => {
      expect(helper.transferPurchasesFromDevice()).toBe(true);
      expect(mockMenuItemClick).toHaveBeenCalled();
    });

    it('returns false if no menu item matches', () => {
      mockDevicesMenuItems.forEach((item) => item.title.mockReturnValue('Other'));
      expect(helper.syncDevice()).toBe(false);
    });
  });
});
