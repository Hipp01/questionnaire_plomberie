import mongoose, { Schema, Document } from 'mongoose';

export interface IOption {
  text: string;
  nextQuestionId: string | null;
}

export interface IQuestion extends Document {
  id: string;
  text: string;
  options: IOption[];
  type: string;
  previousQuestionId: string | null;
}

const OptionSchema = new Schema<IOption>({
  text: { type: String, required: true },
  nextQuestionId: { type: String, default: null },
});

const QuestionSchema = new Schema<IQuestion>({
  id: { type: String, required: true, unique: true },
  text: { type: String, required: true },
  options: { type: [OptionSchema], required: true },
  type: { type: String, required: true },
  previousQuestionId: { type: String, default: null },
});

export default mongoose.model<IQuestion>('Question', QuestionSchema);
