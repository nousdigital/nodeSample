import PetEntity, { Pet } from '../database/pet.entity';
import { PetModel } from '../model/pet.model';
import { Model } from 'mongoose';
import logger from '../util/logger';

export class PetService {

  private dao: Model<Pet>;

  constructor() {
    this.dao = PetEntity;
  }

  public getAll(): Promise<PetModel[]> {
    logger.info(`[${this.getServiceName()}] getAll() called`);

    return new Promise((resolve, reject) => {
      this.dao.find({}, (err, items) => {
        if(err) {
          logger.debug(`[${this.getServiceName()}] Failed to fetch items with error: ${err}`);
          return reject(err);
        }

        if(!items || !Array.isArray(items) || items.length <= 0) {
          return resolve([]);
        }

        const modelList = items.map(PetModel.fromEntity);

        resolve(modelList);
      });
    });
  }

  private getServiceName(): string {
    return 'PetService';
  }
}
