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
]

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
  name: 'test',
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

describe('check -> schema definition:', () => {
  test('should validate an input given a schema with fix keys', () => {
    expect(check.validate(fixSchemaGood, fixSchema)).toBeNull();
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
    stringWrongTypes.forEach(t => expect(() => check.validate({ name: t }, stringEqualitySchema)).toThrowError(/must respect/)) 
  });
  test('validate a string with regex if regex is in the schema', () => {
    // ok
    expect(check.validate({ name: "ok" }, constructorSchema)).toBeNull();
    
    // not ok
    expect(() => check.validate({ name: "not ok" }, constructorSchema)).toThrowError(`must respect ${constructorSchema.name}`);
  });

  test('validate a string with strict equality if string is in the schema', () => {
    // ok
    expect(check.validate({ name: "test" }, stringEqualitySchema)).toBeNull();

    // not ok
    expect(() => check.validate({ name: "notok" }, stringEqualitySchema)).toThrowError(TypeError);
  });
});

describe('check -> number', () => {
  test('validate number with regEx max', () => {
    expect(check.validate({ age: 11 }, numberSupSchema)).toBeNull();
    expect(() => check.validate({ age: -11 }, numberSupSchema)).toThrowError(/must respect >10/);
    expect(check.validate({ age: 11 }, numberSupSchema)).toBeNull();
    expect(() => check.validate({ age: 10 }, numberSupSchema)).toThrowError(/must respect >10/);
  });
  test('validate number with regEx max', () => {
    expect(check.validate({ age: 9 }, numberMinSchema)).toBeNull();
    expect(() => check.validate({ age: 10 }, numberMinSchema)).toThrowError(/must respect <10/);
    expect(check.validate({ age: -9 }, numberMinSchema)).toBeNull();
  });
  test('validate number with regEx range', () => {
    expect(check.validate({ age: 50 }, numberRangeSchema)).toBeNull();
    expect(() => check.validate({ age: 10 }, numberRangeSchema)).toThrowError(/must respect 10<>100/);
    expect(check.validate({ age: 11 }, numberRangeSchema)).toBeNull();
    expect(() => check.validate({ age: 100 }, numberRangeSchema)).toThrowError(/must respect 10<>100/);
  });

  test('validate number float with regEx max', () => {
    expect(check.validate({ age: 10.16 }, numberFloatSupSchema)).toBeNull();
    expect(() => check.validate({ age: -11 }, numberFloatSupSchema)).toThrowError(/must respect >10/);
    expect(check.validate({ age: 10.16 }, numberFloatSupSchema)).toBeNull();
    expect(() => check.validate({ age: 10.14 }, numberFloatSupSchema)).toThrowError(/must respect >10/);
  });
  test('validate number float with regEx min', () => {
    expect(check.validate({ age: 10.14 }, numberFloatMinSchema)).toBeNull();
    expect(() => check.validate({ age: 10.15 }, numberFloatMinSchema)).toThrowError(/must respect <10/);
    expect(check.validate({ age: -9 }, numberFloatMinSchema)).toBeNull();
  });
  test.only('validate number float with regEx range', () => {
    expect(check.validate({ age: 10.5 }, numberFloatRangeSchema)).toBeNull();
    // expect(() => check.validate({ age: 10.2 }, numberFloatRangeSchema)).toThrowError(/must respect 10.4<>10.7/);
    expect(check.validate({ age: 10.6 }, numberFloatRangeSchema)).toBeNull();
    // expect(() => check.validate({ age: 10.7 }, numberFloatRangeSchema)).toThrowError(/must respect 10.4<>10.7/);
  });
})