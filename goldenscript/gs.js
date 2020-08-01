const gscript = { createIndex: 0, styles: {  } };
const vars = { types: new Map() };

const startup = () => {
  gscript.body = document.body;
  gscript.stats = window.stats;
  gscript.temps = gscript.stats.scene.temps;
  gscript.created = gscript.stats.scene.created;
  vars.created = gscript.stats;
  vars.temps = gscript.temps;
  gscript.createIndex = getLastCreatedIndex();
  gscript.vars = vars;
  console.log('gs module loaded');
  console.log(gscript);
  arrayModuleStartup();
  textModuleStartup();
  miscModuleStartup();
  styleModuleStartup();
  constantsModuleStartup();
  functionsModuleStartup();
  injectorsModuleStartup();
  wrappersModuleStartup();
  instancesModuleStartup();
  console.log(gscript);
}
