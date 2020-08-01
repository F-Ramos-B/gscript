const functionsModuleStartup = () => {
  console.log('functions module loaded');
}

const thrower = message => {
  throw new Error(message);
}

const typeThrower = (errorType, message) => {
  throw new errorType(message);
}

const consumer = (fn, ...params) => fn ? fn(params) : thrower('No function provided to consumer!');

const repeatableConsumer = (fn, times, ...params) => {
  if (fn) {
    for (let i = 0; i < times; i++) {
      fn(params[i], i);
    }
  } else {
    thrower('No function provided to iterable consumer!');
  }
}

const iterableConsumer = (fn, ...params) => {
  if (fn) {
    params.forEach(fn);
  } else {
    thrower('No function provided to iterable consumer!');
  }
}

const supplier = (fn, ...params) => {
  if (fn) {
    runUnwrapper(fn(params));
  } else {
    thrower('No function provided to supplier!');
  }
}

/* const catcher = (fnTry, tryParams, fnCatch, fnFinally, finallyParams) => {
  try {
    fnTry ? fnTry(tryParams) : null;
  } catch (err) {
    fnCatch ? fnCatch(err) : typeThrower(err.name, err.message);
  } finally {
    fnFinally ? fnFinally(finallyParams) : null;
  }
} */

const purePredicate = conditionalString => {
  return supplyTempVar('pure_predicate_result', eval(`(${conditionalString})`));
}

const predicate = conditionalString => {
  let expression = _.clone(conditionalString);
  expression = replaceAllIn(expression, ' and ', ' && ');
  expression = replaceAllIn(expression, ' or ', ' || ');
  return supplyTempVar('predicate_result', eval(`(${expression})`));
}

const minFunctionWithKey = (acc, cur) => {
  const accValue = _.first(_.values(acc));
  const curKey = _.first(_.keys(cur));
  const curValue = _.first(_.values(cur));
  if (curValue < accValue) {
    return { [curKey]: curValue };
  }

  return acc;
}

const maxFunctionWithKey = (acc, cur) => {
  const accValue = _.first(_.values(acc));
  const curKey = _.first(_.keys(cur));
  const curValue = _.first(_.values(cur));
  if (curValue > accValue) {
    return { [curKey]: curValue };
  }

  return acc;
}

const minFunction = (acc, cur) => Math.min(acc, cur)

const maxFunction = (acc, cur) => Math.max(acc, cur)