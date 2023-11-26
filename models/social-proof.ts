import mongoose, { Schema, Model, Document } from 'mongoose';

export interface ISocialProof extends Document {
  _id?: string;
  ProofTitle?: string;
  AddTags?: string;
  Post?: string;
  Platform?: string;
  PostLink?: string; // Updated to match the casing in ISocialProof
  Comment?: string[];
  Reality?: string;
  Images?: string[];
}

const socialProofSchema: Schema = new Schema({
 
  
  ProofTitle: {
    type: String,
  },
  AddTags: {
    type: String,
  },
  Post: {
    type: String,
  },
  Platform: {
    type: String,
  },
  PostLink: {
    type: String,
  },
  Comment: {
    type: [String],
  },
  Reality: {
    type: String,
  },
  Images: {
      type: [String],
      
  },
});

const socialproof: Model<ISocialProof> =
  mongoose.models.socialproof ||
  mongoose.model<ISocialProof>('socialproof', socialProofSchema);

export { socialproof };
