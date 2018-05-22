import uuid from "uuid/v1";

import check from './check';

import constructorSchema from './schemas/constructor';

const fixSchema = {
  name: String,
  data: Array,
  functions: Object,
};

const fixSchemaGood = {
  name: 'test',
  data: [],
  functions: {
    test: function() {
      return true;
    },
  },
};

const varSchema = {
  name: String,
  '?data': Array,
  '?functions': Object,
};

const fixSchemaBad = [
  {
    name: 10,
    data: {},
    functions: {},
  },
  {
    name: {},
    data: [],
    functions: 'tests',
  },
  {
    name: undefined,
    data: [],
    functions: 'tests',
  },
  {
    name: [],
    data: [],
    functions: 'tests',
  },
  {
    name: 'tests',
    data: {},
    functions: {},
  },
  {
    name: 'tests',
    data: 'test',
    functions: 'tests',
  },
  {
    name: 'tests',
    data: undefined,
    functions: 'tests',
  },
  {
    name: 'tests',
    data: 10,
    functions: 'tests',
  },
  {
    name: 'tests',
    data: [],
    functions: [],
  },
  {
    name: 'tests',
    data: [],
    functions: 'tests',
  },
  {
    name: 'tests',
    data: [],
    functions: 10,
  },
  {
    name: 'tests',
    data: [],
    functions: null,
  },
];
const varSchemaGood = [
  {
    name: 'test',
  },
  {
    name: 'test',
    data: [],
  },
  {
    name: 'test',
    data: [],
    functions: {},
  },
  {
    name: 'test',
    data: [],
    functions: {},
    test: 10,
  },
];

const varShemaGoodIndi = {
  name: 'test',
  data: [],
  functions: {},
  test: 10,
};

const fixSchemaBadKeys = [
  {
    name: 'tests',
  },
  {
    name: 'tests',
    data: [],
  },
  {
    name: 'tests',
    data: [],
    titi: {},
  }
];

const stringEqualitySchema = {
  name: String,
};
const numberEqualitySchema = {
  age: Number,
};
const arrayEqualitySchema = {
  data: Array,
};
const objectEqualitySchema = {
  data: Object,
};
const numberSupSchema = {
  age: '>10',
};
const numberMinSchema = {
  age: '<10',
};
const numberRangeSchema = {
  age: '10<>100',
};

const numberFloatSupSchema = {
  age: '>10.15',
};
const numberFloatMinSchema = {
  age: '<10.15',
};
const numberFloatRangeSchema = {
  age: '10.4<>10.7',
};

const stringWrongTypes = [
  10,
  undefined,
  null,
  {},
  [],
  new Set(),
];

const numberWrongTypes = [
  'test',
  undefined,
  null,
  {},
  [],
  new Set(),
];

const arrayWrongTypes = [
  'test',
  10,
  undefined,
  null,
  {},
  new Set(),
];

const objectWrongTypes = [
  'test',
  10,
  undefined,
  null,
  [],
  new Set(),
];

const arraySchema = {
  data: ['test', 10, { name: 'inside_test' }, [], [10]],
};

const arrayBad = [
  [],
  ['test'],
  ['test', 10],
  ['test', 10, { name: 'inside_test' }],
  ['test', 10, { name: 'inside_test' }, []],
  [10],
  [10, 'test'],
  [10, { name: 'inside_test' }, 'test'],
  [[10], { name: 'inside_test' }, 'test'],
  [[10], 10, { name: 'inside_test' }, 'test'],
  [{ name: 'inside_test' }, 'test'],
  [{ name: 'inside_test' },'test', [10], 10],
];

const arrayGood = [
  ['test', 10, { name: 'inside_test' }, [], [10]],
  [[], [10], 'test', 10, { name: 'inside_test' }],
  ['test', [10], { name: 'inside_test' }, 10, []],
  [[10], 'test', { name: 'inside_test' }, 10, []],
];

const objectSchema = {
  uuid: new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/, 'i'),
  data: {
    name: String,
    age: '18<>120',
    data: Object,
    list: ['test', 'test2'],
  },
};

