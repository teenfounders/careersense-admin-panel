  import { IExperiencetrackerProps } from '@/utils/types';
  import mongoose, { Schema, Model, Document } from 'mongoose';



  const experiencetrackerSchema: Schema = new Schema({
    companyId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'companies' // Reference to the Company model if needed
    },
    role: {
      type: String,
      required: true
    },
    experience: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  });

  const ExperienceTrackers: Model<IExperiencetrackerProps> =mongoose.models.experiencetrackers || mongoose.model<IExperiencetrackerProps>('experiencetrackers', experiencetrackerSchema)

  export { ExperienceTrackers };