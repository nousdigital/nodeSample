import mongoose from 'mongoose';
import { VersionedEntity, VersionedSchema } from './versioned.entity';
import { EntityEnum } from '../model/enum/entity.enum';

export interface Pet extends VersionedEntity {
  name: string;
  externalId: number;
}

export const PetSchema = new mongoose.Schema(Object.assign({}, VersionedSchema.obj, {
  name: {type: String, required: true},
  externalId: {type: Number, required: true}
}));

const PetEntity = mongoose.model<Pet>(EntityEnum.PET, PetSchema);

export default PetEntity;
