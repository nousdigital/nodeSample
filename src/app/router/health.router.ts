import express = require('express');
import { NextFunction, Request, Response } from 'express';
import { Router } from 'express-serve-static-core';
import { RouterInterface } from '../api/router/router.interface';
import logger from '../util/logger';
import { HealthDto } from '../api/dto/health.dto';

const version = require('../../../package.json').version;

export class HealthRouter implements RouterInterface {

  public createRoutes(): Router {
    logger.info('HealthRouter#initRoutes...');

    const router = express.Router();

    /**
     * @swagger
     * /sample/v1.0/health:
     *  get:
     *    tags:
     *      - health
     *    description: health check service
     *    responses:
     *      200:
     *        description: health status
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/HealthDto'
     *
     */
    router.get('/', (req: Request, res: Response, next: NextFunction) => {
      logger.info('GET HEALTH STATUS CALLED');
      this.healthCheck(req, res).catch(next);
    });

    return router;
  }

  private healthCheck(req: Request, res: Response) {
    return Promise.resolve().then(() => {
      const json = new HealthDto('API is running.', version);
      res.status(200).json(json.toJSON()).end();
    });
  }
}
