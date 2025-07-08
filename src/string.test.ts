import { beforeEach, describe, expect, it, jest } from '@jest/globals';

const mockNSData = {};
const mockNSString = {
  alloc: {
    initWithDataEncoding: jest.fn(),
  },
};
const mockObjCUnwrap = jest.fn();

global.ObjC = {
  import: jest.fn(),
  unwrap: mockObjCUnwrap,
} as unknown as typeof global.ObjC;
global.$ = {
  NSString: mockNSString,
  NSASCIIStringEncoding: 1,
  NSUTF8StringEncoding: 4,
} as unknown as typeof global.$;
import { stringWithData } from './string';

describe('string.ts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
