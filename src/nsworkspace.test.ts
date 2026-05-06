import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockDelay, mockNSAppleEventDescriptor, mockNSWorkspace, mockObjC } = vi.hoisted(() => {
  const mockObjC = {
    import: vi.fn(),
    wrap: vi.fn((x) => x),
    unwrap: vi.fn((x) => x),
  };
  const mockNSAppleEventDescriptor = { nullDescriptor: {} };
  const mockDelay = vi.fn();
  const mockNSWorkspace = {
    getInfoForFileApplicationType: vi.fn(),
    isFilePackageAtPath: vi.fn(),
    iconForFile: vi.fn(),
    iconForFiles: vi.fn(),
    runningApplications: [] as unknown[],
    launchAppWithBundleIdentifierOptionsAdditionalEventParamDescriptorLaunchIdentifier: vi.fn(),
  };
  global.ObjC = mockObjC as unknown as typeof global.ObjC;
  global.$ = {
    NSWorkspace: { sharedWorkspace: mockNSWorkspace },
    NSAppleEventDescriptor: mockNSAppleEventDescriptor,
    NSWorkspaceLaunchAsync: 1 << 0,
    NSWorkspaceLaunchAndHide: 1 << 1,
  } as unknown as typeof global.$;
  global.delay = mockDelay as unknown as typeof global.delay;
  return { mockDelay, mockNSAppleEventDescriptor, mockNSWorkspace, mockObjC };
});

import { Workspace } from './nsworkspace';

describe('Workspace', () => {
  let workspace: Workspace;

  beforeEach(() => {
    vi.clearAllMocks();
    workspace = Workspace.shared;
  });

  describe('getInfoForFile', () => {
    it('calls getInfoForFileApplicationType with correct arguments', () => {
      mockNSWorkspace.getInfoForFileApplicationType.mockReturnValue(true);
      const result = workspace.getInfoForFile('foo.txt', 'TextEdit', 'txt');
      expect(mockNSWorkspace.getInfoForFileApplicationType).toHaveBeenCalledWith(
        'foo.txt',
        'TextEdit',
        'txt',
      );
      expect(result).toBe(true);
    });
  });

  describe('isFilePackage', () => {
    it('calls isFilePackageAtPath and returns its result', () => {
      mockNSWorkspace.isFilePackageAtPath.mockReturnValue(true);
      expect(workspace.isFilePackage('/Applications/Safari.app')).toBe(true);
      expect(mockNSWorkspace.isFilePackageAtPath).toHaveBeenCalledWith('/Applications/Safari.app');
    });
  });

  describe('iconForFile', () => {
    it('calls iconForFile and returns its result', () => {
      const icon = {};
      mockNSWorkspace.iconForFile.mockReturnValue(icon);
      expect(workspace.iconForFile('/tmp/file.txt')).toBe(icon);
      expect(mockNSWorkspace.iconForFile).toHaveBeenCalledWith('/tmp/file.txt');
    });
  });

  describe('iconForFiles', () => {
    it('calls iconForFiles with wrapped paths', () => {
      const icon = {};
      mockNSWorkspace.iconForFiles.mockReturnValue(icon);
      const paths = ['/tmp/a', '/tmp/b'];
      expect(workspace.iconForFiles(paths)).toBe(icon);
      expect(mockNSWorkspace.iconForFiles).toHaveBeenCalledWith(paths);
    });
  });

  describe('appIsRunning', () => {
    it('returns true if app with bundleId is running', () => {
      const mockApp = {
        bundleIdentifier: {
          isEqualToString: vi.fn((id) => id === 'com.apple.Finder'),
        },
      };
      mockNSWorkspace.runningApplications = [mockApp];
      mockObjC.unwrap.mockReturnValue([mockApp]);
      expect(workspace.appIsRunning('com.apple.Finder')).toBe(true);
    });

    it('returns false if app with bundleId is not running', () => {
      const mockApp = {
        bundleIdentifier: {
          isEqualToString: vi.fn(() => false),
        },
      };
      mockNSWorkspace.runningApplications = [mockApp];
      mockObjC.unwrap.mockReturnValue([mockApp]);
      expect(workspace.appIsRunning('com.apple.Terminal')).toBe(false);
    });

    it('skips app if bundleIdentifier.isEqualToString is undefined', () => {
      const mockApp = {
        bundleIdentifier: {},
      };
      mockNSWorkspace.runningApplications = [mockApp];
      mockObjC.unwrap.mockReturnValue([mockApp]);
      expect(workspace.appIsRunning('com.apple.Terminal')).toBe(false);
    });
  });

  describe('startApp', () => {
    it('calls launchAppWithBundleIdentifierOptionsAdditionalEventParamDescriptorLaunchIdentifier and delay', () => {
      workspace.startApp('com.apple.Safari', 2);
      expect(
        mockNSWorkspace.launchAppWithBundleIdentifierOptionsAdditionalEventParamDescriptorLaunchIdentifier,
      ).toHaveBeenCalledWith(
        'com.apple.Safari',
        1 | 2,
        mockNSAppleEventDescriptor.nullDescriptor,
        null,
      );
      expect(mockDelay).toHaveBeenCalledWith(2);
    });

    it('uses default waitTime if not provided', () => {
      workspace.startApp('com.apple.Safari');
      expect(mockDelay).toHaveBeenCalledWith(3);
    });
  });
});
