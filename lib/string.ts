ObjC.import('string');

export const memchr = $.memchr;
export const memcmp = $.memcmp;
export const memcpy = $.memcpy;
export const memset = $.memset;

export const stringWithData = (
  data: NSData,
  encoding = $.NSASCIIStringEncoding
) => ObjC.unwrap($.NSString.alloc.initWithDataEncoding(data, encoding));
