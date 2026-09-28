import { describe, expect, it } from 'vitest';

import { classNames } from './class-names';

describe('classNames', () => {
  it('joins only present class names', () => {
    expect(classNames('base', false, undefined, 'active')).toBe('base active');
  });
});
