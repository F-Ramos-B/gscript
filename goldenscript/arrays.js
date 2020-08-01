const arrayModuleStartup = () => {
  console.log('array module loaded');
}

const supplyMinOf = (...args) => {
  return supplyTempVar('min_of', _.min(args));
}

const supplyMaxOf = (...args) => {
  return supplyTempVar('max_of', _.max(args));
}

const supplyMinOfWithVar = (...args) => {
  const minOf = args.reduce(minFunctionWithKey);
  return {
    var: supplyTempVar('min_of_varname', _.first(_.keys(minOf))),
    value: supplyTempVar('min_of', +(_.first(_.values(minOf))))
  };
}

const supplyMaxOfWithVar = (...args) => {
  const maxOf = args.reduce(maxFunctionWithKey);
  return {
    var: supplyTempVar('max_of_varname', _.first(_.keys(maxOf))),
    value: supplyTempVar('max_of', +(_.first(_.values(maxOf))))
  };
}

const sortArray = (...args) => {
  const sortedArray = _.sortBy(args);
  runUnwrapper('sorted_array', sortedArray);
  supplyTempVar('sorted_array_size', args.length);
  return sortedArray;
}

const createArrayDynamic = (arrayName, ...args) => {
  const keyName = arrayName.toLowerCase() + constants.UNDERSCORE;
  args.forEach((el, index) => injectCreatedVar(keyName + (index + 1), el));
  injectCreatedVar(keyName + '_size', args.length);
}

const tempArrayDynamic = (arrayName, ...args) => {
  const keyName = arrayName.toLowerCase() + constants.UNDERSCORE;
  args.forEach((el, index) => injectTempVar(keyName + (index + 1), el));
  injectTempVar(keyName + '_size', args.length);
}

const retrieveCreatedArrayLength = arrayName => {
  return supplyTempVar(arrayName + '_size', wrapCreatedArray(arrayName).length);
}

const retrieveTempArrayLength = arrayName => {
  return supplyTempVar(arrayName + '_size', wrapTempArray(arrayName).length);
}

/* const returnCreatedArray = arrayName => {
  const unwrapped = unwrapArray(arrayName, wrapArray(arrayName));
  _.assign(vars.temps, unwrapped.unwrappedArray);
  vars.temps.returned_array_length = unwrapped.size;
} */