import type { LegalContent, LegalSection } from "@/components/legal";
import { LegalLink } from "@/components/legal";

// TODO: draft, have it reviewed by a lawyer before going live

const sections: LegalSection[] = [
    {
        id: "cine-suntem",
        title: "Who we are",
        content: (
            <>
                <p>
                    The vestvisuals.ro websites, including the subdomains for
                    each line of work, are run by{" "}
                    <strong>VEST VISUALS S.R.L.</strong>, registered at Str.
                    Matei Millo 44, Timișoara, Timiș County, Romania, tax ID
                    54191210 (from here on "Vest Visuals" or "we").
                </p>
                <p>
                    You can reach us at{" "}
                    <a href="mailto:contact@vestvisuals.ro">contact@vestvisuals.ro</a>.
                </p>
            </>
        ),
    },
    {
        id: "acceptare",
        title: "Accepting these terms",
        content: (
            <p>
                By using the site, you agree to these terms and conditions. If
                you don't agree with them, please don't use the site. We may
                update the terms at any time, and the version in force is the
                one published on this page, with the date of its last update.
            </p>
        ),
    },
    {
        id: "servicii",
        title: "Our services",
        content: (
            <>
                <p>
                    The site presents the services of Vest Visuals, including
                    photo and video (weddings, events, photo sessions, real
                    estate, automotive, business promotion) and software (web
                    and mobile apps, cloud, data, automation, consulting and
                    maintenance).
                </p>
                <p>
                    Prices shown on the site are indicative and are not a firm
                    offer. Every project is based on a personalised offer and a
                    separate contract, which takes precedence over these terms.
                </p>
            </>
        ),
    },
    {
        id: "cont",
        title: "Your account",
        content: (
            <>
                <p>
                    For some features, such as access to photo albums, you can
                    create an account with an email address and password, or
                    with Google, Apple, Facebook or GitHub.
                </p>
                <ul>
                    <li>You are responsible for keeping your sign-in details safe.</li>
                    <li>The information in your account must be correct and up to date.</li>
                    <li>You can ask us to delete your account at any time.</li>
                </ul>
                <p>
                    We may suspend or close an account that is used abusively or
                    against these terms.
                </p>
            </>
        ),
    },
    {
        id: "proprietate-intelectuala",
        title: "Intellectual property",
        content: (
            <>
                <p>
                    The content of the site, including photos, videos, texts,
                    logo and design, belongs to Vest Visuals or is used with the
                    authors' permission. It may not be copied, distributed or
                    used commercially without our written consent.
                </p>
                <p>
                    The rights to photos, videos and applications made for
                    clients are set out in each project's contract.
                </p>
            </>
        ),
    },
    {
        id: "utilizare",
        title: "Using the site",
        content: (
            <>
                <p>By using the site, you agree not to:</p>
                <ul>
                    <li>try to access systems, accounts or data without authorisation;</li>
                    <li>send illegal or offensive content, or unsolicited messages, through the forms;</li>
                    <li>use automated programs that affect how the site works.</li>
                </ul>
            </>
        ),
    },
    {
        id: "raspundere",
        title: "Limitation of liability",
        content: (
            <p>
                We do our best to keep the information on the site correct and
                up to date, but we can't guarantee that the site will always be
                available or free of errors. To the extent allowed by law, we
                are not liable for indirect damage resulting from the use of the
                site. The site may contain links to other websites, whose
                content we are not responsible for.
            </p>
        ),
    },
    {
        id: "date-personale",
        title: "Personal data and cookies",
        content: (
            <p>
                How we process personal data is described in the{" "}
                <LegalLink document="privacy">Privacy policy</LegalLink>, and
                the cookies we use in the{" "}
                <LegalLink document="cookies">Cookie policy</LegalLink>.
            </p>
        ),
    },
    {
        id: "litigii",
        title: "Governing law and disputes",
        content: (
            <>
                <p>
                    These terms are governed by Romanian law. We always try to
                    settle any disagreement amicably first. If that doesn't
                    work, disputes are settled by the competent courts in
                    Romania.
                </p>
                <p>
                    If you are a consumer, you can also turn to the Romanian
                    National Authority for Consumer Protection (
                    <a href="https://anpc.ro" target="_blank" rel="noopener noreferrer">anpc.ro</a>
                    ), to alternative dispute resolution (
                    <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener noreferrer">SAL</a>
                    ) or to the European online dispute resolution platform (
                    <a href="https://consumer-redress.ec.europa.eu/index_en" target="_blank" rel="noopener noreferrer">ODR</a>
                    ).
                </p>
            </>
        ),
    },
];

const content: LegalContent = {
    title: "Terms and conditions",
    intro: (
        <p>
            These terms set the rules for using the Vest Visuals websites.
            Please read them before you use the site or contact us.
        </p>
    ),
    sections,
};

export default content;
