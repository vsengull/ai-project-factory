import { describe, expect, it } from 'vitest';
import { getStack, STACKS } from '../src/core/template-registry.js';
import { normalizeProjectName } from '../src/core/validation.js';

describe('normalizeProjectName', () => {
  it('normalizes a valid project name', () => {
    expect(normalizeProjectName('  My-App  ')).toBe('my-app');
  });

  it.each(['', 'hello world', '../escape', '_private'])('rejects invalid name %j', (name) => {
    expect(() => normalizeProjectName(name)).toThrow('lowercase letters, numbers, and hyphens');
  });
});

describe('template registry', () => {
  it('contains the supported stacks', () => {
    expect(STACKS.map((stack) => stack.key)).toEqual(['nextjs', 'nestjs', 'flutter']);
  });

  it('returns a stack definition', () => {
    expect(getStack('nextjs').label).toBe('Next.js');
  });

  it('rejects an unsupported stack', () => {
    expect(() => getStack('rails')).toThrow('Unsupported stack');
  });
});
