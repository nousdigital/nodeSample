import mongoose from 'mongoose';
import { ObjectId } from 'bson';

export interface IdEntity extends mongoose.Document {
  id: ObjectId;
}


export const IdSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId
});
