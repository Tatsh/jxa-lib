import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { applicationWithStandardAdditions, chr, ord, propExecEq, throwErrorIfNotNil } from './util';

describe('throwErrorIfNotNil', () => {
  it('should throw an Error if NSError is not nil', () => {
    const error = {
      isNil: jest.fn().mockReturnValue(false),
      localizedDescription: { js: 'Some error' },
    };
    expect(() => throwErrorIfNotNil(error as unknown as NSError)).toThrow('Some error');
  });

  it('should not throw if NSError is nil', () => {
    const error = {
      isNil: jest.fn().mockReturnValue(true),
      localizedDescription: { js: 'Should not throw' },
    };
    expect(() => throwErrorIfNotNil(error as unknown as NSError)).not.toThrow();
  });

  it('should not throw if error is undefined', () => {
    expect(() => throwErrorIfNotNil(undefined)).not.toThrow();
  });
});

describe('applicationWithStandardAdditions', () => {
  const originalApplication = global.Application;

  beforeEach(() => {
    global.Application = jest.fn((spec: unknown) => ({
      spec,
    })) as unknown as typeof global.Application;
  });

  afterEach(() => {
    global.Application = originalApplication;
  });

  it('should set includeStandardAdditions to true', () => {
    const app = { includeStandardAdditions: false };
    (global.Application as jest.Mock).mockReturnValue(app);
    const result = applicationWithStandardAdditions('Finder');
    expect(result.includeStandardAdditions).toBe(true);
  });

  it('should pass spec to Application', () => {
    const app = { includeStandardAdditions: false };
    (global.Application as jest.Mock).mockReturnValue(app);
    applicationWithStandardAdditions('Music');
    expect(global.Application).toHaveBeenCalledWith('Music');
  });
});

describe('chr', () => {
  it('should return the character for a code', () => {
    expect(chr(65)).toBe('A');
    expect(chr(97)).toBe('a');
  });
});

describe('ord', () => {
  it('should return the char code of the first character', () => {
    expect(ord('A')).toBe(65);
    expect(ord(['B'])).toBe(66);
  });
});

describe('propExecEq', () => {
  it('should call the property as a function and compare with value', () => {
    const obj = {
      foo: jest.fn().mockReturnValue(42),
    };
    const fn = propExecEq('foo', 42);
    const result = fn(obj as { foo: (arg?: unknown) => number });
    expect(obj.foo).toHaveBeenCalledWith(undefined);
    expect(result).toBe(true);
  });

  it('should return false when property result does not equal value', () => {
    const obj = {
      foo: jest.fn().mockReturnValue(99),
    };
    const fn = propExecEq('foo', 42);
    const result = fn(obj as { foo: (arg?: unknown) => number });
    expect(result).toBe(false);
  });

  it('should pass args to the property function', () => {
    const obj = {
      bar: jest.fn().mockReturnValue('baz'),
    };
    const fn = propExecEq('bar', 'baz');
    const args = { x: 1 };
    fn(obj as { bar: (arg?: unknown) => string }, args);
    expect(obj.bar).toHaveBeenCalledWith(args);
  });
});
