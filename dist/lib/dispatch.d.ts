/** Creates new counting semaphore with an initial value. */
export declare const dispatch_semaphore_create: typeof $.dispatch_semaphore_create;
/** Signals (increments) a semaphore. */
export declare const dispatch_semaphore_signal: typeof $.dispatch_semaphore_signal;
/** Waits for (decrements) a semaphore. */
export declare const dispatch_semaphore_wait: typeof $.dispatch_semaphore_wait;
export declare class DispatchSemaphore {
    private sema;
    constructor(n: number);
    /** Waits for (decrements) a semaphore. */
    wait(timeout: number): number;
    /** Waits for (decrements) a semaphore, with timeout parameter
     * `DISPATCH_TIME_FOREVER`. */
    waitForever(): number;
    /** Signals (increments) a semaphore. */
    signal(): number;
}
