import type { LegalContent, LegalSection } from "@/components/legal";
import { LegalLink } from "@/components/legal";

const sections: LegalSection[] = [
    {
        id: "services",
        title: "Serviciile noastre",
        content: (
            <p>
                Informațiile furnizate prin Servicii nu sunt destinate distribuirii către sau utilizării de către nicio
                persoană fizică sau juridică dintr-o jurisdicție sau țară în care o astfel de distribuire sau utilizare ar fi
                contrară legii ori reglementărilor sau ne-ar obliga la o înregistrare în acea jurisdicție sau țară. Prin
                urmare, persoanele care aleg să acceseze Serviciile din alte locuri o fac din proprie inițiativă și sunt
                singurele responsabile pentru respectarea legilor locale, dacă și în măsura în care acestea se aplică.
            </p>
        ),
    },
    {
        id: "intellectual-property",
        title: "Drepturi de proprietate intelectuală",
        content: (
            <>
                <h3>Proprietatea noastră intelectuală</h3>
                <p>
                    Suntem titularii sau licențiații tuturor drepturilor de proprietate intelectuală asupra Serviciilor
                    noastre, inclusiv asupra întregului cod sursă, bazelor de date, funcționalităților, software-ului,
                    designului site-urilor, materialelor audio și video, textelor, fotografiilor și elementelor grafice din
                    Servicii (denumite împreună „Conținutul”), precum și asupra mărcilor comerciale, mărcilor de servicii și
                    siglelor pe care le conțin („Mărcile”).
                </p>
                <p>
                    Conținutul și Mărcile noastre sunt protejate de legile privind drepturile de autor și mărcile (precum și
                    de alte legi privind proprietatea intelectuală și concurența neloială) și de tratatele internaționale.
                </p>
                <p>
                    Conținutul și Mărcile sunt puse la dispoziție în Servicii sau prin intermediul lor „ca atare”, exclusiv
                    pentru uzul tău personal, necomercial, sau pentru scopuri interne ale afacerii tale.
                </p>
                <h3>Utilizarea Serviciilor noastre</h3>
                <p>
                    Cu condiția să respecți acești Termeni legali, inclusiv secțiunea „<a href="#prohibited">Activități
                    interzise</a>” de mai jos, îți acordăm o licență neexclusivă, netransferabilă și revocabilă de a:
                </p>
                <ul>
                    <li>accesa Serviciile; și</li>
                    <li>descărca sau tipări o copie a oricărei părți din Conținut la care ai obținut acces în mod corespunzător,</li>
                </ul>
                <p>exclusiv pentru uzul tău personal, necomercial, sau pentru scopuri interne ale afacerii tale.</p>
                <p>
                    Cu excepția celor prevăzute în această secțiune sau în altă parte a Termenilor noștri legali, nicio parte
                    a Serviciilor și niciun Conținut sau Marcă nu pot fi copiate, reproduse, agregate, republicate, încărcate,
                    postate, afișate public, codificate, traduse, transmise, distribuite, vândute, licențiate sau exploatate
                    în alt mod în orice scop comercial, fără permisiunea noastră prealabilă, expresă și scrisă.
                </p>
                <p>
                    Dacă vrei să folosești Serviciile, Conținutul sau Mărcile în alt mod decât cel prevăzut în această
                    secțiune sau în altă parte a Termenilor noștri legali, trimite-ne cererea la{" "}
                    <a href="mailto:contact@vestvisuals.ro">contact@vestvisuals.ro</a>. Dacă îți acordăm vreodată permisiunea
                    de a posta, reproduce sau afișa public o parte din Serviciile sau din Conținutul nostru, trebuie să ne
                    menționezi ca titulari sau licențiatori ai Serviciilor, Conținutului sau Mărcilor și să te asiguri că orice
                    mențiune privind drepturile de autor sau de proprietate apare sau este vizibilă la postarea, reproducerea
                    sau afișarea Conținutului nostru.
                </p>
                <p>Ne rezervăm toate drepturile asupra Serviciilor, Conținutului și Mărcilor care nu îți sunt acordate în mod expres.</p>
                <p>
                    Orice încălcare a acestor drepturi de proprietate intelectuală constituie o încălcare gravă a Termenilor
                    noștri legali, iar dreptul tău de a folosi Serviciile încetează imediat.
                </p>
                <h3>Mesajele și contribuțiile tale</h3>
                <p>
                    Te rugăm să citești cu atenție această secțiune și secțiunea „<a href="#prohibited">Activități
                    interzise</a>” înainte de a folosi Serviciile, ca să înțelegi (a) ce drepturi ne acorzi și (b) ce obligații
                    ai atunci când postezi sau încarci orice conținut prin Servicii.
                </p>
                <p>
                    <strong>Mesaje:</strong> Trimițându-ne direct orice întrebare, comentariu, sugestie, idee, feedback sau alte
                    informații despre Servicii („Mesaje”), ești de acord să ne cedezi toate drepturile de proprietate
                    intelectuală asupra acestora. Ești de acord ca Mesajul să ne aparțină și să îl putem folosi și difuza fără
                    restricții, în orice scop legal, comercial sau de alt fel, fără să îți datorăm recunoaștere sau
                    compensație.
                </p>
                <p>
                    <strong>Contribuții:</strong> Serviciile te pot invita să participi la chaturi, bloguri, forumuri de
                    discuții, forumuri online și alte funcții prin care poți crea, trimite, posta, afișa, transmite, publica,
                    distribui sau difuza conținut și materiale către noi sau prin Servicii, inclusiv, fără a se limita la,
                    texte, scrieri, materiale video și audio, fotografii, muzică, elemente grafice, comentarii, recenzii,
                    evaluări, date cu caracter personal sau alte materiale („Contribuții”). Orice Mesaj publicat va fi tratat și
                    ca o Contribuție.
                </p>
                <p>
                    Înțelegi că alte persoane care folosesc Serviciile pot vedea Contribuțiile, eventual și prin site-uri
                    terțe.
                </p>
                <p>
                    <strong>Când postezi Contribuții, ne acorzi o licență (inclusiv pentru folosirea numelui, mărcilor și
                    siglelor tale):</strong> Postând orice Contribuție, ne acorzi un drept și o licență nerestricționate,
                    nelimitate, irevocabile, perpetue, neexclusive, transferabile, gratuite, integral plătite și valabile în
                    întreaga lume de a folosi, copia, reproduce, distribui, vinde, revinde, publica, difuza, redenumi, stoca,
                    interpreta public, afișa public, reformata, traduce, extrage (integral sau parțial) și exploata
                    Contribuțiile tale (inclusiv, fără limitare, imaginea, numele și vocea ta) în orice scop, comercial,
                    publicitar sau de altă natură, de a crea opere derivate din ele sau de a le include în alte opere și de a
                    acorda sublicențe pentru licențele acordate în această secțiune. Folosirea și distribuirea se pot face în
                    orice format și prin orice canal media.
                </p>
                <p>
                    Această licență include folosirea numelui tău, a numelui companiei și a numelui francizei, după caz,
                    precum și a oricăror mărci comerciale, mărci de servicii, denumiri comerciale, sigle și imagini personale
                    și comerciale pe care ni le furnizezi.
                </p>
                <p>
                    <strong>Ești responsabil pentru ce postezi sau încarci:</strong> Trimițându-ne Mesaje și/sau postând
                    Contribuții prin orice parte a Serviciilor sau făcând Contribuțiile accesibile prin Servicii, prin
                    conectarea contului tău la oricare dintre conturile tale de pe rețelele sociale:
                </p>
                <ul>
                    <li>confirmi că ai citit și ești de acord cu secțiunea „<a href="#prohibited">Activități interzise</a>” și că nu vei posta, trimite, publica, încărca sau transmite prin Servicii niciun Mesaj și nu vei posta nicio Contribuție care este ilegală, hărțuitoare, instigatoare la ură, dăunătoare, defăimătoare, obscenă, intimidantă, abuzivă, discriminatorie, amenințătoare la adresa unei persoane sau a unui grup, cu caracter sexual explicit, falsă, inexactă, înșelătoare sau care induce în eroare;</li>
                    <li>în măsura permisă de legea aplicabilă, renunți la toate drepturile morale asupra oricărui astfel de Mesaj și/sau Contribuții;</li>
                    <li>garantezi că Mesajele și/sau Contribuțiile îți aparțin în original sau că ai drepturile și licențele necesare pentru a le trimite și că ai deplina autoritate de a ne acorda drepturile menționate mai sus în legătură cu ele; și</li>
                    <li>garantezi și declari că Mesajele și/sau Contribuțiile tale nu reprezintă informații confidențiale.</li>
                </ul>
                <p>
                    Ești singurul responsabil pentru Mesajele și/sau Contribuțiile tale și ești de acord în mod expres să ne
                    despăgubești pentru orice pierderi pe care le-am putea suferi din cauza încălcării de către tine a (a)
                    acestei secțiuni, (b) drepturilor de proprietate intelectuală ale unui terț sau (c) legii aplicabile.
                </p>
                <p>
                    <strong>Putem elimina sau modifica Conținutul tău:</strong> Deși nu avem obligația de a monitoriza
                    Contribuțiile, avem dreptul să eliminăm sau să modificăm oricând orice Contribuție, fără notificare, dacă
                    în opinia noastră rezonabilă considerăm că este dăunătoare sau încalcă acești Termeni legali. Dacă
                    eliminăm sau modificăm astfel de Contribuții, îți putem de asemenea suspenda sau dezactiva contul și te
                    putem raporta autorităților.
                </p>
            </>
        ),
    },
    {
        id: "user-representations",
        title: "Declarațiile utilizatorului",
        content: (
            <>
                <p>
                    Folosind Serviciile, declari și garantezi că: (1) toate informațiile de înregistrare pe care le trimiți vor
                    fi adevărate, exacte, actuale și complete; (2) vei păstra aceste informații exacte și le vei actualiza
                    prompt atunci când este necesar; (3) ai capacitate juridică și ești de acord să respecți acești Termeni
                    legali; (4) nu ești minor în jurisdicția în care locuiești; (5) nu vei accesa Serviciile prin mijloace
                    automate sau non-umane, fie că este vorba de un bot, de un script sau de altceva; (6) nu vei folosi
                    Serviciile în niciun scop ilegal sau neautorizat; și (7) folosirea Serviciilor de către tine nu va încălca
                    nicio lege sau reglementare aplicabilă.
                </p>
                <p>
                    Dacă furnizezi informații neadevărate, inexacte, neactualizate sau incomplete, avem dreptul să îți
                    suspendăm sau să îți închidem contul și să refuzăm orice utilizare actuală sau viitoare a Serviciilor (sau
                    a oricărei părți a acestora).
                </p>
            </>
        ),
    },
    {
        id: "registration",
        title: "Înregistrarea utilizatorului",
        content: (
            <p>
                Este posibil să trebuiască să te înregistrezi pentru a folosi Serviciile. Ești de acord să îți păstrezi parola
                confidențială și ești responsabil pentru orice folosire a contului și a parolei tale. Ne rezervăm dreptul de a
                elimina, recupera sau schimba un nume de utilizator ales de tine dacă stabilim, la propria noastră
                discreție, că acesta este nepotrivit, obscen sau inacceptabil în alt mod.
            </p>
        ),
    },
    {
        id: "purchases",
        title: "Achiziții și plată",
        content: (
            <>
                <p>
                    Ești de acord să furnizezi informații de achiziție și de cont actuale, complete și exacte pentru toate
                    achizițiile făcute prin Servicii. De asemenea, ești de acord să îți actualizezi prompt informațiile de cont
                    și de plată, inclusiv adresa de email, metoda de plată și data de expirare a cardului, ca să putem finaliza
                    tranzacțiile și să te putem contacta atunci când este nevoie. Taxele aplicabile vânzării vor fi adăugate
                    la prețul achizițiilor, după cum considerăm necesar. Putem modifica prețurile oricând. Toate plățile se fac
                    în euro.
                </p>
                <p>
                    Ești de acord să plătești toate sumele la prețurile în vigoare pentru achizițiile tale, precum și orice
                    costuri de livrare aplicabile, și ne autorizezi să încasăm aceste sume prin furnizorul de plăți ales de
                    tine la plasarea comenzii. Ne rezervăm dreptul de a corecta orice erori de preț, chiar dacă am solicitat
                    sau am primit deja plata.
                </p>
                <p>
                    Ne rezervăm dreptul de a refuza orice comandă plasată prin Servicii. Putem, la propria noastră discreție,
                    să limităm sau să anulăm cantitățile achiziționate de o persoană, de o gospodărie sau printr-o comandă.
                    Aceste restricții pot include comenzile plasate de sau prin același cont de client, cu aceeași metodă de
                    plată și/sau comenzile care folosesc aceeași adresă de facturare sau de livrare. Ne rezervăm dreptul de a
                    limita sau de a interzice comenzile care, în opinia noastră, par să fie plasate de comercianți,
                    revânzători sau distribuitori.
                </p>
            </>
        ),
    },
    {
        id: "refunds",
        title: "Politica de rambursare",
        content: <p>Toate vânzările sunt definitive și nu se acordă rambursări.</p>,
    },
    {
        id: "prohibited",
        title: "Activități interzise",
        content: (
            <>
                <p>
                    Nu poți accesa sau folosi Serviciile în alt scop decât cel pentru care le punem la dispoziție. Serviciile
                    nu pot fi folosite în legătură cu nicio activitate comercială, cu excepția celor susținute sau aprobate
                    în mod expres de noi.
                </p>
                <p>Ca utilizator al Serviciilor, ești de acord să nu:</p>
                <ul>
                    <li>extragi sistematic date sau alt conținut din Servicii pentru a crea sau compila, direct sau indirect, o colecție, o compilație, o bază de date sau un director, fără permisiunea noastră scrisă;</li>
                    <li>păcălești, fraudezi sau induci în eroare pe noi sau pe alți utilizatori, mai ales în încercarea de a afla informații sensibile despre conturi, cum ar fi parolele;</li>
                    <li>ocolești, dezactivezi sau afectezi în alt mod funcțiile de securitate ale Serviciilor, inclusiv cele care împiedică sau restricționează folosirea ori copierea Conținutului sau care impun limite de utilizare a Serviciilor și/sau a Conținutului;</li>
                    <li>denigrezi, pătezi reputația sau prejudiciezi în alt mod, în opinia noastră, compania noastră și/sau Serviciile;</li>
                    <li>folosești informațiile obținute din Servicii pentru a hărțui, abuza sau prejudicia o altă persoană;</li>
                    <li>folosești în mod necorespunzător serviciile noastre de asistență sau trimiți raportări false de abuz sau de comportament neadecvat;</li>
                    <li>folosești Serviciile într-un mod care contravine legilor sau reglementărilor aplicabile;</li>
                    <li>încadrezi Serviciile în alte site-uri (framing) sau creezi linkuri către ele fără autorizație;</li>
                    <li>încarci sau transmiți (sau încerci să încarci ori să transmiți) viruși, troieni sau alte materiale, inclusiv folosirea excesivă a majusculelor și spamul (postarea continuă de text repetitiv), care afectează folosirea neîntreruptă a Serviciilor de către orice persoană sau care modifică, afectează, perturbă sau împiedică folosirea, funcțiile, operarea sau întreținerea Serviciilor;</li>
                    <li>folosești sistemul în mod automatizat, de exemplu prin scripturi care trimit comentarii sau mesaje, ori prin instrumente de data mining, roboți sau instrumente similare de colectare și extragere a datelor;</li>
                    <li>ștergi mențiunile privind drepturile de autor sau alte drepturi de proprietate din orice Conținut;</li>
                    <li>încerci să te dai drept un alt utilizator sau o altă persoană ori să folosești numele de utilizator al altcuiva;</li>
                    <li>încarci sau transmiți (sau încerci să încarci ori să transmiți) orice material care funcționează ca mecanism pasiv sau activ de colectare ori transmitere a informațiilor, inclusiv, fără limitare, imagini GIF transparente, pixeli 1×1, web bugs, cookie-uri sau alte dispozitive similare (numite uneori „spyware” sau „mecanisme de colectare pasivă”);</li>
                    <li>afectezi, perturbi sau suprasoliciți Serviciile ori rețelele sau serviciile conectate la acestea;</li>
                    <li>hărțuiești, deranjezi, intimidezi sau ameninți pe oricare dintre angajații sau agenții noștri implicați în furnizarea Serviciilor către tine;</li>
                    <li>încerci să ocolești orice măsură a Serviciilor menită să împiedice sau să restricționeze accesul la Servicii sau la o parte a acestora;</li>
                    <li>copiezi sau adaptezi software-ul Serviciilor, inclusiv, fără a se limita la, codul Flash, PHP, HTML, JavaScript sau alt cod;</li>
                    <li>cu excepția cazurilor permise de legea aplicabilă, descifrezi, decompilezi, dezasamblezi sau aplici inginerie inversă oricărui software care face parte din Servicii;</li>
                    <li>cu excepția utilizării obișnuite a motoarelor de căutare sau a browserelor, folosești, lansezi, dezvolți sau distribui orice sistem automatizat, inclusiv, fără limitare, crawlere, roboți, programe de trișat, scrapere sau cititoare offline care accesează Serviciile, ori folosești sau lansezi scripturi sau alte programe neautorizate;</li>
                    <li>folosești un agent de cumpărare sau un intermediar pentru a face achiziții prin Servicii;</li>
                    <li>folosești Serviciile în mod neautorizat, inclusiv prin colectarea numelor de utilizator și/sau a adreselor de email ale utilizatorilor, prin mijloace electronice sau de altă natură, pentru a trimite emailuri nesolicitate, ori prin crearea de conturi de utilizator în mod automat sau sub pretexte false;</li>
                    <li>folosești Serviciile ca parte a unui demers de a ne face concurență sau folosești în alt mod Serviciile și/sau Conținutul pentru orice activitate generatoare de venituri sau întreprindere comercială;</li>
                    <li>folosești Serviciile pentru a face reclamă sau a oferi spre vânzare bunuri și servicii.</li>
                </ul>
            </>
        ),
    },
    {
        id: "contributions",
        title: "Contribuțiile utilizatorilor",
        content: (
            <>
                <p>
                    Serviciile te pot invita să participi la chaturi, bloguri, forumuri de discuții, forumuri online și alte
                    funcții și îți pot oferi posibilitatea de a crea, trimite, posta, afișa, transmite, interpreta, publica,
                    distribui sau difuza conținut și materiale către noi sau în Servicii, inclusiv, fără a se limita la,
                    texte, scrieri, materiale video și audio, fotografii, elemente grafice, comentarii, sugestii, date cu
                    caracter personal sau alte materiale (denumite împreună „Contribuții”). Contribuțiile pot fi văzute de
                    alți utilizatori ai Serviciilor și prin site-uri terțe. Prin urmare, orice Contribuție pe care o transmiți
                    poate fi tratată ca neconfidențială și fără drept de proprietate. Când creezi sau pui la dispoziție orice
                    Contribuție, declari și garantezi că:
                </p>
                <ul>
                    <li>crearea, distribuirea, transmiterea, afișarea publică sau interpretarea, precum și accesarea, descărcarea sau copierea Contribuțiilor tale nu încalcă și nu vor încălca drepturile de proprietate ale niciunui terț, inclusiv, fără a se limita la, drepturile de autor, brevetele, mărcile, secretele comerciale sau drepturile morale;</li>
                    <li>ești creatorul și proprietarul Contribuțiilor tale sau ai licențele, drepturile, consimțămintele, renunțările și permisiunile necesare pentru a le folosi și pentru a ne autoriza pe noi, Serviciile și alți utilizatori ai Serviciilor să le folosim în orice mod prevăzut de Servicii și de acești Termeni legali;</li>
                    <li>ai consimțământul, renunțarea și/sau permisiunea scrisă a fiecărei persoane identificabile din Contribuțiile tale de a folosi numele sau imaginea acesteia, astfel încât Contribuțiile să poată fi incluse și folosite în orice mod prevăzut de Servicii și de acești Termeni legali;</li>
                    <li>Contribuțiile tale nu sunt false, inexacte sau înșelătoare;</li>
                    <li>Contribuțiile tale nu sunt reclame nesolicitate sau neautorizate, materiale promoționale, scheme piramidale, scrisori în lanț, spam, mesaje în masă sau alte forme de solicitare;</li>
                    <li>Contribuțiile tale nu sunt obscene, indecente, lascive, vulgare, violente, hărțuitoare, calomnioase, defăimătoare sau inacceptabile în alt mod (după aprecierea noastră);</li>
                    <li>Contribuțiile tale nu ridiculizează, nu batjocoresc, nu denigrează, nu intimidează și nu abuzează pe nimeni;</li>
                    <li>Contribuțiile tale nu sunt folosite pentru a hărțui sau amenința (în sensul legal al acestor termeni) o altă persoană și nici pentru a promova violența împotriva unei anumite persoane sau categorii de persoane;</li>
                    <li>Contribuțiile tale nu încalcă nicio lege, reglementare sau normă aplicabilă;</li>
                    <li>Contribuțiile tale nu încalcă dreptul la viață privată sau dreptul la propria imagine al niciunui terț;</li>
                    <li>Contribuțiile tale nu încalcă nicio lege aplicabilă privind pornografia infantilă și nicio altă lege menită să protejeze sănătatea sau bunăstarea minorilor;</li>
                    <li>Contribuțiile tale nu conțin comentarii jignitoare legate de rasă, origine națională, gen, orientare sexuală sau dizabilitate;</li>
                    <li>Contribuțiile tale nu încalcă în alt mod și nu trimit la materiale care încalcă vreo prevedere a acestor Termeni legali sau vreo lege ori reglementare aplicabilă.</li>
                </ul>
                <p>
                    Orice folosire a Serviciilor care încalcă cele de mai sus încalcă acești Termeni legali și poate duce,
                    printre altele, la încetarea sau suspendarea dreptului tău de a folosi Serviciile.
                </p>
            </>
        ),
    },
    {
        id: "contribution-license",
        title: "Licența asupra contribuțiilor",
        content: (
            <>
                <p>
                    Postând Contribuțiile în orice parte a Serviciilor sau făcându-le accesibile Serviciilor prin conectarea
                    contului tău la oricare dintre conturile tale de pe rețelele sociale, ne acorzi automat, și declari și
                    garantezi că ai dreptul să ne acorzi, un drept și o licență nerestricționate, nelimitate, irevocabile,
                    perpetue, neexclusive, transferabile, gratuite, integral plătite și valabile în întreaga lume de a găzdui,
                    folosi, copia, reproduce, dezvălui, vinde, revinde, publica, difuza, redenumi, arhiva, stoca, păstra în
                    cache, interpreta public, afișa public, reformata, traduce, transmite, extrage (integral sau parțial) și
                    distribui aceste Contribuții (inclusiv, fără limitare, imaginea și vocea ta) în orice scop, comercial,
                    publicitar sau de altă natură, de a crea opere derivate din ele sau de a le include în alte opere și de a
                    acorda și autoriza sublicențe pentru toate acestea. Folosirea și distribuirea se pot face în orice format și
                    prin orice canal media.
                </p>
                <p>
                    Această licență se aplică oricărei forme, oricărui mediu sau oricărei tehnologii cunoscute acum sau
                    dezvoltate în viitor și include folosirea numelui tău, a numelui companiei și a numelui francizei, după
                    caz, precum și a oricăror mărci comerciale, mărci de servicii, denumiri comerciale, sigle și imagini
                    personale și comerciale pe care ni le furnizezi. Renunți la toate drepturile morale asupra Contribuțiilor
                    tale și garantezi că drepturile morale nu au fost revendicate în alt mod asupra lor.
                </p>
                <p>
                    Nu revendicăm proprietatea asupra Contribuțiilor tale. Îți păstrezi proprietatea deplină asupra tuturor
                    Contribuțiilor tale și asupra oricăror drepturi de proprietate intelectuală sau de altă natură asociate
                    acestora. Nu răspundem pentru declarațiile sau afirmațiile din Contribuțiile tale, din orice zonă a
                    Serviciilor. Ești singurul responsabil pentru Contribuțiile tale în Servicii și ești de acord în mod expres
                    să ne exonerezi de orice răspundere și să nu inițiezi nicio acțiune legală împotriva noastră în legătură cu
                    Contribuțiile tale.
                </p>
                <p>
                    Avem dreptul, la discreția noastră exclusivă și absolută, (1) să modificăm, să cenzurăm sau să schimbăm în
                    alt mod orice Contribuție; (2) să recategorisim orice Contribuție, pentru a o plasa într-un loc mai potrivit
                    în Servicii; și (3) să verificăm în prealabil sau să ștergem orice Contribuție, oricând și din orice motiv,
                    fără notificare. Nu avem obligația de a monitoriza Contribuțiile tale.
                </p>
            </>
        ),
    },
    {
        id: "social-media",
        title: "Rețele sociale",
        content: (
            <>
                <p>
                    Ca parte a funcționalității Serviciilor, îți poți conecta contul la conturi online pe care le ai la
                    furnizori de servicii terți (fiecare astfel de cont, un „Cont terț”), fie (1) furnizând prin Servicii
                    datele de autentificare ale Contului terț, fie (2) permițându-ne să accesăm Contul terț, în măsura permisă
                    de termenii și condițiile care se aplică fiecărui Cont terț. Declari și garantezi că ai dreptul să ne
                    dezvălui datele de autentificare ale Contului terț și/sau să ne acorzi acces la acesta, fără să încalci
                    termenii și condițiile care se aplică folosirii acelui Cont terț și fără să ne obligi să plătim vreo taxă
                    sau să ne supui vreunor limite de utilizare impuse de furnizorul de servicii al Contului terț.
                </p>
                <p>
                    Acordându-ne acces la orice Cont terț, înțelegi că (1) putem accesa, pune la dispoziție și stoca (dacă este
                    cazul) orice conținut pe care l-ai furnizat și stocat în Contul terț („Conținutul din rețelele sociale”),
                    astfel încât să fie disponibil în Servicii și prin intermediul lor, prin contul tău, inclusiv, fără
                    limitare, listele de prieteni, și (2) putem trimite către și primi de la Contul terț informații
                    suplimentare, în măsura în care ești notificat atunci când îți conectezi contul la Contul terț. În funcție
                    de Conturile terțe pe care le alegi și de setările de confidențialitate pe care le-ai stabilit în ele,
                    datele cu caracter personal pe care le postezi în Conturile terțe pot fi disponibile în contul tău din
                    Servicii și prin intermediul acestuia. Reține că, dacă un Cont terț sau un serviciu asociat devine
                    indisponibil ori dacă accesul nostru la acel Cont terț este întrerupt de furnizorul de servicii,
                    Conținutul din rețelele sociale s-ar putea să nu mai fie disponibil în Servicii și prin intermediul lor.
                    Vei putea dezactiva oricând conexiunea dintre contul tău din Servicii și Conturile tale terțe.
                </p>
                <p>
                    <strong>
                        Reține că relația ta cu furnizorii de servicii terți asociați Conturilor tale terțe este guvernată
                        exclusiv de acordul sau acordurile tale cu acești furnizori.
                    </strong>
                </p>
                <p>
                    Nu verificăm Conținutul din rețelele sociale în niciun scop, inclusiv, fără a se limita la, pentru
                    exactitate, legalitate sau neîncălcarea drepturilor, și nu răspundem pentru niciun Conținut din rețelele
                    sociale. Recunoști și ești de acord că putem accesa agenda de adrese de email asociată unui Cont terț și
                    lista de contacte stocată pe telefonul sau tableta ta, exclusiv pentru a identifica și a te informa
                    despre contactele care s-au înregistrat și ele în Servicii. Poți dezactiva conexiunea dintre Servicii și
                    Contul terț contactându-ne folosind datele de contact de mai jos sau din setările contului (dacă este
                    cazul). Vom încerca să ștergem de pe serverele noastre orice informații obținute prin acel Cont terț, cu
                    excepția numelui de utilizator și a fotografiei de profil asociate contului tău.
                </p>
            </>
        ),
    },
    {
        id: "third-party",
        title: "Site-uri și conținut terț",
        content: (
            <p>
                Serviciile pot conține (sau poți fi trimis prin Site către) linkuri către alte site-uri („Site-uri terțe”),
                precum și articole, fotografii, texte, elemente grafice, imagini, designuri, muzică, sunete, materiale video,
                informații, aplicații, software și alt conținut sau elemente care aparțin terților sau provin de la aceștia
                („Conținut terț”). Nu cercetăm, nu monitorizăm și nu verificăm Site-urile terțe și Conținutul terț din punctul
                de vedere al exactității, caracterului adecvat sau completitudinii și nu răspundem pentru niciun Site terț
                accesat prin Servicii și nici pentru vreun Conținut terț postat în Servicii, disponibil prin ele sau instalat
                din ele, inclusiv pentru conținutul, exactitatea, caracterul ofensator, opiniile, fiabilitatea, practicile de
                confidențialitate sau alte politici ale Site-urilor terțe ori ale Conținutului terț. Includerea, crearea de
                linkuri către sau permiterea folosirii ori instalării oricărui Site terț sau Conținut terț nu înseamnă că
                îl aprobăm sau îl susținem. Dacă decizi să părăsești Serviciile și să accesezi Site-urile terțe ori să
                folosești sau să instalezi Conținut terț, o faci pe propriul risc și trebuie să știi că acești Termeni legali
                nu se mai aplică. Ar trebui să citești termenii și politicile aplicabile, inclusiv practicile privind
                confidențialitatea și colectarea datelor, ale oricărui site pe care navighezi din Servicii sau ale oricărei
                aplicații pe care o folosești ori o instalezi din Servicii. Orice achiziție pe care o faci prin Site-uri terțe
                se face pe alte site-uri și de la alte companii, iar noi nu ne asumăm nicio răspundere pentru astfel de
                achiziții, care privesc exclusiv relația dintre tine și terțul respectiv. Ești de acord și recunoști că nu
                susținem produsele sau serviciile oferite pe Site-urile terțe și că nu ne vei trage la răspundere pentru
                niciun prejudiciu cauzat de achiziționarea lor. De asemenea, nu ne vei trage la răspundere pentru nicio
                pierdere suferită sau niciun prejudiciu cauzat în legătură cu sau ca urmare a oricărui Conținut terț ori a
                oricărui contact cu Site-uri terțe.
            </p>
        ),
    },
    {
        id: "management",
        title: "Administrarea Serviciilor",
        content: (
            <p>
                Ne rezervăm dreptul, dar nu și obligația: (1) de a monitoriza Serviciile pentru încălcări ale acestor Termeni
                legali; (2) de a lua măsurile legale potrivite împotriva oricui, la discreția noastră exclusivă, încalcă legea
                sau acești Termeni legali, inclusiv, fără limitare, prin raportarea utilizatorului către autoritățile de
                aplicare a legii; (3) la discreția noastră exclusivă și fără limitare, de a refuza, restricționa accesul la,
                limita disponibilitatea sau dezactiva (în măsura în care este posibil din punct de vedere tehnic) oricare
                dintre Contribuțiile tale sau orice parte a acestora; (4) la discreția noastră exclusivă și fără limitare,
                notificare sau răspundere, de a elimina din Servicii sau de a dezactiva toate fișierele și conținutul care au
                o dimensiune excesivă sau care ne suprasolicită în vreun fel sistemele; și (5) de a administra în alt mod
                Serviciile, astfel încât să ne protejăm drepturile și bunurile și să asigurăm buna funcționare a Serviciilor.
            </p>
        ),
    },
    {
        id: "privacy",
        title: "Politica de confidențialitate",
        content: (
            <p>
                Ne pasă de confidențialitatea și securitatea datelor. Te rugăm să citești{" "}
                <LegalLink document="privacy">Politica de confidențialitate</LegalLink>. Folosind Serviciile, ești de acord să
                respecți Politica noastră de confidențialitate, care face parte din acești Termeni legali. Reține că
                Serviciile sunt găzduite în Germania. Dacă accesezi Serviciile din orice altă regiune a lumii, cu legi sau
                alte cerințe privind colectarea, folosirea sau dezvăluirea datelor cu caracter personal diferite de legile
                aplicabile în Germania, atunci, continuând să folosești Serviciile, îți transferi datele în Germania și îți
                dai consimțământul expres ca datele tale să fie transferate și prelucrate în Germania.
            </p>
        ),
    },
    {
        id: "termination",
        title: "Durată și încetare",
        content: (
            <>
                <p>Acești Termeni legali rămân în vigoare cât timp folosești Serviciile.</p>
                <p>
                    <strong>
                        Fără a limita nicio altă prevedere a acestor Termeni legali, ne rezervăm dreptul, la discreția noastră
                        exclusivă și fără notificare sau răspundere, de a refuza accesul la Servicii și folosirea lor
                        (inclusiv prin blocarea anumitor adrese IP) oricărei persoane, din orice motiv sau fără motiv,
                        inclusiv, fără limitare, pentru încălcarea oricărei declarații, garanții sau angajament din acești
                        Termeni legali ori a oricărei legi sau reglementări aplicabile. Putem înceta oricând folosirea sau
                        participarea ta la Servicii ori îți putem șterge contul și orice conținut sau informații pe care le-ai
                        postat, fără avertisment, la discreția noastră exclusivă.
                    </strong>
                </p>
                <p>
                    Dacă îți închidem sau îți suspendăm contul din orice motiv, îți este interzis să te înregistrezi și să îți
                    creezi un cont nou pe numele tău, sub un nume fals sau împrumutat ori pe numele unui terț, chiar dacă ai
                    acționa în numele acelui terț. Pe lângă închiderea sau suspendarea contului, ne rezervăm dreptul de a lua
                    măsurile legale potrivite, inclusiv, fără limitare, acțiuni civile, penale și cereri de ordonanță.
                </p>
            </>
        ),
    },
    {
        id: "modifications",
        title: "Modificări și întreruperi",
        content: (
            <>
                <p>
                    Ne rezervăm dreptul de a schimba, modifica sau elimina conținutul Serviciilor oricând sau din orice motiv,
                    la discreția noastră exclusivă, fără notificare. Totuși, nu avem obligația de a actualiza informațiile din
                    Serviciile noastre. Nu vom răspunde față de tine sau față de vreun terț pentru nicio modificare, schimbare
                    de preț, suspendare sau încetare a Serviciilor.
                </p>
                <p>
                    Nu putem garanta că Serviciile vor fi disponibile în permanență. Putem avea probleme hardware, software
                    sau de altă natură ori putem avea nevoie să facem lucrări de întreținere a Serviciilor, ceea ce poate duce
                    la întreruperi, întârzieri sau erori. Ne rezervăm dreptul de a schimba, revizui, actualiza, suspenda,
                    întrerupe sau modifica în alt mod Serviciile oricând sau din orice motiv, fără să te notificăm. Ești de
                    acord că nu avem nicio răspundere pentru vreo pierdere, prejudiciu sau neplăcere cauzate de imposibilitatea
                    ta de a accesa sau folosi Serviciile în perioadele de nefuncționare sau după încetarea lor. Nimic din acești
                    Termeni legali nu va fi interpretat ca o obligație a noastră de a întreține și susține Serviciile sau de a
                    furniza corecturi, actualizări sau versiuni noi ale acestora.
                </p>
            </>
        ),
    },
    {
        id: "law",
        title: "Legea aplicabilă",
        content: (
            <p>
                Acești Termeni legali sunt guvernați și interpretați conform legilor din România, iar aplicarea Convenției
                Națiunilor Unite privind contractele de vânzare internațională de mărfuri este exclusă în mod expres. Dacă
                reședința ta obișnuită este în UE și ești consumator, beneficiezi în plus de protecția oferită de
                prevederile obligatorii ale legii din țara ta de reședință. VEST VISUALS SRL și tu sunteți de acord să vă
                supuneți jurisdicției neexclusive a instanțelor din Timișoara, ceea ce înseamnă că îți poți apăra drepturile
                de consumator în legătură cu acești Termeni legali în România sau în țara din UE în care locuiești.
            </p>
        ),
    },
    {
        id: "disputes",
        title: "Soluționarea litigiilor",
        content: (
            <>
                <h3>Negocieri amiabile</h3>
                <p>
                    Pentru a grăbi soluționarea și a ține sub control costurile oricărui litigiu, conflict sau pretenții
                    legate de acești Termeni legali (fiecare, un „Litigiu”, și împreună, „Litigiile”), inițiat fie de tine,
                    fie de noi (fiecare, o „Parte”, și împreună, „Părțile”), Părțile sunt de acord să încerce mai întâi să
                    negocieze amiabil orice Litigiu (cu excepția celor prevăzute în mod expres mai jos) timp de cel puțin
                    treizeci (30) de zile înainte de a iniția arbitrajul. Negocierile amiabile încep în momentul în care o
                    Parte trimite celeilalte o notificare scrisă.
                </p>
                <h3>Arbitraj obligatoriu</h3>
                <p>
                    Orice litigiu care decurge din relațiile dintre Părțile acestor Termeni legali va fi soluționat de un
                    arbitru ales conform Regulamentului de arbitraj și Regulamentului intern ale Curții Europene de Arbitraj,
                    parte a Centrului European de Arbitraj cu sediul la Strasbourg, în vigoare la data depunerii cererii de
                    arbitrare, iar acceptarea acestei clauze constituie acceptarea acestor regulamente. Sediul arbitrajului
                    va fi Timișoara, România. Limba procedurii va fi limba română. Dreptul material aplicabil va fi dreptul
                    român.
                </p>
                <h3>Restricții</h3>
                <p>
                    Părțile sunt de acord ca orice arbitraj să se limiteze la Litigiul dintre Părți, individual. În măsura
                    maximă permisă de lege, (a) niciun arbitraj nu va fi conexat cu o altă procedură; (b) niciun Litigiu nu
                    poate fi arbitrat sub forma unei acțiuni colective și nu se pot folosi proceduri de acțiune colectivă; și
                    (c) niciun Litigiu nu poate fi introdus în pretinsa calitate de reprezentant al publicului larg sau al
                    altor persoane.
                </p>
                <h3>Excepții de la negocierile amiabile și arbitraj</h3>
                <p>
                    Părțile sunt de acord că următoarele Litigii nu fac obiectul prevederilor de mai sus privind negocierile
                    amiabile și arbitrajul obligatoriu: (a) orice Litigiu care urmărește aplicarea sau protejarea drepturilor
                    de proprietate intelectuală ale unei Părți ori care privește validitatea acestora; (b) orice Litigiu legat
                    de sau care decurge din acuzații de furt, piraterie, încălcare a vieții private sau utilizare
                    neautorizată; și (c) orice cerere de ordonanță. Dacă această prevedere este considerată ilegală sau
                    inaplicabilă, niciuna dintre Părți nu va alege arbitrajul pentru vreun Litigiu care intră sub incidența
                    părții respective a prevederii, iar un astfel de Litigiu va fi soluționat de o instanță competentă dintre
                    cele menționate mai sus, Părțile fiind de acord să se supună jurisdicției acesteia.
                </p>
            </>
        ),
    },
    {
        id: "corrections",
        title: "Corecturi",
        content: (
            <p>
                Serviciile pot conține informații cu greșeli de tipar, inexactități sau omisiuni, inclusiv în descrieri,
                prețuri, disponibilitate și alte informații. Ne rezervăm dreptul de a corecta orice greșeli, inexactități sau
                omisiuni și de a schimba ori actualiza informațiile din Servicii oricând, fără notificare prealabilă.
            </p>
        ),
    },
    {
        id: "disclaimer",
        title: "Declinarea răspunderii",
        content: (
            <p>
                <strong>
                    Serviciile sunt furnizate „ca atare” și „în măsura disponibilității”. Ești de acord că folosești Serviciile
                    exclusiv pe propriul risc. În măsura maximă permisă de lege, declinăm orice garanții, exprese sau
                    implicite, legate de Servicii și de folosirea lor, inclusiv, fără limitare, garanțiile implicite de
                    vandabilitate, de adecvare la un anumit scop și de neîncălcare a drepturilor. Nu oferim garanții și nu
                    facem declarații privind exactitatea sau completitudinea conținutului Serviciilor ori a conținutului
                    site-urilor sau aplicațiilor mobile legate de Servicii și nu ne asumăm nicio răspundere pentru (1) erori,
                    greșeli sau inexactități ale conținutului și materialelor, (2) vătămări corporale sau daune materiale de
                    orice natură, rezultate din accesarea și folosirea Serviciilor, (3) orice acces neautorizat la serverele
                    noastre securizate sau folosire neautorizată a acestora și/sau a oricăror date cu caracter personal și/sau
                    informații financiare stocate pe ele, (4) orice întrerupere sau încetare a transmisiei către sau dinspre
                    Servicii, (5) orice erori, viruși, troieni sau elemente similare care pot fi transmise către sau prin
                    Servicii de către terți și/sau (6) orice erori sau omisiuni din conținut și materiale ori pentru orice
                    pierdere sau prejudiciu de orice fel suferite ca urmare a folosirii oricărui conținut postat, transmis
                    sau pus la dispoziție în alt mod prin Servicii. Nu garantăm, nu susținem, nu asigurăm și nu ne asumăm
                    răspunderea pentru niciun produs sau serviciu promovat ori oferit de un terț prin Servicii, prin orice
                    site accesat printr-un link sau prin orice site ori aplicație mobilă prezentate într-un banner sau într-o
                    altă reclamă și nu vom fi parte și nu vom răspunde în niciun fel pentru monitorizarea vreunei tranzacții
                    dintre tine și furnizorii terți de produse sau servicii. Ca la cumpărarea unui produs sau serviciu prin
                    orice mijloc și în orice context, folosește-ți discernământul și fii prudent atunci când este cazul.
                </strong>
            </p>
        ),
    },
    {
        id: "liability",
        title: "Limitarea răspunderii",
        content: (
            <p>
                <strong>
                    În niciun caz noi sau directorii, angajații ori agenții noștri nu vom răspunde față de tine sau față de
                    vreun terț pentru daune directe, indirecte, de consecință, exemplare, incidentale, speciale sau punitive,
                    inclusiv profit nerealizat, venituri pierdute, pierderi de date sau alte daune care decurg din folosirea
                    Serviciilor, chiar dacă am fost informați despre posibilitatea unor astfel de daune. Fără a ține cont de
                    nicio prevedere contrară din acest document, răspunderea noastră față de tine, pentru orice cauză și
                    indiferent de forma acțiunii, va fi limitată în orice moment la suma plătită de tine către noi, dacă
                    este cazul. Legile anumitor state din SUA și legile internaționale nu permit limitarea garanțiilor
                    implicite ori excluderea sau limitarea anumitor daune. Dacă aceste legi ți se aplică, este posibil ca o
                    parte sau toate declinările ori limitările de mai sus să nu ți se aplice și să ai drepturi suplimentare.
                </strong>
            </p>
        ),
    },
    {
        id: "indemnification",
        title: "Despăgubire",
        content: (
            <p>
                Ești de acord să ne aperi, să ne despăgubești și să ne exonerezi de răspundere, inclusiv filialele, afiliații
                noștri și toți directorii, agenții, partenerii și angajații noștri, față de orice pierdere, prejudiciu,
                răspundere, pretenție sau cerere, inclusiv onorariile și cheltuielile rezonabile cu avocații, formulate de
                orice terț din cauza sau ca urmare a: (1) Contribuțiilor tale; (2) folosirii Serviciilor; (3) încălcării
                acestor Termeni legali; (4) oricărei încălcări a declarațiilor și garanțiilor tale din acești Termeni legali;
                (5) încălcării de către tine a drepturilor unui terț, inclusiv, fără a se limita la, drepturile de proprietate
                intelectuală; sau (6) oricărui act vădit dăunător față de un alt utilizator al Serviciilor cu care ai intrat
                în legătură prin Servicii. Cu toate acestea, ne rezervăm dreptul, pe cheltuiala ta, de a prelua apărarea și
                controlul exclusiv asupra oricărei situații pentru care ești obligat să ne despăgubești, iar tu ești de acord
                să cooperezi, pe cheltuiala ta, la apărarea noastră în astfel de cazuri. Vom depune eforturi rezonabile pentru a
                te anunța despre orice astfel de pretenție, acțiune sau procedură care face obiectul acestei despăgubiri,
                imediat ce aflăm de ea.
            </p>
        ),
    },
    {
        id: "user-data",
        title: "Datele utilizatorilor",
        content: (
            <p>
                Vom păstra anumite date pe care le transmiți prin Servicii pentru a gestiona performanța Serviciilor, precum și
                date legate de folosirea Serviciilor de către tine. Deși facem în mod regulat copii de rezervă ale datelor,
                ești singurul responsabil pentru toate datele pe care le transmiți sau care au legătură cu orice activitate
                desfășurată de tine prin Servicii. Ești de acord că nu avem nicio răspundere față de tine pentru pierderea sau
                deteriorarea acestor date și renunți la orice drept de acțiune împotriva noastră care ar decurge dintr-o
                astfel de pierdere sau deteriorare.
            </p>
        ),
    },
    {
        id: "electronic",
        title: "Comunicări, tranzacții și semnături electronice",
        content: (
            <>
                <p>
                    Vizitarea Serviciilor, trimiterea de emailuri către noi și completarea formularelor online constituie
                    comunicări electronice. Ești de acord să primești comunicări electronice și accepți că toate acordurile,
                    notificările, informările și alte comunicări pe care ți le transmitem electronic, prin email și în
                    Servicii, îndeplinesc orice cerință legală ca acestea să fie făcute în scris.
                </p>
                <p>
                    <strong>
                        Ești de acord cu folosirea semnăturilor, contractelor, comenzilor și altor înregistrări electronice,
                        precum și cu transmiterea electronică a notificărilor, politicilor și evidențelor tranzacțiilor
                        inițiate sau finalizate de noi sau prin Servicii.
                    </strong>{" "}
                    Renunți la orice drepturi sau cerințe prevăzute de legi, reglementări, norme sau ordonanțe din orice
                    jurisdicție care impun o semnătură olografă, transmiterea sau păstrarea unor înregistrări neelectronice
                    ori efectuarea plăților sau acordarea creditelor prin alte mijloace decât cele electronice.
                </p>
            </>
        ),
    },
    {
        id: "miscellaneous",
        title: "Dispoziții diverse",
        content: (
            <p>
                Acești Termeni legali și orice politici sau reguli de funcționare publicate de noi în Servicii ori în legătură
                cu acestea constituie întregul acord dintre tine și noi. Faptul că nu ne exercităm sau nu aplicăm un drept ori
                o prevedere din acești Termeni legali nu înseamnă că renunțăm la acel drept sau la acea prevedere. Acești
                Termeni legali se aplică în măsura maximă permisă de lege. Putem ceda oricând altora oricare sau toate
                drepturile și obligațiile noastre. Nu răspundem pentru nicio pierdere, prejudiciu, întârziere sau neexecutare
                cauzate de împrejurări aflate în afara controlului nostru rezonabil. Dacă o prevedere sau o parte a unei
                prevederi din acești Termeni legali este considerată ilegală, nulă sau inaplicabilă, aceasta se consideră
                separabilă de acești Termeni legali și nu afectează valabilitatea și aplicabilitatea celorlalte prevederi.
                Acești Termeni legali sau folosirea Serviciilor nu creează între tine și noi nicio asociere în participațiune,
                parteneriat, raport de muncă sau de mandat. Ești de acord că acești Termeni legali nu vor fi interpretați în
                defavoarea noastră pe motiv că i-am redactat noi. Renunți la orice apărare pe care ai putea-o invoca pe baza
                formei electronice a acestor Termeni legali și a faptului că nu au fost semnați de părți.
            </p>
        ),
    },
    {
        id: "contact",
        title: "Contact",
        content: (
            <>
                <p>
                    Pentru a soluționa o plângere legată de Servicii sau pentru a primi mai multe informații despre folosirea
                    Serviciilor, contactează-ne la:
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
                <p>
                    Telefon: <a href="tel:+40723971618">+40 723 971 618</a>
                    <br />
                    Email: <a href="mailto:contact@vestvisuals.ro">contact@vestvisuals.ro</a>
                </p>
            </>
        ),
    },
];

