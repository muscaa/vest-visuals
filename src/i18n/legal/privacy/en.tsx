import type { LegalContent, LegalSection } from "@/components/legal";
import { LegalLink } from "@/components/legal";

// TODO: draft, have it reviewed by a lawyer before going live

const sections: LegalSection[] = [
    {
        id: "operator",
        title: "Who processes your data",
        content: (
            <p>
                The controller of your personal data is{" "}
                <strong>VEST VISUALS S.R.L.</strong>, registered at Str. Matei
                Millo 44, Timișoara, Timiș County, Romania, tax ID 54191210. For
                any question about your data, write to us at{" "}
                <a href="mailto:contact@vestvisuals.ro">contact@vestvisuals.ro</a>.
            </p>
        ),
    },
    {
        id: "date",
        title: "What data we collect",
        content: (
            <ul>
                <li>
                    <strong>When you contact us:</strong> your name, email
                    address, phone number if you give it to us, and the content
                    of your message.
                </li>
                <li>
                    <strong>When you create an account:</strong> your name,
                    email address and password, stored encrypted. If you sign
                    in with Google, Apple, Facebook or GitHub, we receive your
                    name, email address and, where available, your profile
                    picture from them.
                </li>
                <li>
                    <strong>When we work together:</strong> the details needed
                    for the offer, contract and invoicing, as well as the photos
                    and videos taken at your event.
                </li>
                <li>
                    <strong>Automatically:</strong> technical data such as your
                    IP address, browser type and the pages you visit, needed for
                    the site to work and stay secure.
                </li>
            </ul>
        ),
    },
    {
        id: "scop",
        title: "Why we use your data and on what basis",
        content: (
            <ul>
                <li>
                    <strong>To reply to you and make you an offer</strong>,
                    based on steps taken at your request before entering into a
                    contract.
                </li>
                <li>
                    <strong>To fulfil the contract</strong>: to provide the
                    services, deliver your photos, videos or application, and
                    manage your account.
                </li>
                <li>
                    <strong>To comply with the law</strong>, for example
                    accounting and tax obligations.
                </li>
                <li>
                    <strong>To protect the site</strong> from spam and abuse,
                    based on our legitimate interest.
                </li>
                <li>
                    <strong>To use photos in our portfolio</strong>, only with
                    your consent, which you can withdraw at any time.
                </li>
            </ul>
        ),
    },
    {
        id: "destinatari",
        title: "Who we share your data with",
        content: (
            <>
                <p>
                    We don't sell your data. We only share it with providers
                    that help us operate, as far as necessary:
                </p>
                <ul>
                    <li>hosting and storage providers, for the site, accounts, photos and videos;</li>
                    <li>Google, to protect the forms with reCAPTCHA;</li>
                    <li>Google, Apple, Facebook and GitHub, only if you choose to sign in with them;</li>
                    <li>email services, for the messages we send you;</li>
                    <li>accountants and authorities, when the law requires it.</li>
                </ul>
                <p>
                    Some of these providers may process data outside the
                    European Union. In those cases we make sure appropriate
                    safeguards are in place, such as the standard contractual
                    clauses approved by the European Commission.
                </p>
            </>
        ),
    },
    {
        id: "durata",
        title: "How long we keep your data",
        content: (
            <ul>
                <li>contact messages, at most 2 years after the last exchange, if you don't become a client;</li>
                <li>account data, for as long as the account is active;</li>
                <li>photos and videos in digital albums, for the period set in the chosen package;</li>
                <li>accounting documents, for as long as the law requires, usually 10 years.</li>
            </ul>
        ),
    },
    {
        id: "drepturi",
        title: "Your rights",
        content: (
            <>
                <p>Under the GDPR (EU Regulation 2016/679), you have the right:</p>
                <ul>
                    <li>to find out what data we hold about you and get a copy;</li>
                    <li>to have it corrected or deleted;</li>
                    <li>to restrict or object to its processing;</li>
                    <li>to receive your data in a format that is easy to transfer;</li>
                    <li>to withdraw your consent at any time.</li>
                </ul>
                <p>
                    For any of these, write to us at{" "}
                    <a href="mailto:contact@vestvisuals.ro">contact@vestvisuals.ro</a>.
                    We reply within one month at most. If you're not satisfied,
                    you can file a complaint with the Romanian National
                    Supervisory Authority for Personal Data Processing (
                    <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer">dataprotection.ro</a>
                    ).
                </p>
            </>
        ),
    },
    {
        id: "securitate",
        title: "Data security",
        content: (
            <p>
                We use encrypted connections (HTTPS), encrypted passwords,
                restricted access and backups to keep your data safe. No system
                is completely secure, but we'll let you know if an incident
                affects your data.
            </p>
        ),
    },
    {
        id: "cookies",
        title: "Cookies",
        content: (
            <p>
                Details about the cookies we use are in the{" "}
                <LegalLink document="cookies">Cookie policy</LegalLink>.
            </p>
        ),
    },
];

const content: LegalContent = {
    title: "Privacy policy",
    intro: (
        <p>
            We respect your personal data. This page explains what data we
            collect when you use the Vest Visuals websites or work with us, why
            we use it, how long we keep it and what rights you have.
        </p>
    ),
    sections,
};

export default content;
