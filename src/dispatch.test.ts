import { beforeEach, describe, expect, it, vi } from 'vitest';

const { semaphoreMock } = vi.hoisted(() => {
  const semaphoreMock = Symbol('semaphore');
  global.ObjC = {
    ['import']: vi.fn(),
  } as unknown as typeof global.ObjC;
  global.$ = {
    DISPATCH_TIME_FOREVER: 999,
    dispatch_semaphore_create: vi.fn(() => semaphoreMock),
    dispatch_semaphore_signal: vi.fn(),
    dispatch_semaphore_wait: vi.fn(),
  } as unknown as typeof global.$;
  return { semaphoreMock };
});

import { DispatchSemaphore } from './dispatch';

describe('DispatchSemaphore', () => {
  beforeEach(() => {
    vi.resetAllMocks;
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
