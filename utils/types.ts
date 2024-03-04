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

export interface ISocialProof extends Document{
  _id?: string;
  ProofTitle?: string;
  AddTags?: string;
  Post?: string;
  Platform?: string;
  PostLInk?: string;
  Comment?: string[];
  Reality?: string;
  Images?: string[];


}
export interface createSocialProof {
  ProofTitle: string;
  PostBrief:string;
  PostDescription: string;
  AddTags: string;
  Platform: string;
  PostLink: string;
  Comment: Comment;
  Lesson: string;
  Images: string[] | null;
}
   {/* _id: '655603a3f199ada232ec51af',
        ProofTitle: 'this is title',
        AddTags: 'add tags input',
        Post: 
          '"<p> hello<em> i am sammed</em> test to check the communication between <strong>frontend </strong>and <em>backend</em> and <strong>database</strong></p>"',
        Platform: 'linidin',
        PostLink: 'https://github.com',
        Comment: [ 'dfdfdfsfd' ],
        Reality: 
          '"<ul><li><p>this is the reality <strong>section </strong>is <em>been </em>tested</p></li></ul>"',
        Images: [
          'https://ik.imagekit.io/5npsdc2r7/Company_Logo/reading_1_HAYFek13w.png'
        ],
        __v: 0
      }, */}