import mongoose, { Schema, Model } from "mongoose";
import { ICompany } from "@/utils/types";

const companySchema: Schema = new Schema({
    Company_Name: {
        type: String,
        required: true
    },
  Tagline: { type: String },
  Website: { type: String },
  Company_Size: { type: String },
  Keywords: { type: [String] },
  Careers_Page_ATS: { type: String },
  Company_LinkedIn: { type: String },
  Company_Logo: { type: String },
  About_Company: { type: String },
  Company_Description: { type: String },
  Careers_Page: { type: String },
});

const Company: Model<ICompany> =mongoose.models.companies || mongoose.model<ICompany>('companies', companySchema);

export { Company };