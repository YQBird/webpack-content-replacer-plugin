'use strict';

const winston = require('winston');
const path = require('path');

const createLogger = (level, exception, file, exit) => {
  const loggerConfig = {
    transports: [
      new winston.transports.Console({
        level,
        handleExceptions: exception,
        humanReadableUnhandledException: true,
        json: true,
        colorize: true,
      }),
    ],
    exitOnError: exit,
  };
  if (file) {
    loggerConfig.transports.push(new winston.transports.File({
      level,
      filename: path.join(__dirname, '/../warning.log'),
      handleExceptions: exception,
      json: true,
    }));
  }
  return new winston.Logger(loggerConfig);
};

module.exports = (level) => {
  if (!level || typeof level !== 'string') {
    level = 'strict';
  }

  const exceptionLevel = level.toLowerCase();
  let logger;
  switch (exceptionLevel) {
    case 'strict':
      logger = createLogger('error', false, false, true);
      break;

    case 'none':
      logger = createLogger('warn', true, false, false);
      break;

    case 'log':
      logger = createLogger('warn', true, true, false);
      break;
    default:
      logger = new winston.Logger();
  }
  return logger;
};

