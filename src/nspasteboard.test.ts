import { beforeEach, describe, expect, it, jest } from '@jest/globals';

global.ObjC = {
  ['import']: jest.fn(),
  deepUnwrap: jest.fn(),
  unwrap: jest.fn(),
} as unknown as typeof global.ObjC;
const mockSetStringForType = jest.fn();
const mockClearContents = jest.fn();
const mockPasteboardItems = [{ foo: 'bar' }, { baz: 'qux' }];
const mockGeneralPasteboard = {
  setStringForType: mockSetStringForType,
  clearContents: mockClearContents,
  pasteboardItems: mockPasteboardItems,
};
global.$ = {
  NSPasteboardTypeString: 'public.utf8-plain-text',
  NSPasteboard: {
    generalPasteboard: mockGeneralPasteboard,
  },
} as unknown as typeof global.$;
import { GeneralPasteboard, PasteboardTypeString } from './nspasteboard';

describe('GeneralPasteboard', () => {
  let pasteboard: GeneralPasteboard;

  beforeEach(() => {
    jest.clearAllMocks();
    pasteboard = new GeneralPasteboard();
  });

  it('should set data with default type', () => {
    mockSetStringForType.mockReturnValue(true);
    const result = pasteboard.set('hello');
    expect(mockSetStringForType).toHaveBeenCalledWith('hello', PasteboardTypeString);
    expect(result).toBe(true);
  });

  it('should set data with custom type', () => {
    mockSetStringForType.mockReturnValue(false);
    const result = pasteboard.set('data', 'custom.type');
    expect(mockSetStringForType).toHaveBeenCalledWith('data', 'custom.type');
    expect(result).toBe(false);
  });

  it('should get pasteboard item at index 0 by default', () => {
    (global.ObjC.unwrap as jest.Mock).mockReturnValue(mockPasteboardItems);
    const item = pasteboard.get();
    expect(global.ObjC.unwrap).toHaveBeenCalledWith(mockPasteboardItems);
    expect(item).toEqual(mockPasteboardItems[0]);
  });

  it('should get pasteboard item at given index', () => {
    (global.ObjC.unwrap as jest.Mock).mockReturnValue(mockPasteboardItems);
    const item = pasteboard.get(1);
    expect(item).toEqual(mockPasteboardItems[1]);
  });
});
