ObjC.import('Cocoa');

/** Response-like object. */
export interface WrappedResponse {
  /** Raw returned data. */
  data?: NSData;
  /** Response. */
  originalResponse?: NSURLResponse;
}

/** Basic fetch-like function. Only GET method is supported.*/
export async function fetch(url: string) {
  return new Promise<WrappedResponse>((resolve, reject) => {
    $.NSURLSession.sharedSession.dataTaskWithURLCompletionHandler(
      $.NSURL.URLWithString(url),
      (data, response, error) => {
        if (error && !error.isNil()) {
          reject(error);
          return;
        }
        resolve({
          data: data,
          originalResponse: response,
        });
      },
    ).resume;
  });
}
