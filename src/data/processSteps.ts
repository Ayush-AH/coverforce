export type ProcessStepIconKey = "mail" | "sparkle";

export type ProcessStepPoint = {
  id: string;
  icon: ProcessStepIconKey;
  text: string;
  highlighted?: boolean;
};

export type ProcessStepHeading = {
  pre: string;
  highlightLines: string[];
  postLines: string[];
};

export type ProcessStep = {
  id: string;
  tag: string;
  heading: ProcessStepHeading;
  desc: string;
  points: ProcessStepPoint[];
};

export const processSteps: ProcessStep[] = [
  {
    id: "intake-01",
    tag: "Intake 01",
    heading: {
      pre: "From",
      highlightLines: ["email to forms to", "documents"],
      postLines: ["every", "submission starts here."],
    },
    desc: "CoverForce accepts submissions however agents already work email, ACORD PDFs, loss runs, prior policies, manual entry, or direct AMS sync.",
    points: [
      {
        id: "accept",
        icon: "mail",
        text: "Accept submissions from email, ACORD PDFs, loss runs, prior policies, manual entry, or AMS sync.",
      },
      {
        id: "ai",
        icon: "sparkle",
        highlighted: true,
        text: "AI reads ACORDs, prior policies, and loss runs with 95%+ accuracy.",
      },
      {
        id: "customer",
        icon: "mail",
        text: "Customer details are saved and reused for future submissions.",
      },
    ],
  },
  {
    id: "step-02",
    tag: "ACORD Automation 02",
    heading: {
      pre: "The",
      highlightLines: ["form fills itself"],
      postLines: ["in"],
    },
    desc: "When a submission arrives, AI extracts ACORD data instantly insured details, FEIN, NAICS, payroll, claims, and more. NCCI codes auto-match, and carrier underwriting questions pre-fill from past submissions.",
    points: [
      { id: "p1", icon: "mail", text: "AI extracts data from ACORD forms and fills missing application fields." },
      { id: "p2", icon: "mail", text: "Classification codes and underwriting answers are mapped automatically." },
      { id: "p3", icon: "mail", text: "Applications are pre-filled across carrier formats with less manual entry." },
    ],
  },
  {
    id: "step-03",
    tag: "Carrier Submission 03",
    heading: {
      pre: "One submission",
      highlightLines: ["40+ carriers"],
      postLines: [],
    },
    desc: "Enter data once and CoverForce submits it to every appointed carrier at the same time using your broker codes, wholesaler relationships, and carrier appetite rules.",
    points: [
      { id: "p1", icon: "mail", text: "One completed application is sent to 40+ carriers at the same time." },
      { id: "p2", icon: "mail", text: "Carrier-specific questions and requirements are handled automatically." },
      { id: "p3", icon: "mail", text: "No portal logins, repeated typing, or switching between carrier websites." },
    ],
  },
  {
    id: "step-04",
    tag: "Compare QOutes 04",
    heading: {
      pre: "",
      highlightLines: ["Bindable quotes"],
      postLines: ["Side by Side"],
    },
    desc: "Compare carrier responses in one place premiums, payment plans, deductibles, bind status, referrals, and decline reasons.",
    points: [
      { id: "p1", icon: "mail", text: "View bindable quotes from multiple carriers side by side." },
      { id: "p2", icon: "mail", text: "Compare premium, deductible, limits, coverage, and quote status clearly." },
      { id: "p3", icon: "mail", text: "Generate customer-ready quote proposals in seconds." },
    ],
  },
  {
    id: "step-05",
    tag: "Bind 05",
    heading: {
      pre: "From",
      highlightLines: ["quote to bound policy"],
      postLines: ["in one Platform"],
    },
    desc: "Bind in one click, with admin review when needed. All policy docs, certificates, and endorsements are saved in the Document Center.",
    points: [
      { id: "p1", icon: "mail", text: "Select the best quote and bind the policy in one click." },
      { id: "p2", icon: "mail", text: "Complete payment and premium finance inside the same workflow." },
      { id: "p3", icon: "mail", text: "Policy documents are delivered instantly after binding." },
    ],
  },
];

