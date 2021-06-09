import { VersionedModel } from './versioned.model';
import { Pet } from '../database/pet.entity';

export class PetModel extends VersionedModel<Pet> {

  static fromEntity(entity: Pet): PetModel {
    if(!entity) {
      return undefined;
    }

    const model = new PetModel(
      entity._id ? entity._id.toHexString() : entity.id ? entity.id.toString() : undefined,
      entity.name,
      entity.externalId,
      entity.version,
      entity.createdOn,
      entity.createdBy,
      entity.lastModified,
      entity.modifiedBy
    );

    return model;
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
    super(id, version, createdOn, createdBy, lastModified, modifiedBy);
  }

  protected mapModelSpecifics(): Pet {
    return {
      name: this.name,
      externalId: this.externalId
    } as Pet;
  }
}
