import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockNSData, mockNSString, mockObjCUnwrap } = vi.hoisted(() => {
  const mockNSData = {};
  const mockNSString = {
    alloc: {
      initWithDataEncoding: vi.fn(),
    },
  };
  const mockObjCUnwrap = vi.fn();
  global.ObjC = {
    import: vi.fn(),
    unwrap: mockObjCUnwrap,
  } as unknown as typeof global.ObjC;
  global.$ = {
    NSString: mockNSString,
    NSASCIIStringEncoding: 1,
    NSUTF8StringEncoding: 4,
  } as unknown as typeof global.$;
  return { mockNSData, mockNSString, mockObjCUnwrap };
});

import { stringWithData } from './string';

describe('string.ts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('stringWithData', () => {
    it('calls NSString.alloc.initWithDataEncoding with default encoding', () => {
      const fakeNSString = {};
      mockNSString.alloc.initWithDataEncoding.mockReturnValue(fakeNSString);
      mockObjCUnwrap.mockReturnValue('abc');
      const result = stringWithData(mockNSData as unknown as NSData);
      expect(mockNSString.alloc.initWithDataEncoding).toHaveBeenCalledWith(mockNSData, 1);
      expect(mockObjCUnwrap).toHaveBeenCalledWith(fakeNSString);
      expect(result).toBe('abc');
    });

    it('calls NSString.alloc.initWithDataEncoding with custom encoding', () => {
      const fakeNSString = {};
      mockNSString.alloc.initWithDataEncoding.mockReturnValue(fakeNSString);
      mockObjCUnwrap.mockReturnValue('xyz');
      const result = stringWithData(mockNSData as unknown as NSData, 4);
      expect(mockNSString.alloc.initWithDataEncoding).toHaveBeenCalledWith(mockNSData, 4);
      expect(mockObjCUnwrap).toHaveBeenCalledWith(fakeNSString);
      expect(result).toBe('xyz');
    });
  });
});
