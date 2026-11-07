import type { LegalContent, LegalSection } from "@/components/legal";
import { CookieSettingsButton, LegalLink, LegalTable } from "@/components/legal";

// keep the tables in sync with the cookies the sites really set
const head = ["Nume", "Scop", "Furnizor", "Expiră"];

const essential = [
    ["__Secure-better-auth.session_token", "Te păstrează autentificat în cont.", "Vest Visuals", "7 zile, prelungit cât timp folosești site-ul; la închiderea browserului, dacă nu ai ales „Ține-mă minte”"],
    ["__Secure-better-auth.dont_remember", "Reține că ai ales să nu rămâi autentificat.", "Vest Visuals", "La închiderea browserului"],
    ["__Secure-better-auth.two_factor", "Leagă codul trimis pe email de autentificarea ta, când verificarea în doi pași este activă.", "Vest Visuals", "10 minute"],
    ["__Secure-better-auth.trust_device", "Reține un dispozitiv de încredere, ca să nu ți se ceară un cod la fiecare autentificare.", "Vest Visuals", "30 de zile"],
    ["cookie_consent", "Reține alegerea ta privind cookie-urile, pe toate site-urile Vest Visuals.", "Vest Visuals", "180 de zile"],
    ["PARAGLIDE_LOCALE", "Reține limba aleasă, pe toate site-urile Vest Visuals.", "Vest Visuals", "400 de zile"],
    ["theme", "Reține tema aleasă (luminoasă sau întunecată), pe toate site-urile Vest Visuals.", "Vest Visuals", "1 an"],
    ["sidebar_state", "Reține dacă meniul din contul tău este deschis sau închis.", "Vest Visuals", "7 zile"],
    ["__cf_bm", "Deosebește oamenii de roboți, ca să protejeze site-urile și formularele de abuzuri.", "Cloudflare", "30 de minute"],
    ["cf_clearance", "Reține că ai trecut de o verificare de securitate, ca să nu ți se ceară din nou.", "Cloudflare", "Până la 1 zi"],
];

const analytics = [
    ["_ga", "Deosebește vizitatorii, ca să numărăm vizitele și să vedem cum sunt folosite site-urile.", "Google Analytics", "2 ani"],
    ["_ga_*", "Ține evidența vizitei curente, pentru aceleași statistici.", "Google Analytics", "2 ani"],
];