const content: LegalContent = {
    title: "Termeni și condiții",
    intro: (
        <>
            <p>
                Suntem VEST VISUALS SRL („Compania”, „noi”, „nouă”, „al nostru”), o societate înregistrată în România, cu
                sediul în Str. Matei Millo nr. 44, 300696 Timișoara, jud. Timiș. Codul nostru unic de înregistrare (CUI) este
                54191210.
            </p>
            <p>
                Administrăm site-ul vestvisuals.ro și subdomeniile lui („Site-ul”), precum și orice alte produse și servicii
                asociate care fac trimitere la acești termeni legali („Termenii legali”) (denumite împreună „Serviciile”).
            </p>
            <p>
                Ne poți contacta telefonic la +40 723 971 618, prin email la contact@vestvisuals.ro sau prin poștă, la Str.
                Matei Millo nr. 44, 300696 Timișoara, jud. Timiș, România.
            </p>
            <p>
                Acești Termeni legali reprezintă un acord obligatoriu din punct de vedere juridic, încheiat între tine, în nume
                propriu sau în numele unei entități („tu”), și VEST VISUALS SRL, privind accesul la Servicii și folosirea lor.
                Accesând Serviciile, ești de acord că ai citit, ai înțeles și accepți să respecți toți acești Termeni legali.{" "}
                <strong className="font-medium text-foreground">
                    Dacă nu ești de acord cu toți acești Termeni legali, îți este interzis în mod expres să folosești Serviciile
                    și trebuie să încetezi imediat să le folosești.
                </strong>
            </p>
            <p>
                Termenii și condițiile sau documentele suplimentare care pot fi publicate periodic în Servicii fac parte în mod
                expres din acest document, prin trimitere. Ne rezervăm dreptul, la discreția noastră exclusivă, de a aduce
                periodic schimbări sau modificări acestor Termeni legali. Te vom anunța despre orice schimbare actualizând data
                „Ultima actualizare” a acestor Termeni legali și renunți la dreptul de a primi o notificare separată pentru
                fiecare schimbare. Este responsabilitatea ta să citești periodic acești Termeni legali, ca să fii la curent cu
                actualizările. Continuând să folosești Serviciile după data publicării Termenilor legali revizuiți, vei fi
                supus acestora și se va considera că ai luat la cunoștință și ai acceptat schimbările.
            </p>
            <p>
                Serviciile sunt destinate utilizatorilor care au împlinit 18 ani. Persoanele sub 18 ani nu au voie să
                folosească Serviciile sau să se înregistreze în ele.
            </p>
            <p>Îți recomandăm să tipărești o copie a acestor Termeni legali, pentru evidența ta.</p>
        </>
    ),
    sections,
};

export default content;
