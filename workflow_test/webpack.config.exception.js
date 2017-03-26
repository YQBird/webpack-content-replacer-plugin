const ContentReplacer = require('../index');

const invalidOptions = {
  modifiedFile: '/somepath',
  exceptionLevel: 'log',
};

const noFileOptions = {
  modifiedFile: '/somepath',
  modifications: [
    {
      regex: /red/g,
      modification: 'blue',
    },
  ],
  exceptionLevel: 'log',
};

module.exports = {
  invalidOpt: {
    plugins: [
      new ContentReplacer(invalidOptions),
    ],
  },
  noFileOpt: {
    plugins: [
      new ContentReplacer(noFileOptions),
    ],
  },
};
