ObjC.import('Cocoa');

type WrappedResponse = {
  data?: NSData;
  originalResponse?: NSURLResponse;
};

export default async function fetch(url: string) {
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
          originalResponse: response
        });
      }
    ).resume;
  });
}
