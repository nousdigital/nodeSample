import mongoose from 'mongoose';
import { VersionedEntity, VersionedSchema } from './versioned.entity';
import { EntityEnum } from '../model/enum/entity.enum';

export interface Data extends VersionedEntity {
  text: string;
}

export const DataSchema = new mongoose.Schema(Object.assign({}, VersionedSchema.obj, {
  text: {type: String, required: true}
}));

const DataEntity = mongoose.model<Data>(EntityEnum.DATA, DataSchema);

export default DataEntity;
