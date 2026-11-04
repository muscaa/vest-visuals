import type { LegalContent, LegalSection } from "@/components/legal";
import { CookieSettingsButton, LegalLink, LegalTable } from "@/components/legal";

// keep the tables in sync with the cookies the sites really set
const head = ["Name", "Purpose", "Provider", "Expires"];

const essential = [
    ["__Secure-better-auth.session_token", "Keeps you signed in to your account.", "Vest Visuals", "7 days, renewed while you use the site; when you close the browser if you didn't choose \"Remember me\""],
    ["__Secure-better-auth.dont_remember", "Remembers that you chose not to stay signed in.", "Vest Visuals", "When you close the browser"],
    ["__Secure-better-auth.two_factor", "Links the code we email you to your sign-in, when two-step verification is on.", "Vest Visuals", "10 minutes"],
    ["__Secure-better-auth.trust_device", "Remembers a device you trust, so you aren't asked for a code on every sign-in.", "Vest Visuals", "30 days"],
    ["cookie_consent", "Remembers your cookie choice, on every Vest Visuals website.", "Vest Visuals", "180 days"],
    ["PARAGLIDE_LOCALE", "Remembers the language you chose, on every Vest Visuals website.", "Vest Visuals", "400 days"],
    ["theme", "Remembers the theme you chose (light or dark), on every Vest Visuals website.", "Vest Visuals", "1 year"],
    ["sidebar_state", "Remembers whether the menu in your account is open or closed.", "Vest Visuals", "7 days"],
    ["__cf_bm", "Tells people apart from bots, to protect the websites and their forms from abuse.", "Cloudflare", "30 minutes"],
    ["cf_clearance", "Remembers that you passed a security check, so you aren't asked again.", "Cloudflare", "Up to 1 day"],
];

const analytics = [
    ["_ga", "Tells visitors apart, to count visits and see how the websites are used.", "Google Analytics", "2 years"],
    ["_ga_*", "Keeps track of your current visit, for the same statistics.", "Google Analytics", "2 years"],
];

