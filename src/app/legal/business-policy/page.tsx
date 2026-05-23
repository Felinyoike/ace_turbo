export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Business Policy | Ace Turbo",
  description:
    "Privacy, data usage, cookies and security information for Ace Turbo — Turbo Engineering Limited.",
};

const sections: {
  title: string;
  content?: string[];
  bullets?: string[];
  note?: string;
}[] = [
  {
    title: "Privacy Policy",
    content: [
      "This privacy policy sets out how Turbo Engineering Limited uses and protects any information that you give Turbo Engineering Limited when you use this website.",
      "Turbo Engineering Limited is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, then you can be assured that it will only be used in accordance with this privacy statement.",
      "Turbo Engineering Limited may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes.",
    ],
  },
  {
    title: "What We Collect",
    content: ["We may collect the following information:"],
    bullets: [
      "Name and Address.",
      "Contact information including email address.",
      "Demographic information such as postcode, preferences and interests.",
      "Other information relevant to customer surveys and/or offers.",
    ],
  },
  {
    title: "What We Do with the Information We Gather",
    content: [
      "We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:",
    ],
    bullets: [
      "Internal record keeping.",
      "We may use the information to improve our products and services.",
      "We may periodically send promotional emails about new products, special offers or other information which we think you may find interesting using the email address which you have provided.",
      "From time to time, we may also use your information to contact you for market research purposes. We may use the information to customise the website according to your interests.",
    ],
  },
  {
    title: "Security",
    content: [
      "We are committed to ensuring that your information is secure. In order to prevent unauthorised access or disclosure, we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.",
    ],
    note: "We do not store customer credit card details nor do we share customer details with any 3rd parties.",
  },
  {
    title: "How We Use Cookies",
    content: [
      "A cookie is a small file which asks permission to be placed on your computer's hard drive. Once you agree, the file is added and the cookie helps analyse web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual.",
      "We use traffic log cookies to identify which pages are being used. This helps us analyse data about webpage traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.",
      "Overall, cookies help us provide you with a better website, enabling us to monitor which pages you find useful. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us.",
      "You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer.",
    ],
  },
  {
    title: "Links to Other Websites",
    content: [
      "Our website may contain links to other websites of interest. However, once you have used these links to leave our site, you should note that we do not have any control over that other website. Therefore, we cannot be responsible for the protection and privacy of any information which you provide whilst visiting such sites. You should exercise caution and look at the privacy statement applicable to the website in question.",
    ],
  },
  {
    title: "Controlling Your Personal Information",
    content: [
      "You may choose to restrict the collection or use of your personal information in the following ways:",
    ],
    bullets: [
      "Whenever you are asked to fill in a form on the website, look for the box that you can click to indicate that you do not want the information to be used by anybody for direct marketing purposes.",
      "If you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by writing to or emailing us.",
      "We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law to do so.",
      "You may request details of personal information which we hold about you under the Data Protection Act 1998. A small fee will be payable.",
      "If you believe that any information we are holding on you is incorrect or incomplete, please write to or email us as soon as possible. We will promptly correct any information found to be incorrect.",
    ],
  },
];

export default function BusinessPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc]">
        <div className="relative mx-auto max-w-[1200px] px-4 py-16 md:px-12">
          <p className="text-[13px] uppercase tracking-[0.3em] text-[#0868a8]">Legal</p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-extrabold uppercase leading-none tracking-tight text-[#0f172a]">
            Business <span className="text-[#0868a8]">Policy</span>
          </h1>
          <p className="mt-4 max-w-xl text-[16px] leading-7 text-[#475569]">
            Privacy, data usage, cookies and security information for Turbo Engineering Limited
            trading as Ace Turbo.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-[13px]">
            <Link href="/legal/delivery-policy" className="text-[#0868a8] hover:underline">
              Delivery Policy &rarr;
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/legal/refund" className="text-[#0868a8] hover:underline">
              Refund &amp; Cancellations &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
          {/* Policy sections */}
          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.title} className="border-l-2 border-[#bfdbfe] pl-6">
                <h2 className="mb-4 text-[18px] font-bold uppercase tracking-wide text-[#0f172a]">
                  {section.title}
                </h2>
                {section.content && (
                  <div className="space-y-3">
                    {section.content.map((para, i) => (
                      <p key={i} className="text-[15px] leading-7 text-[#475569]">
                        {para}
                      </p>
                    ))}
                  </div>
                )}
                {section.bullets && (
                  <ul className="mt-3 space-y-2">
                    {section.bullets.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-[15px] leading-7 text-[#475569]">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0868a8]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {section.note && (
                  <div className="mt-4 border border-[#bfdbfe] bg-[#eff6ff] px-5 py-4">
                    <p className="text-[14px] font-semibold text-[#054b7f]">{section.note}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="border border-slate-200 bg-[#f8fafc] p-6">
              <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[#0868a8]">Legal Pages</p>
              <ul className="space-y-3 text-[14px]">
                <li>
                  <Link href="/legal/business-policy" className="font-semibold text-[#0868a8]">
                    Business Policy
                  </Link>
                </li>
                <li>
                  <Link href="/legal/delivery-policy" className="text-[#475569] hover:text-[#0868a8] transition-colors">
                    Delivery Policy
                  </Link>
                </li>
                <li>
                  <Link href="/legal/refund" className="text-[#475569] hover:text-[#0868a8] transition-colors">
                    Refund &amp; Cancellations
                  </Link>
                </li>
              </ul>
            </div>
            <div className="border border-slate-200 bg-white p-6">
              <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[#0868a8]">Contact Us</p>
              <a href="tel:01279-817451" className="block text-[15px] font-semibold text-[#0f172a] hover:text-[#0868a8] transition-colors">
                📞 01279-817451
              </a>
              <a href="mailto:contact@aceturbo.co.uk" className="mt-2 block text-[14px] text-[#475569] hover:text-[#0868a8] transition-colors">
                contact@aceturbo.co.uk
              </a>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
