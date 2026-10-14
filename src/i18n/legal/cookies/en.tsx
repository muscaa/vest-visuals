import type { LegalContent, LegalSection } from "@/components/legal";
import { LegalLink } from "@/components/legal";

// TODO: draft, have it reviewed by a lawyer before going live; keep the table in sync with the cookies the site really sets

const usedCookies = [
    { name: "theme", purpose: "Remembers the theme you chose (light or dark) on every Vest Visuals site.", duration: "1 year" },
    { name: "PARAGLIDE_LOCALE", purpose: "Remembers the language you chose on every Vest Visuals site.", duration: "about 400 days" },
    { name: "better-auth.session_token", purpose: "Keeps you signed in to your account.", duration: "until you sign out or the session expires" },
    { name: "_GRECAPTCHA", purpose: "Set by Google reCAPTCHA, protects the forms from spam and abuse.", duration: "6 months" },
];

const sections: LegalSection[] = [
    {
        id: "ce-sunt",
        title: "What cookies are",
        content: (
            <p>
                Cookies are small files a website saves in your browser, so it
                can remember certain things between visits, for example that
                you're signed in or which language you chose.
            </p>
        ),
    },
    {
        id: "ce-folosim",
        title: "Which cookies we use",
        content: (
            <>
                <p>
                    We only use cookies that are needed for the site to work and
                    stay secure. We don't use advertising cookies.
                </p>
                <div className="overflow-x-auto rounded-xl border">
                    <table className="w-full text-left text-sm-2">
                        <thead className="bg-muted text-foreground">
                            <tr>
                                <th className="px-4 py-3 font-medium">Name</th>
                                <th className="px-4 py-3 font-medium">Purpose</th>
                                <th className="px-4 py-3 font-medium">Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                usedCookies.map((cookie) => (
                                    <tr key={cookie.name} className="border-t align-top">
                                        <td className="px-4 py-3 font-mono text-foreground whitespace-nowrap">{cookie.name}</td>
                                        <td className="px-4 py-3">{cookie.purpose}</td>
                                        <td className="px-4 py-3">{cookie.duration}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </>
        ),
    },
    {
        id: "terti",
        title: "Third-party cookies",
        content: (
            <p>
                The contact and sign-in forms are protected by Google reCAPTCHA,
                which may set its own cookies. If you sign in with Google,
                Apple, Facebook or GitHub, they may also use cookies on their
                own sites. For details, see the{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                    Google privacy policy
                </a>
                .
            </p>
        ),
    },
    {
        id: "control",
        title: "How to control cookies",
        content: (
            <p>
                You can delete or block cookies in your browser settings.
                Without the necessary cookies, some features won't work, for
                example signing in to your account or remembering your theme
                and language.
            </p>
        ),
    },
    {
        id: "date-personale",
        title: "Personal data",
        content: (
            <p>
                How we process personal data is described in the{" "}
                <LegalLink document="privacy">Privacy policy</LegalLink>.
            </p>
        ),
    },
];

const content: LegalContent = {
    title: "Cookie policy",
    intro: (
        <p>
            This page explains which cookies the Vest Visuals websites use, why,
            and how you can control them.
        </p>
    ),
    sections,
};

export default content;
