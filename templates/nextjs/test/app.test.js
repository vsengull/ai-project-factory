import { describe, expect, it } from 'vitest';
import { metadata } from '../app/layout.jsx';

describe('application metadata', () => {
  it('uses the generated project title', () => {
    expect(metadata.title).toBe('{{projectTitle}}');
  });
});
