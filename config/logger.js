'use strict';

const winston = require('winston');

const createLogger = (level, exception, file, exit) => {
  const loggerConfig = {
    transports: [new winston.transports.Console({
      level,
      handleExceptions: exception,
      humanReadableUnhandledException: true,
      json: true,
      colorize: true,
    })],
    exitOnError: exit,
  };
  if (file) {
    loggerConfig.transports.push(new winston.transports.File({ filename: 'warning.log' }));
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
      // Logic in strict level
      logger = createLogger('error', false, false, true);
      break;

    case 'none':
      // Logic in none level
      logger = createLogger('warn', true, false, false);
      break;

    case 'log':
      // Logic in log level
      logger = createLogger('warn', true, true, false);
      break;
    default:
      logger = new winston.Logger();
  }
  return logger;
};

