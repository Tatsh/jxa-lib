import { beforeEach, describe, expect, it, jest } from '@jest/globals';

global.ObjC = {
  ['import']: jest.fn(),
} as unknown as typeof global.ObjC;
import { fetch } from './fetch';

const mockResume = jest.fn();
const mockDataTaskWithURLCompletionHandler = jest.fn();
const mockSharedSession = {
  dataTaskWithURLCompletionHandler: mockDataTaskWithURLCompletionHandler,
};
const mockNSURLSession = {
  sharedSession: mockSharedSession,
};
const mockNSURL = {
  URLWithString: jest.fn(),
};

global.$ = {
  NSURLSession: mockNSURLSession,
  NSURL: mockNSURL,
} as unknown as typeof global.$;

beforeEach(() => {
  jest.clearAllMocks();
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
