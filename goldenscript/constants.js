const constantsModuleStartup = () => {
  console.log('constants module loaded');
}

const constants = {
  identifiers: {
    model: i => `$GS{${i}}`,
    capitalized: i => `$!GS{${i}}`,
    fullyCapitalized: i => `$!!GS{${i}}`,
    lowercap: i => `$GS!{${i}}`,
    fullyLowercap: i => `$GS!!{${i}}`,
    firstCapitalizedOnly: i => `$!GS!{${i}}`,
  },
  UNDERSCORE: '_',
  TEMP_SYSTEM_VARIABLES: [
    'choice_crc', 'choice_reuse', 'choice_user_restored', '_choiceEnds', '_fakeChoiceDepth'
  ],
  CREATED_SYSTEM_VARIABLES: [
    'scene', 'sceneName', 'implicit_control_flow'
  ]
}