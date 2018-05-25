import { difference } from './utils/src/array/difference';

const nRegEx = new RegExp(/[\-\+]{0,1}\d+(\.\d+)?/, 'g');
const maxRegEx = new RegExp(/^>\d+(\.\d+)?$/);
const minRegEx = new RegExp(/^<\d+(\.\d+)?$/);
const rangeRegEx = new RegExp(/^\d+(\.\d+)?<>\d+(\.\d+)?$/);

export default ({
  validate(input, schema, strict = false) {
    const keys = Object.keys(schema);
    const notVarKeys = keys.filter(k => !k.includes('?'));
    const inputKeys = Object.keys(input);
    const keyDifference = difference(notVarKeys, inputKeys);

    if (keyDifference.length > 0) return this.logError({
      input,
      source: keys,
      valid: false,
      message: `ValidationError: ${JSON.stringify(input)} missing keys [${keyDifference}]`
    });

    inputKeys.forEach(key => {
      const source = (schema[key] || schema[`?${key}`]);
      if (source) this.check(input[key], source);
      else if (!source && strict) return this.checkArray(inputKeys, keys);
    });

    return null;
  },
  check(input, source) {
    if (source instanceof Function) return this.checkType(input, source);
    const numberTest = (maxRegEx.test(source) || minRegEx.test(source) || rangeRegEx.test(source)) || this.getType(source) === 'Number';
    const stringTest = typeof source === 'string' || source instanceof RegExp || this.getType(source) === 'String';
    const arrayTest = source instanceof Array;
    const objectTest = this.getType(source) === 'Object';

    if (numberTest) {
      return this.checkNumber(input, source);
    } else if (stringTest) {
      return this.checkString(input, source);
    } else if (arrayTest) {
      return this.checkArray(input, source);
    } else if (!objectTest) {
      return this.checkObject(input, source);
    }

  },
  checkType(input, source) {
    const t = input ? `${(this.getType(source)[0]).toLowerCase()}${this.getType(source).slice(1)}` : true;
    const tInput = input ? `${(input.constructor.name[0]).toLowerCase()}${input.constructor.name.slice(1)}` : false;
    if (t !== tInput) {
      return this.logError({
        input,
        source,
        valid: false,
        message: `${JSON.stringify(input)} should be of type ${this.getType(source)}`
      });
    }
    return null;
  },
  checkString(input, source) {
    if (source instanceof RegExp) {
      return this.logError({
        input,
        source,
        valid: source.test(input),
      });
    } else {
      return this.logError({
        input,
        source,
        valid: source === input,
      });
    }
  },
  checkNumber(input, source) {
    const minTest = minRegEx.test(source);
    const maxTest = maxRegEx.test(source);
    const rangeTest = rangeRegEx.test(source);

    if (rangeTest && !minTest && !maxTest) {
      const matchMin = source.match(nRegEx)[0]
      const min = parseFloat(matchMin);
      const matchMax = source.match(nRegEx)[1];
      const max = parseFloat(matchMax);
      return this.logError({
        input,
        source,
        valid: input < max && input > min,
      });
    } else if (maxTest && !minTest && !rangeTest) {
      const match = source.match(nRegEx)[0];
      const n = parseFloat(match);
      return this.logError({
        input,
        source,
        valid: input > n,
      });
    } else if (minTest && !rangeTest && !maxTest) {
      const match = source.match(nRegEx)[0];
      const n = parseFloat(match);
      return this.logError({
        input,
        source,
        valid: input < n,
      });
    }
  },
  checkArray(input, source) {
    const diffs = difference(source, input);
    return this.logError({
      input: JSON.stringify(input),
      source: JSON.stringify(source),
      valid: diffs.length === 0,
    });
  },
  checkObject(input, source) {
    return this.validate(input, source);
  },
  logError(error) {
    const message = `ValidationError: ${error.input} type:${typeof error.input} must respect ${error.source} type:${typeof error.source}`;
    if (!error.valid) {
      throw new TypeError(error.message || message);
    }
    return null;
  },
  getType(source) {
    return source.name || typeof source;
  }
});