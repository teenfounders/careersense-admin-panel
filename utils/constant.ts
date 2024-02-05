import postcardimage from "../public/fullpostimage.png";
import reddit from '@/assets/reddit-icon 1 (1).png'
export interface Comments {
  id: number;
  name?: string;
  items: Comments[];
}
export const commentData: Comments = {
  id: 1,
  name: "",
  items: [
    {
      id: 23,
      name: "They make you sign a document before placements starts. Which basically says that the placement team can do whatever the f they want and you agree to it because without it you are debarred from sitting for placements. Messed up system",
      items: [],
    },
    {
      id: 24,
      name: "So I know from very close sources that the folks who generally are asked to opt out are those who have been unable to get any placements even after 2-3 months of attending interviews. These are the last 30% students who cannot really get past the interviews due to skill mismatch or communication skills gap, etc. So this kind of opt out message is not forced and is not a pressure tactic. It's the college saying I have tried my best to get companies to the college and give you enough opportunities to get through, but now even I can't help you since I cannot guarantee more companies in the future since it's already 2-3 months past the placement start date.",
      items: [
        {
          id: 33,
          name: "Agree to everything. But then that clearly means that they don't/can't provide 100% placements. Which is the primary reason this opt-out scheme is being implemented in the first place",
          items: [
            {
              id: 32,
              name: "Oh yes that's true. They take in a lot of people but do not have true 100% placements. 100% is only after the optouts.",
              items: [],
            },
          ],
        },
        {
          id: 25,
          name: "This is nothing new. I know of three other MBA colleges that did something similar with the '23 batch. I was part of one. They make you sign a document before placements with unethical rules such as this. The worst thing is the faculties are in on it. When few students decided to speak up, a meeting was called with the placement faculty in charge who then proceeded to call the students on stage and humiliated them as well as threatened them of punishing them by not allowing them to appear for 3 dream companies. Tier 2 and below MBA colleges do anything to protect the 100% placement stat and also inflate their ctcs by any means necessary.",
          items: [],
        },
      ],
    },
    {
      id: 26,
      name: "Indian colleges are all about placements, they will do anything to make their stats look good. ",
      items: [],
    },
    {
      id: 27,
      name: "This is a great example that students, aspirants, and parents should not blankly look at the brochure but take feedback from recent graduates as well to get the check of reality. Further, some folks are asking why would students give such a certificate, it's simple when you are under placement pressure that too with MBA curriculum, you will agree to anything that institutes ask you to do, especially regarding placements.",
      items: [],
    },
    {
      id: 28,
      name: "How is this new? This is a well-known tactic used in all biz colleges across the country where placement isn't 100%, even the newer IIMs.",
      items: [],
    },
    {
      id: 29,
      name: "MBA colleges have this thing from a long time. Just put “opted out of placements” for people who haven’t got placed. They have been doing these on their admission brochures. The placement team is formed in the first year itself and people who are close friends of the placement committee get the best placement and their CVs are pushed. Similar with the placement committee. This is the sad reality.",
      items: [],
    },
  ],
};

