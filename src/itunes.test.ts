import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { ItunesHelper } from './itunes';

const mockSources = vi.fn();
const mockLibraryPlaylists = vi.fn();
const mockFileTracks = vi.fn();
const mockTracks = vi.fn();
const mockAdd = vi.fn();
const mockRefresh = vi.fn();
const mockCurrentTrack = vi.fn();
const mockActivate = vi.fn();
const mockFinderExists = vi.fn();
const mockMenuItemClick = vi.fn();

const mockDevicesMenuItems = [
  { title: vi.fn(() => 'Sync iPhone'), enabled: vi.fn(() => true), click: mockMenuItemClick },
  { title: vi.fn(() => 'Back Up'), enabled: vi.fn(() => true), click: mockMenuItemClick },
  {
    title: vi.fn(() => 'Transfer Purchases from iPhone'),
    enabled: vi.fn(() => true),
    click: mockMenuItemClick,
  },
];

vi.mock('ramda/es/filter', () => ({
  default: vi.fn((fn, arr) =>
    (arr as unknown[]).filter(fn as (value: unknown, index: number, array: unknown[]) => unknown),
  ),
}));

vi.mock('./util', () => ({
  propExecEq: (prop: string, value: string) => (obj: Record<string, () => string>) =>
    obj[prop]() === value,
}));

(global as unknown as { Application: (name: string) => unknown }).Application = vi.fn(
  (name: string) => {
    if (name === 'Finder') {
      return { exists: mockFinderExists };
    }
    if (name === 'System Events') {
      return {
        processes: {
          byName: vi.fn(() => ({
            menuBars: [
              {
                menuBarItems: {
                  byName: vi.fn(() => ({
                    menus: [
                      {
                        menuItems: {
                          byName: vi.fn(() => ({
                            menus: [
                              {
                                menuItems: vi.fn(() => mockDevicesMenuItems),
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
    sources: Mock;
    add: Mock;
    refresh: Mock;
    currentTrack: Mock;
    activate: Mock;
  }
  let itunesApp: MockItunesApp;
  let helper: ItunesHelper;
  let libraryPlaylist: { fileTracks: Mock; tracks: Mock };
  let fileTrack: {
    name: Mock;
    location: Mock;
    delete: Mock;
  };
  let finderFolder: { entireContents: Mock } | undefined;

  beforeEach(() => {
    fileTrack = {
      name: vi.fn(() => 'Track 1'),
      location: vi.fn(() => '/Users/test/Music/Track1.mp3'),
      delete: vi.fn(),
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
        name: vi.fn(() => 'Library'),
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
      global.$ = { printf: vi.fn() } as unknown as typeof global.$;
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
        entireContents: vi.fn(() => [{ url: vi.fn(() => 'file:///Users/test/Music/Track1.mp3') }]),
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
      mockSources.mockReturnValue([{ name: vi.fn(() => 'Other') }]);
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
