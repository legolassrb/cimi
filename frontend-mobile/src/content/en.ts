import type { Dictionary } from "./types";

const en: Dictionary = {
  lang: "en",
  meta: {
    title: "Farmadent — family dental practice, Prijepolje",
    description:
      "Farmadent: a family dental practice in Prijepolje, Serbia. General dentistry, surgery, implantology, prosthetics and jaw orthopedics. No online booking — call or message us on WhatsApp.",
  },

  nav: {
    home: "Home",
    oblasti: "Treatments",
    tim: "Team",
    prostor: "Practice",
    cene: "Prices",
    iskustva: "Reviews",
    prviDolazak: "First visit",
    kontakt: "Contact",
  },

  roleLabels: {
    founder: "Founder",
    associate: "Oral surgeon",
    assistant: "Nurse",
    team: "Our team",
  },

  common: {
    call: "Call",
    whatsapp: "WhatsApp",
    back: "Back",
    otherTreatments: "Other treatments",
    langSwitch: "SR",
  },

  home: {
    kicker: "Prijepolje · family practice",
    h1Lines: ["Thirty", "years in", "the same", "chair."],
    lead: "Father and son. Over 10,000 patients, surgery, prosthetics and jaw orthopedics under one roof — with equipment and materials we replace the moment something better comes along.",
    stats: [
      { value: "30", label: "years in practice" },
      { value: "10k+", label: "patients" },
      { value: "3", label: "specialisations" },
    ],
    canyonCaption: "The Mileševka river canyon near Prijepolje — our home, our patients.",
    treatmentsKicker: "What we treat",
    treatmentsCta: "All treatments",
  },

  treatments: [
    {
      slug: "opsta-i-preventivna",
      number: "01",
      title: "General & preventive",
      subtitle: "Check-ups, scaling, fissure sealants",
      kicker: "Treatment 01",
      lead: "Regular check-ups and scaling are the foundation of healthy teeth — we catch problems before they hurt. Fissure sealants protect children's and young teeth from their first cavity.",
      tags: { duration: "20–40 min", visits: "check-up every 6 months", whoKey: "team" },
      stepsTitle: "How the treatment goes",
      steps: [
        { title: "Exam and chat", text: "We look at your teeth and gums, ask about any issues, and suggest an X-ray if needed." },
        { title: "Cleaning", text: "We remove tartar and buildup with an ultrasonic scaler, then rinse and polish." },
        { title: "Plan and advice", text: "We schedule your next check-up and give you concrete home-care advice." },
      ],
      goodToKnowTitle: "Good to know",
      goodToKnow: "A check-up every 6 months is the cheapest treatment you can give yourself — it prevents bigger procedures later.",
      askLabel: "Ask about general & preventive",
    },
    {
      slug: "oralna-hirurgija",
      number: "02",
      title: "Oral surgery",
      subtitle: "Extractions, wisdom teeth, apicoectomy",
      kicker: "Treatment 02",
      lead: "From a simple extraction to surgical removal of wisdom teeth and apicoectomy — done under local anaesthesia, with every step explained clearly.",
      tags: { duration: "30–60 min", visits: "1–2 visits", whoKey: "associate" },
      stepsTitle: "How the treatment goes",
      steps: [
        { title: "X-ray and assessment", text: "A digital X-ray shows the position of the tooth and root before we decide on an approach." },
        { title: "Anaesthesia and procedure", text: "Local anaesthesia, then a careful extraction or surgical procedure, checking your comfort throughout." },
        { title: "Follow-up check", text: "Recovery instructions and a follow-up visit to confirm the site is healing well." },
      ],
      goodToKnowTitle: "Good to know",
      goodToKnow: "Wisdom teeth are most often removed within half an hour, and the pain afterward is usually milder than patients expect.",
      askLabel: "Ask about oral surgery",
    },
    {
      slug: "implantologija",
      number: "03",
      title: "Implantology",
      subtitle: "From a single tooth to a full arch",
      kicker: "Treatment 03",
      lead: "An implant replaces a tooth root and carries a crown, bridge or denture — a solution for one missing tooth or an entire arch.",
      tags: { duration: "60–90 min per implant", visits: "3–6 visits over several months", whoKey: "associate" },
      stepsTitle: "How the treatment goes",
      steps: [
        { title: "Plan and scan", text: "A digital scan and bone assessment determine the number and position of the implants." },
        { title: "Placement", text: "The implant is placed under local anaesthesia, followed by a healing period of several months." },
        { title: "Crown or denture", text: "Once the implant has fused with the bone, we take an impression and make the final restoration." },
      ],
      goodToKnowTitle: "Good to know",
      goodToKnow: "The healing period takes patience, but a well cared-for implant can last decades.",
      askLabel: "Ask about implantology",
    },
    {
      slug: "protetika",
      number: "04",
      title: "Prosthetics",
      subtitle: "Crowns, bridges, dentures",
      kicker: "Treatment 04",
      lead: "Crowns, bridges and dentures restore the function and look of damaged or missing teeth, always planned in person before they're made.",
      tags: { duration: "45–60 min per visit", visits: "2–4 visits", whoKey: "founder" },
      stepsTitle: "How the treatment goes",
      steps: [
        { title: "Preparing the tooth", text: "We prepare the tooth or take an impression for a denture, with a temporary solution until the final piece is ready." },
        { title: "Lab work", text: "A dental technician makes the custom crown, bridge or denture to our plan." },
        { title: "Fitting and adjustment", text: "We check your bite and appearance, fine-tuning as needed before final cementing." },
      ],
      goodToKnowTitle: "Good to know",
      goodToKnow: "A temporary crown or denture is worn until the final piece is ready — let us know right away if anything rubs.",
      askLabel: "Ask about prosthetics",
    },
    {
      slug: "ortopedija-vilica",
      number: "05",
      title: "Jaw orthopedics",
      subtitle: "Aligners and fixed braces",
      kicker: "Treatment 05",
      lead: "We correct the position of teeth and jaw with aligners or fixed braces, for children and adults alike.",
      tags: { duration: "30 min per check-up", visits: "check-up every 4–6 weeks", whoKey: "founder" },
      stepsTitle: "How the treatment goes",
      steps: [
        { title: "Analysis and plan", text: "X-rays and impressions show the exact position of your teeth and set the treatment plan." },
        { title: "Fitting the appliance", text: "We fit the aligner series or fixed braces according to the plan." },
        { title: "Regular check-ups", text: "We track progress and adjust the treatment as needed until the desired result." },
      ],
      goodToKnowTitle: "Good to know",
      goodToKnow: "Keeping up with regular check-ups is key — a missed check-up extends the treatment.",
      askLabel: "Ask about jaw orthopedics",
    },
    {
      slug: "parodontologija",
      number: "06",
      title: "Periodontology",
      subtitle: "Bleeding gums, loose teeth",
      kicker: "Treatment 06",
      lead: "We treat gum inflammation and bleeding before they lead to loose teeth and tooth loss.",
      tags: { duration: "30–45 min", visits: "2–3 visits", whoKey: "team" },
      stepsTitle: "How the treatment goes",
      steps: [
        { title: "Gum exam", text: "We measure pocket depth around your teeth and assess the level of inflammation." },
        { title: "Deep cleaning", text: "We remove tartar below the gumline, with local anaesthesia if needed." },
        { title: "Healing check", text: "We check whether the gums have settled and agree on a regular maintenance schedule." },
      ],
      goodToKnowTitle: "Good to know",
      goodToKnow: "Gums bleeding when you brush is not normal — the sooner you come in, the simpler the treatment.",
      askLabel: "Ask about periodontology",
    },
    {
      slug: "decja-stomatologija",
      number: "07",
      title: "Pediatric dentistry",
      subtitle: "First check-ups, sealants, no rushing",
      kicker: "Treatment 07",
      lead: "A child's first encounter with a dentist shapes their relationship with dental health for life — so we don't rush.",
      tags: { duration: "20–30 min", visits: "check-up every 6 months", whoKey: "team" },
      stepsTitle: "How the treatment goes",
      steps: [
        { title: "Getting acquainted", text: "The child first gets to know the office and the chair, with no pressure to open up right away." },
        { title: "Exam", text: "A gentle check of teeth and gums, explaining each step to the child." },
        { title: "Sealants or advice", text: "We apply fissure sealants if needed, or give parents concrete care advice." },
      ],
      goodToKnowTitle: "Good to know",
      goodToKnow: "We suggest a first check-up as soon as the first teeth come in — an early habit prevents fear later on.",
      askLabel: "Ask about pediatric dentistry",
    },
    {
      slug: "estetika-i-beljenje",
      number: "08",
      title: "Aesthetics & whitening",
      subtitle: "Composites, veneers, whitening",
      kicker: "Treatment 08",
      lead: "Composite fillings, veneers and whitening improve the look of your smile without aggressive procedures.",
      tags: { duration: "45–60 min", visits: "1–3 visits", whoKey: "founder" },
      stepsTitle: "How the treatment goes",
      steps: [
        { title: "Assessing the smile", text: "We discuss the result you want and suggest the most suitable method." },
        { title: "Procedure", text: "Whitening, composite shaping, or veneer preparation, in one or more visits." },
        { title: "Final check", text: "We check the look and feel, with advice on how to make the result last longer." },
      ],
      goodToKnowTitle: "Good to know",
      goodToKnow: "Whitening doesn't damage the tooth when done under dental supervision, with the correct concentration.",
      askLabel: "Ask about aesthetics & whitening",
    },
  ],

  team: {
    kicker: "Our team",
    title: "Two generations, the same chart.",
    members: [
      {
        nameKey: "founder",
        role: "Founder · prosthetics and jaw orthopedics",
        bio: "Opened the practice in 1995. Personally plans every prosthetic case.",
      },
      {
        nameKey: "associate",
        role: "Oral surgery and implantology",
        bio: "Conferences and courses every year — that's where the new equipment comes from.",
      },
      {
        nameKey: "assistant",
        role: "Dental nurse",
        bio: "The first voice on the phone, and everything to do with appointments.",
      },
    ],
  },

  rooms: {
    kicker: "The practice",
    title: "A digital scan, one click.",
    tags: ["Digital X-ray", "Intraoral scanner", "Autoclave sterilisation", "Amalgam-free materials"],
  },

  prices: {
    kicker: "Prices",
    title: "You'll know the price before we start.",
    lead: "No numbers online — every mouth is different. At your check-up you get a written plan with the exact amount and order of work.",
    card1: {
      title: "The first check-up includes",
      items: ["Exam of teeth and gums", "a digital X-ray if needed", "a treatment plan with pricing", "an answer to every question"],
    },
    card2: {
      title: "Always included",
      items: ["Anaesthesia", "a follow-up check after any procedure", "a warranty on prosthetic work", "home-care advice"],
    },
  },

  reviews: {
    kicker: "Reviews",
    rating: "4.9",
    count: "214 Google reviews",
    items: [
      {
        quote: "The only practice our child walks into without crying. They explain everything before they start.",
        author: "Jelena M.",
        source: "Google",
      },
      {
        quote: "The bridge they made is going on eight years now. I come from Nova Varoš and it's worth the drive.",
        author: "Dragan P.",
        source: "Google",
      },
      {
        quote: "Wisdom tooth out in half an hour, no pain afterward. They called the next day to check in.",
        author: "Marija S.",
        source: "Google",
      },
    ],
  },

  firstVisit: {
    kicker: "First visit",
    title: "What to expect",
    faq: [
      {
        q: "Do I need to book ahead?",
        a: "For a routine check-up, calling or messaging ahead is preferred, but we also see emergencies without notice.",
      },
      {
        q: "What should I bring to the first check-up?",
        a: "Your ID, any existing dental records or X-rays you have, and a list of medications you're currently taking.",
      },
      {
        q: "How long does the first check-up take?",
        a: "Usually 20 to 30 minutes — enough time to examine your teeth and gums and put together a treatment plan.",
      },
      {
        q: "Do you see children and anxious patients?",
        a: "Yes, every day. With children we go step by step without rushing, and for anxious patients we explain every move before we make it.",
      },
    ],
    fearCard: {
      title: "Afraid of the dentist?",
      text: "Tell us at the door. We go slower, explain every step, and stop the moment you raise your hand.",
    },
  },

  contact: {
    kicker: "Contact",
    title: "Central Prijepolje, second floor.",
    busNote: "4 minutes on foot from the bus station",
    hoursTitle: "Opening hours",
    mapPlaceholder: "Map — Farmadent, central Prijepolje",
  },
};

export default en;
