import type { LegalContent, LegalSection } from "@/components/legal";
import { ContactLink, LegalLink } from "@/components/legal";

function InShort(props: { children: React.ReactNode }) {
    return <p><strong>Pe scurt:</strong> <em>{props.children}</em></p>;
}

const sections: LegalSection[] = [
    {
        id: "summary",
        title: "Rezumatul punctelor principale",
        content: (
            <>
                <p>
                    Acest rezumat prezintă punctele principale ale Politicii noastre de confidențialitate. Poți afla mai
                    multe despre fiecare subiect urmând linkul de după fiecare punct sau din cuprins.
                </p>
                <p>
                    <strong>Ce date cu caracter personal prelucrăm?</strong> Când vizitezi, folosești sau navighezi prin
                    Serviciile noastre, putem prelucra date cu caracter personal, în funcție de modul în care interacționezi
                    cu noi și cu Serviciile, de alegerile pe care le faci și de produsele și funcțiile pe care le folosești.
                    Află mai multe despre <a href="#collected">datele personale pe care ni le furnizezi</a>.
                </p>
                <p>
                    <strong>Prelucrăm date cu caracter personal sensibile?</strong> Unele informații pot fi considerate
                    „speciale” sau „sensibile” în anumite jurisdicții, de exemplu originea rasială sau etnică, orientarea
                    sexuală și convingerile religioase. Nu prelucrăm date cu caracter personal sensibile.
                </p>
                <p>
                    <strong>Colectăm informații de la terți?</strong> Nu colectăm informații de la terți.
                </p>
                <p>
                    <strong>Cum îți prelucrăm datele?</strong> Îți prelucrăm datele pentru a furniza, îmbunătăți și
                    administra Serviciile noastre, pentru a comunica cu tine, pentru securitate și prevenirea fraudelor și
                    pentru a respecta legea. Putem prelucra datele tale și în alte scopuri, cu consimțământul tău. Îți
                    prelucrăm datele doar atunci când avem un temei juridic valabil. Află mai multe despre{" "}
                    <a href="#processing">cum îți prelucrăm datele</a>.
                </p>
                <p>
                    <strong>În ce situații și cu ce categorii de terți împărtășim datele cu caracter personal?</strong>{" "}
                    Putem împărtăși informații în anumite situații și cu anumite categorii de terți. Află mai multe despre{" "}
                    <a href="#sharing">când și cu cine îți împărtășim datele</a>.
                </p>
                <p>
                    <strong>Cum îți protejăm datele?</strong> Avem procese și proceduri organizatorice și tehnice adecvate
                    pentru a-ți proteja datele cu caracter personal. Totuși, nicio transmisie electronică prin internet și
                    nicio tehnologie de stocare a informațiilor nu poate fi garantată ca fiind 100% sigură, așa că nu putem
                    promite sau garanta că hackerii, infractorii cibernetici sau alți terți neautorizați nu vor reuși să ne
                    depășească măsurile de securitate și să îți colecteze, acceseze, fure sau modifice informațiile în mod
                    necorespunzător. Află mai multe despre <a href="#security">cum îți protejăm datele</a>.
                </p>
                <p>
                    <strong>Ce drepturi ai?</strong> În funcție de locul în care te afli, legislația aplicabilă privind
                    protecția datelor îți poate conferi anumite drepturi asupra datelor tale cu caracter personal. Află mai
                    multe despre <a href="#rights">drepturile tale</a>.
                </p>
                <p>
                    <strong>Cum îți exerciți drepturile?</strong> Cel mai simplu este să folosești{" "}
                    <ContactLink>pagina de contact</ContactLink> sau să ne contactezi direct. Vom analiza și vom da curs
                    oricărei cereri în conformitate cu legislația aplicabilă privind protecția datelor.
                </p>
            </>
        ),
    },
    {
        id: "collected",
        title: "Ce informații colectăm?",
        content: (
            <>
                <h3>Date cu caracter personal pe care ni le furnizezi</h3>
                <InShort>Colectăm datele cu caracter personal pe care ni le furnizezi.</InShort>
                <p>
                    Colectăm datele cu caracter personal pe care ni le furnizezi voluntar atunci când te înregistrezi în
                    Servicii, când îți arăți interesul de a afla informații despre noi sau despre produsele și Serviciile
                    noastre, când participi la activități în cadrul Serviciilor sau, în alt mod, când ne contactezi.
                </p>
                <p>
                    <strong>Date cu caracter personal furnizate de tine.</strong> Datele pe care le colectăm depind de
                    contextul interacțiunilor tale cu noi și cu Serviciile, de alegerile pe care le faci și de produsele și
                    funcțiile pe care le folosești. Datele cu caracter personal pe care le colectăm pot include:
                </p>
                <ul>
                    <li>nume</li>
                    <li>numere de telefon</li>
                    <li>adrese de email</li>
                    <li>adrese poștale</li>
                    <li>nume de utilizator</li>
                    <li>parole</li>
                    <li>preferințe de contact</li>
                    <li>date de contact sau de autentificare</li>
                    <li>adrese de facturare</li>
                </ul>
                <p><strong>Date sensibile.</strong> Nu prelucrăm date sensibile.</p>
                <p>
                    <strong>Date de autentificare prin rețele sociale.</strong> Îți putem oferi posibilitatea de a te
                    înregistra folosind contul tău existent de pe o rețea socială, cum ar fi Facebook, X sau alta. Dacă
                    alegi să te înregistrezi astfel, vom colecta anumite informații din profilul tău de la furnizorul
                    rețelei sociale, așa cum este descris în secțiunea „
                    <a href="#social-logins">Cum gestionăm autentificarea prin rețele sociale?</a>” de mai jos.
                </p>
                <p>
                    Toate datele cu caracter personal pe care ni le furnizezi trebuie să fie adevărate, complete și exacte,
                    iar tu trebuie să ne anunți orice modificare a acestora.
                </p>
                <h3>Informații colectate automat</h3>
                <InShort>
                    Unele informații, cum ar fi adresa IP (Internet Protocol) și/sau caracteristicile browserului și ale
                    dispozitivului, sunt colectate automat atunci când vizitezi Serviciile noastre.
                </InShort>
                <p>
                    Colectăm automat anumite informații atunci când vizitezi, folosești sau navighezi prin Servicii. Aceste
                    informații nu îți dezvăluie identitatea (de exemplu numele sau datele de contact), dar pot include
                    informații despre dispozitiv și utilizare, cum ar fi adresa IP, caracteristicile browserului și ale
                    dispozitivului, sistemul de operare, preferințele de limbă, adresele URL de proveniență, numele
                    dispozitivului, țara, locația, informații despre cum și când folosești Serviciile noastre și alte
                    informații tehnice. Aceste informații sunt necesare în principal pentru securitatea și funcționarea
                    Serviciilor noastre, precum și pentru analizele și rapoartele noastre interne.
                </p>
                <p>
                    Ca multe alte companii, colectăm informații și prin cookie-uri și tehnologii similare. Poți afla mai
                    multe în <LegalLink document="cookies">Politica de cookie-uri</LegalLink>.
                </p>
                <p>Informațiile pe care le colectăm includ:</p>
                <ul>
                    <li>
                        <strong>Date de jurnal și de utilizare.</strong> Datele de jurnal și de utilizare sunt informații de
                        diagnosticare, de utilizare și de performanță legate de servicii, pe care serverele noastre le
                        colectează automat atunci când accesezi sau folosești Serviciile și pe care le înregistrăm în fișiere
                        jurnal. În funcție de modul în care interacționezi cu noi, aceste date pot include adresa IP,
                        informații despre dispozitiv, tipul și setările browserului și informații despre activitatea ta în
                        Servicii (cum ar fi data și ora utilizării, paginile și fișierele vizualizate, căutările și alte
                        acțiuni, de exemplu funcțiile pe care le folosești), precum și informații despre evenimentele
                        dispozitivului (cum ar fi activitatea sistemului, rapoartele de erori, numite uneori „crash dumps”,
                        și setările hardware).
                    </li>
                    <li>
                        <strong>Date despre dispozitiv.</strong> Colectăm date despre dispozitiv, cum ar fi informații despre
                        calculatorul, telefonul, tableta sau alt dispozitiv pe care îl folosești pentru a accesa Serviciile.
                        În funcție de dispozitiv, aceste date pot include adresa IP (sau serverul proxy), numerele de
                        identificare ale dispozitivului și ale aplicației, locația, tipul browserului, modelul hardware,
                        furnizorul de internet și/sau operatorul de telefonie mobilă, sistemul de operare și informații
                        despre configurația sistemului.
                    </li>
                    <li>
                        <strong>Date de localizare.</strong> Colectăm date de localizare, cum ar fi informații despre locația
                        dispozitivului tău, care pot fi precise sau aproximative. Cantitatea de informații colectate depinde
                        de tipul și setările dispozitivului cu care accesezi Serviciile. De exemplu, putem folosi GPS și alte
                        tehnologii pentru a colecta date de geolocalizare care ne arată locația ta curentă (pe baza adresei
                        IP). Poți refuza colectarea acestor informații fie refuzând accesul la ele, fie dezactivând setarea de
                        localizare de pe dispozitiv. Totuși, în acest caz, este posibil să nu poți folosi anumite funcții
                        ale Serviciilor.
                    </li>
                </ul>
                <h3>Google API</h3>
                <p>
                    Utilizarea informațiilor primite prin API-urile Google respectă{" "}
                    <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer">Politica privind datele utilizatorilor pentru serviciile API Google</a>,
                    inclusiv{" "}
                    <a href="https://developers.google.com/terms/api-services-user-data-policy#limited-use" target="_blank" rel="noopener noreferrer">cerințele de utilizare limitată</a>.
                </p>
            </>
        ),
    },
    {
        id: "processing",
        title: "Cum îți prelucrăm datele?",
        content: (
            <>
                <InShort>
                    Îți prelucrăm datele pentru a furniza, îmbunătăți și administra Serviciile noastre, pentru a comunica
                    cu tine, pentru securitate și prevenirea fraudelor și pentru a respecta legea. Putem prelucra datele
                    tale și în alte scopuri, cu consimțământul tău.
                </InShort>
                <p>
                    Îți prelucrăm datele cu caracter personal din mai multe motive, în funcție de modul în care
                    interacționezi cu Serviciile noastre, inclusiv:
                </p>
                <ul>
                    <li><strong>Pentru crearea și autentificarea conturilor și administrarea conturilor de utilizator.</strong> Îți putem prelucra datele pentru a-ți crea contul, pentru a te autentifica și pentru a-ți menține contul funcțional.</li>
                    <li><strong>Pentru a furniza serviciile solicitate.</strong> Îți putem prelucra datele pentru a-ți furniza serviciul pe care l-ai solicitat.</li>
                    <li><strong>Pentru a răspunde întrebărilor și a oferi asistență.</strong> Îți putem prelucra datele pentru a-ți răspunde la întrebări și pentru a rezolva eventualele probleme legate de serviciul solicitat.</li>
                    <li><strong>Pentru a-ți trimite informații administrative.</strong> Îți putem prelucra datele pentru a-ți trimite detalii despre produsele și serviciile noastre, despre modificări ale termenilor și politicilor noastre și alte informații similare.</li>
                    <li><strong>Pentru a onora și gestiona comenzile.</strong> Îți putem prelucra datele pentru a onora și gestiona comenzile, plățile, returnările și schimburile făcute prin Servicii.</li>
                    <li><strong>Pentru a permite comunicarea între utilizatori.</strong> Îți putem prelucra datele dacă alegi să folosești funcții care permit comunicarea cu alt utilizator.</li>
                    <li><strong>Pentru a cere feedback.</strong> Îți putem prelucra datele atunci când este necesar, pentru a-ți cere feedback și pentru a te contacta în legătură cu modul în care folosești Serviciile noastre.</li>
                    <li><strong>Pentru a-ți trimite comunicări de marketing și promoționale.</strong> Putem prelucra datele pe care ni le trimiți în scopuri de marketing, dacă acest lucru este conform preferințelor tale de marketing. Te poți dezabona oricând de la emailurile noastre de marketing. Pentru mai multe informații, vezi „<a href="#rights">Ce drepturi ai privind datele tale?</a>” de mai jos.</li>
                    <li><strong>Pentru a-ți afișa publicitate personalizată.</strong> Îți putem prelucra datele pentru a crea și afișa conținut și publicitate personalizate în funcție de interesele tale, de locație și altele. Pentru mai multe informații, vezi <LegalLink document="cookies">Politica de cookie-uri</LegalLink>.</li>
                    <li><strong>Pentru a ne proteja Serviciile.</strong> Îți putem prelucra datele ca parte a eforturilor noastre de a menține Serviciile sigure, inclusiv pentru monitorizarea și prevenirea fraudelor.</li>
                    <li><strong>Pentru a identifica tendințe de utilizare.</strong> Putem prelucra informații despre cum folosești Serviciile noastre, pentru a înțelege mai bine cum sunt folosite și a le putea îmbunătăți.</li>
                    <li><strong>Pentru a stabili eficiența campaniilor de marketing și promoționale.</strong> Îți putem prelucra datele pentru a înțelege mai bine ce campanii de marketing și promoționale sunt cele mai relevante pentru tine.</li>
                    <li><strong>Pentru a salva sau proteja interesele vitale ale unei persoane.</strong> Îți putem prelucra datele atunci când este necesar pentru a salva sau proteja interesele vitale ale unei persoane, de exemplu pentru a preveni un prejudiciu.</li>
                </ul>
            </>
        ),
    },
    {
        id: "legal-bases",
        title: "Pe ce temeiuri juridice îți prelucrăm datele?",
        content: (
            <>
                <InShort>
                    Îți prelucrăm datele cu caracter personal doar atunci când considerăm că este necesar și avem un temei
                    juridic valabil conform legii aplicabile, cum ar fi consimțământul tău, respectarea legii, furnizarea
                    de servicii pentru încheierea sau executarea unui contract, protejarea drepturilor tale sau interesele
                    noastre legitime.
                </InShort>
                <p>
                    Regulamentul general privind protecția datelor (GDPR) și GDPR-ul Regatului Unit ne obligă să explicăm
                    temeiurile juridice pe care ne bazăm pentru a-ți prelucra datele cu caracter personal. Prin urmare,
                    ne putem baza pe următoarele temeiuri juridice:
                </p>
                <ul>
                    <li><strong>Consimțământul.</strong> Îți putem prelucra datele dacă ne-ai dat permisiunea (adică consimțământul) de a le folosi într-un anumit scop. Îți poți retrage consimțământul oricând. Află mai multe despre <a href="#withdraw-consent">retragerea consimțământului</a>.</li>
                    <li><strong>Executarea unui contract.</strong> Îți putem prelucra datele cu caracter personal atunci când considerăm că este necesar pentru a ne îndeplini obligațiile contractuale față de tine, inclusiv pentru a-ți furniza Serviciile, sau la cererea ta, înainte de încheierea unui contract.</li>
                    <li>
                        <strong>Interesul legitim.</strong> Îți putem prelucra datele atunci când considerăm că este în mod rezonabil necesar pentru interesele noastre legitime de afaceri, iar aceste interese nu prevalează asupra intereselor și drepturilor și libertăților tale fundamentale. De exemplu, îți putem prelucra datele cu caracter personal în unele dintre scopurile descrise, pentru a:
                        <ul>
                            <li>trimite utilizatorilor informații despre oferte speciale și reduceri la produsele și serviciile noastre</li>
                            <li>crea și afișa conținut publicitar personalizat și relevant pentru utilizatorii noștri</li>
                            <li>analiza cum sunt folosite Serviciile noastre, pentru a le îmbunătăți și a atrage și păstra utilizatorii</li>
                            <li>susține activitățile noastre de marketing</li>
                            <li>diagnostica probleme și/sau preveni activități frauduloase</li>
                            <li>înțelege cum folosesc utilizatorii produsele și serviciile noastre, pentru a le îmbunătăți experiența</li>
                        </ul>
                    </li>
                    <li><strong>Obligațiile legale.</strong> Îți putem prelucra datele atunci când considerăm că este necesar pentru a ne respecta obligațiile legale, de exemplu pentru a coopera cu un organ de aplicare a legii sau cu o autoritate de reglementare, pentru a ne exercita sau apăra drepturile sau pentru a prezenta informațiile tale ca probă într-un litigiu în care suntem implicați.</li>
                    <li><strong>Interesele vitale.</strong> Îți putem prelucra datele atunci când considerăm că este necesar pentru a proteja interesele tale vitale sau ale unui terț, de exemplu în situații care implică potențiale amenințări la adresa siguranței unei persoane.</li>
                </ul>
            </>
        ),
    },
    {
        id: "sharing",
        title: "Când și cu cine îți împărtășim datele cu caracter personal?",
        content: (
            <>
                <InShort>
                    Putem împărtăși informații în situațiile descrise în această secțiune și/sau cu următoarele categorii
                    de terți.
                </InShort>
                <p>
                    <strong>Furnizori, consultanți și alți prestatori de servicii terți.</strong> Putem împărtăși datele
                    tale cu furnizori, prestatori de servicii, contractori sau agenți terți („terți”) care prestează
                    servicii pentru noi sau în numele nostru și au nevoie de acces la aceste informații pentru a-și face
                    treaba. Avem contracte încheiate cu acești terți, menite să îți protejeze datele cu caracter personal.
                    Asta înseamnă că nu pot face nimic cu datele tale decât dacă le-am cerut noi. De asemenea, nu vor
                    împărtăși datele tale cu nicio altă organizație în afară de noi. Se angajează să protejeze datele pe
                    care le dețin în numele nostru și să le păstreze doar pe perioada stabilită de noi.
                </p>
                <p>Categoriile de terți cu care putem împărtăși date cu caracter personal sunt următoarele:</p>
                <ul>
                    <li>Servicii de cloud computing</li>
                    <li>Servicii de analiză a datelor</li>
                    <li>Instituții publice</li>
                    <li>Rețele sociale</li>
                    <li>Servicii de înregistrare și autentificare a conturilor</li>
                    <li>Instrumente de monitorizare a performanței</li>
                    <li>Instrumente de comunicare și colaborare</li>
                    <li>Furnizori de servicii de stocare a datelor</li>
                    <li>Platforme de inteligență artificială</li>
                    <li>Instrumente de vânzări și marketing</li>
                    <li>Rețele de publicitate</li>
                    <li>Platforme de retargeting</li>
                </ul>
                <p>Este posibil să trebuiască să îți împărtășim datele și în următoarele situații:</p>
                <ul>
                    <li><strong>Transferuri de afaceri.</strong> Putem împărtăși sau transfera datele tale în legătură cu sau în timpul negocierilor pentru o fuziune, vânzarea de active ale companiei, o finanțare sau achiziția întregii afaceri sau a unei părți din ea de către o altă companie.</li>
                    <li><strong>Când folosim API-urile Google Maps Platform.</strong> Putem împărtăși datele tale cu anumite API-uri Google Maps Platform (de exemplu Google Maps API sau Places API). Google Maps folosește GPS, Wi-Fi și antenele de telefonie mobilă pentru a-ți estima locația. GPS-ul are o precizie de aproximativ 20 de metri, iar Wi-Fi-ul și antenele de telefonie ajută la creșterea preciziei când semnalul GPS este slab, de exemplu în interior. Aceste date ajută Google Maps să ofere indicații, dar nu sunt întotdeauna perfect precise. Îți obținem locația și o stocăm pe dispozitivul tău („cache”). Îți poți retrage consimțământul oricând, contactându-ne la datele de contact de la sfârșitul acestui document.</li>
                    <li><strong>Afiliați.</strong> Putem împărtăși datele tale cu afiliații noștri, caz în care le vom cere acestora să respecte această Politică de confidențialitate. Afiliații includ compania noastră-mamă și orice filiale, parteneri în asocieri sau alte companii pe care le controlăm sau care se află sub control comun cu noi.</li>
                    <li><strong>Parteneri de afaceri.</strong> Putem împărtăși datele tale cu partenerii noștri de afaceri, pentru a-ți oferi anumite produse, servicii sau promoții.</li>
                    <li><strong>Alți utilizatori.</strong> Când împărtășești date cu caracter personal (de exemplu, publicând comentarii, contribuții sau alt conținut în Servicii) sau interacționezi în alt mod cu zonele publice ale Serviciilor, aceste date pot fi văzute de toți utilizatorii și pot fi făcute publice în afara Serviciilor pe termen nelimitat. Dacă interacționezi cu alți utilizatori ai Serviciilor noastre și te înregistrezi printr-o rețea socială (cum ar fi Facebook), contactele tale din rețeaua socială îți vor vedea numele, fotografia de profil și descrieri ale activității tale. La fel, alți utilizatori vor putea vedea descrieri ale activității tale, vor putea comunica cu tine în cadrul Serviciilor și îți vor putea vedea profilul.</li>
                </ul>
            </>
        ),
    },
    {
        id: "cookies",
        title: "Folosim cookie-uri și alte tehnologii de urmărire?",
        content: (
            <>
                <InShort>Putem folosi cookie-uri și alte tehnologii de urmărire pentru a colecta și stoca informațiile tale.</InShort>
                <p>
                    Putem folosi cookie-uri și tehnologii de urmărire similare (cum ar fi web beacons și pixeli) pentru a
                    colecta informații atunci când interacționezi cu Serviciile noastre. Unele tehnologii de urmărire online
                    ne ajută să menținem securitatea Serviciilor și a contului tău, să prevenim blocările, să reparăm
                    erorile, să îți salvăm preferințele și să asigurăm funcțiile de bază ale site-ului.
                </p>
                <p>
                    De asemenea, permitem terților și prestatorilor de servicii să folosească tehnologii de urmărire online
                    în Serviciile noastre, în scopuri de statistică și publicitate, inclusiv pentru a gestiona și afișa
                    reclame sau pentru a le adapta intereselor tale. Terții și prestatorii de servicii își folosesc
                    tehnologia pentru a afișa reclame la produse și servicii adaptate intereselor tale, care pot apărea fie
                    în Serviciile noastre, fie pe alte site-uri.
                </p>
                <p>
                    Informații detaliate despre cum folosim aceste tehnologii și cum poți refuza anumite cookie-uri găsești
                    în <LegalLink document="cookies">Politica de cookie-uri</LegalLink>.
                </p>
                <h3>Google Analytics</h3>
                <p>
                    Putem împărtăși informațiile tale cu Google Analytics, pentru a urmări și analiza utilizarea
                    Serviciilor. Pentru a refuza urmărirea prin Google Analytics în Servicii, accesează{" "}
                    <a href="https://tools.google.com/dlpage/gaoptout?hl=ro" target="_blank" rel="noopener noreferrer">https://tools.google.com/dlpage/gaoptout</a>.
                    Pentru mai multe informații despre practicile Google privind confidențialitatea, accesează pagina{" "}
                    <a href="https://policies.google.com/privacy?hl=ro" target="_blank" rel="noopener noreferrer">Confidențialitate și termeni Google</a>.
                </p>
            </>
        ),
    },
    {
        id: "social-logins",
        title: "Cum gestionăm autentificarea prin rețele sociale?",
        content: (
            <>
                <InShort>
                    Dacă alegi să te înregistrezi sau să te autentifici în Serviciile noastre cu un cont de rețea socială,
                    putem avea acces la anumite informații despre tine.
                </InShort>
                <p>
                    Serviciile noastre îți permit să te înregistrezi și să te autentifici folosind contul tău de pe o
                    rețea socială (cum ar fi Facebook sau X). Dacă alegi să faci acest lucru, vom primi anumite informații
                    din profilul tău de la furnizorul rețelei sociale. Informațiile primite pot varia în funcție de
                    furnizor, dar includ adesea numele, adresa de email, lista de prieteni și fotografia de profil, precum
                    și alte informații pe care alegi să le faci publice pe acea rețea socială.
                </p>
                <p>
                    Vom folosi informațiile primite doar în scopurile descrise în această Politică de confidențialitate
                    sau care îți sunt explicate în cadrul Serviciilor respective. Reține că nu controlăm și nu suntem
                    responsabili pentru alte utilizări ale datelor tale de către furnizorul rețelei sociale. Îți
                    recomandăm să citești politica lor de confidențialitate, ca să înțelegi cum îți colectează, folosesc și
                    împărtășesc datele și cum îți poți seta preferințele de confidențialitate pe site-urile și în
                    aplicațiile lor.
                </p>
            </>
        ),
    },
    {
        id: "transfers",
        title: "Îți sunt transferate datele în alte țări?",
        content: (
            <>
                <InShort>Putem transfera, stoca și prelucra datele tale în alte țări decât a ta.</InShort>
                <p>
                    Serverele noastre se află în Germania și în România. Indiferent de locul în care te afli, reține că
                    datele tale pot fi transferate, stocate și prelucrate de noi în infrastructura noastră și în cea a
                    terților cu care putem împărtăși datele tale cu caracter personal (vezi „
                    <a href="#sharing">Când și cu cine îți împărtășim datele cu caracter personal?</a>” de mai sus),
                    inclusiv în Statele Unite, în România și în alte țări.
                </p>
                <p>
                    Dacă locuiești în Spațiul Economic European (SEE), în Regatul Unit sau în Elveția, aceste țări s-ar
                    putea să nu aibă legi privind protecția datelor la fel de cuprinzătoare ca cele din țara ta. Totuși,
                    vom lua toate măsurile necesare pentru a-ți proteja datele cu caracter personal în conformitate cu
                    această Politică de confidențialitate și cu legislația aplicabilă.
                </p>
                <p><strong>Clauzele contractuale standard ale Comisiei Europene:</strong></p>
                <p>
                    Am luat măsuri pentru a-ți proteja datele cu caracter personal, inclusiv prin folosirea clauzelor
                    contractuale standard ale Comisiei Europene pentru transferurile de date între companiile grupului
                    nostru și între noi și furnizorii noștri terți. Aceste clauze obligă toți destinatarii să protejeze
                    datele cu caracter personal provenite din SEE sau din Regatul Unit pe care le prelucrează, în
                    conformitate cu legislația europeană privind protecția datelor. Clauzele noastre contractuale standard
                    pot fi puse la dispoziție la cerere. Am luat garanții adecvate similare și cu prestatorii de servicii și
                    partenerii noștri terți, iar mai multe detalii pot fi oferite la cerere.
                </p>
            </>
        ),
    },
    {
        id: "retention",
        title: "Cât timp îți păstrăm datele?",
        content: (
            <>
                <InShort>
                    Îți păstrăm datele atât timp cât este necesar pentru scopurile descrise în această Politică de
                    confidențialitate, cu excepția cazului în care legea impune altfel.
                </InShort>
                <p>
                    Îți vom păstra datele cu caracter personal doar atât timp cât este necesar pentru scopurile descrise în
                    această Politică de confidențialitate, cu excepția cazului în care legea impune sau permite o perioadă
                    mai lungă (de exemplu, din motive fiscale, contabile sau alte cerințe legale). Niciunul dintre scopurile
                    descrise aici nu ne va obliga să îți păstrăm datele cu caracter personal mai mult de trei (3) luni după
                    închiderea contului de utilizator.
                </p>
                <p>
                    Când nu mai avem o nevoie legitimă de a-ți prelucra datele cu caracter personal, le vom șterge sau
                    anonimiza ori, dacă acest lucru nu este posibil (de exemplu, pentru că au fost stocate în copii de
                    rezervă), le vom păstra în siguranță și le vom izola de orice altă prelucrare până când ștergerea va fi
                    posibilă.
                </p>
            </>
        ),
    },
    {
        id: "security",
        title: "Cum îți protejăm datele?",
        content: (
            <>
                <InShort>
                    Ne propunem să îți protejăm datele cu caracter personal printr-un sistem de măsuri de securitate
                    organizatorice și tehnice.
                </InShort>
                <p>
                    Am implementat măsuri de securitate tehnice și organizatorice adecvate și rezonabile, menite să
                    protejeze datele cu caracter personal pe care le prelucrăm. Totuși, în ciuda măsurilor și eforturilor
                    noastre, nicio transmisie electronică prin internet și nicio tehnologie de stocare a informațiilor nu
                    poate fi garantată ca fiind 100% sigură, așa că nu putem promite sau garanta că hackerii, infractorii
                    cibernetici sau alți terți neautorizați nu vor reuși să ne depășească măsurile de securitate și să îți
                    colecteze, acceseze, fure sau modifice informațiile în mod necorespunzător. Deși vom face tot posibilul
                    să îți protejăm datele cu caracter personal, transmiterea lor către și dinspre Serviciile noastre se
                    face pe propriul tău risc. Accesează Serviciile doar dintr-un mediu sigur.
                </p>
            </>
        ),
    },
    {
        id: "minors",
        title: "Colectăm date de la minori?",
        content: (
            <>
                <InShort>Nu colectăm cu bună știință date de la copiii sub 18 ani și nu le adresăm marketing.</InShort>
                <p>
                    Nu colectăm cu bună știință date de la copiii sub 18 ani, nu le solicităm date, nu le adresăm marketing
                    și nici nu vindem cu bună știință astfel de date. Folosind Serviciile, declari că ai cel puțin 18 ani sau
                    că ești părintele ori tutorele unui astfel de minor și că îți dai consimțământul ca minorul aflat în
                    grija ta să folosească Serviciile. Dacă aflăm că am colectat date cu caracter personal de la utilizatori
                    sub 18 ani, vom dezactiva contul și vom lua măsuri rezonabile pentru a șterge cât mai repede aceste date
                    din evidențele noastre. Dacă afli de date pe care este posibil să le fi colectat de la copii sub 18 ani,
                    contactează-ne la <a href="mailto:contact@vestvisuals.ro">contact@vestvisuals.ro</a>.
                </p>
            </>
        ),
    },
    {
        id: "rights",
        title: "Ce drepturi ai privind datele tale?",
        content: (
            <>
                <InShort>
                    În unele regiuni, cum ar fi Spațiul Economic European (SEE), Regatul Unit și Elveția, ai drepturi care
                    îți oferă un acces mai larg la datele tale cu caracter personal și un control mai mare asupra lor. Îți
                    poți revizui, modifica sau închide contul oricând, în funcție de țara, provincia sau statul în care
                    locuiești.
                </InShort>
                <p>
                    În unele regiuni (cum ar fi SEE, Regatul Unit și Elveția), ai anumite drepturi conform legislației
                    aplicabile privind protecția datelor. Acestea pot include dreptul (i) de a solicita accesul la datele tale
                    cu caracter personal și de a obține o copie a acestora, (ii) de a solicita rectificarea sau ștergerea
                    lor, (iii) de a restricționa prelucrarea lor, (iv) dacă este cazul, la portabilitatea datelor și (v) de a
                    nu face obiectul unui proces decizional automatizat. În anumite situații, poți avea și dreptul de a te
                    opune prelucrării datelor tale cu caracter personal. Poți face o astfel de cerere folosind datele de
                    contact din secțiunea „<a href="#contact">Cum ne poți contacta în legătură cu această politică?</a>”
                    de mai jos.
                </p>
                <p>Vom analiza și vom da curs oricărei cereri în conformitate cu legislația aplicabilă privind protecția datelor.</p>
                <p>
                    Dacă te afli în Regatul Unit și nu ești mulțumit de modul în care am gestionat datele tale cu caracter
                    personal, poți depune o plângere direct la noi. Acest drept se adaugă celor pe care le ai conform GDPR-ului
                    Regatului Unit și Data Protection Act 2018.
                </p>
                <p>Cum ne poți contacta:</p>
                <ul>
                    <li><strong>Online:</strong> <ContactLink>pagina de contact</ContactLink></li>
                    <li><strong>Email:</strong> <a href="mailto:contact@vestvisuals.ro">contact@vestvisuals.ro</a></li>
                    <li><strong>Prin poștă:</strong> vezi „<a href="#contact">Cum ne poți contacta în legătură cu această politică?</a>”</li>
                </ul>
                <p>Ce se întâmplă după ce depui o plângere:</p>
                <ul>
                    <li>Îți vom confirma primirea plângerii în cel mult 30 de zile.</li>
                    <li>O vom investiga fără întârzieri nejustificate sau excesive.</li>
                    <li>Te vom ține la curent cu evoluția ei și îți vom explica rezultatul.</li>
                </ul>
                <p>
                    Dacă nu ești mulțumit de răspunsul nostru final, poți adresa plângerea Information Commissioner's
                    Office, autoritatea de supraveghere din Regatul Unit.
                </p>
                <ul>
                    <li><strong>Site:</strong> <a href="https://ico.org.uk/make-a-complaint" target="_blank" rel="noopener noreferrer">ico.org.uk/make-a-complaint</a></li>
                    <li><strong>Telefon:</strong> 0303 123 1113</li>
                    <li><strong>Prin poștă:</strong> Information Commissioner's Office, Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF</li>
                </ul>
                <p>
                    Dacă te afli în SEE sau în Regatul Unit și consideri că îți prelucrăm ilegal datele cu caracter personal,
                    ai și dreptul de a depune o plângere la{" "}
                    <a href="https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm" target="_blank" rel="noopener noreferrer">autoritatea pentru protecția datelor din statul tău membru</a>{" "}
                    (în România, Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal) sau la{" "}
                    <a href="https://ico.org.uk/make-a-complaint/data-protection-complaints/data-protection-complaints/" target="_blank" rel="noopener noreferrer">autoritatea pentru protecția datelor din Regatul Unit</a>.
                </p>
                <p>
                    Dacă te afli în Elveția, poți contacta{" "}
                    <a href="https://www.edoeb.admin.ch/edoeb/en/home.html" target="_blank" rel="noopener noreferrer">Comisarul federal pentru protecția datelor și informații</a>.
                </p>
                <p id="withdraw-consent" className="scroll-mt-8">
                    <strong>Retragerea consimțământului:</strong> Dacă ne bazăm pe consimțământul tău pentru a-ți prelucra
                    datele cu caracter personal, ai dreptul să îl retragi oricând, contactându-ne folosind datele de contact
                    din secțiunea „<a href="#contact">Cum ne poți contacta în legătură cu această politică?</a>” de mai jos.
                </p>
                <p>
                    Reține însă că retragerea consimțământului nu afectează legalitatea prelucrării efectuate înainte de
                    retragere și nici prelucrarea datelor tale efectuată pe alte temeiuri legale decât consimțământul.
                </p>
                <p>
                    <strong>Dezabonarea de la comunicările de marketing și promoționale:</strong> Te poți dezabona oricând
                    de la comunicările noastre de marketing și promoționale, apăsând linkul de dezabonare din emailurile pe
                    care ți le trimitem sau contactându-ne folosind datele din secțiunea „
                    <a href="#contact">Cum ne poți contacta în legătură cu această politică?</a>” de mai jos. Vei fi apoi
                    eliminat din listele de marketing. Totuși, putem comunica în continuare cu tine, de exemplu pentru a-ți
                    trimite mesaje legate de servicii, necesare pentru administrarea și folosirea contului, pentru a răspunde
                    solicitărilor tale sau în alte scopuri decât marketingul.
                </p>
                <h3>Informațiile din cont</h3>
                <p>Dacă vrei oricând să revizuiești sau să modifici informațiile din contul tău ori să îți închizi contul, poți:</p>
                <ul>
                    <li>să intri în setările contului și să îți actualizezi contul de utilizator;</li>
                    <li>să ne contactezi folosind datele de contact furnizate.</li>
                </ul>
                <p>
                    La cererea ta de închidere a contului, îți vom dezactiva sau șterge contul și informațiile din bazele
                    noastre de date active. Totuși, putem păstra unele informații în evidențele noastre pentru a preveni
                    fraudele, a rezolva probleme, a sprijini eventuale investigații, a ne aplica termenii legali și/sau a
                    respecta cerințele legale aplicabile.
                </p>
                <p>
                    <strong>Cookie-uri și tehnologii similare:</strong> Majoritatea browserelor sunt setate implicit să
                    accepte cookie-urile. Dacă preferi, îți poți seta de obicei browserul să șteargă și să refuze
                    cookie-urile. Dacă alegi să ștergi sau să refuzi cookie-urile, unele funcții sau servicii ale
                    Serviciilor noastre ar putea fi afectate. Pentru mai multe informații, vezi{" "}
                    <LegalLink document="cookies">Politica de cookie-uri</LegalLink>.
                </p>
                <p>
                    Dacă ai întrebări sau comentarii despre drepturile tale privind confidențialitatea, ne poți scrie la{" "}
                    <a href="mailto:contact@vestvisuals.ro">contact@vestvisuals.ro</a>.
                </p>
            </>
        ),
    },
    {
        id: "do-not-track",
        title: "Setările „Do Not Track”",
        content: (
            <p>
                Majoritatea browserelor și unele sisteme de operare și aplicații mobile au o funcție sau o setare „Do Not
                Track” („DNT”) pe care o poți activa pentru a semnala că nu vrei ca datele despre activitatea ta de
                navigare online să fie monitorizate și colectate. În prezent, nu există un standard tehnologic unitar
                pentru recunoașterea și aplicarea semnalelor DNT. Prin urmare, momentan nu răspundem semnalelor DNT ale
                browserului și nici altor mecanisme care comunică automat alegerea ta de a nu fi urmărit online. Dacă în
                viitor va fi adoptat un standard privind urmărirea online pe care trebuie să îl respectăm, te vom informa
                despre acest lucru într-o versiune revizuită a acestei Politici de confidențialitate.
            </p>
        ),
    },
    {
        id: "updates",
        title: "Actualizăm această politică?",
        content: (
            <>
                <InShort>Da, vom actualiza această politică atunci când este necesar, pentru a respecta legislația în vigoare.</InShort>
                <p>
                    Putem actualiza periodic această Politică de confidențialitate. Versiunea actualizată va fi indicată de
                    data „Ultima actualizare” din partea de sus a acestei Politici de confidențialitate. Dacă facem
                    modificări importante, te putem anunța fie printr-o notificare afișată vizibil, fie printr-o notificare
                    trimisă direct ție. Te încurajăm să citești periodic această Politică de confidențialitate, ca să știi
                    cum îți protejăm informațiile.
                </p>
            </>
        ),
    },
    {
        id: "contact",
        title: "Cum ne poți contacta în legătură cu această politică?",
        content: (
            <>
                <p>
                    Dacă ai întrebări sau comentarii despre această politică, ne poți scrie la{" "}
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
            </>
        ),
    },
    {
        id: "review-data",
        title: "Cum poți revizui, actualiza sau șterge datele pe care le colectăm despre tine?",
        content: (
            <p>
                În funcție de legislația aplicabilă în țara ta, poți avea dreptul să soliciți accesul la datele cu caracter
                personal pe care le colectăm despre tine, detalii despre cum le-am prelucrat, corectarea inexactităților
                sau ștergerea datelor. Poți avea și dreptul de a-ți retrage consimțământul pentru prelucrarea datelor tale
                cu caracter personal. Aceste drepturi pot fi limitate în anumite situații de legislația aplicabilă. Pentru
                a solicita revizuirea, actualizarea sau ștergerea datelor tale cu caracter personal, folosește{" "}
                <ContactLink>pagina de contact</ContactLink>.
            </p>
        ),
    },
];

