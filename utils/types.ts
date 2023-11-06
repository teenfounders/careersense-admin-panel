export interface ICompany extends Document {
  _id?: string;
  Company_Name: string;
  Tagline?: string;
  Website?: string;
  Company_Size?: string;
  Keywords?: string[];
  Careers_Page_ATS?: string;
  Company_LinkedIn?: string;
  Company_Logo: string;
  About_Company?: string;
  Company_Description?: string;
  Careers_Page?: string;
}


export interface IExperiencetrackerProps extends Document {
  map(arg0: (experience: IExperiencetrackerProps, idx: any) => import("react").JSX.Element): import("react").ReactNode;
  companyId: string;
  role: string;
  experience: string;
  url: string;
  _id: string;
}
