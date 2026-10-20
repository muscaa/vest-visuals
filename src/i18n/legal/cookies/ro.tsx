import type { LegalContent, LegalSection } from "@/components/legal";
import { LegalLink } from "@/components/legal";

// TODO: draft, have it reviewed by a lawyer before going live; keep the table in sync with the cookies the site really sets

const usedCookies = [
    { name: "theme", purpose: "Ține minte tema aleasă (luminoasă sau întunecată) pe toate site-urile Vest Visuals.", duration: "1 an" },
    { name: "PARAGLIDE_LOCALE", purpose: "Ține minte limba aleasă pe toate site-urile Vest Visuals.", duration: "aprox. 400 de zile" },
    { name: "better-auth.session_token", purpose: "Te ține autentificat în contul tău.", duration: "până la deconectare sau expirarea sesiunii" },
    { name: "sidebar_state", purpose: "Ține minte dacă meniul din contul tău e deschis sau închis.", duration: "7 zile" },
    { name: "_GRECAPTCHA", purpose: "Setat de Google reCAPTCHA, protejează formularele de spam și abuz.", duration: "6 luni" },
];

const sections: LegalSection[] = [
    {
        id: "what-are-cookies",
        title: "Ce sunt cookie-urile",
        content: (
            <p>
                Cookie-urile sunt fișiere mici pe care un site le salvează în
                browserul tău, ca să țină minte anumite informații între
                vizite, de exemplu că ești autentificat sau ce limbă ai ales.
            </p>
        ),
    },
    {
        id: "cookies-we-use",
        title: "Ce cookie-uri folosim",
        content: (
            <>
                <p>
                    Folosim doar cookie-uri necesare pentru funcționarea
                    site-ului și pentru securitate. Nu folosim cookie-uri de
                    publicitate.
                </p>
                <div className="overflow-x-auto rounded-xl border">
                    <table className="w-full text-left text-sm-2">
                        <thead className="bg-muted text-foreground">
                            <tr>
                                <th className="px-4 py-3 font-medium">Nume</th>
                                <th className="px-4 py-3 font-medium">Scop</th>
                                <th className="px-4 py-3 font-medium">Durată</th>
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
        id: "third-parties",
        title: "Cookie-uri de la terți",
        content: (
            <p>
                Formularele de contact și de autentificare sunt protejate de
                Google reCAPTCHA, care poate seta propriile cookie-uri. Dacă te
                autentifici prin Google, Apple, Facebook sau GitHub, și aceștia
                pot folosi cookie-uri pe site-urile lor. Pentru detalii, vezi{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                    politica de confidențialitate Google
                </a>
                .
            </p>
        ),
    },
    {
        id: "control",
        title: "Cum controlezi cookie-urile",
        content: (
            <p>
                Poți șterge sau bloca cookie-urile din setările browserului.
                Fără cookie-urile necesare, unele funcții nu vor merge, de
                exemplu autentificarea în cont sau păstrarea temei și limbii
                alese.
            </p>
        ),
    },
    {
        id: "personal-data",
        title: "Date personale",
        content: (
            <p>
                Modul în care prelucrăm datele personale este descris în{" "}
                <LegalLink document="privacy">Politica de confidențialitate</LegalLink>.
            </p>
        ),
    },
];

const content: LegalContent = {
    title: "Politica de cookie-uri",
    intro: (
        <p>
            Pe această pagină explicăm ce cookie-uri folosesc site-urile
            Vest Visuals, de ce și cum le poți controla.
        </p>
    ),
    sections,
};

export default content;
