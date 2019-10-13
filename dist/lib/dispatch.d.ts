export declare const dispatch_semaphore_create: $Global["dispatch_semaphore_create"];
export declare const dispatch_semaphore_signal: $Global["dispatch_semaphore_signal"];
export declare const dispatch_semaphore_wait: $Global["dispatch_semaphore_wait"];
export declare class DispatchSemaphore {
    private sema;
    constructor(n: number);
    wait(timeout: number): number;
    waitForever(): number;
    signal(): number;
}
