import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocu from '../docu/swagger_nous.json';
import { config } from '../config/config';

import { json, urlencoded } from 'body-parser';
import logger from 'morgan';
import { HealthRouter } from './router/health.router';
import { ApplicationModeEnum } from './model/enum/application-mode.enum';
import setupCorsMiddleware from './middleware/cors.middleware';
import dbMiddleware from './middleware/db.middleware';
import { DbHelper } from './database/dbHelper';
import { ApiVersion } from './model/enum/apiVersion.enum';


export class Application {
  public express: Express;

  private healthRouter: HealthRouter;

  constructor() {
    this.express = express();

    this.databaseSetup().then(() => {
      this.initRouter();

      this.initMiddleware();
      this.initHealthCheck();
      this.mountRoutes();
    });
  }

  private initHealthCheck(): void {
    this.express.use(`${config.basePath}/${ApiVersion.V1_0}/health`, this.healthRouter.createRoutes());
  }

  private mountRoutes() {
    if(config.mode === ApplicationModeEnum.DEVELOPMENT) {
      this.express.use(`${config.basePath}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocu, {explorer: true}));
    }
  }

  private initMiddleware(): void {
    this.express.use(json());
    setupCorsMiddleware(this.express);
    this.express.use(urlencoded({extended: true}));
    this.express.use(dbMiddleware());

    if(ApplicationModeEnum.DEVELOPMENT === config.mode) {
      this.express.use(logger('dev'));
    } else {
      this.express.use(logger('combined'));
    }
  }

  private initRouter() {
    this.healthRouter = new HealthRouter();
  }

  private databaseSetup(): Promise<void> {
    return DbHelper.openDatabaseConnection(config.database);
  }

}
