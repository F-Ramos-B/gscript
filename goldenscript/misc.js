const miscModuleStartup = () => {
  console.log('misc module loaded');
}

const getNewIndex = () => {
  return ++gscript.createIndex;
}

const getLastCreatedIndex = () => {
  return _.values(gscript.created).reduce(maxFunction);
}

const printer = (...values) => {
  values.forEach(value => console.log(value));
}

const printerTable = arr => {
  console.table(arr);
}

const uppercaser = value => {
  return value.toUpperCase();
}

const lowercaser = value => {
  return value.toLowerCase();
}

const capitalizer = value => {
  return uppercaser(value.chatAt(0)) + value.substring(1);
}

const capitalizerOnly = value => {
  return uppercaser(value.chatAt(0).toUpperCase()) + lowercaser(value.substring(1));
}

const replaceAllIn = (text, replaceString, replacedText) => {
  return text.split(replaceString).join(replacedText);
}
