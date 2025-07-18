import { Schema, model, Document, Types } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description?: string;
  createdBy: Types.ObjectId;
  document?: string;
  teamMembers: Types.ObjectId[];
}

const projectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  description: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  document: { type: String },
  teamMembers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

export default model<IProject>('Project', projectSchema);
