import { FilterPipe } from './filter.pipe';

describe('fleet search', () => {
  it('filters every fleet safely, including the last item', () => {
    const items = [{ name: 'Fleet A' }, { name: 'Other' }, { name: 'Fleet B' }];
    const pipe = new FilterPipe();
    expect(pipe.transform(items, 'Fleet')).toEqual([items[0], items[2]]);
    expect(pipe.transform(items, '')).toBe(items);
    expect(pipe.transform(undefined, 'Fleet')).toEqual([]);
  });
});
