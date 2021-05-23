import { ApiInfoModel } from './api-Info.model';
import { DBInfoModel } from './db-info.model';
import { LoggerInfoModel } from './logger-info.model';

export interface ConfigModel {
  api: ApiInfoModel;
  mode?: string;
  database: DBInfoModel;
  basePath: string;
  logger: LoggerInfoModel;
}
