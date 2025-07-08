import { beforeEach, describe, expect, it, jest } from '@jest/globals';

const mockObjC = {
  import: jest.fn(),
  wrap: jest.fn((x) => x),
  unwrap: jest.fn((x) => x),
};
const mockNSAppleEventDescriptor = {
  nullDescriptor: {},
};
const mockDelay = jest.fn();
global.ObjC = mockObjC as unknown as typeof global.ObjC;
const mockNSWorkspace = {
  getInfoForFileApplicationType: jest.fn(),
  isFilePackageAtPath: jest.fn(),
  iconForFile: jest.fn(),
  iconForFiles: jest.fn(),
  runningApplications: [] as unknown[],
  launchAppWithBundleIdentifierOptionsAdditionalEventParamDescriptorLaunchIdentifier: jest.fn(),
};
global.$ = {
  NSWorkspace: {
    sharedWorkspace: mockNSWorkspace,
  },
  NSAppleEventDescriptor: mockNSAppleEventDescriptor,
  NSWorkspaceLaunchAsync: 1 << 0,
  NSWorkspaceLaunchAndHide: 1 << 1,
} as unknown as typeof global.$;
global.delay = mockDelay as unknown as typeof global.delay;
import { Workspace } from './nsworkspace';

describe('Workspace', () => {
  let workspace: Workspace;

  beforeEach(() => {
    jest.clearAllMocks();
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
          isEqualToString: jest.fn((id) => id === 'com.apple.Finder'),
        },
      };
      mockNSWorkspace.runningApplications = [mockApp];
      mockObjC.unwrap.mockReturnValue([mockApp]);
      expect(workspace.appIsRunning('com.apple.Finder')).toBe(true);
    });

    it('returns false if app with bundleId is not running', () => {
      const mockApp = {
        bundleIdentifier: {
          isEqualToString: jest.fn(() => false),
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
