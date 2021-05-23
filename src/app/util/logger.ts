import winston from 'winston';
import { config } from '../../config/config';

const options = {
  level: config.logger.level,
  format: winston.format.combine(
    winston.format.json(),
    winston.format.timestamp()
  )
};

if(config.logger.persist) {
  options['transports'] = [
    new winston.transports.File({dirname: config.logger.directory, filename: 'error.log', level: 'error'}),
    new winston.transports.File({dirname: config.logger.directory, filename: 'combined.log'})
  ];

  options['exceptionHandlers'] = [
    new winston.transports.File({dirname: config.logger.directory, filename: 'exceptions.log'})
  ];
}

const logger = winston.createLogger(options);
logger.add(new winston.transports.Console({format: winston.format.simple()}));

export default logger;