// export const commentData = {
//   id: 1,
//   name:"",
//   items: [
//     {
//       id: 2342323,
//       name: "They make you sign a document before placements starts. Which basically says that the placement team can do whatever the f they want and you agree to it because without it you are debarred from sitting for placements. Messed up system",
//       items: [],
//     },
//     {
//       id: 2342355,
//       name: "So I know from very close sources that the folks who generally are asked to opt out are those who have  been unable to get any placements even after 2-3 months of attending interviews. These are the last 30% students who cannot really get past the interviews due to skill mismatch or communication skills gap, etc. So this kind of opt out message is not forced and is not a pressure tactic. It's the college saying I have   tried my best to get companies to the college and give you enough opportunities to get through, but now   even I can't help you since I cannot guarantee more companies in the future since it's already 2-3 months past the placement start date.",
//       items: [
//         {
//           id: 3323232,
//           name: "Agree to everything. But then that clearly means that they don't/can't provide 100% placements.  Which is the primary reason this opt-out scheme is being implemented in the first place",
//           items: [
//             {
//               id: 3232323,
//               name: "Oh yes that's true. They take in a lot of people but do not have true 100% placements. 100% is only after the optouts.",
//               items: [],
//             },
//           ],
//         },
//         {
//           id: 2222223,
//           name: "This is nothing new. I know of three other MBA colleges that did something similar with the '23 batch. I was part of one. They make you sign a document before placements with unethical rules such as this. The worst thing is the faculties are in on it. When few students decided to speak up, a meeting was called with the placement faculty incharge who then proceeded to call the students on stage and humiliated them as well as threatened them of punishing them by not allowing them to appear for 3 dream companies. Tier 2 and below MBA colleges do anything to protect the 100% placement stat and also inflate their ctcs by any means necessary.",
//        items:[]
//         },
//       ],
//     },
//     {
//       id: 2342366,
//       name: "Indian colleges are all about placements, they will do anything to make their stats look good. ",
//       items: [],
//     },
//     {
//       id: 2342999,
//       name: "This is great example that students, aspirants and parents should not blankly look at the brochure but take feedback from recent graduates as well to get the check of reality.Further, some folks are asking why would students give such a certificate, it's simple when you are under placement pressure that too with MBA curriculum, you will agree to anything that institutes ask you to do specially regarding placements.",
//       items: [],
//     },
//     {
//       id: 2342222,
//       name: "How is this new? This is a well-known tactic used in all biz colleges across the country where placement isn't 100%, even the newer IIMs.",
//       items: [],
//     },
//     {
//       id: 23425822,
//       name: "MBA colleges have this thing from a long time. Just put “opted out of placements” for people who haven’t got placed. They have been doing these on their admission brochures. The placement team is formed in the first year itself and people who are close friends of the placement committee gets the best placement and their CVs are pushed. Similar with the placement committee. This is the sad reality.",
//       items: [],
//     },
//   ],
// };

export const cardData = [
  {
    id: 1,
    title: "Any leads or referrals please!",
    tags: "#masters #abroad #usa",
    comment: {
      id: 1,
      name: "",
      items: []},
    content:
      "I recently graduated with an MS degree in Computer Science (USA). The market condition is very bad here and I am unable to get an interview chance or OA. It is very tough here and my ...",
    image:'' ,
    image2:reddit,
  },
  {
    id: 2,
    title:
      "NMIMS Hyderabad asks unplaced students to “opt out” of placements....",
    tags: "#placements #b-school #placementstats",
    comment: {
      id: 1,
      name: "",
      items: [
        {
          id: 23,
          name: "They make you sign a document before placements starts. Which basically says that the placement team can do whatever the f they want and you agree to it because without it you are debarred from sitting for placements. Messed up system",
          items: [],
        },
        {
          id: 24,
          name: "So I know from very close sources that the folks who generally are asked to opt out are those who have been unable to get any placements even after 2-3 months of attending interviews. These are the last 30% students who cannot really get past the interviews due to skill mismatch or communication skills gap, etc. So this kind of opt out message is not forced and is not a pressure tactic. It's the college saying I have tried my best to get companies to the college and give you enough opportunities to get through, but now even I can't help you since I cannot guarantee more companies in the future since it's already 2-3 months past the placement start date.",
          items: [
            {
              id: 33,
              name: "Agree to everything. But then that clearly means that they don't/can't provide 100% placements. Which is the primary reason this opt-out scheme is being implemented in the first place",
              items: [
                {
                  id: 32,
                  name: "Oh yes that's true. They take in a lot of people but do not have true 100% placements. 100% is only after the optouts.",
                  items: [],
                },
              ],
            },
            {
              id: 25,
              name: "This is nothing new. I know of three other MBA colleges that did something similar with the '23 batch. I was part of one. They make you sign a document before placements with unethical rules such as this. The worst thing is the faculties are in on it. When few students decided to speak up, a meeting was called with the placement faculty in charge who then proceeded to call the students on stage and humiliated them as well as threatened them of punishing them by not allowing them to appear for 3 dream companies. Tier 2 and below MBA colleges do anything to protect the 100% placement stat and also inflate their ctcs by any means necessary.",
              items: [],
            },
          ],
        },
        {
          id: 26,
          name: "Indian colleges are all about placements, they will do anything to make their stats look good. ",
          items: [],
        },
        {
          id: 27,
          name: "This is a great example that students, aspirants, and parents should not blankly look at the brochure but take feedback from recent graduates as well to get the check of reality. Further, some folks are asking why would students give such a certificate, it's simple when you are under placement pressure that too with MBA curriculum, you will agree to anything that institutes ask you to do, especially regarding placements.",
          items: [],
        },
        {
          id: 28,
          name: "How is this new? This is a well-known tactic used in all biz colleges across the country where placement isn't 100%, even the newer IIMs.",
          items: [],
        },
        {
          id: 29,
          name: "MBA colleges have this thing from a long time. Just put “opted out of placements” for people who haven’t got placed. They have been doing these on their admission brochures. The placement team is formed in the first year itself and people who are close friends of the placement committee get the best placement and their CVs are pushed. Similar with the placement committee. This is the sad reality.",
          items: [],
        },
      ],
    },
    content: "",
    image: postcardimage,
    image2:''
  },
  // {
  //     id: 3,
  //     title: "Job Search Woes: Seeking Guidance 🤔",
  //     tags: "#CareerAdvice #JobSearchTips #ComputerScience",
  //     comment: [new Array(4)],
  //     content:
  //     "Completed my MS in Computer Science, but the job hunt is proving to be a real challenge. Any advice or referrals to help me break into the industry would be invaluable. Let's connect!",
  //     image: "",
  // },
  // {
  //     id: 4,
  //     title: "Master's Grad in Tech: Seeking Opportunities 🚀",
  //     tags: "#TechIndustry #JobSeeker #MSGraduate",
  //     content:
  //     "Just earned my MS in Computer Science from the USA. Unfortunately, the job market is tough, and I'm struggling to secure interviews. If you have any leads or referrals, I would be grateful for the assistance. Let's connect and discuss potential opportunities.",
  //     image: "",
  //     comment: [new Array(4)],
  // },
  // {
  //     id: 5,
  //     comment: [new Array(4)],
  //     title: "Job Search Chronicles: MS in Computer Science 📚",
  //     tags: "#JobHunting #CareerStruggles #CSGraduate",
  //     content:
  //       "Recently graduated with an MS in Computer Science, and the job search is proving to be a real challenge. If you have any leads, referrals, or advice to share, I'm all ears. Let's navigate this journey together!",
  //     image: "",
  //   },
];

