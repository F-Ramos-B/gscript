const injectorsModuleStartup = () => {
  console.log('injectors module loaded');
}

const injectCreatedVar = (name, value) => {
  const index = getNewIndex();
  gscript.stats[name.toLowerCase()] = value;
  gscript.created[name.toLowerCase()] = index;
  return { value, index };
}

const injectTempVar = (name, value) => {
  vars.temps[name.toLowerCase()] = value;
  return value;
}

const supplyTempVar = (name, value) => {
  vars.temps['return_' + name.toLowerCase()] = value;
  return value;
}

const updateCreatedVar = (name, value) => {
  vars.created[name] = value;
}

const deleteTemps = (...temps) => {
  vars.temps = _.omit(vars.temps, temps);
}

const clearTemps = () => {
  vars.temps = _.pick(vars.temps, constants.TEMP_SYSTEM_VARIABLES);
}

const supplyTempVars = object => {
  for (const key in object) {
    supplyTempVar(key, object[key]);
  }
}

const updateCreatedVars = (...nameValueMap) => {
  updateCreatedVar(nameValueMap.name, nameValueMap.value);
}

const updateTempVars = (...nameValueMap) => {
  updateTempVar(nameValueMap.name, nameValueMap.value);
}

const getCreated = (name) => vars.created[name]
const getCreateds = (...names) => _.pick(getAllCreateds(), names);
const getTemp = (name) => vars.temps[name]
const getTemps = (...names) => _.pick(getAllTemps(), names);
const getAllCreateds = () => _.omit(vars.created, constants.CREATED_SYSTEM_VARIABLES)
const getAllTemps = () => _.omit(vars.temps, constants.TEMP_SYSTEM_VARIABLES)