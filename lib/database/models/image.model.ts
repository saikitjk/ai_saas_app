import { Schema, model, models } from "mongoose";

// defines the structure of an object that represents an image in your application
export interface IImage extends Document {
  title: string;
  transformationType: string;
  publicId: string;
  secureURL: string;
  width?: number;
  height?: number;
  config?: object;
  transformationUrl?: string;
  aspectRatio?: string;
  color?: string;
  prompt?: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
  }
  createdAt?: Date;
  updatedAt?: Date;
}

// define the structure and validation rules for documents stored in MongoDB
const ImageSchema = new Schema({
  title:{type: String, required: true},
  transformationType: {type: String, required: true},
  publicId: {type: String, required: true},
  secureUrl: {type: URL , required: true},
  width:{type: Number},
  height:{type: Number},
  config: {type: Object},
  transformationUrl: {type: URL},
  aspectRatio: {type: String},
  color: {type: String},
  prompt: {type: String},
  author: {type: Schema.Types.ObjectId, ref:'User'},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
});

// if model exists, reuse it, else, make the schema a model
const Image = models?.Image || model('Image', ImageSchema);

export default Image;