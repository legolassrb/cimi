import type { Dictionary } from "./types";

const sr: Dictionary = {
  lang: "sr",
  meta: {
    title: "Farmadent — porodična stomatološka ordinacija, Prijepolje",
    description:
      "Farmadent: porodična stomatološka ordinacija u Prijepolju. Opšta stomatologija, hirurgija, implantologija, protetika i ortopedija vilica. Bez zakazivanja preko sajta — pozovite ili pišite na WhatsApp.",
  },

  nav: {
    home: "Početna",
    oblasti: "Oblasti",
    tim: "Tim",
    prostor: "Prostor",
    cene: "Cene",
    iskustva: "Iskustva",
    prviDolazak: "Prvi dolazak",
    kontakt: "Kontakt",
  },

  roleLabels: {
    founder: "Osnivač",
    associate: "Oralni hirurg",
    assistant: "Sestra",
    team: "Naš tim",
  },

  common: {
    call: "Pozovi",
    whatsapp: "WhatsApp",
    back: "Nazad",
    otherTreatments: "Ostale oblasti",
    langSwitch: "EN",
  },

  home: {
    kicker: "Prijepolje · porodična ordinacija",
    h1Lines: ["Trideset", "godina", "u istoj", "fotelji."],
    lead: "Otac i sin. Preko 10.000 pacijenata, hirurgija, protetika i ortopedija vilica pod jednim krovom — sa opremom i materijalima koje menjamo kad se pojavi bolje.",
    stats: [
      { value: "30", label: "godina rada" },
      { value: "10k+", label: "pacijenata" },
      { value: "3", label: "specijalizacije" },
    ],
    canyonCaption: "Kanjon reke Mileševke kod Prijepolja — naš kraj, naši pacijenti.",
    treatmentsKicker: "Naše oblasti rada",
    treatmentsCta: "Sve oblasti",
  },

  treatments: [
    {
      slug: "opsta-i-preventivna",
      number: "01",
      title: "Opšta i preventivna",
      subtitle: "Kontrole, čišćenje kamenca, zalivanje fisura",
      kicker: "Oblast 01",
      lead: "Redovna kontrola i čišćenje kamenca su temelj zdravih zuba — otkrivamo problem pre nego što zaboli. Zalivanje fisura štiti dečje i mlade zube od prvog kvarenja.",
      tags: { duration: "20–40 min", visits: "kontrola na 6 meseci", whoKey: "team" },
      stepsTitle: "Kako terapija ide",
      steps: [
        { title: "Pregled i razgovor", text: "Pogledamo zube i desni, pitamo za tegobe, po potrebi predložimo snimak." },
        { title: "Čišćenje", text: "Uklanjamo kamenac i naslage ultrazvučnim uređajem, uz ispiranje i poliranje." },
        { title: "Plan i saveti", text: "Dogovorimo sledeću kontrolu i dajemo konkretne savete za negu kod kuće." },
      ],
      goodToKnowTitle: "Dobro je znati",
      goodToKnow: "Kontrola na svakih 6 meseci je najjeftinija terapija koju možete sebi priuštiti — sprečava veće intervencije kasnije.",
      askLabel: "Pitaj za opštu i preventivnu",
    },
    {
      slug: "oralna-hirurgija",
      number: "02",
      title: "Oralna hirurgija",
      subtitle: "Vađenja, umnjaci, apikotomija",
      kicker: "Oblast 02",
      lead: "Od jednostavnog vađenja do hirurškog izvlačenja umnjaka i apikotomije — radimo uz lokalnu anesteziju i jasno objašnjenje svakog koraka.",
      tags: { duration: "30–60 min", visits: "1–2 poseta", whoKey: "associate" },
      stepsTitle: "Kako terapija ide",
      steps: [
        { title: "Snimak i procena", text: "Digitalni rendgen pokazuje položaj zuba i korena pre nego što odredimo pristup." },
        { title: "Anestezija i intervencija", text: "Lokalna anestezija, zatim pažljivo vađenje ili hirurški zahvat, uz stalnu proveru vašeg komfora." },
        { title: "Kontrola posle", text: "Uputstva za oporavak i kontrolni pregled da proverimo da li rana dobro zarasta." },
      ],
      goodToKnowTitle: "Dobro je znati",
      goodToKnow: "Umnjaci se najčešće vade u pola sata, a bol posle intervencije je uglavnom manji nego što pacijenti očekuju.",
      askLabel: "Pitaj za oralnu hirurgiju",
    },
    {
      slug: "implantologija",
      number: "03",
      title: "Implantologija",
      subtitle: "Od jednog zuba do celog niza",
      kicker: "Oblast 03",
      lead: "Implant zamenjuje koren zuba i nosi krunicu, most ili protezu — rešenje za jedan nedostajući zub ili ceo niz.",
      tags: { duration: "60–90 min po implantu", visits: "3–6 poseta kroz nekoliko meseci", whoKey: "associate" },
      stepsTitle: "Kako terapija ide",
      steps: [
        { title: "Plan i snimak", text: "Digitalni snimak i procena kosti određuju broj i položaj implanata." },
        { title: "Ugradnja", text: "Implant se ugrađuje u lokalnoj anesteziji; sledi period zarastanja od nekoliko meseci." },
        { title: "Krunica ili proteza", text: "Kad implant sraste sa kosti, uzimamo otisak i izrađujemo konačan nadoknadni rad." },
      ],
      goodToKnowTitle: "Dobro je znati",
      goodToKnow: "Period zarastanja zahteva strpljenje, ali implant uz dobru negu traje decenijama.",
      askLabel: "Pitaj za implantologiju",
    },
    {
      slug: "protetika",
      number: "04",
      title: "Protetika",
      subtitle: "Krunice, mostovi, proteze",
      kicker: "Oblast 04",
      lead: "Krunice, mostovi i proteze vraćaju funkciju i izgled oštećenih ili nedostajućih zuba, uvek planirani lično pre izrade.",
      tags: { duration: "45–60 min po poseti", visits: "2–4 poseta", whoKey: "founder" },
      stepsTitle: "Kako terapija ide",
      steps: [
        { title: "Priprema zuba", text: "Brusimo zub ili uzimamo otisak za protezu, uz privremeno rešenje do izrade konačnog rada." },
        { title: "Izrada u laboratoriji", text: "Zubni tehničar izrađuje krunicu, most ili protezu po meri, prema našem planu." },
        { title: "Ugradnja i podešavanje", text: "Proveravamo zagriz i izgled, po potrebi fino podešavamo pre konačnog cementiranja." },
      ],
      goodToKnowTitle: "Dobro je znati",
      goodToKnow: "Privremena krunica ili proteza nosi se do izrade konačnog rada — javite se odmah ako vas nešto žulja.",
      askLabel: "Pitaj za protetiku",
    },
    {
      slug: "ortopedija-vilica",
      number: "05",
      title: "Ortopedija vilica",
      subtitle: "Aligneri i fiksne proteze",
      kicker: "Oblast 05",
      lead: "Ispravljamo položaj zuba i vilice alignerima ili fiksnom protezom (bregeti), kod dece i odraslih.",
      tags: { duration: "30 min po kontroli", visits: "kontrola na 4–6 nedelja", whoKey: "founder" },
      stepsTitle: "Kako terapija ide",
      steps: [
        { title: "Analiza i plan", text: "Snimci i otisci pokazuju tačan položaj zuba i određuju plan terapije." },
        { title: "Postavljanje aparata", text: "Postavljamo aligner seriju ili fiksnu protezu prema planu." },
        { title: "Redovne kontrole", text: "Pratimo napredak i po potrebi prilagođavamo terapiju do željenog rezultata." },
      ],
      goodToKnowTitle: "Dobro je znati",
      goodToKnow: "Redovan dolazak na kontrole je ključan — preskočena kontrola produžava terapiju.",
      askLabel: "Pitaj za ortopediju vilica",
    },
    {
      slug: "parodontologija",
      number: "06",
      title: "Parodontologija",
      subtitle: "Krvarenje desni, klaćenje zuba",
      kicker: "Oblast 06",
      lead: "Lečimo upalu i krvarenje desni pre nego što dovedu do klaćenja i gubitka zuba.",
      tags: { duration: "30–45 min", visits: "2–3 poseta", whoKey: "team" },
      stepsTitle: "Kako terapija ide",
      steps: [
        { title: "Pregled desni", text: "Merimo dubinu džepova oko zuba i procenjujemo stepen upale." },
        { title: "Dubinsko čišćenje", text: "Uklanjamo kamenac ispod linije desni, po potrebi uz lokalnu anesteziju." },
        { title: "Kontrola zarastanja", text: "Proveravamo da li se desni smirilo i dogovaramo raspored redovnog održavanja." },
      ],
      goodToKnowTitle: "Dobro je znati",
      goodToKnow: "Krvarenje desni pri pranju zuba nije normalno — što ranije dođete, terapija je jednostavnija.",
      askLabel: "Pitaj za parodontologiju",
    },
    {
      slug: "decja-stomatologija",
      number: "07",
      title: "Dečja stomatologija",
      subtitle: "Prvi pregledi, zalivanje, bez žurbe",
      kicker: "Oblast 07",
      lead: "Prvi susret sa stomatologom oblikuje odnos deteta prema zdravlju zuba za ceo život — zato ne žurimo.",
      tags: { duration: "20–30 min", visits: "kontrola na 6 meseci", whoKey: "team" },
      stepsTitle: "Kako terapija ide",
      steps: [
        { title: "Upoznavanje", text: "Dete se prvo upozna sa ordinacijom i stolicom, bez pritiska da odmah otvori usta." },
        { title: "Pregled", text: "Blag pregled zuba i desni, uz objašnjenje svakog koraka detetu." },
        { title: "Zalivanje ili savet", text: "Po potrebi zalivamo fisure ili dajemo roditeljima konkretne savete za negu." },
      ],
      goodToKnowTitle: "Dobro je znati",
      goodToKnow: "Prvi pregled predlažemo već uz nicanje prvih zuba — rana navika sprečava strah kasnije.",
      askLabel: "Pitaj za dečju stomatologiju",
    },
    {
      slug: "estetika-i-beljenje",
      number: "08",
      title: "Estetika i beljenje",
      subtitle: "Kompoziti, fasete, beljenje",
      kicker: "Oblast 08",
      lead: "Kompozitne plombe, fasete i beljenje poboljšavaju izgled osmeha bez agresivnih zahvata.",
      tags: { duration: "45–60 min", visits: "1–3 poseta", whoKey: "founder" },
      stepsTitle: "Kako terapija ide",
      steps: [
        { title: "Procena osmeha", text: "Razgovaramo o željenom rezultatu i predlažemo najprikladniju metodu." },
        { title: "Zahvat", text: "Beljenje, oblikovanje kompozitom ili priprema za fasete, u jednoj ili više poseta." },
        { title: "Finalni pregled", text: "Proveravamo izgled i osećaj, uz savete kako da rezultat traje duže." },
      ],
      goodToKnowTitle: "Dobro je znati",
      goodToKnow: "Beljenje ne oštećuje zub kad se radi pod stomatološkim nadzorom, sa pravilnom koncentracijom sredstva.",
      askLabel: "Pitaj za estetiku i beljenje",
    },
  ],

  team: {
    kicker: "Naš tim",
    title: "Dve generacije, isti karton.",
    members: [
      {
        nameKey: "founder",
        role: "Osnivač · protetika i dentalna ortopedija",
        bio: "Otvorio ordinaciju 1995. Planira svaki protetski rad lično.",
      },
      {
        nameKey: "associate",
        role: "Oralna hirurgija i implantologija",
        bio: "Kongresi i seminari svake godine — otuda nova oprema.",
      },
      {
        nameKey: "assistant",
        role: "Stomatološka sestra",
        bio: "Prvi glas na telefonu i sve što se tiče termina.",
      },
    ],
  },

  rooms: {
    kicker: "Ordinacija",
    title: "Digitalni snimak, jedan klik.",
    tags: ["Digitalni rendgen", "Intraoralni skener", "Sterilizacija u autoklavu", "Materijali bez amalgama"],
  },

  prices: {
    kicker: "Cene",
    title: "Cenu znate pre nego počnemo.",
    lead: "Bez brojeva na internetu — svaka usta su drugačija. Na pregledu dobijate pisani plan sa tačnim iznosom i redom radova.",
    card1: {
      title: "Prvi pregled uključuje",
      items: ["Pregled zuba i desni", "digitalni snimak po potrebi", "plan terapije sa cenom", "odgovor na svako pitanje"],
    },
    card2: {
      title: "Uvek uključeno",
      items: ["Anestezija", "kontrola posle intervencije", "garancija na protetski rad", "savet za kućnu negu"],
    },
  },

  reviews: {
    kicker: "Iskustva",
    rating: "4,9",
    count: "214 Google ocena",
    items: [
      {
        quote: "Jedina ordinacija u koju dete ulazi bez plača. Sve objasne pre nego počnu.",
        author: "Jelena M.",
        source: "Google",
      },
      {
        quote: "Most rađen kod njih traje osmu godinu. Dolazim iz Nove Varoši i vredi put.",
        author: "Dragan P.",
        source: "Google",
      },
      {
        quote: "Umnjak izvađen u pola sata, bez bolova posle. Pozvali su sutradan da provere.",
        author: "Marija S.",
        source: "Google",
      },
    ],
  },

  firstVisit: {
    kicker: "Prvi dolazak",
    title: "Šta da očekujete",
    faq: [
      {
        q: "Da li mi treba zakazivanje?",
        a: "Za redovnu kontrolu poželjno je zakazivanje telefonom ili porukom, ali hitne slučajeve primamo i bez najave.",
      },
      {
        q: "Šta da donesem na prvi pregled?",
        a: "Ličnu kartu, postojeću stomatološku dokumentaciju ili snimke ako ih imate, i spisak lekova koje trenutno koristite.",
      },
      {
        q: "Koliko traje prvi pregled?",
        a: "Obično 20 do 30 minuta — dovoljno da pregledamo zube i desni i napravimo plan terapije.",
      },
      {
        q: "Radite li sa decom i sa strahom?",
        a: "Da, svakodnevno. Sa decom idemo korak po korak bez žurbe, a pacijentima sa strahom objašnjavamo svaki potez pre nego što ga uradimo.",
      },
    ],
    fearCard: {
      title: "Strah od stomatologa?",
      text: "Recite nam na ulazu. Idemo sporije, objašnjavamo svaki korak i stajemo kad podignete ruku.",
    },
  },

  contact: {
    kicker: "Kontakt",
    title: "Centar Prijepolja, drugi sprat.",
    busNote: "Autobuska stanica na 4 minuta hoda",
    hoursTitle: "Radno vreme",
    mapPlaceholder: "Mapa — Farmadent, centar Prijepolja",
  },
};

export default sr;
