import { Schema, model, Document, Types } from "mongoose";

export interface IMessage extends Document {
  projectId: Types.ObjectId;
  sender: Types.ObjectId;
  text: string;
}

const messageSchema = new Schema<IMessage>(
  {
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IMessage>("Message", messageSchema);
