const styleModuleStartup = () => {
  console.log('style module loaded');

  gscript.styles.terminal = {
    fontFamily: 'Courier New, Lucida Console, Arial',
    backgroundColor: '#000000',
    color: '#5DFC0A'
  }
  gscript.styles.story = {
    fontFamily: 'Helvetica',
    backgroundColor: '#061021',
    color: 'rgba(72, 125, 217, 1)'
  }
  gscript.styles.default = { ...document.body.style };
}

const createNewStyle = (styleName, style) => {
  gscript.styles[styleName] = style;
}

const updateCreatedStyle = (styleName, style) => {
  if (!gscript.styles[style]) {
    thrower(`Style ${styleName} not found.`);
  }
  gscript.styles[styleName] = { ...gscript.styles[styleName], ...style};
}

const applySavedStyle = styleName => {
  for (const key in gscript.styles[styleName]) {
    gscript.body.style[key] = gscript.styles[styleName][key];
  }
}

const applyNewStyle = (...styles) => {
  for (const key in styles) {
    gscript.body.style[key] = style[key];
  }
}

const resetStyle = () => {
  applySavedStyle('default');
}

const applyRawStyle = rawStyle => {
  const merge = rawStyle.split(';').map(e => e.trim()).filter(e => e).map(e => ({ [e.split(':')[0]]: e.split(':')[1].trim() })).reduce((acc, cur) => ({ ...acc, ...cur }));
  applyNewStyle(merge);
}

/* background: rgb(2,0,36);
background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(69,16,79,1) 35%, rgba(0,212,255,1) 100%); */