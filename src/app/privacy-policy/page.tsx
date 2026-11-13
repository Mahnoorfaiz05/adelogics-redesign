import type { Metadata } from "next";
import Legal from "@/components/sections/Legal";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy", description: "How Adelogix collects, uses and protects the information you share through this website.", alternates: { canonical: "/privacy-policy/" } };

const mail = <a href={`mailto:${site.email}`}>{site.email}</a>;

export default function PrivacyPage() {
  return (
    <Legal
      title="Privacy *Policy*" updated="30 October 2026"
      intro="How we collect, use and protect the information you share with us through this website."
      sections={[
        { h: "Who we are", body: <p>This website is operated by Adelogix Software Technology (&quot;Adelogix&quot;, &quot;we&quot;, &quot;us&quot;), based in Bahawalpur, Punjab, Pakistan. For any privacy question, contact us via {mail}.</p> },
        { h: "Information we collect", body: <><p>We only collect information you choose to give us, and limited technical data needed to run the site:</p><ul><li>Enquiry details: your name, business email, company, the service you are interested in, an optional budget range, your project description, preferred contact method and, if you choose phone or WhatsApp, your phone number.</li><li>Booking details: if you book a meeting, the booking provider collects the details you enter there under its own privacy policy.</li><li>Analytics data: only if you accept analytics cookies, Google Analytics collects information such as pages visited, approximate location, device and browser type.</li><li>Server logs: our hosting provider may record IP addresses and request information for security and reliability.</li></ul></> },
        { h: "How we use your information", body: <><ul><li>To respond to your enquiry and discuss your project.</li><li>To prepare proposals and, if we work together, to deliver the agreed services.</li><li>To understand how visitors use the website so we can improve it (only with your consent).</li><li>To protect the website against spam and abuse.</li></ul><p>We do not sell your personal information, and we do not use your enquiry details for unrelated marketing without your permission.</p></> },
        { h: "Legal basis", body: <p>Where data protection laws such as the UK GDPR or EU GDPR apply, we process enquiry details on the basis of our legitimate interest in responding to you and taking steps at your request before entering into a contract. Analytics cookies are used only with your consent.</p> },
        { h: "Cookies and analytics", body: <p>The website works without cookies. If analytics is enabled, we ask for your consent before setting any Google Analytics cookies. You can change your choice at any time using &quot;Cookie preferences&quot; in the footer.</p> },
        { h: "Who we share information with", body: <p>We use service providers needed to operate the website and handle enquiries, such as hosting, email delivery, booking and, only with consent, analytics services. They process information only as needed to provide their service. We will update this policy if a provider that handles personal information changes.</p> },
        { h: "How long we keep information", body: <p>We keep enquiry details only for as long as needed to respond and follow up, unless a longer period is required for an active client relationship, a legal obligation or a legitimate record-keeping purpose. You can ask us about a specific enquiry by contacting us at {mail}.</p> },
        { h: "Your rights", body: <p>Depending on where you live, you may have the right to access, correct, delete or restrict the use of your personal information, to object to processing and to withdraw consent. To make a request, contact us via {mail}. You also have the right to complain to your local data protection authority.</p> },
        { h: "Security", body: <p>The website is served over HTTPS and form submissions are transmitted securely. We limit access to enquiry data to the people who need it to respond to you.</p> },
        { h: "Changes to this policy", body: <p>We may update this policy when our website or practices change. The &quot;Last updated&quot; date shows when it was last revised.</p> },
      ]}
    />
  );
}
