ObjC.import('dispatch');

export const dispatch_semaphore_create = $.dispatch_semaphore_create;
export const dispatch_semaphore_signal = $.dispatch_semaphore_signal;
export const dispatch_semaphore_wait = $.dispatch_semaphore_wait;

export class DispatchSemaphore {
  private sema: any;

  constructor(n: number) {
    this.sema = dispatch_semaphore_create(n);
  }

  wait(timeout: number): number {
    return dispatch_semaphore_wait(this.sema, timeout);
  }

  signal() {
    return dispatch_semaphore_signal(this.sema);
  }
}