const sections: LegalSection[] = [
    {
        id: "what-are-cookies",
        title: "Ce sunt cookie-urile?",
        content: (
            <>
                <p>
                    Cookie-urile sunt fișiere mici de date care sunt plasate pe calculatorul sau pe dispozitivul tău mobil
                    atunci când vizitezi un site. Cookie-urile sunt folosite pe scară largă de proprietarii site-urilor
                    pentru ca acestea să funcționeze sau să funcționeze mai eficient, precum și pentru a oferi informații
                    statistice.
                </p>
                <p>
                    Cookie-urile setate de proprietarul site-ului (în acest caz, VEST VISUALS SRL) se numesc „cookie-uri
                    proprii”. Cookie-urile setate de alte părți decât proprietarul site-ului se numesc „cookie-uri ale
                    terților”. Cookie-urile terților permit furnizarea de funcții terțe pe site sau prin intermediul
                    acestuia (de exemplu, publicitate, conținut interactiv și statistici). Terții care setează aceste
                    cookie-uri îți pot recunoaște calculatorul atât când vizitează site-ul respectiv, cât și când vizitează
                    anumite alte site-uri.
                </p>
            </>
        ),
    },
    {
        id: "why",
        title: "De ce folosim cookie-uri?",
        content: (
            <p>
                Folosim cookie-uri proprii și ale terților din mai multe motive. Unele cookie-uri sunt necesare din motive
                tehnice, pentru ca Site-ul nostru să funcționeze, și le numim cookie-uri „esențiale” sau „strict
                necesare”. Alte cookie-uri ne permit să urmărim și să înțelegem interesele utilizatorilor noștri, pentru a
                îmbunătăți experiența pe proprietățile noastre online. Terții plasează cookie-uri prin Site-ul nostru în
                scopuri de publicitate, statistică și altele. Acestea sunt descrise în detaliu mai jos.
            </p>
        ),
    },
    {
        id: "control",
        title: "Cum pot controla cookie-urile?",
        content: (
            <>
                <p>
                    Ai dreptul să decizi dacă accepți sau refuzi cookie-urile. Îți poți exercita acest drept din setările
                    de cookie-uri, care îți permit să alegi ce categorii de cookie-uri accepți sau refuzi. Cookie-urile
                    esențiale nu pot fi refuzate, deoarece sunt strict necesare pentru a-ți oferi serviciile.
                </p>
                <p>
                    Setările de cookie-uri îți sunt afișate în bannerul de la prima vizită și le poți deschide din nou
                    oricând, cu butonul de mai jos. Dacă alegi să refuzi cookie-urile, poți folosi în continuare Site-ul
                    nostru, deși accesul la unele funcții și secțiuni ar putea fi restricționat. Poți de asemenea să
                    configurezi browserul să accepte sau să refuze cookie-urile.
                </p>
                <CookieSettingsButton />
            </>
        ),
    },
    {
        id: "cookies-we-use",
        title: "Ce cookie-uri folosim?",
        content: (
            <>
                <p>
                    Tipurile de cookie-uri proprii și ale terților folosite pe Site-ul nostru și scopurile lor sunt
                    descrise în tabelele de mai jos (cookie-urile folosite pot varia în funcție de proprietățile online
                    pe care le vizitezi).
                </p>
                <h3>Cookie-uri esențiale</h3>
                <p>
                    Aceste cookie-uri sunt strict necesare pentru a-ți oferi serviciile disponibile pe Site-ul nostru și
                    pentru a folosi unele dintre funcțiile lui, cum ar fi accesul în zonele securizate. Cookie-urile
                    Cloudflare sunt setate doar atunci când Cloudflare verifică o vizită pentru abuzuri, de exemplu la
                    formularele de contact și de autentificare, pe care le protejează cu Cloudflare Turnstile.
                </p>
                <LegalTable head={head} rows={essential} />
                <h3>Cookie-uri de statistică</h3>
                <p>
                    Aceste cookie-uri colectează informații folosite în formă agregată, ca să înțelegem cum este folosit
                    Site-ul nostru. Sunt setate doar dacă alegi „Acceptă toate” și sunt șterse dacă îți schimbi alegerea
                    în „Doar esențiale”.
                </p>
                <LegalTable head={head} rows={analytics} />
                <h3>Videoclipuri</h3>
                <p>
                    Videoclipurile din portofoliu și din albume sunt redate de pe YouTube, în modul cu confidențialitate
                    îmbunătățită (youtube-nocookie.com). Când pornești un videoclip, YouTube poate seta propriile
                    cookie-uri, cum ar fi YSC și VISITOR_INFO1_LIVE, și poate stoca date în browserul tău. Pentru
                    detalii, consultă{" "}
                    <a href="https://policies.google.com/privacy?hl=ro" target="_blank" rel="noopener noreferrer">Politica de confidențialitate Google</a>.
                </p>
            </>
        ),
    },
    {
        id: "devices",
        title: "Alegerile mele se aplică pe toate dispozitivele?",
        content: (
            <>
                <p>
                    Nu. Îți salvăm alegerile privind cookie-urile în browserul în care le-ai făcut. Ele se aplică doar
                    acelui browser, pe acel dispozitiv, pe toate site-urile Vest Visuals.
                </p>
                <p>
                    Îți cerem din nou alegerile când ne vizitezi de pe alt dispozitiv sau din alt browser, când folosești o
                    fereastră privată sau incognito, deoarece browserul îți șterge alegerile când o închizi, ori când îți
                    ștergi cookie-urile sau datele de navigare.
                </p>
                <p>Îți poți schimba alegerile oricând din setările de cookie-uri.</p>
            </>
        ),
    },
    {
        id: "browser",
        title: "Cum pot controla cookie-urile din browser?",
        content: (
            <>
                <p>
                    Modul în care poți refuza cookie-urile din setările browserului diferă de la un browser la altul, așa
                    că îți recomandăm să consulți meniul de ajutor al browserului tău. Iată cum gestionezi cookie-urile în
                    cele mai folosite browsere:
                </p>
                <ul>
                    <li><a href="https://support.google.com/chrome/answer/95647?hl=ro" target="_blank" rel="noopener noreferrer">Chrome</a></li>
                    <li><a href="https://support.microsoft.com/ro-ro/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer">Internet Explorer</a></li>
                    <li><a href="https://support.mozilla.org/ro/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer">Firefox</a></li>
                    <li><a href="https://support.apple.com/ro-ro/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
                    <li><a href="https://support.microsoft.com/ro-ro/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd" target="_blank" rel="noopener noreferrer">Edge</a></li>
                    <li><a href="https://help.opera.com/en/latest/web-preferences/" target="_blank" rel="noopener noreferrer">Opera</a></li>
                </ul>
                <p>
                    În plus, majoritatea rețelelor de publicitate îți oferă o modalitate de a refuza publicitatea
                    personalizată. Pentru mai multe informații, vizitează:
                </p>
                <ul>
                    <li><a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">Digital Advertising Alliance</a></li>
                    <li><a href="https://youradchoices.ca/" target="_blank" rel="noopener noreferrer">Digital Advertising Alliance of Canada</a></li>
                    <li><a href="http://www.youronlinechoices.com/ro/" target="_blank" rel="noopener noreferrer">European Interactive Digital Advertising Alliance</a></li>
                </ul>
            </>
        ),
    },
    {
        id: "other-technologies",
        title: "Ce alte tehnologii de urmărire folosiți, cum ar fi web beacons?",
        content: (
            <p>
                Cookie-urile nu sunt singura modalitate de a recunoaște sau de a urmări vizitatorii unui site. Putem folosi
                ocazional și alte tehnologii similare, cum ar fi web beacons (numite uneori „pixeli de urmărire” sau
                „clear gifs”). Acestea sunt fișiere grafice foarte mici, care conțin un identificator unic și ne permit să
                recunoaștem când cineva a vizitat Site-ul nostru sau a deschis un email care le conține. Astfel putem, de
                exemplu, să urmărim cum navighează utilizatorii de la o pagină la alta, să livrăm sau să comunicăm cu
                cookie-uri, să înțelegem dacă ai ajuns pe site dintr-o reclamă afișată pe un site terț, să îmbunătățim
                performanța site-ului și să măsurăm succesul campaniilor de marketing prin email. În multe cazuri, aceste
                tehnologii depind de cookie-uri pentru a funcționa corect, așa că refuzarea cookie-urilor le va afecta
                funcționarea.
            </p>
        ),
    },
    {
        id: "advertising",
        title: "Afișați publicitate personalizată?",
        content: (
            <p>
                Terții pot plasa cookie-uri pe calculatorul sau pe dispozitivul tău mobil pentru a afișa publicitate prin
                Site-ul nostru. Aceste companii pot folosi informații despre vizitele tale pe acest site și pe altele
                pentru a-ți afișa reclame relevante despre produse și servicii care te-ar putea interesa. Ele pot folosi și
                tehnologii care măsoară eficiența reclamelor, prin cookie-uri sau web beacons care colectează informații
                despre vizitele tale pe acest site și pe altele. Informațiile colectate astfel nu ne permit, nici nouă,
                nici lor, să îți aflăm numele, datele de contact sau alte date care te identifică direct, decât dacă alegi
                să le furnizezi.
            </p>
        ),
    },
    {
        id: "updates",
        title: "Cât de des actualizați această Politică de cookie-uri?",
        content: (
            <>
                <p>
                    Putem actualiza periodic această Politică de cookie-uri, de exemplu pentru a reflecta schimbări ale
                    cookie-urilor pe care le folosim sau din alte motive operaționale, legale ori de reglementare. Te rugăm
                    așadar să revii periodic la această Politică de cookie-uri, ca să fii la curent cu modul în care
                    folosim cookie-urile și tehnologiile asemănătoare.
                </p>
                <p>Data din partea de sus a acestei Politici de cookie-uri arată când a fost actualizată ultima dată.</p>
            </>
        ),
    },
    {
        id: "contact",
        title: "De unde pot afla mai multe?",
        content: (
            <>
                <p>
                    Dacă ai întrebări despre modul în care folosim cookie-urile sau alte tehnologii, scrie-ne la{" "}
                    <a href="mailto:contact@vestvisuals.ro">contact@vestvisuals.ro</a> sau prin poștă, la:
                </p>
                <p>
                    <strong>VEST VISUALS SRL</strong>
                    <br />
                    Str. Matei Millo nr. 44
                    <br />
                    300696 Timișoara, jud. Timiș
                    <br />
                    România
                </p>
                <p>Telefon: <a href="tel:+40723971618">+40 723 971 618</a></p>
                <p>
                    Modul în care prelucrăm datele cu caracter personal este descris în{" "}
                    <LegalLink document="privacy">Politica de confidențialitate</LegalLink>.
                </p>
            </>
        ),
    },
];

const content: LegalContent = {
    title: "Politica de cookie-uri",
    intro: (
        <>
            <p>
                Această Politică de cookie-uri explică modul în care VEST VISUALS SRL („Compania”, „noi”, „nouă”, „al
                nostru”) folosește cookie-uri și tehnologii similare pentru a te recunoaște atunci când vizitezi site-ul
                nostru vestvisuals.ro și subdomeniile lui, cum ar fi media.vestvisuals.ro („Site-ul”). Explică ce sunt
                aceste tehnologii, de ce le folosim și ce drepturi ai pentru a controla modul în care le folosim.
            </p>
            <p>
                În unele cazuri, putem folosi cookie-uri pentru a colecta informații personale sau informații care devin
                personale dacă le combinăm cu alte informații.
            </p>
        </>
    ),
    sections,
};

export default content;
