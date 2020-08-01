const wrappersModuleStartup = () => {
  console.log('wrappers module loaded');
}

const wrapArray = (arrayName, type) => {
  return _.flatten(
    _.toPairs(vars[type])
    .filter(el => _.initial(_.first(el).split(constants.UNDERSCORE)).join(constants.UNDERSCORE).includes(arrayName))
    .map(el => el[1])
  );
}

const wrapCreatedArray = arrayName => {
  return wrapArray(arrayName, 'created');
}

const wrapTempArray = arrayName => {
  return wrapArray(arrayName, 'temp');
}

const unwrapArray = (arrayName, arr) => {
  const unwrappedArray = arr.reduce((acc, cur, index) => ({
    ...acc,
    [getArrayUnwrapKey(arrayName, index + 1)]: cur
  }), {
    [getArrayUnwrapKey(arrayName)]: _.first(arr)
  });
  return {
    unwrappedArray,
    size: _.size(unwrappedArray)
  }
}

const getArrayUnwrapKey = (arrayName, index) => {
  return arrayName + constants.UNDERSCORE + (index || 1);
}

const unwrapObject = (objectName, object) => {
  const composed = { };
  for (const key in object) {
    const e = object[key];
    if (_.isSet(e) || _.isArray(e)) {
      console.log('isarray');
      unwrapNestedArray(objectName, key, e, composed);
    } else if (_.isObjectLike(e)) {
      console.log('isobj');
      composed[getObjectUnwrapKey(objectName, key)] = runUnwrapper(key, e);
    } else {
      composed[getObjectUnwrapKey(
        objectName,
        isFinite(key) ? (+key + 1) : key
      )] = e;
    }
  }
  return composed;
}

const unwrapNestedArray = (objectName, key, e, composed) => {
  if (!_.isEmpty(e)) {
    const arrObj = unwrapArray(key, _.toArray(e));
    supplyTempVar(getObjectUnwrapKey(objectName, key + '_size'), arrObj.size);
    for (const element in arrObj.unwrappedArray) {
      composed[getObjectUnwrapKey(objectName, element)] = arrObj.unwrappedArray[element];
    }
  } else {
    supplyTempVar(getObjectUnwrapKey(objectName, key + '_size'), 0);
  }
}

const getObjectUnwrapKey = (objectName, keyName) => {
  return `${objectName}_${keyName}`;
}

const runUnwrapper = (objectName, object) => {
  supplyTempVars(unwrapObject(objectName, object));
}