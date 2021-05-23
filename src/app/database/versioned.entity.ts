import mongoose from 'mongoose';
import { IdEntity, IdSchema } from './id.entity';

export interface VersionedEntity extends IdEntity {
  createdOn: Date;
  lastModified: Date;
  createdBy: string;
  modifiedBy: string;
  version: number;
}

export const VersionedSchema = new mongoose.Schema(Object.assign({}, IdSchema.obj, {
  createdOn: {type: Date, required: true},
  lastModified: {type: Date, required: true},
  createdBy: {type: String, required: true},
  modifiedBy: {type: String, required: true},
  version: {type: Number, required: true}
}));
