export type RequestDemoFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  jobTitle: string;
  digitalBrokerageStartup: "" | "yes" | "no";
  startupType: string;
  fundraisingStage: string;
  existingBook: "" | "yes" | "no";
  bookSize: string;
  pcLicense: string;
  carrierAppointments: string;
  appointedCarriers: string;
  lobs: string[];
  wholesalerNetwork: string;
};

export const REQUEST_DEMO_DEFAULT_VALUES: RequestDemoFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  companyName: "",
  jobTitle: "",
  digitalBrokerageStartup: "",
  startupType: "",
  fundraisingStage: "",
  existingBook: "",
  bookSize: "",
  pcLicense: "",
  carrierAppointments: "",
  appointedCarriers: "",
  lobs: [],
  wholesalerNetwork: "",
};

export const REQUEST_DEMO_STEP_FIELDS: Record<number, (keyof RequestDemoFormValues)[]> = {
  1: ["firstName", "lastName", "email"],
  2: ["phoneNumber", "companyName", "jobTitle", "digitalBrokerageStartup"],
  3: [
    "startupType",
    "fundraisingStage",
    "existingBook",
    "bookSize",
    "pcLicense",
    "carrierAppointments",
    "lobs",
    "wholesalerNetwork",
  ],
};

export const LOB_OPTIONS = [
  "General Liability (GL)",
  "Business Owners' Policy (BOP)",
  "Workers' Compensation (WC)",
  "Cyber Liability",
  "Miscellaneous Professional Liability (MPL)",
  "Inland Marine",
  "Property",
  "Commercial Auto",
  "Other",
] as const;
