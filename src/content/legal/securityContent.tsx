import Link from "next/link";
import type { LegalPageProps } from "@/components/legal/LegalPage";

export const securityContent: LegalPageProps = {
  eyebrow: "Security",
  title: "Security",
  intro: "At CoverForce, we are committed to information security.",
  sections: [
    {
      title: "Our Approach",
      paragraphs: [
        "It is our mission to be the gold-standard for security and privacy for insurance infrastructure. We take a risk-driven and a multi-layered approach to implementing information security controls that ensure the confidentiality, integrity and availability of the organization's information and assets. We adopt the principles of security by design, zero trust, and continuous security to prevent unauthorized access to company's data.",
        "CoverForce's services are architected using Infrastructure and CI/CD platforms that primarily adopt AWS and Github serverless technologies. Automated scaling, patch management, high availability, are built-in by design. Our focus is on tightly managing user and programmatic access to resources and data, without implicitly trusting any physical and network location of the user. At CoverForce, we have implemented layers of prevention, detection, alerting and response capabilities to the dev ops pipeline and the cloud infrastructure. We continuously monitor our infrastructure accounts, version control tools, task trackers, endpoints, hosts, HR tools, corporate applications to ensure adherence to company security policies, procedures and standards.",
        "Our team works with appointed Agency Networks and Agencies of all sizes to build their digital ecosystems.",
      ],
    },
    {
      title: "People",
      paragraphs: [
        "We are committed to attract, develop and retain competitive talent aligned with our objectives. Our hiring and onboarding process is rigorous and effective. Semi-annual performance evaluation ensures that the employees stay on course and aligned with business objectives. Mandatory security awareness training is required of all employees and contractors. Our human resources team has enforced a code of conduct, anti-harassment, and whistle-blower policy to ensure a safe work environment for all employees. To foster a culture of security, the information security team runs a comprehensive security awareness program.",
        "CoverForce's board is composed of highly competent individuals, with the breadth of experience to oversee management's design, implementation and operation of information security controls. The by-laws of CoverForce empower the board of directors to function independently.",
      ],
    },
    {
      title: "Communication and Information",
      paragraphs: [
        "The company management has established, approved and assigned Information Security roles and responsibilities for the design, development, implementation, operation, maintenance, and monitoring of information security controls. Information security policies are established and communicated to all employees, these policies are reviewed periodically. Service terms, description and changes to control implementation are promptly communicated to external parties.",
      ],
    },
    {
      title: "Risk Management",
      paragraphs: [
        "CoverForce has established a risk management program that includes guidance on identifying potential risks, rating the significance of the risks, and implementing mitigation strategies for those risks. We conduct periodic workshops with cross-functional groups to identify top risks to the organization. CoverForce has a vendor risk management program that periodically reviews vendor security and privacy requirements.",
      ],
    },
    {
      title: "System Operations and Monitoring Activities",
      paragraphs: [
        "CoverForce performs control self-assessments periodically to gain assurance that controls are in place and operating effectively. Corrective actions are taken based on relevant findings. Penetration testing is performed periodically, a remediation plan is developed and changes are implemented to remediate vulnerabilities in accordance with SLAs. Vulnerability scans are performed periodically on all external-facing and internal-facing systems and the vulnerabilities are tracked to remediation.",
        "Infrastructure monitoring tools are utilized to monitor systems, infrastructure, and performance. We utilize log management tools to identify events that may have a potential impact on the company's ability to achieve its security objectives. Intrusion detection system is deployed to provide continuous monitoring of the company's network and systems and early detection of potential security breaches.",
      ],
    },
    {
      title: "Access Controls",
      paragraphs: [
        "Access to in-scope system components is based on job role and function. Our access control enforcement is as granular as possible to enforce least privilege needed to perform the action and prevents unauthorized access to data and services. Single-sign-on and account provisioning automation is leveraged extensively. We perform periodic access reviews of privilege access to identified critical systems. Access requests are documented and approved by system owners and managers.",
      ],
    },
    {
      title: "Change Management",
      paragraphs: [
        "Changes to the software and infrastructure components of the service are documented, tested, reviewed and approved prior to being deployed to the production environment. We have documented a system development life-cycle (SDLC) methodology, which provides guidance on deploying services to the production environment. Test, Sandbox and Production environments are isolated from each other, changes get sequentially deployed and tested first in the test environment and then in the sandbox environments before deploying to the production environment.",
      ],
    },
    {
      title: "Cryptographic Controls",
      paragraphs: [
        "We use secure vaults and related services such as Ansible vault, 1Password, AWS-KMS, etc. to manage the life-cycle of secrets such as password, API keys, access keys, SSH keys, etc. We employ industry standard encryption algorithms. With Google Workspace as the identity provider for employees, we leverage multi-factor authentication (MFA), single-sign-on (SSO) and automated provisioning of accounts in 3rd-party services.",
      ],
    },
    {
      title: "Security Incident Management",
      paragraphs: [
        "CoverForce has implemented security monitoring and detection tools, and a process that enables us to watch for anomalies and protect the services against attacks. In the event of a security breach we will promptly notify impacted users of any actual or suspected unauthorized access to their systems and data.",
      ],
    },
    {
      title: "Business Continuity",
      paragraphs: [
        "We have a proactive approach to identifying potential single points of failure in people, process, infrastructure and services. And continuously evolve mechanisms to minimize the single point of failures. Our services hosted in the AWS cloud are highly available and scale automatically. Databases and infrastructure state is automatically backed up.",
      ],
    },
  ],
  footerNote: (
    <>
      Security questions can be sent to{" "}
      <a
        href="mailto:support@cover-force.com"
        className="text-[#3D3D3D] underline underline-offset-2"
      >
        support@cover-force.com
      </a>{" "}
      or through our{" "}
      <Link href="/contact" className="text-[#3D3D3D] underline underline-offset-2">
        contact page
      </Link>
      .
    </>
  ),
};
