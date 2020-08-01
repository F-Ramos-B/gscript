const instancesModuleStartup = () => {
  console.log('instances module loaded');
}

const addNewType = typeName => {
  vars.types.set(typeName, {
    sequence: 0,
    instances: new Map()
  });
}

const insertInstance = (typeName, value) => {
  if (value.id) {
    value = _.omit(value, 'id');
  }
  const retrievedMap = vars.types.get(typeName);
  /* checkTemplate(value, retrievedMap.fields); */
  value.id = ++retrievedMap.sequence;
  retrievedMap.instances.set(value.id, value);
  return supplyTempVar('newest_instance_id', value.id);
}

const entriesFromType = typeName => {
  return _.toPairs(vars.types.get(typeName).instances);
}

const getInstance = (typeName, id) => {
  return vars.types.get(typeName).instances.get(id);
}

const idExistsInType = (typeName, id) => {
  return vars.types.get(typeName).instances.has(id);
}

const deleteInstance = (typeName, id) => {
  return vars.types.get(typeName).instances.delete(id);
}

const typeInstancesSize = typeName => {
  return vars.types.get(typeName).instances.size();
}

const supplyInstance = (typeName, id) => {
  const supplied = vars.types.get(typeName).instances.get(id);
  runUnwrapper(`${typeName}_instance`, supplied);
}

const getAllFromType = typeName => {
  return _.toArray(vars.types.get(typeName).instances.values());
}

/* const checkTemplate = (value, fields) => {
  const templateFollowed = _.isEqual(_.size(_.pick(value, _.keys(fields))), _.size(fields));
  if (templateFollowed) {
    console.log('template followed');
  } else {
    console.log('template not followed');
  }
} */

