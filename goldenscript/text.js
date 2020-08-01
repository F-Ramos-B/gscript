const textModuleStartup = () => {
  console.log('text module loaded');
}

const getPageText = () => document.getElementById('text').innerText;

const setPageText = text => document.getElementById('text').innerText = text;

const pageTextReplacer = (...vars) => {
  setPageText(applyReplacer(getPageText(), vars));
}

const applyReplacer = (text, vars) => {
  vars.forEach(element => {
    const key = _.first(_.keys(element));
    const value = _.first(_.values(element));
    text = replaceAllIn(text, constants.identifiers.model(key), value);
    text = replaceAllIn(text, constants.identifiers.capitalized(key), value.charAt(0).toUpperCase() + value.substring(1));
    text = replaceAllIn(text, constants.identifiers.fullyCapitalized(key), value.toUpperCase());
    text = replaceAllIn(text, constants.identifiers.lowercap(key), value.charAt(0).toLowerCase() + value.substring(1));
    text = replaceAllIn(text, constants.identifiers.fullyLowercap(key), value.toLowerCase());
    text = replaceAllIn(text, constants.identifiers.firstCapitalizedOnly(key), value.charAt(0).toUpperCase() + value.substring(1).toLowerCase());
  });
  return text;
}

/* const pageTextReplacerArray = arrayName => {
  const arr = retrieveArrayLocal(arrayName);
  let text = getPageText();
  arr.forEach((element, i) => {
    text = text.split(constants.identifiers.model(i)).join(element);
    text = text.split(constants.identifiers.capitalized(i)).join(element.charAt(0).toUpperCase() + element.substring(1));
    text = text.split(constants.identifiers.fullyCapitalized(i)).join(element.toUpperCase());
    text = text.split(constants.identifiers.lowercap(i)).join(element.charAt(0).toLowerCase() + element.substring(1));
    text = text.split(constants.identifiers.fullyLowercap(i)).join(element.toLowerCase());
    text = text.split(constants.identifiers.firstCapitalizedOnly(i)).join(element.charAt(0).toUpperCase() + element.substring(1).toLowerCase);
  });
  setPageText(text);
}

const textReplacerArray = (arrayName, splitter) => {
  const arr = [];
  let text = getPageText();
  

  text = text.split(constants.identifiers.array(arrayName)).join(element);


  setPageText(text);
} */