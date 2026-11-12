import type { Metadata } from "next";
import Link from "next/link";
import Legal from "@/components/sections/Legal";

export const metadata: Metadata = { title: "Terms & Conditions", description: "The terms that apply when you use the Adelogix website.", alternates: { canonical: "/terms/" } };

export default function TermsPage() {
  return (
    <Legal
      title="Terms & *Conditions*" updated="30 October 2026"
      intro="The terms that apply when you use this website. Project work is covered by a separate written agreement."
      sections={[
        { h: "About these terms", body: <p>These terms govern your use of this website, operated by Adelogix Software Technology. By using the site you accept them. If you do not agree, please do not use the site.</p> },
        { h: "Our services", body: <p>Information on this website describes the services we offer in general terms. It is not an offer capable of acceptance. Any project is subject to a separate proposal and agreement that sets out scope, fees, timelines and responsibilities.</p> },
        { h: "Intellectual property", body: <p>The content, design, logo and code of this website belong to Adelogix or are used with permission. Project images and client names appear with the permission of the relevant clients. You may not copy or reuse them without written consent.</p> },
        { h: "Use of the website", body: <p>You agree not to misuse the website, including by attempting to gain unauthorised access, introducing malicious code, or submitting false or abusive information through our forms.</p> },
        { h: "Accuracy of information", body: <p>We aim to keep the website accurate and up to date, but we do not guarantee that all information is complete or current. Nothing on this website is professional advice for your specific circumstances.</p> },
        { h: "Third-party links", body: <p>The website may link to third-party sites and tools, such as booking or social media platforms. We are not responsible for their content or privacy practices.</p> },
        { h: "Liability", body: <p>To the extent permitted by law, we are not liable for any loss arising from the use of, or inability to use, this website. Nothing in these terms limits liability that cannot be limited by law.</p> },
        { h: "Governing law", body: <p>These terms are governed by [governing law, e.g. the laws of the country where Adelogix is registered].</p> },
        { h: "Contact", body: <p>Questions about these terms can be sent through our <Link href="/contact/">contact page</Link>.</p> },
      ]}
    />
  );
}
