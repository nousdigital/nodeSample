import { connect, connection } from 'mongoose';
import logger from '../util/logger';
import { DBInfoModel } from '../../config/model/db-info.model';
import Utils from '../util/utils';

export class DbHelper {

  public static checkAndReconnect(dbConfig: DBInfoModel): Promise<void> {
    logger.debug(`MongoDB Connection State ready: ${connection.readyState}`);

    if(!connection || connection.readyState === 0) {
      return DbHelper.openDatabaseConnection(dbConfig);
    } else {
      return Promise.resolve();
    }
  }

  public static openDatabaseConnection(dbConfig: DBInfoModel): Promise<void> {
    let options = {};
    if(Utils.isSet(dbConfig.username) && Utils.isSet(dbConfig.password)) {
      console.log('Application - username and password set');
      options = {
        auth: {
          user: dbConfig.username,
          password: dbConfig.password
        }
      };
    }

    options['useNewUrlParser'] = true;
    let mongoDBConnectionString = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`;

    console.debug(`mongodb connection: ${mongoDBConnectionString}`);

    return new Promise(resolve => {
      connect(mongoDBConnectionString, options, (err: any) => {
        if(err) {
          console.error(err.message);
        } else {
          console.info(`mongodb interface:`);
          console.info(`mongodb host: ${dbConfig.host}`);
          console.info(`mongodb port: ${dbConfig.port}`);
          console.info(`mongodb name: ${dbConfig.name}`);
          console.info('*****************************************************************************');
        }

        resolve();
      }).catch(err => {
        console.log(`DB CONNECT ERROR: ${err}`);
        resolve();
      });
    });
  }
}
