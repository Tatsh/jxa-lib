ObjC.import('dispatch');

/** Creates new counting semaphore with an initial value. */
export const dispatch_semaphore_create = $.dispatch_semaphore_create;
/** Signals (increments) a semaphore. */
export const dispatch_semaphore_signal = $.dispatch_semaphore_signal;
/** Waits for (decrements) a semaphore. */
export const dispatch_semaphore_wait = $.dispatch_semaphore_wait;

export class DispatchSemaphore {
  private sema: dispatch_semaphore_t;

  constructor(n: number) {
    this.sema = dispatch_semaphore_create(n);
  }

  /** Waits for (decrements) a semaphore. */
  wait(timeout: number) {
    return dispatch_semaphore_wait(this.sema, timeout);
  }

  /** Waits for (decrements) a semaphore, with timeout parameter
   * `DISPATCH_TIME_FOREVER`. */
  waitForever(): number {
    return dispatch_semaphore_wait(this.sema, $.DISPATCH_TIME_FOREVER);
  }

  /** Signals (increments) a semaphore. */
  signal() {
    return dispatch_semaphore_signal(this.sema);
  }
}
