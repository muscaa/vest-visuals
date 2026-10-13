import { LegalLink } from ".";
import type { LegalDocument, LegalSection } from ".";

// TODO: draft, have it reviewed by a lawyer before going live

const sections: LegalSection[] = [
    {
        id: "operator",
        title: "Cine prelucrează datele",
        content: (
            <p>
                Operatorul datelor tale personale este{" "}
                <strong>VEST VISUALS S.R.L.</strong>, cu sediul în Str. Matei
                Millo 44, Timișoara, județul Timiș, România, CUI 54191210. Pentru
                orice întrebare despre datele tale ne poți scrie la{" "}
                <a href="mailto:contact@vestvisuals.ro">contact@vestvisuals.ro</a>.
            </p>
        ),
    },
    {
        id: "date",
        title: "Ce date colectăm",
        content: (
            <ul>
                <li>
                    <strong>Când ne contactezi:</strong> numele, adresa de email,
                    numărul de telefon, dacă ni-l dai, și conținutul mesajului.
                </li>
                <li>
                    <strong>Când îți creezi un cont:</strong> numele, adresa de
                    email și parola, păstrată criptat. Dacă te autentifici prin
                    Google, Apple, Facebook sau GitHub, primim de la acestea
                    numele, adresa de email și, după caz, poza de profil.
                </li>
                <li>
                    <strong>Când lucrăm împreună:</strong> datele necesare
                    pentru ofertă, contract și facturare, precum și fotografiile
                    și videoclipurile realizate la evenimentul tău.
                </li>
                <li>
                    <strong>Automat:</strong> date tehnice precum adresa IP,
                    tipul de browser și paginile vizitate, necesare pentru
                    funcționarea și securitatea site-ului.
                </li>
            </ul>
        ),
    },
    {
        id: "scop",
        title: "De ce folosim datele și pe ce bază",
        content: (
            <ul>
                <li>
                    <strong>Ca să-ți răspundem și să-ți facem o ofertă</strong>,
                    pe baza demersurilor făcute la cererea ta înainte de
                    încheierea unui contract.
                </li>
                <li>
                    <strong>Ca să îndeplinim contractul</strong>: să realizăm
                    serviciile, să-ți livrăm fotografiile, videoclipurile sau
                    aplicația și să-ți administrăm contul.
                </li>
                <li>
                    <strong>Ca să respectăm legea</strong>, de exemplu obligațiile
                    contabile și fiscale.
                </li>
                <li>
                    <strong>Ca să protejăm site-ul</strong> împotriva spamului și
                    abuzurilor, pe baza interesului nostru legitim.
                </li>
                <li>
                    <strong>Ca să folosim fotografii în portofoliu</strong>, doar
                    cu acordul tău, pe care îl poți retrage oricând.
                </li>
            </ul>
        ),
    },
    {
        id: "destinatari",
        title: "Cui transmitem datele",
        content: (
            <>
                <p>
                    Nu vindem datele tale. Le transmitem doar furnizorilor care
                    ne ajută să funcționăm, în măsura în care este necesar:
                </p>
                <ul>
                    <li>furnizori de găzduire și stocare, pentru site, conturi, fotografii și videoclipuri;</li>
                    <li>Google, pentru protecția formularelor prin reCAPTCHA;</li>
                    <li>Google, Apple, Facebook și GitHub, doar dacă alegi să te autentifici prin ei;</li>
                    <li>servicii de email, pentru mesajele pe care ți le trimitem;</li>
                    <li>contabilitate și autorități, când legea o cere.</li>
                </ul>
                <p>
                    Unii dintre acești furnizori pot prelucra date în afara
                    Uniunii Europene. În aceste cazuri ne asigurăm că există
                    garanții adecvate, cum ar fi clauzele contractuale standard
                    aprobate de Comisia Europeană.
                </p>
            </>
        ),
    },
    {
        id: "durata",
        title: "Cât timp păstrăm datele",
        content: (
            <ul>
                <li>mesajele de contact, cel mult 2 ani de la ultimul schimb de mesaje, dacă nu devii client;</li>
                <li>datele contului, cât timp contul este activ;</li>
                <li>fotografiile și videoclipurile din albumele digitale, pe durata stabilită în pachetul ales;</li>
                <li>documentele contabile, cât cere legea, de regulă 10 ani.</li>
            </ul>
        ),
    },
    {
        id: "drepturi",
        title: "Drepturile tale",
        content: (
            <>
                <p>Conform GDPR (Regulamentul UE 2016/679), ai dreptul:</p>
                <ul>
                    <li>să afli ce date avem despre tine și să primești o copie;</li>
                    <li>să ceri corectarea sau ștergerea lor;</li>
                    <li>să restricționezi sau să te opui prelucrării;</li>
                    <li>să primești datele într-un format ușor de transferat;</li>
                    <li>să-ți retragi oricând acordul dat.</li>
                </ul>
                <p>
                    Pentru oricare dintre acestea scrie-ne la{" "}
                    <a href="mailto:contact@vestvisuals.ro">contact@vestvisuals.ro</a>.
                    Îți răspundem în cel mult o lună. Dacă nu ești mulțumit, poți
                    depune o plângere la Autoritatea Națională de Supraveghere a
                    Prelucrării Datelor cu Caracter Personal (
                    <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer">dataprotection.ro</a>
                    ).
                </p>
            </>
        ),
    },
    {
        id: "securitate",
        title: "Securitatea datelor",
        content: (
            <p>
                Folosim conexiuni criptate (HTTPS), parole păstrate criptat,
                acces restricționat și backup-uri, ca datele tale să fie în
                siguranță. Niciun sistem nu e complet sigur, dar te anunțăm
                dacă apare un incident care îți afectează datele.
            </p>
        ),
    },
    {
        id: "cookies",
        title: "Cookie-uri",
        content: (
            <p>
                Detalii despre cookie-urile pe care le folosim găsești în{" "}
                <LegalLink document="cookies">Politica de cookie-uri</LegalLink>.
            </p>
        ),
    },
];

export const privacy: LegalDocument = {
    title: "Politica de confidențialitate",
    updated: "13 octombrie 2026",
    intro: (
        <p>
            Îți respectăm datele personale. Pe această pagină explicăm
            ce date colectăm când folosești site-urile Vest Visuals sau
            lucrezi cu noi, de ce le folosim, cât timp le păstrăm și ce
            drepturi ai.
        </p>
    ),
    sections,
};
