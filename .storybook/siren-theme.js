import { create } from '@storybook/theming';

export default create({
  base: 'light',
  brandTitle: 'Siren Group',
  brandUrl: 'https://www.sirenltd.com/',
  brandImage:
    'https://sirengroup.atlassian.net/s/1abpwv/b/8/a326e05e04f93ba0609c611e6bbedb14/_/jira-logo-scaled.png',
  brandTarget: '_self',
  // UI
  appBg: 'white',
  appContentBg: '#E5E5E5',
  appBorderColor: '#E7F0FE',
  appBorderRadius: 0,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: 'black',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: '#fff',
  barSelectedColor: '#E7F0FE',
  barBg: '#2F55EA',

  // Form colors
  inputBg: 'white',
  inputBorder: 'silver',
  inputTextColor: 'black',
  inputBorderRadius: 4,
});
