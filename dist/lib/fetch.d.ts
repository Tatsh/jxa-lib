declare type WrappedResponse = {
    data?: NSData;
    originalResponse?: NSURLResponse;
};
export default function fetch(url: string): Promise<WrappedResponse>;
export {};