const sections: LegalSection[] = [
    {
        id: "what-are-cookies",
        title: "What are cookies?",
        content: (
            <>
                <p>
                    Cookies are small data files that are placed on your computer or mobile device when you visit a
                    website. Cookies are widely used by website owners in order to make their websites work, or to work
                    more efficiently, as well as to provide reporting information.
                </p>
                <p>
                    Cookies set by the website owner (in this case, VEST VISUALS SRL) are called "first-party cookies."
                    Cookies set by parties other than the website owner are called "third-party cookies." Third-party
                    cookies enable third-party features or functionality to be provided on or through the website (e.g.,
                    advertising, interactive content, and analytics). The parties that set these third-party cookies can
                    recognize your computer both when it visits the website in question and also when it visits certain
                    other websites.
                </p>
            </>
        ),
    },
    {
        id: "why",
        title: "Why do we use cookies?",
        content: (
            <p>
                We use first- and third-party cookies for several reasons. Some cookies are required for technical
                reasons in order for our Website to operate, and we refer to these as "essential" or "strictly
                necessary" cookies. Other cookies also enable us to track and target the interests of our users to
                enhance the experience on our Online Properties. Third parties serve cookies through our Website for
                advertising, analytics, and other purposes. This is described in more detail below.
            </p>
        ),
    },
    {
        id: "control",
        title: "How can I control cookies?",
        content: (
            <>
                <p>
                    You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights
                    by setting your preferences in the cookie settings, which let you select which categories of cookies
                    you accept or reject. Essential cookies cannot be rejected as they are strictly necessary to provide
                    you with services.
                </p>
                <p>
                    The cookie settings are shown in the banner on your first visit, and you can open them again at any
                    time with the button below. If you choose to reject cookies, you may still use our Website though your
                    access to some functionality and areas of our Website may be restricted. You may also set or amend
                    your web browser controls to accept or refuse cookies.
                </p>
                <CookieSettingsButton />
            </>
        ),
    },
    {
        id: "cookies-we-use",
        title: "Which cookies do we use?",
        content: (
            <>
                <p>
                    The specific types of first- and third-party cookies served through our Website and the purposes they
                    perform are described in the tables below (please note that the specific cookies served may vary
                    depending on the specific Online Properties you visit).
                </p>
                <h3>Essential website cookies</h3>
                <p>
                    These cookies are strictly necessary to provide you with services available through our Website and
                    to use some of its features, such as access to secure areas. The Cloudflare cookies are only set when
                    Cloudflare checks a visit for abuse, for example on the contact and sign-in forms, which it protects
                    with Cloudflare Turnstile.
                </p>
                <LegalTable head={head} rows={essential} />
                <h3>Analytics cookies</h3>
                <p>
                    These cookies collect information that is used in aggregate form to help us understand how our
                    Website is being used. They are only set if you choose "Accept all", and are deleted if you change
                    your choice to "Essential only".
                </p>
                <LegalTable head={head} rows={analytics} />
                <h3>Videos</h3>
                <p>
                    Videos in our portfolio and albums are played from YouTube, in its privacy-enhanced mode
                    (youtube-nocookie.com). When you play a video, YouTube may set its own cookies, such as YSC and
                    VISITOR_INFO1_LIVE, and store data in your browser. For details, see{" "}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google's Privacy Policy</a>.
                </p>
            </>
        ),
    },
    {
        id: "devices",
        title: "Do my choices apply on all my devices?",
        content: (
            <>
                <p>
                    No. We save your cookie choices in the browser you used to make them. They apply to that browser on
                    that device only, on every Vest Visuals website.
                </p>
                <p>
                    We ask for your choices again when you visit from a different device or browser, when you use a
                    private or incognito window since your browser deletes your choices when you close it, or when you
                    clear your cookies or browser data.
                </p>
                <p>You can change your choices at any time in the cookie settings.</p>
            </>
        ),
    },
    {
        id: "browser",
        title: "How can I control cookies on my browser?",
        content: (
            <>
                <p>
                    As the means by which you can refuse cookies through your web browser controls vary from browser to
                    browser, you should visit your browser's help menu for more information. The following is information
                    about how to manage cookies on the most popular browsers:
                </p>
                <ul>
                    <li><a href="https://support.google.com/chrome/answer/95647#zippy=%2Callow-or-block-cookies" target="_blank" rel="noopener noreferrer">Chrome</a></li>
                    <li><a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer">Internet Explorer</a></li>
                    <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop?redirectslug=enable-and-disable-cookies-website-preferences&redirectlocale=en-US" target="_blank" rel="noopener noreferrer">Firefox</a></li>
                    <li><a href="https://support.apple.com/en-ie/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
                    <li><a href="https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd" target="_blank" rel="noopener noreferrer">Edge</a></li>
                    <li><a href="https://help.opera.com/en/latest/web-preferences/" target="_blank" rel="noopener noreferrer">Opera</a></li>
                </ul>
                <p>
                    In addition, most advertising networks offer you a way to opt out of targeted advertising. If you
                    would like to find out more information, please visit:
                </p>
                <ul>
                    <li><a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">Digital Advertising Alliance</a></li>
                    <li><a href="https://youradchoices.ca/" target="_blank" rel="noopener noreferrer">Digital Advertising Alliance of Canada</a></li>
                    <li><a href="http://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer">European Interactive Digital Advertising Alliance</a></li>
                </ul>
            </>
        ),
    },
    {
        id: "other-technologies",
        title: "What about other tracking technologies, like web beacons?",
        content: (
            <p>
                Cookies are not the only way to recognize or track visitors to a website. We may use other, similar
                technologies from time to time, like web beacons (sometimes called "tracking pixels" or "clear gifs").
                These are tiny graphics files that contain a unique identifier that enables us to recognize when someone
                has visited our Website or opened an email including them. This allows us, for example, to monitor the
                traffic patterns of users from one page within a website to another, to deliver or communicate with
                cookies, to understand whether you have come to the website from an online advertisement displayed on a
                third-party website, to improve site performance, and to measure the success of email marketing
                campaigns. In many instances, these technologies are reliant on cookies to function properly, and so
                declining cookies will impair their functioning.
            </p>
        ),
    },
    {
        id: "advertising",
        title: "Do you serve targeted advertising?",
        content: (
            <p>
                Third parties may serve cookies on your computer or mobile device to serve advertising through our
                Website. These companies may use information about your visits to this and other websites in order to
                provide relevant advertisements about goods and services that you may be interested in. They may also
                employ technology that is used to measure the effectiveness of advertisements. They can accomplish this by
                using cookies or web beacons to collect information about your visits to this and other sites in order to
                provide relevant advertisements about goods and services of potential interest to you. The information
                collected through this process does not enable us or them to identify your name, contact details, or
                other details that directly identify you unless you choose to provide these.
            </p>
        ),
    },
    {
        id: "updates",
        title: "How often will you update this Cookie Policy?",
        content: (
            <>
                <p>
                    We may update this Cookie Policy from time to time in order to reflect, for example, changes to the
                    cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this
                    Cookie Policy regularly to stay informed about our use of cookies and related technologies.
                </p>
                <p>The date at the top of this Cookie Policy indicates when it was last updated.</p>
            </>
        ),
    },
    {
        id: "contact",
        title: "Where can I get further information?",
        content: (
            <>
                <p>
                    If you have any questions about our use of cookies or other technologies, please email us at{" "}
                    <a href="mailto:contact@vestvisuals.ro">contact@vestvisuals.ro</a> or write to us by post at:
                </p>
                <p>
                    <strong>VEST VISUALS SRL</strong>
                    <br />
                    Str. Matei Millo 44
                    <br />
                    300696 Timișoara, Timiș County
                    <br />
                    Romania
                </p>
                <p>Phone: <a href="tel:+40723971618">+40 723 971 618</a></p>
                <p>
                    How we process personal data is described in our{" "}
                    <LegalLink document="privacy">Privacy Policy</LegalLink>.
                </p>
            </>
        ),
    },
];

const content: LegalContent = {
    title: "Cookie Policy",
    intro: (
        <>
            <p>
                This Cookie Policy explains how VEST VISUALS SRL ("Company," "we," "us," and "our") uses cookies and
                similar technologies to recognize you when you visit our website at vestvisuals.ro and its subdomains,
                such as media.vestvisuals.ro ("Website"). It explains what these technologies are and why we use them, as
                well as your rights to control our use of them.
            </p>
            <p>
                In some cases we may use cookies to collect personal information, or that becomes personal information
                if we combine it with other information.
            </p>
        </>
    ),
    sections,
};

export default content;
