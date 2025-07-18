import { Schema, model, Document, Types } from "mongoose";
import { TaskStatus } from "../types/status.enum";
import { TaskPriority } from "../types/priority.enum";

export interface ITask extends Document {
  title: string;
  description?: string;
  status: TaskStatus.PENDING | TaskStatus.IN_PROGRESS | TaskStatus.COMPLETED;
  priority: TaskPriority.LOW | TaskPriority.MEDIUM | TaskPriority.HIGH;
  assignedTo?: Types.ObjectId;
  project: Types.ObjectId;
  attachments: string[];
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: [TaskStatus.IN_PROGRESS, TaskStatus.PENDING, TaskStatus.COMPLETED],
      default: TaskStatus.PENDING,
    },
    priority: {
      type: String,
      enum: [TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH],
      default: TaskPriority.MEDIUM,
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    attachments: [{ type: String }],
  },
  { timestamps: true }
);

export default model<ITask>("Task", taskSchema);
