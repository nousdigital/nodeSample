import { config } from '../../config/config';
import logger from '../util/logger';
import { DbHelper } from '../database/dbHelper';

export default function dbMiddleware() {
  logger.info('Initialize DB Middleware ...');

  return function dbHandler(req, res, next) {
    logger.debug('dbHandler called');

    DbHelper.checkAndReconnect(config.database).then(() => next());
  };
}
