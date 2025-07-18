import { Schema, model, Document, Types } from "mongoose";

export interface IToken extends Document {
  userId: Types.ObjectId;
  token: string;
}

const tokenSchema = new Schema<IToken>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    token: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IToken>("Token", tokenSchema);