const id = uuid();

const objectBadKeys = [
  {
    uuid: id,
    data: {},
  },
  {
    uuid: id,
    data: {
      name: 'test',
    },
  },
  {
    uuid: id,
    data: {
      name: 'test',
      age: 19,
    },
  },
  {
    uuid: id,
    data: {
      name: 'test',
      age: 19,
      data: {},
    },
  },
  {
    uuid: id,
    data: {
      name: 'test',
      age: 19,
      list: [],
    },
  },
];

const objectBadType = [
  {
    uuid: id,
    data: {
      name: 10,
      age: 19,
      data: {},
      list: ['test', 'test1'],
    },
  },
  {
    uuid: id,
    data: {
      name: 'test',
      age: 19,
      data: [],
      list: ['test', 'test1'],
    },
  },
]

const objectBad = [
  {
    uuid: id,
    data: {
      name: 'test',
      age: 19,
      data: {},
      list: [],
    },
  },
  {
    uuid: id,
    data: {
      name: 'test',
      age: 19,
      data: {},
      list: ['test'],
    },
  },
  {
    uuid: id,
    data: {
      name: 'test',
      age: 17,
      data: {},
      list: ['test', 'test1'],
    },
  },
  {
    uuid: id,
    data: {
      name: 'test',
      age: 120,
      data: {},
      list: ['test', 'test1'],
    },
  },
];

const objectGood = [
  {
    uuid: id,
    data: {
      name: 'test',
      age: 19,
      data: {},
      list: ['test', 'test2'],
    },
  },
  {
    uuid: id,
    data: {
      name: 'test',
      age: 119,
      data: {},
      list: ['test', 'test2'],
    },
  },
  {
    uuid: id,
    data: {
      name: 'test',
      age: 119,
      data: {
        test: 'test',
      },
      list: ['test', 'test2'],
    },
  },
];

describe('check -> schema definition:', () => {
  test('should validate an input given a schema with fix keys', () => {
    expect(check.validate(fixSchemaGood, fixSchema)).toBeNull();
  });

  test('should validate an input given a schema with variable keys', () => {
    for (let i in varSchemaGood) {
      expect(check.validate(varSchemaGood[i], varSchema)).toBeNull();
    }
  });

  test('should throw an error if strict is passed for variable keys', () => {
    expect(() => check.validate(varShemaGoodIndi, varSchema, true)).toThrowError(/must respect/);
  });

  test('should throw error for missing keys', () => {
    for (let i in fixSchemaBadKeys) {
      expect(() => check.validate(fixSchemaBadKeys[i], fixSchema)).toThrowError(/missing keys/);
    }
  });

  test('should throw error for wrong type', () => {
    for (let i in fixSchemaBad) {
      expect(() => check.validate(fixSchemaBad[i], fixSchema)).toThrowError(/should be of type/);
    }
  });
});

describe('check -> string:', () => {
  test('validate a string with type', () => {
    stringWrongTypes.forEach(t => expect(() => check.validate({ name: t }, stringEqualitySchema)).toThrowError(/should be of type/)) 
  });
  test('validate a string with regex if regex is in the schema', () => {
    // ok
    expect(check.validate({ name: "ok" }, constructorSchema)).toBeNull();
    
    // not ok
    expect(() => check.validate({ name: "not ok" }, constructorSchema)).toThrowError(`must respect ${constructorSchema.name}`);
  });

  test('validate a string with strict equality if string is in the schema', () => {
    // ok
    expect(check.validate({ name: "test" }, { name: 'test' })).toBeNull();

    // not ok
    expect(() => check.validate({ name: "notok" }, { name: 'test' })).toThrowError(TypeError);
  });
});

