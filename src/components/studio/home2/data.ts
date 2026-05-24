// data.ts — bilingual copy + portfolio data for the Vest Visuals redesign.
// Ported from the Claude Design handoff (data.jsx).

export type Lang = "ro" | "en";
export type Accent = "blue" | "teal";

const CDN = "https://cdn0.vestvisuals.ro";
const U = (id: string, w = 900) =>
    `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

// Live CDN images (verified slugs from the existing site)
export const LIVE = {
    hero1: `${CDN}/portfolio/yu9eomg0ef4f66u2gpbqws4t/large`,
    hero2: `${CDN}/portfolio/x7nxyoz3hwdezu4tr33kb4gw/large`,
    hero3: `${CDN}/portfolio/dafy5npxf0li1130hhap5tvo/large`,
    hero4: `${CDN}/portfolio/m3u1fne49flwng97jamw3avp/large`,
    hero5: `${CDN}/portfolio/uabl3f0ndb4hby7tf428qj9e/large`,
    ts1: `${CDN}/portfolio/dafy5npxf0li1130hhap5tvo/small`,
    ts2: `${CDN}/portfolio/uabl3f0ndb4hby7tf428qj9e/small`,
    ts3: `${CDN}/portfolio/m3u1fne49flwng97jamw3avp/small`,
    ts4: `${CDN}/portfolio/f64uxutmybs9iuc08j1cp73y/small`,
    ts5: `${CDN}/portfolio/ok1f6eurgum0dnwollokpqzv/small`,
    mihail: `${CDN}/assets/xsxzhzldm3y0px8t1md9xc2w/medium`,
    david: `${CDN}/assets/mw9i6zen7sd4tlxyl6d34c8o/medium`,
};

// Photo pools per category — Unsplash for the masonry grids
const PHOTOS: Record<string, string[]> = {
    majorate: [
        U("1519741497674-611481863552"), U("1511285560929-80b456fea0bc", 800),
        U("1529636798458-92182e662485"), U("1465495976277-4387d4b0b4c6", 800),
        U("1519225421980-715cb0215aed"), U("1494774157365-9e04c6720e47", 800),
        U("1525772764200-be829a350797"), U("1583939003579-730e3918a45a", 800),
        U("1469371670807-013ccf25f16a"), U("1606216794074-735e91aa2c92", 800),
        U("1591604466107-ec97de577aff"), U("1532712938310-34cb3982ef74", 800),
    ],
    outdoor: [
        U("1488161628813-04466f872be2"), U("1502136969935-8d8ae65a1d3a", 800),
        U("1469594292607-7bd90f8d3ba4"), U("1517841905240-472988babdf9", 800),
        U("1531746020798-e6953c6e8e04"), U("1524504388940-b1c1722653e1", 800),
        U("1517677129300-07b130802f46"), U("1506634572416-48cdfe530110", 800),
        U("1496440737103-cd596325d314"), U("1539571696357-5a69c17a67c6", 800),
        U("1485178575877-1a13bf489dfe"), U("1503342217505-b0a15ec3261c", 800),
    ],
    automotive: [
        U("1503376780353-7e6692767b70"), U("1494976388531-d1058494cdd8", 800),
        U("1552519507-da3b142c6e3d"), U("1549399542-7e3f8b79c341", 800),
        U("1583121274602-3e2820c69888"), U("1568605114967-8130f3a36994", 800),
        U("1525609004556-c46c7d6cf023"), U("1502877338535-766e1452684a", 800),
        U("1606664515524-ed2f786a0bd6"), U("1605559424843-9e4c228bf1c2", 800),
        U("1493238792000-8113da705763"), U("1542362567-b07e54358753", 800),
    ],
    imobiliare: [
        U("1505693416388-ac5ce068fe85"), U("1502672260266-1c1ef2d93688", 800),
        U("1484101403633-562f891dc89a"), U("1493809842364-78817add7ffb", 800),
        U("1556909114-f6e7ad7d3136"), U("1567016432779-094069958ea5", 800),
        U("1600585154340-be6161a56a0c"), U("1600566753190-17f0baa2a6c3", 800),
        U("1600210492486-724fe5c67fb0"), U("1565182999561-18d7dc61c393", 800),
        U("1600607687939-ce8a6c25118c"), U("1560448204-e02f11c3d0e2", 800),
    ],
    marketing: [
        U("1542744173-8e7e53415bb0"), U("1556761175-5973dc0f32e7", 800),
        U("1454165804606-c3d57bc86b40"), U("1556761175-b413da4baf72", 800),
        U("1542744095-fcf48d80b0fd"), U("1559136555-9303baea8ebd", 800),
        U("1551434678-e076c223a692"), U("1521737711867-e3b97375f902", 800),
        U("1497366216548-37526070297c"), U("1556761175-4b46a572b786", 800),
        U("1517245386807-bb43f82c33c4"), U("1583321500900-82807e458f3c", 800),
    ],
};

export interface CategoryCopy { name: string; tag: string; count: string; }
export interface Category {
    id: string;
    no: string;
    accent: Accent;
    ro: CategoryCopy;
    en: CategoryCopy;
    cover: string;
    photos: string[];
}

export const CATEGORIES: Category[] = [
    { id: "majorate", no: "01", accent: "blue",
        ro: { name: "Majorate", tag: "Aniversări care merită amintite", count: "24 sesiuni" },
        en: { name: "18th Birthdays", tag: "Anniversaries worth remembering", count: "24 sessions" },
        cover: LIVE.hero1, photos: PHOTOS.majorate },
    { id: "outdoor", no: "02", accent: "teal",
        ro: { name: "Ședințe Foto", tag: "Portrete în lumină naturală", count: "38 sesiuni" },
        en: { name: "Outdoor Sessions", tag: "Portraits in natural light", count: "38 sessions" },
        cover: LIVE.hero2, photos: PHOTOS.outdoor },
    { id: "automotive", no: "03", accent: "blue",
        ro: { name: "Automotive", tag: "Mașini, surprinse în mișcare", count: "17 proiecte" },
        en: { name: "Automotive", tag: "Cars, captured in motion", count: "17 projects" },
        cover: LIVE.hero3, photos: PHOTOS.automotive },
    { id: "imobiliare", no: "04", accent: "teal",
        ro: { name: "Imobiliare", tag: "Spații care se vând singure", count: "52 proprietăți" },
        en: { name: "Real Estate", tag: "Spaces that sell themselves", count: "52 properties" },
        cover: LIVE.hero4, photos: PHOTOS.imobiliare },
    { id: "marketing", no: "05", accent: "blue",
        ro: { name: "Promovare Firme", tag: "Conținut comercial cinematic", count: "29 campanii" },
        en: { name: "Brand Content", tag: "Cinematic commercial work", count: "29 campaigns" },
        cover: LIVE.hero5, photos: PHOTOS.marketing },
];

export interface TeamMember {
    first: string;
    last: string;
    img: string;
    ig: string;
    accent: Accent;
    city: string;
    since: string;
    specs: { ro: string[]; en: string[] };
    ro: { role: string; bio: string };
    en: { role: string; bio: string };
}

export const TEAM: TeamMember[] = [
    { first: "Mihail", last: "Mușcă", img: LIVE.mihail, ig: "musca.mihail",
        accent: "blue", city: "Timișoara · RO", since: "2022",
        specs: { ro: ["Foto", "Edit foto", "Edit video"], en: ["Photo", "Photo edit", "Video edit"] },
        ro: { role: "Fotograf principal & editor", bio: "Compozițiile lui se simt naturale — chiar și când fiecare cadru a fost atent gândit." },
        en: { role: "Lead photographer & editor", bio: "His frames feel natural — even when every detail has been carefully composed." } },
    { first: "David", last: "Boștină", img: LIVE.david, ig: "david.bostina",
        accent: "teal", city: "Timișoara · RO", since: "2022",
        specs: { ro: ["Video", "Foto", "Color grading"], en: ["Video", "Photo", "Color grading"] },
        ro: { role: "Videograf principal & colorist", bio: "Transformă cadrele brute în montaje cu ritm, sunet și emoție." },
        en: { role: "Lead videographer & colorist", bio: "Turns raw footage into edits with rhythm, sound, and feeling." } },
];

export interface Testimonial { name: string; img: string; date: string; ro: string; en: string; }

export const TESTIMONIALS: Testimonial[] = [
    { name: "Bara Denis", img: LIVE.ts1, date: "22.03.2026",
        ro: "Pozele au ieșit super, vă mulțumesc mult de tot! Le-am pus pe Instagram cu drag.",
        en: "The photos turned out amazing — thank you so much! Posted them on Instagram with joy." },
    { name: "Ionuț Condescu", img: LIVE.ts2, date: "21.03.2026",
        ro: "Mulțumim pentru poze, au ieșit super frumoase! Recomandăm serviciile.",
        en: "Thank you for the photos, they turned out beautifully. We highly recommend." },
    { name: "Oana & Andrei", img: LIVE.ts3, date: "14.02.2026",
        ro: "Vă mulțumim din suflet pentru tot. Ați fost minunați.",
        en: "Thank you from the bottom of our hearts. You were wonderful." },
    { name: "Vlădescu Răzvan", img: LIVE.ts4, date: "31.08.2025",
        ro: "Pozele apartamentului au ieșit foarte bine — m-au ajutat să-l vând rapid. Punctualitate și profesionalism.",
        en: "The apartment photos turned out so well — they helped me sell quickly. Punctual and professional." },
    { name: "Patrick Săbău", img: LIVE.ts5, date: "16.06.2025",
        ro: "Băieții m-au ajutat cu poze și clipuri excelente pentru mașina mea. Sunt mai mult decât mulțumit.",
        en: "The team shot excellent photos and clips for my car. I’m more than satisfied." },
];

export interface Location {
    slug: string;
    name: string;
    tag: { ro: string; en: string };
    base?: boolean;
    geo: string;
    img: string;
}

export const LOCATIONS: Location[] = [
    { slug: "timisoara", name: "Timișoara", tag: { ro: "Bază · Studio", en: "Home base · Studio" }, base: true,
        geo: "45.7489°N 21.2087°E", img: U("1577896851231-70ef18881754", 1200) },
    { slug: "arad", name: "Arad", tag: { ro: "la 55 km", en: "55 km away" }, geo: "46.1866°N 21.3123°E", img: U("1554310603-d39d43033735", 1200) },
    { slug: "oradea", name: "Oradea", tag: { ro: "la 175 km", en: "175 km away" }, geo: "47.0465°N 21.9189°E", img: U("1601581875309-fafbf2d3ed3a", 1200) },
    { slug: "drobeta", name: "Drobeta-Turnu Severin", tag: { ro: "la 220 km", en: "220 km away" }, geo: "44.6369°N 22.6597°E", img: U("1571902943202-507ec2618e8f", 1200) },
    { slug: "cluj", name: "Cluj-Napoca", tag: { ro: "la 320 km", en: "320 km away" }, geo: "46.7712°N 23.6236°E", img: U("1583325958575-3a0a1bbe3aa3", 1200) },
    { slug: "bucuresti", name: "București", tag: { ro: "la 555 km", en: "555 km away" }, geo: "44.4268°N 26.1025°E", img: U("1572883454114-1cf0031ede2a", 1200) },
];

export interface ProcessStep { k: string; t: string; d: string; }
export interface CopyShape {
    nav: { home: string; about: string; work: string; locations: string; contact: string };
    heroEyebrow: string;
    heroTitle: string[];
    heroSub: string;
    heroCta1: string; heroCta2: string; heroScroll: string;
    aboutKicker: string; aboutTitle: string; aboutLead: string; aboutBody: string;
    workKicker: string; workTitle: string; workSub: string; workView: string;
    processKicker: string; processTitle: string; processBody: string; processSteps: ProcessStep[];
    tsKicker: string; tsTitle: string;
    locKicker: string; locTitle: string;
    contactKicker: string; contactTitle: string; contactLead: string;
    formName: string; formEmail: string; formPhone: string; formType: string; formDate: string; formMsg: string;
    formSend: string; formNote: string;
    footerCta: string;
    portfolioTitle: string; portfolioSub: string;
    galleryFilter: string; galleryAll: string; galleryClose: string; galleryNext: string; galleryPrev: string;
    locationsTitle: string; locationsSub: string;
    aboutTitle2?: string;
}

export const COPY: Record<Lang, CopyShape> = {
    ro: {
        nav: { home: "Acasă", about: "Studio", work: "Portofoliu", locations: "Locații", contact: "Contact" },
        heroEyebrow: "Studio foto-video · Vestul României · Din 2022",
        heroTitle: ["Surprindem", "emoții,", "nu doar", "imagini."],
        heroSub: "Fotografie și videografie pentru nunți, majorate, portrete, automotive, imobiliare și brand content — în Timișoara și pe oriunde ne cheamă povestea.",
        heroCta1: "Vezi portofoliul", heroCta2: "Începe un proiect", heroScroll: "Derulează",
        aboutKicker: "01 · Studio", aboutTitle: "O echipă de doi.\nO singură viziune.",
        aboutLead: "Suntem o echipă pasionată de fotografie și videografie, dedicată să transformăm momente obișnuite în amintiri vizuale memorabile.",
        aboutBody: "Credem în emoție, naturalețe și profesionalism. Lucrăm cu echipament profesional și cu obsesia de a livra fiecare proiect așa cum am vrea să primim noi unul — la timp, atent editat, fără compromisuri.",
        workKicker: "02 · Lucrări", workTitle: "Cinci categorii.\nO obsesie pentru lumină.",
        workSub: "Selecții recente, alese pentru ritm și atmosferă, nu doar volum.",
        workView: "Vezi categoria",
        processKicker: "03 · Proces", processTitle: "Post-producție cinematică.",
        processBody: "Post-producția este etapa unde viziunea prinde cu adevărat viață. Color grading meticulos, corecție audio, montaj cu ritm — fiecare cadru brut devine o piesă de portofoliu.",
        processSteps: [
            { k: "01", t: "Brief", d: "Înțelegem povestea, locul și emoția pe care vrem s-o capturăm." },
            { k: "02", t: "Filmare", d: "Două perspective: una documentară, una atent compusă." },
            { k: "03", t: "Editare", d: "Color grading și selecție, încadrate într-un ritm narativ." },
            { k: "04", t: "Livrare", d: "Galerie online + fișiere finale în maxim 10 zile lucrătoare." },
        ],
        tsKicker: "04 · Clienți", tsTitle: "Ce spun oamenii cu care\nam lucrat.",
        locKicker: "05 · Locații", locTitle: "Lucrăm din Timișoara.\nVenim oriunde.",
        contactKicker: "06 · Contact", contactTitle: "Hai să facem ceva\nfrumos împreună.",
        contactLead: "Trimite-ne câteva detalii — data, locul, ce ai în minte. Răspundem în 24 de ore.",
        formName: "Nume", formEmail: "Email", formPhone: "Telefon", formType: "Tip proiect", formDate: "Data", formMsg: "Detalii proiect",
        formSend: "Trimite cererea", formNote: "Răspundem în 24h · răspuns garantat",
        footerCta: "Hai să povestim",
        portfolioTitle: "Portofoliu", portfolioSub: "Cinci categorii. Apasă pe oricare pentru galeria completă.",
        galleryFilter: "Filtrează", galleryAll: "Toate", galleryClose: "Închide", galleryNext: "Următoare", galleryPrev: "Anterioară",
        locationsTitle: "Lucrăm aici", locationsSub: "Studio în Timișoara — disponibili pentru proiecte în întreaga țară.",
    },
    en: {
        nav: { home: "Home", about: "Studio", work: "Work", locations: "Locations", contact: "Contact" },
        heroEyebrow: "Photo-video studio · Western Romania · Since 2022",
        heroTitle: ["We capture", "emotion,", "not just", "images."],
        heroSub: "Photography and video for weddings, birthdays, portraits, automotive, real estate, and brand content — based in Timișoara, available wherever the story lives.",
        heroCta1: "View the work", heroCta2: "Start a project", heroScroll: "Scroll",
        aboutKicker: "01 · Studio", aboutTitle: "A team of two.\nOne vision.",
        aboutLead: "A small studio obsessed with turning ordinary moments into memorable visual stories.",
        aboutBody: "We believe in emotion, naturalness, and craft. We work with professional gear and the same obsession we’d want from anyone we hired ourselves — on time, carefully edited, no shortcuts.",
        workKicker: "02 · Work", workTitle: "Five categories.\nOne obsession with light.",
        workSub: "A recent selection — picked for rhythm and atmosphere, not volume.",
        workView: "View category",
        processKicker: "03 · Process", processTitle: "Cinematic post-production.",
        processBody: "Post is where vision actually comes alive. Meticulous color grading, audio correction, edits with rhythm — every raw frame becomes a portfolio piece.",
        processSteps: [
            { k: "01", t: "Brief", d: "We understand the story, the place, and the emotion we want to capture." },
            { k: "02", t: "Shoot", d: "Two perspectives: one documentary, one carefully composed." },
            { k: "03", t: "Edit", d: "Color grading and selection, shaped into a narrative rhythm." },
            { k: "04", t: "Deliver", d: "Online gallery + final files within 10 working days." },
        ],
        tsKicker: "04 · Clients", tsTitle: "What the people we’ve worked\nwith have to say.",
        locKicker: "05 · Locations", locTitle: "Based in Timișoara.\nAvailable everywhere.",
        contactKicker: "06 · Contact", contactTitle: "Let’s make something\ngood together.",
        contactLead: "Send us a few details — the date, the place, what you have in mind. We reply within 24 hours.",
        formName: "Name", formEmail: "Email", formPhone: "Phone", formType: "Project type", formDate: "Date", formMsg: "Project details",
        formSend: "Send request", formNote: "We reply within 24h · guaranteed",
        footerCta: "Let’s talk",
        portfolioTitle: "Work", portfolioSub: "Five categories. Tap any to see the full gallery.",
        galleryFilter: "Filter", galleryAll: "All", galleryClose: "Close", galleryNext: "Next", galleryPrev: "Previous",
        locationsTitle: "Where we work", locationsSub: "Studio in Timișoara — available for projects across Romania.",
    },
};
