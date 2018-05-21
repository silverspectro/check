import { isNull } from 'util';

export default (source, inputs) => {
  const flatArray = inputs.filter(i => (!isNull(i) && typeof i !== 'undefined')).map(i => i instanceof Object ? JSON.stringify(i) : i);
  let diffs = source
  .filter(i => (!isNull(i) && typeof i !== 'undefined'))
  .filter((i) => {
    const e = i instanceof Object ? JSON.stringify(i) : i;
    const index = flatArray.indexOf(e);
    if (index >= 0) flatArray.splice(index, 1);
    return !(index >= 0);
  });
  return diffs;
};