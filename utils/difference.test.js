import difference from './difference';

describe('utils/difference', () => {
  const sources1 = [
    {
      source: ['tests', 10, { name: 'inside_test' }, [], [1]],
      test: [],
      result: ['tests', 10, { name: 'inside_test' }, [], [1]]
    },
    {
      source: ['tests', 10, { name: 'inside_test' }, [], [1]],
      test: ['tests'],
      result: [10, { name: 'inside_test' }, [], [1]]
    },
    {
      source: ['tests', 10, { name: 'inside_test' }, [], [1]],
      test: ['tests', 10, { name: 'inside_test' }],
      result: [[], [1]]
    },
    {
      source: ['tests', 10, { name: 'inside_test' }, [], [1]],
      test: ['tests', 10, { name: 'inside_test' }, []],
      result: [[1]]
    },
    {
      source: ['tests', 10, { name: 'inside_test' }, [], [1]],
      test: ['tests', 10, { name: 'inside_test' }, [], [1]],
      result: [],
    },
    {
      source: [undefined],
      test: [undefined],
      result: [],
    },
    {
      source: [undefined, null],
      test: [undefined, null],
      result: [],
    },
    {
      source: ['test', undefined, null, 10],
      test: ['test', undefined, null],
      result: [10],
    },
    {
      source: ['test', undefined, null, 10],
      test: ['test', 10],
      result: [],
    },
    {
      source: ['test', undefined, null, 10],
      test: ['test', 10],
      result: [],
    },
    {
      source: ['test', undefined, null, 10],
      test: ['test', undefined, null, 10],
      result: [],
    },
    {
      source: ['test', undefined, null, 10],
      test: ['test', 10, undefined, null],
      result: [],
    },
    {
      source: ['test', undefined, null, 10],
      test: ['test', undefined, 10, null],
      result: [],
    },
    {
      source: ['test', undefined, null, 10],
      test: [undefined, 10, 'test', null],
      result: [],
    },
    {
      source: ['test', 10],
      test: [10, 'test'],
      result: [],
    },
  ];
  test('should return differences between source and x arrays', () => {
    sources1.forEach(t => expect(difference(t.source, t.test)).toEqual(t.result));
  });
});