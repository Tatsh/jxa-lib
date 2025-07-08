import { beforeEach, describe, expect, it, jest } from '@jest/globals';

global.ObjC = {
  ['import']: jest.fn(),
} as unknown as typeof global.ObjC;
const semaphoreMock = Symbol('semaphore');
global.$ = {
  DISPATCH_TIME_FOREVER: 999,
  dispatch_semaphore_create: jest.fn(() => semaphoreMock),
  dispatch_semaphore_signal: jest.fn(),
  dispatch_semaphore_wait: jest.fn(),
} as unknown as typeof global.$;
import { DispatchSemaphore } from './dispatch';

describe('DispatchSemaphore', () => {
  beforeEach(() => {
    jest.resetAllMocks;
  });

  it('should create a semaphore with the given initial value', () => {
    new DispatchSemaphore(2);
    expect(global.$.dispatch_semaphore_create).toHaveBeenCalledWith(2);
  });

  it('wait should call dispatch_semaphore_wait with correct arguments', () => {
    const sem = new DispatchSemaphore(1);
    sem.wait(123);
    expect(global.$.dispatch_semaphore_wait).toHaveBeenCalledWith(semaphoreMock, 123);
  });

  it('waitForever should call dispatch_semaphore_wait with DISPATCH_TIME_FOREVER', () => {
    const sem = new DispatchSemaphore(1);
    sem.waitForever();
    expect(global.$.dispatch_semaphore_wait).toHaveBeenCalledWith(semaphoreMock, 999);
  });

  it('signal should call dispatch_semaphore_signal', () => {
    const sem = new DispatchSemaphore(1);
    sem.signal();
    expect(global.$.dispatch_semaphore_signal).toHaveBeenCalledWith(semaphoreMock);
  });
});