const content: LegalContent = {
    title: "Politica de confidențialitate",
    intro: (
        <>
            <p>
                Această Politică de confidențialitate a VEST VISUALS SRL („noi”, „nouă” sau „al nostru”) descrie cum și de
                ce putem accesa, colecta, stoca, folosi și/sau împărtăși („prelucra”) datele tale cu caracter personal
                atunci când folosești serviciile noastre („Serviciile”), inclusiv atunci când:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-1.5">
                <li>vizitezi site-ul nostru vestvisuals.ro sau orice alt site al nostru care trimite la această Politică de confidențialitate;</li>
                <li>interacționezi cu noi în alte moduri legate de acestea, inclusiv prin activități de marketing sau evenimente.</li>
            </ul>
            <p>
                <strong className="font-medium text-foreground">Întrebări sau nelămuriri?</strong> Această Politică de
                confidențialitate te ajută să îți înțelegi drepturile și opțiunile privind confidențialitatea. Noi suntem
                cei care decidem cum sunt prelucrate datele tale cu caracter personal. Dacă nu ești de acord cu politicile
                și practicile noastre, te rugăm să nu folosești Serviciile noastre. Dacă ai în continuare întrebări sau
                nelămuriri, contactează-ne la{" "}
                <a href="mailto:contact@vestvisuals.ro" className="underline underline-offset-4">contact@vestvisuals.ro</a>.
            </p>
        </>
    ),
    sections,
};

export default content;
