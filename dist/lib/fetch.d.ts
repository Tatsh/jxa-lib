declare type WrappedResponse = {
    data?: NSData;
    originalResponse?: NSURLResponse;
};
/** Basic fetch-like function. Only GET method is supported.*/
export default function fetch(url: string): Promise<WrappedResponse>;
export {};
