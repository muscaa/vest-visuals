import { Link } from "@tanstack/react-router";
import { createContext, useContext } from "react";
import { m } from "@shared/paraglide/messages";
import { Main } from "../main";
import { Rich } from "../rich";
import { TextH1, TextH2, TextP, TextSpan } from "../typography";
import type { LinkOptions } from "@tanstack/react-router";
import type { Localized } from "@/i18n";
import { formatDate, localize } from "@/i18n";

export interface LegalSection {
    /** anchor for the table of contents */
    id: string;
    title: string;
    content: React.ReactNode;
}

/** The text of a legal document in one locale, see src/i18n/legal. */
export interface LegalContent {
    title: string;
    intro: React.ReactNode;
    sections: LegalSection[];
}

/** A legal document in every locale, shared by every division. */
export interface LegalDocument {
    /** ISO date, e.g. "2026-10-13", formatted for each locale */
    updated: string;
    content: Localized<LegalContent>;
}

export type LegalDivision = "home" | "media" | "software";
export type LegalDocumentId = "terms" | "privacy" | "cookies";

const names: Record<LegalDocumentId, () => string> = {
    terms: m.legal_terms,
    privacy: m.legal_privacy,
    cookies: m.legal_cookies,
};

// full paths, so the router can type check them
const links: Record<LegalDivision, Record<LegalDocumentId, LinkOptions>> = {
    home: {
        terms: { to: "/home/legal/terms" },
        privacy: { to: "/home/legal/privacy" },
        cookies: { to: "/home/legal/cookies" },
    },
    media: {
        terms: { to: "/media/legal/terms" },
        privacy: { to: "/media/legal/privacy" },
        cookies: { to: "/media/legal/cookies" },
    },
    software: {
        terms: { to: "/software/legal/terms" },
        privacy: { to: "/software/legal/privacy" },
        cookies: { to: "/software/legal/cookies" },
    },
};

/** Every legal page of a division, for its footer and the links between them. Call it while rendering. */
export function legalPages(division: LegalDivision, except?: LegalDocumentId): (LinkOptions & { name: string })[] {
    return (Object.keys(names) as LegalDocumentId[])
        .filter((id) => id !== except)
        .map((id) => ({
            name: names[id](),
            ...links[division][id],
        }));
}

const LegalDivisionContext = createContext<LegalDivision>("home");

export interface LegalLinkProps {
    document: LegalDocumentId;
    /** defaults to the division of the legal page it is on, or home */
    division?: LegalDivision;
    children: React.ReactNode;
}

/** Links to a legal document, staying on the same division. */
export function LegalLink(props: LegalLinkProps) {
    const context = useContext(LegalDivisionContext);
    const division = props.division ?? context;

    return <Link {...links[division][props.document]}>{props.children}</Link>;
}

export interface LegalAgreementProps {
    /** a message with {#terms} and {#privacy} tags */
    message: Parameters<typeof Rich>[0]["message"];
    division?: LegalDivision;
}

/** The "by continuing, you agree to…" line under forms, linking the division's terms and privacy policy. */
export function LegalAgreement(props: LegalAgreementProps) {
    return (
        <Rich
            message={props.message}
            tags={{
                terms: ({ children }) => <LegalLink division={props.division} document="terms">{children}</LegalLink>,
                privacy: ({ children }) => <LegalLink division={props.division} document="privacy">{children}</LegalLink>,
            }}
        />
    );
}

export interface LegalPageProps {
    division: LegalDivision;
    id: LegalDocumentId;
    document: LegalDocument;
}

/** A long legal document: title, table of contents and numbered sections. */
export function LegalPage({ division, id, document }: LegalPageProps) {
    const props = { division, ...localize(document.content) };

    return (
        <LegalDivisionContext value={props.division}>
            <Main className="items-center px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-[16rem_1fr] gap-12 lg:gap-16 max-w-6xl w-full">
                    {/* on small screens the title comes first; the footer still links the other documents */}
                    <aside className="hidden lg:flex flex-col gap-8 sticky top-8 self-start">
                        <nav aria-label={m.legal_contents()} className="flex flex-col gap-3">
                            <TextSpan variant="muted" size="sm-3" font="mono-1">{m.legal_contents()}</TextSpan>
                            <ol className="flex flex-col gap-2">
                                {
                                    props.sections.map((section, index) => (
                                        <li key={section.id}>
                                            <Link
                                                to="."
                                                hash={section.id}
                                                className="flex gap-2 text-sm-2 text-muted-foreground transition-colors hover:text-foreground"
                                            >
                                                <span className="tabular-nums">{index + 1}.</span>
                                                {section.title}
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ol>
                        </nav>
                        <nav aria-label={m.legal_other_documents()} className="flex flex-col gap-3">
                            <TextSpan variant="muted" size="sm-3" font="mono-1">{m.legal_other_documents()}</TextSpan>
                            <ul className="flex flex-col gap-2">
                                {
                                    legalPages(props.division, id)
                                        .map(({ name, ...link }) => (
                                            <li key={name}>
                                                <Link {...link} className="text-sm-2 text-muted-foreground transition-colors hover:text-foreground">
                                                    {name}
                                                </Link>
                                            </li>
                                        ))
                                }
                            </ul>
                        </nav>
                    </aside>
                    <article className="flex flex-col max-w-[72ch]">
                        <TextH1 size="md-1" className="mb-3">{props.title}</TextH1>
                        <TextSpan variant="muted" size="sm-2" className="mb-10">
                            {m.legal_updated({ date: formatDate(document.updated) })}
                        </TextSpan>
                        <div className="flex flex-col gap-4 mb-12 text-md-4 text-muted-foreground">
                            {props.intro}
                        </div>
                        <div className="flex flex-col gap-12">
                            {
                                props.sections.map((section, index) => (
                                    <section key={section.id} id={section.id} className="flex flex-col gap-4 scroll-mt-8">
                                        <TextH2 size="md-3" className="font-medium">
                                            {index + 1}. {section.title}
                                        </TextH2>
                                        <div className="flex flex-col gap-3 text-sm-1 text-muted-foreground [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5 [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-foreground [&_strong]:text-foreground [&_strong]:font-medium">
                                            {section.content}
                                        </div>
                                    </section>
                                ))
                            }
                        </div>
                        <TextP variant="muted" size="sm-2" className="mt-16 pt-8 border-t">
                            <Rich message={m.legal_questions} />
                        </TextP>
                    </article>
                </div>
            </Main>
        </LegalDivisionContext>
    );
}
