import { KebabToTitleCasePipe } from './kebab-to-sentence-case.pipe';

describe('KebabToTitleCasePipe', () => {
  it('create an instance', () => {
    const pipe = new KebabToTitleCasePipe();
    expect(pipe).toBeTruthy();
  });
});
