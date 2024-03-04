import mongoose, { Schema, Model, Document } from 'mongoose';

export interface ICareerSenseSocialProof extends Document {
  _id?: string;
  ProofTitle?: string;
  AddTags?: string;
  Post?: string;
  Platform?: string;
  PostLink?: string; // Updated to match the casing in ISocialProof
  Comment?: Comment;
  Reality?: string;
  Images?: string[];
}
interface Comment {
  id: number;
  name?: string;
  items: Comment[];
}
const commentSchema = new Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
  },
  items: {
    type: Schema.Types.Mixed, // Allow any type, including nested structures
  },
});

const careerSenseSocialProofSchema: Schema = new Schema({
 
  
  ProofTitle: {
    type: String,
  },
  PostBrief: {
    type: String,
  },
  PostDescription: {
    type: String,
  },
  Tags:{
    type:String,
  },
  Platform: {
    type: String,
  },
  PostLink: {
    type: String,
  },
    Comment: {
    type: commentSchema,
  },
  // Comment: {
  //   type: [String],
  // },
  Lesson: {
    type: String,
  },
  Images: {
      type: [String],
      
  },
});

const careersensesocialproof: Model<ICareerSenseSocialProof> =
  mongoose.models.careersensesocialproof ||
  mongoose.model<ICareerSenseSocialProof>('careersensesocialproof', careerSenseSocialProofSchema);

export { careersensesocialproof };
