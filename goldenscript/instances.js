const instancesModuleStartup = () => {
  console.log('instances module loaded');
}

const addNewType = typeName => {
  if (vars.types.has(typeName)) {
    thrower(`Type ${typeName} already exists.`);
  }

  vars.types.set(typeName, {
    sequence: 0,
    instances: new Map()
  });
}

const insertInstance = (typeName, value) => {
  if (!vars.types.has(typeName)) {
    thrower(`Type ${typeName} not found.`);
  }

  if (value.id) {
    value = _.omit(value, 'id');
  }
  const retrievedMap = getType(typeName);
  /* checkTemplate(value, retrievedMap.fields); */
  value.id = ++retrievedMap.sequence;
  retrievedMap.instances.set(value.id, value);
  return supplyTempVar('newest_instance_id', value.id);
}

const updateProperty = (typeName, id, property, value) => {
  if (property === 'id') {
    thrower('Id cannot be changed.');
  }
  const retrievedMap = getType(typeName);
  const instance = getInstance(typeName, id);
  instance[property] = value;
  retrievedMap.instances.set(id, instance);
}

const updateInstance = (typeName, id, value) => {
  const retrievedMap = getType(typeName);
  value.id = id;
  retrievedMap.instances.set(id, value);
}

const deleteInstance = (typeName, id) => {
  getType(typeName).delete(id);
}

const entriesFromType = typeName => {
  return _.toPairs(getType(typeName).instances);
}

const getType = typeName => {
  return vars.types.get(typeName);
}

const getInstance = (typeName, id) => {
  return getType(typeName).instances.get(id);
}

const idExistsInType = (typeName, id) => {
  return getType(typeName).instances.has(id);
}

const sizeOfType = typeName => {
  return supplyTempVar(`${typeName}_size`, getType(typeName).instances.size());
}

const sequenceOfType = typeName => {
  return supplyTempVar(`${typeName}_created_instances_size`, getType(typeName).sequence);
}

const supplyInstance = (typeName, id) => {
  const instance = getInstance(typeName, id);
  runUnwrapper(`${typeName}_instance`, instance);
}

const getAllFromType = typeName => {
  return _.toArray(getType(typeName).instances.values());
}

/* const checkTemplate = (value, fields) => {
  const templateFollowed = _.isEqual(_.size(_.pick(value, _.keys(fields))), _.size(fields));
  if (templateFollowed) {
    console.log('template followed');
  } else {
    console.log('template not followed');
  }
} */