const experienceArray = [
  "Built automation stations for testing Embedded devices with iOS and Android. Built automation stations for testing Embedded devices with iOS and Android.",
  "Worked with hardware communication interfaces, including USB, UART, I2C, and SPI.",
  "Hands-on experience with connectivity technologies such as Bluetooth and WiFi.",
];

export const jobintel = [
  {
    id: 1,
    job_title: "Software Test Engineer, System Test Engineering Team",
    yoe: "2YR",
    company_name: "Google",
    skills_required: "Python | C++ | Java",
    experienceDetails: [
      "Experience building automation stations for testing Embedded devices with iOS and Android",
      "Experience with hardware communication interfaces such as USB, UART, I2C, and SPI",
      "Experience with connectivity technologies like Bluetooth, Wifi et",
      "Experience with Mobile App automation tools such as UI Automator or Appium",
    ],
  },
  {
    id: 2,
    job_title: "Quality Assurance Analyst",
    yoe: "1.5YR",
    company_name: "Microsoft",
    skills_required: "Java | Selenium | SQL",
    experienceDetails: [
      " 1 year of experience with full stack development, across back-end such as Java, Python, GO,  and/or C++ codebases, and front-end experience including JavaScript and/or TypeScript, HTML,  CSS, etc",
      "1 year of experience with data structures or algorithms.",
    ], // Using the first two experiences for variety
  },

  // Add more objects as needed
];
export const jobintelforEditor = [
  {
    id: 1,
    job_title: "Software Test Engineer, System Test Engineering Team",
    yoe: "2YR",
    company_name: "Google",
    skills_required: "Python | C++ | Java",
    experienceDetails:
      `<ul><li><p>Experience building automation stations for testing Embedded devices with iOS and Android</p></li><li><p>Experience with hardware communication interfaces such as USB, UART, I2C, and SPI</p></li><li><p>Experience with connectivity technologies like Bluetooth, Wifi et</p></li><li><p>Experience with Mobile App automation tools such as UI Automator or Appium</p></li></ul>`,
  },
  {
    id: 2,
    job_title: "Quality Assurance Analyst",
    yoe: "1.5YR",
    company_name: "Microsoft",
    skills_required: "Java | Selenium | SQL",
    experienceDetails: "<ul><li><p>1 year of experience with full stack development, across back-end such as Java, Python, GO, and/or C++ codebases, and front-end experience including JavaScript and/or TypeScript, HTML, CSS, etc</p></li><li><p>1 year of experience with data structures or algorithms.</p></li></ul>" // Using the first two experiences for variety
  },

  // Add more objects as needed
];
