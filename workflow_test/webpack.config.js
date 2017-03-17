const ContentReplacer = require('../index');

const htmlOptions = {
  modifiedFile: './workflow_test/index.html',
  modifications: [
    {
      regex: /First Test/g,
      modification: 'First Test has been Replaced',
    },
    {
      regex: /Second Test/g,
      modification: 'Second Test has been Replaced',
    },
  ],
};

const cssOptions = {
  modifiedFile: './workflow_test/style.css',
  modifications: [
    {
      regex: /red/g,
      modification: 'blue',
    },
    {
      regex: /height/g,
      modification: 'width',
    },
  ],
};

const invalidOptions = {
  modifiedFile: '/somepath',
}

const noFileOptions = {
  modifiedFile: '/somepath',
  modifications: [
    {
      regex: /red/g,
      modification: 'blue',
    },
  ],
}

module.exports = {
  plugins: [
    new ContentReplacer(htmlOptions),
    new ContentReplacer(cssOptions),
  ],
  errorPlugins: [
    new ContentReplacer(exceptionOptions),
    new ContentReplacer(noFileOptions)
};
