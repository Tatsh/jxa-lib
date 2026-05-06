import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';

const { mockNSFileManager, mockNSHomeDirectory } = vi.hoisted(() => {
  const mockNSFileManager = {
    attributesOfItemAtPathError: vi.fn(),
    contentsOfDirectoryAtPathError: vi.fn(),
    fileExistsAtPath: vi.fn(),
  };
  const mockNSHomeDirectory = vi.fn();
  global.ObjC = {
    ['import']: vi.fn(),
    deepUnwrap: vi.fn(),
    unwrap: vi.fn(),
  } as unknown as typeof global.ObjC;
  global.$ = {
    NSFileManager: { defaultManager: mockNSFileManager },
    NSHomeDirectory: mockNSHomeDirectory,
  } as unknown as typeof global.$;
  global.Ref = ((_?: unknown) => ({})) as typeof global.Ref;
  return { mockNSFileManager, mockNSHomeDirectory };
});

import { FileManager, FileAttributeKey, FileType } from './nsfilemanager';

describe('FileManager', () => {
  let fm: FileManager;

  beforeEach(() => {
    vi.clearAllMocks();
    (global.ObjC.deepUnwrap as Mock).mockImplementation((v: unknown) => v);
    (global.ObjC.unwrap as Mock).mockImplementation((v: unknown) => v);
    fm = new FileManager();
  });

  describe('attributesOfItem', () => {
    it('returns attributes and calls throwErrorIfNotNil', () => {
      const attrs = { NSFileOwnerAccountID: 1 };
      mockNSFileManager.attributesOfItemAtPathError.mockImplementation((_p, e) => {
        (e as unknown[])[0] = null;
        return attrs;
      });
      const result = fm.attributesOfItem('/foo');
      expect(result).toBe(attrs);
    });

    it('throws error if error is not nil', () => {
      const err = {
        isNil: () => false,
        localizedDescription: { js: 'err' },
      };
      mockNSFileManager.attributesOfItemAtPathError.mockImplementation((_p, e) => {
        (e as unknown[])[0] = err;
        return null;
      });
      expect(() => fm.attributesOfItem('/foo')).toThrow('err');
    });
  });

  describe('contentsOfDirectory', () => {
    it('returns directory contents and calls throwErrorIfNotNil', () => {
      const files = ['a', 'b'];
      mockNSFileManager.contentsOfDirectoryAtPathError.mockImplementation((_p, e) => {
        (e as unknown[])[0] = null;
        return files;
      });
      const result = fm.contentsOfDirectory('/bar');
      expect(result).toBe(files);
    });

    it('throws error if error is not nil', () => {
      const err = {
        isNil: () => false,
        localizedDescription: { js: 'contents err' },
      };
      mockNSFileManager.contentsOfDirectoryAtPathError.mockImplementation((_p, e) => {
        (e as unknown[])[0] = err;
        return null;
      });
      expect(() => fm.contentsOfDirectory('/bar')).toThrow('contents err');
    });
  });

  describe('fileExists', () => {
    it('returns true if file exists', () => {
      mockNSFileManager.fileExistsAtPath.mockReturnValue(true);
      expect(fm.fileExists('/baz')).toBe(true);
    });

    it('returns false if file does not exist', () => {
      mockNSFileManager.fileExistsAtPath.mockReturnValue(false);
      expect(fm.fileExists('/baz')).toBe(false);
    });
  });

  describe('homeDirectory', () => {
    it('returns unwrapped home directory', () => {
      mockNSHomeDirectory.mockReturnValue('homedir');
      (global.ObjC.unwrap as Mock).mockReturnValue('homedir');
      expect(fm.homeDirectory()).toBe('homedir');
      expect(global.ObjC.unwrap).toHaveBeenCalledWith('homedir');
    });
  });

  describe('FileAttributeKey', () => {
    it('contains expected keys', () => {
      expect(FileAttributeKey.creationDate).toBe('NSFileCreationDate');
      expect(FileAttributeKey.size).toBe('NSFileSize');
    });
  });

  describe('FileType', () => {
    it('contains expected types', () => {
      expect(FileType.directory).toBe('NSFileTypeDirectory');
      expect(FileType.symbolicLink).toBe('NSFileTypeSymbolicLink');
      expect(FileType.regular).toBe('NSFileTypeRegular');
    });
  });
});