describe('check -> number', () => {
  test('validate a number with type', () => {
    numberWrongTypes.forEach(t => expect(() => check.validate({ age: t }, numberEqualitySchema)).toThrowError(/should be of type/)) 
  });

  test('validate number with regEx max', () => {
    expect(check.validate({ age: 11 }, numberSupSchema)).toBeNull();
    expect(check.validate({ age: 11 }, numberSupSchema)).toBeNull();
    expect(() => check.validate({ age: -11 }, numberSupSchema)).toThrowError(/must respect >10/);
    expect(() => check.validate({ age: 10 }, numberSupSchema)).toThrowError(/must respect >10/);
  });
  test('validate number with regEx max', () => {
    expect(check.validate({ age: 9 }, numberMinSchema)).toBeNull();
    expect(check.validate({ age: -9 }, numberMinSchema)).toBeNull();
    expect(() => check.validate({ age: 10 }, numberMinSchema)).toThrowError(/must respect <10/);
  });
  test('validate number with regEx range', () => {
    expect(check.validate({ age: 50 }, numberRangeSchema)).toBeNull();
    expect(check.validate({ age: 11 }, numberRangeSchema)).toBeNull();
    expect(() => check.validate({ age: 10 }, numberRangeSchema)).toThrowError(/must respect 10<>100/);
    expect(() => check.validate({ age: 100 }, numberRangeSchema)).toThrowError(/must respect 10<>100/);
  });

  test('validate number float with regEx max', () => {
    expect(check.validate({ age: 10.16 }, numberFloatSupSchema)).toBeNull();
    expect(check.validate({ age: 10.16 }, numberFloatSupSchema)).toBeNull();
    expect(() => check.validate({ age: -11 }, numberFloatSupSchema)).toThrowError(/must respect >10/);
    expect(() => check.validate({ age: 10.14 }, numberFloatSupSchema)).toThrowError(/must respect >10/);
  });
  test('validate number float with regEx min', () => {
    expect(check.validate({ age: 10.14 }, numberFloatMinSchema)).toBeNull();
    expect(check.validate({ age: -9 }, numberFloatMinSchema)).toBeNull();
    expect(() => check.validate({ age: 10.15 }, numberFloatMinSchema)).toThrowError(/must respect <10/);
  });
  test('validate number float with regEx range', () => {
    expect(() => check.validate({ age: 10.5 }, numberFloatRangeSchema)).not.toThrow();
    expect(() => check.validate({ age: 10.6 }, numberFloatRangeSchema)).not.toThrow();
    expect(() => check.validate({ age: 10.2 }, numberFloatRangeSchema)).toThrowError('must respect 10.4<>10.7');
    expect(() => check.validate({ age: 10.7 }, numberFloatRangeSchema)).toThrowError('must respect 10.4<>10.7');
  });
});

describe('check -> array', () => {
  test('validate an array with type', () => {
    arrayWrongTypes.forEach(t => expect(() => check.validate({ data: t }, arrayEqualitySchema)).toThrowError(/should be of type/));
  });

  test('validate an array with diffs: error', () => {
    arrayBad.forEach(t => expect(() => check.validate({ data: t }, arraySchema)).toThrowError(/must respect/));
  });

  test('validate an array with diffs: good', () => {
    arrayGood.forEach(t => expect(() => check.validate({ data: t }, arraySchema)).not.toThrow());
  });
});

describe('check -> object', () => {
  test('validate an object with type', () => {
    objectWrongTypes.forEach(t => expect(() => check.validate({ data: t }, objectEqualitySchema)).toThrowError(/should be of type/));
  });

  test('validate an object with diffs: error missing keys', () => {
    objectBadKeys.forEach(t => expect(() => check.validate(t, objectSchema)).toThrowError(/missing keys/));
  });
  test('validate an object with diffs: error missing keys', () => {
    objectBadType.forEach(t => expect(() => check.validate(t, objectSchema)).toThrowError(/should be of type/));
  });

  test('validate an object with diffs: error', () => {
    objectBad.forEach(t => expect(() => check.validate(t, objectSchema)).toThrowError(/must respect/));
  });

  test('validate an array with diffs: good', () => {
    objectGood.forEach(t => expect(() => check.validate(t, objectSchema)).not.toThrow());
  });
});