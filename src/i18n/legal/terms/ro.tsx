import type { LegalContent, LegalSection } from "@/components/legal";
import { LegalLink } from "@/components/legal";

// TODO: draft, have it reviewed by a lawyer before going live

const sections: LegalSection[] = [
    {
        id: "cine-suntem",
        title: "Cine suntem",
        content: (
            <>
                <p>
                    Site-urile vestvisuals.ro, inclusiv subdomeniile pentru
                    fiecare domeniu de activitate, sunt administrate de{" "}
                    <strong>VEST VISUALS S.R.L.</strong>, cu sediul în Str.
                    Matei Millo 44, Timișoara, județul Timiș, România, CUI
                    54191210 (denumită în continuare „Vest Visuals” sau „noi”).
                </p>
                <p>
                    Ne poți contacta la{" "}
                    <a href="mailto:contact@vestvisuals.ro">contact@vestvisuals.ro</a>.
                </p>
            </>
        ),
    },
    {
        id: "acceptare",
        title: "Acceptarea termenilor",
        content: (
            <p>
                Folosind site-ul, ești de acord cu acești termeni și condiții.
                Dacă nu ești de acord cu ei, te rugăm să nu folosești site-ul.
                Putem actualiza termenii oricând, iar versiunea în vigoare este
                cea publicată pe această pagină, cu data ultimei actualizări.
            </p>
        ),
    },
    {
        id: "servicii",
        title: "Serviciile noastre",
        content: (
            <>
                <p>
                    Site-ul prezintă serviciile Vest Visuals, printre care foto
                    și video (nunți, evenimente, ședințe foto, imobiliare,
                    automotive, promovare afaceri) și software (aplicații web și
                    mobile, cloud, date, automatizări, consultanță și
                    mentenanță).
                </p>
                <p>
                    Prețurile afișate pe site sunt orientative și nu reprezintă
                    o ofertă fermă. Fiecare colaborare se face pe baza unei
                    oferte personalizate și a unui contract încheiat separat,
                    care are prioritate față de acești termeni.
                </p>
            </>
        ),
    },
    {
        id: "cont",
        title: "Contul tău",
        content: (
            <>
                <p>
                    Pentru unele funcții, cum ar fi accesul la albumele foto,
                    îți poți crea un cont cu adresă de email și parolă sau prin
                    Google, Apple, Facebook ori GitHub.
                </p>
                <ul>
                    <li>Ești responsabil pentru păstrarea în siguranță a datelor de autentificare.</li>
                    <li>Informațiile din cont trebuie să fie corecte și actualizate.</li>
                    <li>Ne poți cere oricând ștergerea contului.</li>
                </ul>
                <p>
                    Putem suspenda sau închide un cont folosit în mod abuziv
                    sau contrar acestor termeni.
                </p>
            </>
        ),
    },
    {
        id: "proprietate-intelectuala",
        title: "Proprietate intelectuală",
        content: (
            <>
                <p>
                    Conținutul site-ului, inclusiv fotografiile, videoclipurile,
                    textele, logo-ul și designul, aparține Vest Visuals sau
                    este folosit cu acordul autorilor. Nu poate fi copiat,
                    distribuit sau folosit în scop comercial fără acordul
                    nostru scris.
                </p>
                <p>
                    Drepturile asupra fotografiilor, videoclipurilor și
                    aplicațiilor realizate pentru clienți sunt stabilite în
                    contractul fiecărui proiect.
                </p>
            </>
        ),
    },
    {
        id: "utilizare",
        title: "Utilizarea site-ului",
        content: (
            <>
                <p>Folosind site-ul, te angajezi să nu:</p>
                <ul>
                    <li>încerci să accesezi fără drept sisteme, conturi sau date;</li>
                    <li>trimiți conținut ilegal, ofensator sau mesaje nesolicitate prin formulare;</li>
                    <li>folosești programe automate care afectează funcționarea site-ului.</li>
                </ul>
            </>
        ),
    },
    {
        id: "raspundere",
        title: "Limitarea răspunderii",
        content: (
            <p>
                Ne străduim ca informațiile de pe site să fie corecte și la zi,
                dar nu garantăm că site-ul va fi mereu disponibil sau lipsit de
                erori. În limitele permise de lege, nu răspundem pentru
                pagubele indirecte rezultate din folosirea site-ului. Site-ul
                poate conține linkuri către alte site-uri, pentru al căror
                conținut nu răspundem.
            </p>
        ),
    },
    {
        id: "date-personale",
        title: "Date personale și cookie-uri",
        content: (
            <p>
                Modul în care prelucrăm datele personale este descris în{" "}
                <LegalLink document="privacy">Politica de confidențialitate</LegalLink>,
                iar cookie-urile pe care le folosim în{" "}
                <LegalLink document="cookies">Politica de cookie-uri</LegalLink>.
            </p>
        ),
    },
    {
        id: "litigii",
        title: "Legea aplicabilă și litigii",
        content: (
            <>
                <p>
                    Acești termeni sunt guvernați de legea română. Orice
                    neînțelegere încercăm să o rezolvăm mai întâi pe cale
                    amiabilă. Dacă nu reușim, litigiile se soluționează de
                    instanțele competente din România.
                </p>
                <p>
                    Dacă ești consumator, poți apela și la Autoritatea
                    Națională pentru Protecția Consumatorilor (
                    <a href="https://anpc.ro" target="_blank" rel="noopener noreferrer">anpc.ro</a>
                    ), la procedura de soluționare alternativă a litigiilor (
                    <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener noreferrer">SAL</a>
                    ) sau la platforma europeană de soluționare a litigiilor (
                    <a href="https://consumer-redress.ec.europa.eu/index_ro" target="_blank" rel="noopener noreferrer">SOL</a>
                    ).
                </p>
            </>
        ),
    },
];

const content: LegalContent = {
    title: "Termeni și condiții",
    intro: (
        <p>
            Acești termeni stabilesc regulile de folosire a site-urilor
            Vest Visuals. Te rugăm să-i citești înainte să folosești
            site-ul sau să ne contactezi.
        </p>
    ),
    sections,
};

export default content;
