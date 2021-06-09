import { PetModel } from '../../model/pet.model';

/**
 * @swagger
 * components:
 *  schemas:
 *    PetDto:
 *      required:
 *        - name
 *        - externalId
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        externalId:
 *          type: number
 *        version:
 *          type: number
 *        createdOn:
 *          type: string
 *          format: date-time
 *        createdBy:
 *          type: string
 *        lastModified:
 *          type: string
 *          format: date-time
 *        modifiedBy:
 *          type: string
 */
export class PetDto {

  public static fromModel(model: PetModel): PetDto {
    if(!model) {
      return undefined;
    }

    const dto = new PetDto(
      model.id,
      model.name,
      model.externalId,
      model.version,
      model.createdOn,
      model.createdBy,
      model.lastModified,
      model.modifiedBy
    );

    return dto;
  }

  constructor(
    public id: string,
    public name: string,
    public externalId: number,
    public version?: number,
    public createdOn?: Date,
    public createdBy?: string,
    public lastModified?: Date,
    public modifiedBy?: string
  ) {
  }

  toJSON() {
    const json = {
      id: this.id,
      name: this.name,
      externalId: this.externalId,
      version: this.version,
      createdOn: this.createdOn,
      createdBy: this.createdBy,
      lastModified: this.lastModified,
      modifiedBy: this.modifiedBy
    };

    return json;
  }
}
