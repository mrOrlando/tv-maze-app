import { describe, expect, it } from 'vitest';
import { htmlToPlainText } from './htmlToPlainText';

describe('htmlToPlainText', () => {
  it('strips tags and collapses whitespace', () => {
    expect(htmlToPlainText('<p>Hello  <b>world</b></p>')).toBe('Hello world');
  });

  it('decodes basic entities via the DOM', () => {
    expect(htmlToPlainText('<p>a &amp; b</p>')).toBe('a & b');
  });
});
