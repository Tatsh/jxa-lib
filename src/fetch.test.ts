import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockDataTaskWithURLCompletionHandler, mockNSURL, mockResume } = vi.hoisted(() => {
  const mockResume = vi.fn();
  const mockDataTaskWithURLCompletionHandler = vi.fn();
  const mockNSURL = { URLWithString: vi.fn() };
  global.ObjC = {
    ['import']: vi.fn(),
  } as unknown as typeof global.ObjC;
  global.$ = {
    NSURLSession: {
      sharedSession: { dataTaskWithURLCompletionHandler: mockDataTaskWithURLCompletionHandler },
    },
    NSURL: mockNSURL,
  } as unknown as typeof global.$;
  return { mockDataTaskWithURLCompletionHandler, mockNSURL, mockResume };
});

import { fetch } from './fetch';

beforeEach(() => {
  vi.clearAllMocks();
  mockNSURL.URLWithString.mockImplementation((url: string) => `NSURL:${url}`);
});

describe('fetch', () => {
  it('should resolve with data and response when no error', async () => {
    const fakeData = { foo: 'bar' };
    const fakeResponse = { status: 200 };
    mockDataTaskWithURLCompletionHandler.mockImplementation(
      (
        _url: string,
        cb: (data: unknown, response: unknown, error: { isNil: () => boolean }) => void,
      ) => {
        cb(fakeData, fakeResponse, { isNil: () => true });
        return { resume: mockResume() };
      },
    );

    const result = await fetch('https://example.com');
    expect(mockNSURL.URLWithString).toHaveBeenCalledWith('https://example.com');
    expect(result).toEqual({
      data: fakeData,
      originalResponse: fakeResponse,
    });
  });

  it('should reject when error is not nil', async () => {
    const fakeError = { isNil: () => false, message: 'fail' };
    mockDataTaskWithURLCompletionHandler.mockImplementation(
      (
        _url: string,
        cb: (
          data: unknown,
          response: unknown,
          error: { isNil: () => boolean; message: string },
        ) => void,
      ) => {
        cb(undefined, undefined, fakeError);
        return { resume: mockResume() };
      },
    );

    await expect(fetch('https://fail.com')).rejects.toBe(fakeError);
  });
});
