/* ============================================================
   i18n.js — All translations for the wedding site.
   EN is the default / fallback.
   Load this BEFORE script.js in <head> with no defer/async.
   ============================================================ */

window.I18N = {

  /* ══════════════════════════════════════════════════════════
     ENGLISH (default)
     ══════════════════════════════════════════════════════════ */
  en: {
    /* ── Countdown ── */
    countdownLabel : "Until the big day",
    countdownDays  : "days",
    countdownHrs   : "hrs",
    countdownMin   : "min",
    countdownSec   : "sec",

    /* ── Card topline labels ── */
    card01Label : "Kindly Reply",
    card01Title : "Participation",
    card02Label : "Our Story",
    card02Title : "Our Story",
    card03Label : "Planning Crew",
    card03Title : "The Crew",
    card04Label : "Church Ceremony",
    card04Title : "Church Ceremony",
    card04LabelParty : "The Moment",
    card04TitleParty : "The Day",
    card05Label : "Dress Code",
    card05Title : "Dress Code",
    card06Label : "FAQ",
    card06Title : "FAQ",
    langLabel   : "Language",

    /* ── Crew role labels ── */
    roleGroomSide    : "Groom's Side",
    roleBrideSide    : "Bride's Side",
    rolePastorWorship: "Further Contacts",

    /* ── Individual crew role titles ── */
    crewRoleBestMan     : "Best Man",
    crewRoleGroomsMan   : "Groom's Man",
    crewRoleMaidOfHonor : "Maid of Honor",
    crewRoleBridesMaid  : "Bride's Maid",
    crewRolePastor      : "Pastor",
    crewRoleWorshipTeam : "Worship Team",
    crewRoleBringShare  : "Bring & Share",

    /* ── Bring & Share button in agenda ── */
    bringShareAgendaBtn : "🧁 Let us know what you'll bring",

    /* ── Arrival notice / tooltip ── */
    arrivalNotice  : "Please arrive 30 minutes early.",
    arrivalTip     : "Arrive by",
    arrivalTipBody : "This gives us time to welcome everyone, collect the Bring & Share items, and start the ceremony on time at",
    arrivalTipNote : "Your punctuality is a gift to us. 🎁",

    /* ── Timeline nav ── */
    navCeremony: "💒 Wedding Ceremony",
    navParty   : "🥂 Evening Reception",

    /* ── RSVP card ── */
    rsvpBeginBtn   : "Let us know you're coming →",
    greetingDear   : "Dear",
    crewNote       : "Any questions? Reach out to anyone in the crew — they're wonderful and happy to help.",

    greetingLetterParty:
      "<p>Please arrive by <strong>13:30</strong> — the ceremony begins at <strong>14:00</strong> sharp</p><div class=\"loc-chip\">⛪ Schlosskirche &nbsp;·&nbsp; <a href=\"https://maps.google.com/?q=Schlossallee+6,+40229+D%C3%BCsseldorf\" target=\"_blank\" rel=\"noopener\">Google Maps ↗</a></div>" +
      "<p>🥂 Evening reception from <strong>17:00</strong></p><div class=\"loc-chip\">🥂 Rheinliebe am Deich &nbsp;·&nbsp; <a href=\"https://maps.google.com/?q=Rheinliebe+am+Deich,+Heerstra%C3%9Fe+45,+40549+D%C3%BCsseldorf\" target=\"_blank\" rel=\"noopener\">Google Maps ↗</a></div>" +
      "<p>It only takes a minute to let us know you'll be there. If you can make it to both — wonderful. If you can only join us for the evening — we'll take it, gladly. Just let us know below.</p>" +
      "<p class=\"deadline\">Please confirm your attendance by <strong>18 September</strong>.</p>",

    greetingLetterPartySingle:
      "<p>Please arrive by <strong>13:30</strong> — the ceremony begins at <strong>14:00</strong> sharp</p><div class=\"loc-chip\">⛪ Schlosskirche &nbsp;·&nbsp; <a href=\"https://maps.google.com/?q=Schlossallee+6,+40229+D%C3%BCsseldorf\" target=\"_blank\" rel=\"noopener\">Google Maps ↗</a></div>" +
      "<p>🥂 Evening reception from <strong>17:00</strong></p><div class=\"loc-chip\">🥂 Rheinliebe am Deich &nbsp;·&nbsp; <a href=\"https://maps.google.com/?q=Rheinliebe+am+Deich,+Heerstra%C3%9Fe+45,+40549+D%C3%BCsseldorf\" target=\"_blank\" rel=\"noopener\">Google Maps ↗</a></div>" +
      "<p>It only takes a minute to let us know you'll be there. If you can make it to both — wonderful. If you can only join us for the evening — we'll take it, gladly. Just let us know below.</p>" +
      "<p class=\"deadline\">Please confirm your attendance by <strong>18 September</strong>.</p>",

    greetingLetterCeremony:
      "<ul class=\"letter-timeline\">" +
      "<li class=\"letter-timeline-item\"><span class=\"letter-timeline-dot\"></span><div class=\"letter-timeline-body\"><span class=\"letter-timeline-time\">13:30</span><span class=\"letter-timeline-label\">Get together</span></div></li>" +
      "<li class=\"letter-timeline-item\"><span class=\"letter-timeline-dot\"></span><div class=\"letter-timeline-body\"><span class=\"letter-timeline-time\">14:00</span><span class=\"letter-timeline-label\">Ceremony</span></div></li>" +
      "<li class=\"letter-timeline-item\"><span class=\"letter-timeline-dot\"></span><div class=\"letter-timeline-body\"><span class=\"letter-timeline-time\">15:00–16:00</span><span class=\"letter-timeline-label\">Bring &amp; Share Reception</span></div></li>" +
      "</ul>" +
      "<p class=\"deadline\">Please confirm your attendance by <strong>18 September</strong>.</p>",

    greetingLetterCeremonySingle:
      "<ul class=\"letter-timeline\">" +
      "<li class=\"letter-timeline-item\"><span class=\"letter-timeline-dot\"></span><div class=\"letter-timeline-body\"><span class=\"letter-timeline-time\">13:30</span><span class=\"letter-timeline-label\">Get together</span></div></li>" +
      "<li class=\"letter-timeline-item\"><span class=\"letter-timeline-dot\"></span><div class=\"letter-timeline-body\"><span class=\"letter-timeline-time\">14:00</span><span class=\"letter-timeline-label\">Ceremony</span></div></li>" +
      "<li class=\"letter-timeline-item\"><span class=\"letter-timeline-dot\"></span><div class=\"letter-timeline-body\"><span class=\"letter-timeline-time\">15:00–16:00</span><span class=\"letter-timeline-label\">Bring &amp; Share Reception</span></div></li>" +
      "</ul>" +
      "<p class=\"deadline\">Please confirm your attendance by <strong>18 September</strong>.</p>",

    /* ── RSVP Wizard ── */
    step1Label       : "Step 1 of 2 — Your Details & Attendance",
    step1LabelChurch : "Step 1 of 2 — Your Details & Ceremony Attendance",
    step2Label    : "Step 2 of 2 — Confirm Seats",
    firstNameLabel: "First name",
    lastNameLabel : "Last name",
    firstNamePlaceholder: "First name",
    lastNamePlaceholder : "Last name",
    yourNamesLabel   : "Your names",
    familyNameLabel  : "Family name",
    emailLabel    : "Email",
    emailPlaceholder: "Email address",
    phoneLabel    : "Phone",
    phonePlaceholder: "Optional",
    nextBtn       : "Next →",
    backBtn       : "← Back",
    ceremonyAttendLabel: "💒 Church Ceremony · 16 Oct, 14:00",
    eveningAttendLabel : "🥂 Evening Reception · 16 Oct, 17:00",
    attendingBtn      : "Yes, I'll be there",
    notAttendingBtn   : "Sadly, no",
    attendingBtnParty : "Attending",
    notAttendingBtnParty: "Not Attending",
    churchOnlyQuestion : "💒 Will you be joining us?",
    churchOnlyYesBtn   : "Yes, I'll be there",
    churchOnlyNoBtn    : "No, I can't make it",
    guestsLabel        : "Guests",
    guestsHint         : "Pre-selected — tap to deselect if someone can't attend.",
    tlGetTogether      : "Get together",
    tlCeremony         : "Ceremony",
    tlReception        : "Bring & Share",
    tlParty            : "Evening Party",
    bringShareAttendLabel: "🎂 Bring & Share · After ceremony",
    comingByCarLabel   : "I'll be coming by car",
    comingByCarHint    : "Helpful for parking coordination",
    childrenLabel  : "👶 Children attending",
    bringShareLabel: "Contribute",
    seatConfirmLabel: "Total seats reserved for you",
    seatHint       : "Adjust if needed — every seat helps us plan. 🙏",
    declineLabel   : "Leave us a note (optional)",
    declinePlaceholder: "We'll miss you — feel free to say something 💛",
    sendRsvpBtn    : "Confirm attendance ✓",
    selectAttendanceErr: "Please let us know if you'll be attending the ceremony.",
    rsvpSubmittedBtn   : "Attendance confirmed ✓",
    submitAnotherRsvp  : "Submit for another guest",
    spotifyBtn         : "Add your song to our wedding playlist",
    card07Label        : "The Celebration",
    card07Title        : "The Celebration",
    card07Intro        : "A few ways to be part of the day — before, during and after.",
    spotifyTileTitle   : "Wedding Playlist",
    spotifyTileDesc    : "Add the song that gets you on the dance floor",
    photoTileTitle     : "Photo Wall",
    photoTileDesc      : "Share your photos from the day — coming soon",
    comingSoon         : "Soon",
    bsTileTitle        : "Bring & Share",
    bsTileDesc         : "Bringing something to the celebration? Let us know",
    calTileTitle       : "Add to Calendar",
    calTileDescCeremony: "Save the ceremony to your calendar",
    calTileDescFull    : "Save both the ceremony & evening to your calendar",

    /* ── Adult/child seat summary ── */
    adultSingular  : "adult",
    adultPlural    : "adults",
    childSingular  : "child",
    childPlural    : "children",

    /* ── RSVP Success overlay ── */
    successKicker          : "THANK YOU",
    successTitleAttending  : "We can't wait to see you there!",
    successTitleDecline    : "We are sorry you cannot make it.",
    successMsgAttending    : "We have received your participation confirmation. Thank you for being part of this special day.",
    successMsgDecline      : "Thank you for letting us know. You will be missed — we hope to celebrate together soon.",
    successCardAttending   : "We can't wait to see you there!",
    successCardDecline     : "We are sorry you cannot make it. Thank you for letting us know.",

    /* ── Gift banner ── */
    giftBannerTitle  : "Your presence is already our greatest gift",
    giftBannerBody   : "If you want to bless us with something — a contribution towards our new home or honeymoon would mean the world to us.",
    giftPaypalBtn    : "Bless us digitally ↗",
    giftNoteCeremony : "There'll also be a gift box at the church. ♡",
    giftNoteParty    : "There'll also be a gift box at the church and at the venue. ♡",
    bringShareNudge  : "Bring & Share 🧁",

    /* ── Sticky banner ── */
    bannerText: "📋 Let us know you're coming",

    /* ── Soft Gate / Floating Card / Scroll Lock ── */
    gateSalutation   : "You are invited",
    gateSeatsText    : "Location: Schlosskirche Eller &nbsp;·&nbsp; <a href=\"https://maps.google.com/?q=Schlossallee+6,+40229+D%C3%BCsseldorf\" target=\"_blank\" rel=\"noopener\">Google Maps ↗</a>",
    gateBody         : "Get together <strong>13:30</strong> → Ceremony: <strong>14:00</strong> → Bring & Share Reception: <strong>15:00-16:00</strong></br>After the ceremony, we would love you to stay for a small <strong>Reception</strong> outside the church building. We would like to have a <strong>Bring & Share</strong> and would really appreciate guests bringing cakes, pies, or finger food to share.",
    gateNote         : "If you would like to contribute to the <strong>Bring & Share</strong>, you can sign up later when you respond to the invitation. ♡",
    gateCtaBtn       : "Send us your RSVP →",
    gateSkipBtn      : "I'll explore first",
    scrollLockTitle  : "One moment, {name}",
    scrollLockBody   : "You scrolled past Participation.<br>It takes less than a minute — and it means<br>everything to us to know you'll be there.",
    scrollLockCta    : "Send us your RSVP →",
    scrollLockSkip   : "Continue browsing",
    bannerBtn : "RSVP here ↓",

    /* ── View on map ── */
    viewOnMap: "View on Map ↗",

    /* ── Bring & Share modal ── */
    bsStep1Title    : "What are you bringing?",
    bsStep1Hint     : "Let us know what you plan to bring so we can plan ahead. You're not expected to bring for 140 people! 🙂",
    bsWhatLabel     : "What will you bring? *",
    bsWhatPlaceholder: "e.g. apple pie, finger sandwiches…",
    bsPortionsLabel  : "How many portions? *",
    bsPortionsPlaceholder: "e.g. 12",
    bsPortionsSmall  : "We are planning for ~140 guests incl. kids. Every contribution helps!",
    bsStep2Title    : "About your food",
    bsFoodTypeLabel  : "What type of food?",
    bsAllergenLabel  : "Does your food include allergens?",
    bsFoodVegan : "Vegan",
    bsFoodVeg   : "Vegetarian",
    bsFoodGF    : "Gluten-free",
    bsFoodMeat  : "Contains meat",
    bsAllergenNuts  : "Nuts",
    bsAllergenHoney : "Honey",
    bsAllergenMilk  : "Cow Milk",
    bsAllergenEggs  : "Eggs",
    bsAllergenGluten: "Gluten",
    bsStep3Title    : "Your contact details",
    bsStep3Hint     : "So we can reach you about logistics.",
    bsNameLabel     : "Full Name *",
    bsNamePlaceholder: "Your full name",
    bsPhoneLabel    : "Phone or Email *",
    bsPhonePlaceholder: "+49 123 456 or email@...",
    bsDoneKicker    : "You're amazing 🧁",
    bsDoneTitle     : "Thank you so much for your contribution!",
    bsDoneHint      : "We've noted what you're bringing and will be in touch if needed.",
    bsArrivalText   : "Please arrive by <strong>13:30</strong> and place your contribution on the <strong>Bring &amp; Share table</strong> set up outside the church entrance — it will be clearly labelled. Our team will take care of the rest.",
    bsContactHint   : "Any questions? Reach out to <strong>Kathi Meyer</strong> — <a href=\"tel:+491626247906\">+49 162 6247906</a>.",
    bsWarmHint      : "We can't wait to celebrate with you. ♡",
    bsClose         : "Close",

    /* ── Party RSVP wizard ── */
    partyKicker        : "One more thing",
    partyTitle         : "Will you join us at the evening celebration?",
    partyHint          : "Even if you can't make the ceremony, you're warmly welcome to join us in the evening. We'd love to have you there too.",
    partyYesBtn        : "Yes, I'll be there",
    partyNoBtn         : "I can't make the party",
    partyStep2Kicker   : "Almost done",
    partyStep2Title    : "Any dietary needs?",
    partyStep2Hint     : "Let us know so we can make sure there's something for everyone.",
    partyDietVegan     : "Vegan",
    partyDietVeg       : "Vegetarian",
    partyDietGF        : "Gluten-free",
    partyDietHalal     : "Halal",
    partyDietNone      : "No restrictions",
    partyNotesLabel    : "Anything else we should know?",
    partyNotesPlaceholder: "Allergies, needs, questions…",
    partyDoneKicker    : "Can't wait ♡",
    partyDoneTitle     : "See you at the party!",
    partyDoneHint      : "We've noted everything. Here are the details:",
    partyVenueName     : "🎉 Evening Celebration",
    partyVenueLocation : "📍 Rheinliebe am Deich",
    partyVenueDoors    : "🕔 Doors open at",
    partyMapBtn        : "📍 View on Google Maps ↗",
    partyDeclinedKicker: "Understood",
    partyDeclinedTitle : "Thank you for letting us know.",
    partyDeclinedHint  : "We'll miss you at the party — but hope to celebrate together another time. ♡",

    /* ── Content: Love Story ── */
    storyParagraphs: [
      "Our journey began as friends sharing the same calling, serving at our church and investing into our own community which after began to develop into something more foundational.",
      "As we became more familiar with each other's ambition in life, future goals and values we could not just stay friends anymore. Fast forward to 02.03, while we visited our family in Norway, on a small island we got engaged and decided to spend the rest of our lives together.",
      "This decision brings us to this day, 16.10, where we enter into a covenant of lifetime. ❤️"
    ],

    /* ── Content: Ceremony agenda ── */
    agenda: [
      {
        time: "13:30", label: "GET TOGETHER", title: "Get Together",
        location: "Schlosskirche Eller", address: "Schlossallee 6, 40229 Düsseldorf",
        mapUrl: "https://maps.google.com/?q=Schlossallee+6,+40229+D%C3%BCsseldorf",
        description: "Arrive, meet familiar faces, and settle in before the ceremony begins."
      },
      {
        time: "14:00", label: "CEREMONY", title: "Ceremony Start",
        description: "Please <strong>take your seat before 14:00</strong> so we can start on time. We kindly ask you to <strong>put your phones away</strong> and enjoy the moment with us. Our photographer and videographer will take care of capturing the ceremony."
      },
      {
        time: "15:00–16:00", label: "RECEPTION", title: "Bring & Share Reception",
        bringAndShare: true, bringAndShareFormUrl: "https://forms.gle/4C6RUZfEKunpWGoc8",
        description: "We would love a bring & share with our dear ones! Let us know if you'd like to bring a pie, cake, bakery, finger foods, or anything for a little snack. ❤️<br><br><strong>Already signed up during Participation? You're all set — no need to fill anything in again.</strong>"
      },
      {
        time: "17:00", label: "EVENING PARTY", title: "Evening Reception",
        partyOnly: true,
        location: "Rheinliebe am Deich", address: "Heerstraße 45, 40549 Düsseldorf",
        mapUrl: "https://maps.google.com/?q=Rheinliebe+am+Deich+D%C3%BCsseldorf",
        description: ""
      }
    ],

    /* ── Content: Dress Code ── */
    dressIntro : "Elegant classic attire in soft neutrals and deep classic tones.",
    dressNote  : "Please avoid neon tones and very bright patterns.",
    dressColors: [
      { name: "White",  cls: "champagne" },
      { name: "Ivory",  cls: "ivory"     },
      { name: "Taupe",  cls: "taupe"     },
      { name: "Cocoa",  cls: "cocoa"     },
      { name: "Brown",  cls: "charcoal"  },
      { name: "Black",  cls: "black"     }
    ],

    /* ── Content: FAQ ── */
    faq: [
      { q: "Can I bring a plus one?",        a: "Please follow your invite. We would love to have our dear ones but have a limited number of seats in the church." },
      { q: "Are there any parking spots?",   a: "Yes! There are some directly at the church, as well as near the houses around it, and a bigger parking area within walking distance." },
      { q: "Is there a wish list?",          a: "No wish list — but if you'd like to gift us something, we would be so grateful for a financial contribution toward starting our new home together and celebrating our honeymoon." },
      { q: "Is there any place for kids?",   a: "Kids are more than welcome! We would kindly ask that they sit or play in the kids' space at the back of the church during the ceremony. Thank you ❤️" },
      { q: "When should I arrive?",          a: "We'd love to see you at 13:30 for the get together — ceremony starts at 14:00." },
      { q: "Who can I contact?",             a: "The best man or maid of honor are your go-to contacts — find them in the Crew section." }
    ]
  },


  /* ══════════════════════════════════════════════════════════
     GERMAN
     ══════════════════════════════════════════════════════════ */
  de: {
    countdownLabel : "Bis zum großen Tag",
    countdownDays  : "Tage",
    countdownHrs   : "Std",
    countdownMin   : "Min",
    countdownSec   : "Sek",

    card01Label : "Bitte antworten",
    card01Title : "Teilnahme",
    card02Label : "Unsere Geschichte",
    card02Title : "Unsere Geschichte",
    card03Label : "Unser Team",
    card03Title : "Das Team",
    card04Label : "Kirchliche Trauung",
    card04Title : "Kirchliche Trauung",
    card04LabelParty : "Der Moment",
    card04TitleParty : "Der Tag",
    card05Label : "Dresscode",
    card05Title : "Dresscode",
    card06Label : "FAQ",
    card06Title : "FAQ",
    langLabel   : "Sprache",

    roleGroomSide    : "Bräutigamsseite",
    roleBrideSide    : "Brautseite",
    rolePastorWorship: "Weitere Kontakte",

    crewRoleBestMan     : "Trauzeuge",
    crewRoleGroomsMan   : "Bräutigamsmann",
    crewRoleMaidOfHonor : "Trauzeugin",
    crewRoleBridesMaid  : "Brautjungfer",
    crewRolePastor      : "Pastor",
    crewRoleWorshipTeam : "Worship-Team",
    crewRoleBringShare  : "Bring & Share",

    bringShareAgendaBtn : "🧁 Sagt uns, was ihr mitbringt",

    arrivalNotice  : "Bitte 30 Minuten früher erscheinen.",
    arrivalTip     : "Ankunft bis",
    arrivalTipBody : "So haben wir Zeit, alle zu begrüßen, die Bring-&-Share-Beiträge zu sammeln und die Zeremonie pünktlich um",
    arrivalTipNote : "Deine Pünktlichkeit ist ein Geschenk für uns. 🎁",

    navCeremony: "💒 Kirchliche Trauung",
    navParty   : "🥂 Abendempfang",

    rsvpBeginBtn   : "Jetzt zur Anmeldung →",
    greetingDear   : "Liebe/Lieber",
    crewNote       : "Fragen? Wendet euch an jemanden aus dem Team — sie helfen euch gerne weiter.",

    greetingLetterParty:
      "<p>Wir freuen uns so sehr, euch an unserem Hochzeitstag bei uns zu haben — einem der wichtigsten Tage unseres Lebens. Wir möchten ihn nicht ohne euch erleben.</p>" +
      "<p>Bitte kommt bis <strong>13:30</strong> — die Trauung beginnt pünktlich um <strong>14:00 Uhr</strong></p><div class=\"loc-chip\">⛪ Schlosskirche Eller &nbsp;·&nbsp; <a href=\"https://maps.google.com/?q=Schlossallee+6,+40229+D%C3%BCsseldorf\" target=\"_blank\" rel=\"noopener\">Google Maps ↗</a></div>" +
      "<p>🥂 Abendempfang ab <strong>17:00 Uhr</strong></p><div class=\"loc-chip\">🥂 Rheinliebe am Deich &nbsp;·&nbsp; <a href=\"https://maps.google.com/?q=Rheinliebe+am+Deich,+Heerstra%C3%9Fe+45,+40549+D%C3%BCsseldorf\" target=\"_blank\" rel=\"noopener\">Google Maps ↗</a></div>" +
      "<p>Im Anschluss an die Zeremonie laden wir euch herzlich ein, zu einem kleinen<strong>Empfang</strong> / <strong>„Bring and Share“</strong> außerhalb des Kirchengebäudes zu bleiben</p>" +
      "<p class=\"deadline\">Bitte bestätigt eure Teilnahme bis zum <strong>18. September</strong>.</p>",

    greetingLetterPartySingle:
      "<p>Wir freuen uns so sehr, dich an unserem Hochzeitstag bei uns zu haben — einem der wichtigsten Tage unseres Lebens. Wir möchten ihn nicht ohne dich erleben.</p>" +
      "<p>Bitte komm bis <strong>13:30</strong> — die Trauung beginnt pünktlich um <strong>14:00 Uhr</strong></p><div class=\"loc-chip\">⛪ Schlosskirche Eller &nbsp;·&nbsp; <a href=\"https://maps.google.com/?q=Schlossallee+6,+40229+D%C3%BCsseldorf\" target=\"_blank\" rel=\"noopener\">Google Maps ↗</a></div>" +
      "<p>🥂 Abendempfang ab <strong>17:00 Uhr</strong></p><div class=\"loc-chip\">🥂 Rheinliebe am Deich &nbsp;·&nbsp; <a href=\"https://maps.google.com/?q=Rheinliebe+am+Deich,+Heerstra%C3%9Fe+45,+40549+D%C3%BCsseldorf\" target=\"_blank\" rel=\"noopener\">Google Maps ↗</a></div>" +
      "<p>Im Anschluss an die Zeremonie laden wir euch herzlich ein, zu einem kleinen<strong>Empfang</strong> / <strong>„Bring and Share“</strong> außerhalb des Kirchengebäudes zu bleiben</p>" +
      "<p class=\"deadline\">Bitte bestätige deine Teilnahme bis zum <strong>18. September</strong>.</p>",

    greetingLetterCeremony:
      "<ul class=\"letter-timeline\">" +
      "<li class=\"letter-timeline-item\"><span class=\"letter-timeline-dot\"></span><div class=\"letter-timeline-body\"><span class=\"letter-timeline-time\">13:30</span><span class=\"letter-timeline-label\">Ankommen</span></div></li>" +
      "<li class=\"letter-timeline-item\"><span class=\"letter-timeline-dot\"></span><div class=\"letter-timeline-body\"><span class=\"letter-timeline-time\">14:00</span><span class=\"letter-timeline-label\">Zeremonie</span></div></li>" +
      "<li class=\"letter-timeline-item\"><span class=\"letter-timeline-dot\"></span><div class=\"letter-timeline-body\"><span class=\"letter-timeline-time\">15:00–16:00</span><span class=\"letter-timeline-label\">Bring &amp; Share Empfang</span></div></li>" +
      "</ul>" +
      "<p class=\"deadline\">Bitte bestätigt eure Teilnahme bis zum <strong>18. September</strong>.</p>",

    greetingLetterCeremonySingle:
      "<ul class=\"letter-timeline\">" +
      "<li class=\"letter-timeline-item\"><span class=\"letter-timeline-dot\"></span><div class=\"letter-timeline-body\"><span class=\"letter-timeline-time\">13:30</span><span class=\"letter-timeline-label\">Ankommen</span></div></li>" +
      "<li class=\"letter-timeline-item\"><span class=\"letter-timeline-dot\"></span><div class=\"letter-timeline-body\"><span class=\"letter-timeline-time\">14:00</span><span class=\"letter-timeline-label\">Zeremonie</span></div></li>" +
      "<li class=\"letter-timeline-item\"><span class=\"letter-timeline-dot\"></span><div class=\"letter-timeline-body\"><span class=\"letter-timeline-time\">15:00–16:00</span><span class=\"letter-timeline-label\">Bring &amp; Share Empfang</span></div></li>" +
      "</ul>" +
      "<p class=\"deadline\">Bitte bestätige deine Teilnahme bis zum <strong>18. September</strong>.</p>",

    step1Label       : "Schritt 1 von 2 — Eure Daten & Teilnahme",
    step1LabelChurch : "Schritt 1 von 2 — Eure Daten & Teilnahme an der Trauung",
    step2Label    : "Schritt 2 von 2 — Plätze bestätigen",
    firstNameLabel: "Vorname",
    lastNameLabel : "Nachname",
    firstNamePlaceholder: "Vorname",
    lastNamePlaceholder : "Nachname",
    yourNamesLabel   : "Eure Namen",
    familyNameLabel  : "Familienname",
    emailLabel    : "E-Mail",
    emailPlaceholder: "E-Mail-Adresse",
    phoneLabel    : "Telefon",
    phonePlaceholder: "Optional",
    nextBtn       : "Weiter →",
    backBtn       : "← Zurück",
    ceremonyAttendLabel: "💒 Kirchliche Trauung · 16. Okt, 14:00",
    eveningAttendLabel : "🥂 Abendempfang · 16. Okt, 17:00",
    attendingBtn      : "Ja, klar",
    notAttendingBtn   : "Leider nein",
    attendingBtnParty : "Ich komme",
    notAttendingBtnParty: "Ich kann nicht",
    churchOnlyQuestion : "💒 Bist du dabei?",
    churchOnlyYesBtn   : "Ja, ich bin dabei",
    churchOnlyNoBtn    : "Leider nein",
    guestsLabel        : "Gäste",
    guestsHint         : "Vorausgewählt — tippe, um jemanden abzuwählen, der nicht kommen kann.",
    tlGetTogether      : "Ankommen",
    tlCeremony         : "Zeremonie",
    tlReception        : "Bring & Share",
    tlParty            : "Abendparty",
    bringShareAttendLabel: "🎂 Bring & Share · Nach der Zeremonie",
    comingByCarLabel   : "Ich komme mit dem Auto",
    comingByCarHint    : "Hilft uns bei der Parkplatzkoordination",
    childrenLabel  : "👶 Kinder dabei",
    bringShareLabel: "Beitragen",
    seatConfirmLabel: "Reservierte Plätze insgesamt",
    seatHint       : "Bei Bedarf anpassen — jeder Platz hilft uns bei der Planung. 🙏",
    declineLabel   : "Hinterlasst uns eine Nachricht (optional)",
    declinePlaceholder: "Wir vermissen euch — sagt gerne etwas 💛",
    sendRsvpBtn    : "Teilnahme bestätigen ✓",
    selectAttendanceErr: "Bitte gebt an, ob ihr zur Trauung kommt.",
    rsvpSubmittedBtn   : "Teilnahme bestätigt ✓",
    submitAnotherRsvp  : "Für eine weitere Person einreichen",
    spotifyBtn         : "Füg deinen Song zur Hochzeitsplaylist hinzu",
    card07Label        : "Die Feier",
    card07Title        : "Die Feier",
    card07Intro        : "Ein paar Wege, Teil des Tages zu sein — vorher, während und danach.",
    spotifyTileTitle   : "Hochzeitsplaylist",
    spotifyTileDesc    : "Füg den Song hinzu, der dich auf die Tanzfläche bringt",
    photoTileTitle     : "Fotowand",
    photoTileDesc      : "Teile deine Fotos vom Tag — demnächst verfügbar",
    comingSoon         : "Bald",
    bsTileTitle        : "Bring & Share",
    bsTileDesc         : "Bringst du etwas mit? Sag uns kurz Bescheid",
    calTileTitle       : "Zum Kalender hinzufügen",
    calTileDescCeremony: "Trauung im Kalender speichern",
    calTileDescFull    : "Trauung & Abendempfang im Kalender speichern",

    adultSingular  : "Erwachsener",
    adultPlural    : "Erwachsene",
    childSingular  : "Kind",
    childPlural    : "Kinder",

    successKicker          : "DANKE",
    successTitleAttending  : "Wir freuen uns riesig, euch an unserem besonderen Tag zu sehen.",
    successTitleDecline    : "Es tut uns leid, dass ihr nicht dabei sein könnt.",
    successMsgAttending    : "Wir haben eure Rückmeldung erhalten. Danke, dass ihr Teil dieses besonderen Tages seid.",
    successMsgDecline      : "Danke für eure Rückmeldung. Ihr werdet fehlen — wir hoffen, bald zusammen zu feiern.",
    successCardAttending   : "Wir freuen uns riesig, euch an unserem besonderen Tag zu sehen.",
    successCardDecline     : "Schade, dass ihr nicht kommen könnt. Danke für eure Rückmeldung.",

    giftBannerTitle  : "Eure Anwesenheit ist bereits unser größtes Geschenk",
    giftBannerBody   : "Wenn ihr uns etwas schenken möchtet — ein Beitrag für unser neues Zuhause oder unsere Flitterwochen würde uns unglaublich viel bedeuten.",
    giftPaypalBtn    : "Digital schenken ↗",
    giftNoteCeremony : "In der Kirche steht auch eine Geschenkbox. ♡",
    giftNoteParty    : "In der Kirche und am Abendlocation steht auch eine Geschenkbox. ♡",
    bringShareNudge  : "Bring & Share 🧁",

    bannerText: "📋 Bitte meldet euch an",

    /* ── Soft Gate / Floating Card / Scroll Lock ── */
    gateSalutation   : "Ihr seid herzlich eingeladen,",
    gateSeatsText    : "Standort: Schlosskirche Eller &nbsp;·&nbsp; <a href=\"https://maps.google.com/?q=Schlossallee+6,+40229+D%C3%BCsseldorf\" target=\"_blank\" rel=\"noopener\">Google Maps ↗</a>",
    gateBody         : "Ankommen <strong>13:30</strong> → Zeremonie: <strong>14:00</strong> → Bring & Share Empfang: <strong>15:00-16:00</strong></br>Im Anschluss an die Zeremonie laden wir euch herzlich ein, zu einem kleinen <strong>Empfang</strong> außerhalb des Kirchengebäudes zu bleiben. Wir möchten ein <strong>Bring & Share</strong> machen und würden uns sehr freuen, wenn Gäste Kuchen, Torten oder Fingerfood zum Teilen mitbringen.",
    gateNote         : "Wenn ihr zum <strong>Bring & Share</strong> beitragen möchtet, könnt ihr euch später bei eurer Rückmeldung zur Einladung anmelden. ♡",
    gateCtaBtn       : "Zur Anmeldung →",
    gateSkipBtn      : "Ich schaue mich erst um",
    scrollLockTitle  : "Kurz innehalten, {name}",
    scrollLockBody   : "Du hast die Teilnahme überscrollt.<br>Es dauert weniger als eine Minute — und es bedeutet<br>uns alles, zu wissen, dass du dabei bist.",
    scrollLockCta    : "Zur Anmeldung →",
    scrollLockSkip   : "Weiter stöbern",
    bannerBtn : "Hier anmelden ↓",
    viewOnMap : "Auf der Karte anzeigen ↗",

    bsStep1Title    : "Was bringt ihr mit?",
    bsStep1Hint     : "Sagt uns, was ihr plant, damit wir besser planen können. Ihr müsst nicht für 140 Personen bringen! 🙂",
    bsWhatLabel     : "Was bringt ihr mit? *",
    bsWhatPlaceholder: "z.B. Apfelkuchen, Fingerfood…",
    bsPortionsLabel  : "Wie viele Portionen? *",
    bsPortionsPlaceholder: "z.B. 12",
    bsPortionsSmall  : "Wir planen für ca. 140 Gäste inkl. Kinder. Jeder Beitrag hilft!",
    bsStep2Title    : "Über euer Essen",
    bsFoodTypeLabel  : "Art des Essens?",
    bsAllergenLabel  : "Enthält euer Essen Allergene?",
    bsFoodVegan : "Vegan",
    bsFoodVeg   : "Vegetarisch",
    bsFoodGF    : "Glutenfrei",
    bsFoodMeat  : "Mit Fleisch",
    bsAllergenNuts  : "Nüsse",
    bsAllergenHoney : "Honig",
    bsAllergenMilk  : "Kuhmilch",
    bsAllergenEggs  : "Eier",
    bsAllergenGluten: "Gluten",
    bsStep3Title    : "Eure Kontaktdaten",
    bsStep3Hint     : "Damit wir euch bei Fragen erreichen können.",
    bsNameLabel     : "Vollständiger Name *",
    bsNamePlaceholder: "Euer vollständiger Name",
    bsPhoneLabel    : "Telefon oder E-Mail *",
    bsPhonePlaceholder: "+49 123 456 oder email@...",
    bsDoneKicker    : "Ihr seid großartig 🧁",
    bsDoneTitle     : "Vielen herzlichen Dank für euren Beitrag!",
    bsDoneHint      : "Wir haben notiert, was ihr mitbringt, und melden uns bei Bedarf.",
    bsArrivalText   : "Bitte kommt bis <strong>13:30 Uhr</strong> und stellt euren Beitrag auf den <strong>Bring &amp; Share Tisch</strong> vor dem Kircheneingang — er ist deutlich gekennzeichnet. Unser Team kümmert sich um den Rest.",
    bsContactHint   : "Fragen? Meldet euch bei <strong>Kathi Meyer</strong> — <a href=\"tel:+491626247906\">+49 162 6247906</a>.",
    bsWarmHint      : "Wir freuen uns riesig auf euch. ♡",
    bsClose         : "Schließen",

    partyKicker        : "Noch etwas",
    partyTitle         : "Kommt ihr zur Abendfeier?",
    partyHint          : "Auch wenn ihr nicht zur Zeremonie kommen könnt, seid ihr herzlich zum Abend eingeladen.",
    partyYesBtn        : "Ja, ich bin dabei",
    partyNoBtn         : "Ich kann leider nicht",
    partyStep2Kicker   : "Fast fertig",
    partyStep2Title    : "Gibt es Ernährungswünsche?",
    partyStep2Hint     : "Sagt uns Bescheid, damit für alle etwas dabei ist.",
    partyDietVegan     : "Vegan",
    partyDietVeg       : "Vegetarisch",
    partyDietGF        : "Glutenfrei",
    partyDietHalal     : "Halal",
    partyDietNone      : "Keine Einschränkungen",
    partyNotesLabel    : "Sonst noch etwas?",
    partyNotesPlaceholder: "Allergien, Wünsche, Fragen…",
    partyDoneKicker    : "Wir können es kaum erwarten ♡",
    partyDoneTitle     : "Bis zur Party!",
    partyDoneHint      : "Wir haben alles notiert. Hier sind die Details:",
    partyVenueName     : "🎉 Abendfeier",
    partyVenueLocation : "📍 Rheinliebe am Deich",
    partyVenueDoors    : "🕔 Einlass ab",
    partyMapBtn        : "📍 Auf Google Maps anzeigen ↗",
    partyDeclinedKicker: "Verstanden",
    partyDeclinedTitle : "Danke für eure Rückmeldung.",
    partyDeclinedHint  : "Ihr werdet bei der Party fehlen — aber wir hoffen, bald wieder zusammen zu feiern. ♡",

    storyParagraphs: [
      "Unsere gemeinsame Reise begann als Freunde, die dieselbe Berufung teilten — wir dienten in unserer Gemeinde und waren in der Community aktiv, woraus sich nach und nach etwas Seriöses entwickelte.",
      "Je vertrauter wir mit den Ambitionen, Lebenszielen und Werten des anderen wurden, desto klarer war: Wir konnten nicht einfach nur Freunde bleiben. Monate später, am 02.03 — während wir unsere Familie in Norwegen besuchten, machten wir auf einer kleinen Insel unsere Verlobung und beschlossen, den Rest unseres Lebens miteinander zu verbringen.",
      "Diese Entscheidung führt uns zu diesem Tag, dem 16.10, an dem wir einen Bund fürs Leben schließen. ❤️"
    ],

    agenda: [
      {
        time: "13:30", label: "ANKOMMEN", title: "Ankommen",
        location: "Schlosskirche Eller", address: "Schlossallee 6, 40229 Düsseldorf",
        mapUrl: "https://maps.google.com/?q=Schlossallee+6,+40229+D%C3%BCsseldorf",
        description: "Ankunft, bekannte Gesichter treffen und ankommen, bevor die Zeremonie beginnt."
      },
      {
        time: "14:00", label: "ZEREMONIE", title: "Beginn der Zeremonie",
        description: "Bitte <strong>nehmt vor 14:00 Uhr Platz</strong>, damit wir pünktlich beginnen können. Wir bitten euch, <strong>die Handys wegzulegen</strong> und den Moment mit uns zu genießen. Unser Fotograf und Videograf kümmern sich darum, die Zeremonie festzuhalten."
      },
      {
        time: "15:00–16:00", label: "EMPFANG", title: "Bring & Share Empfang",
        bringAndShare: true, bringAndShareFormUrl: "https://forms.gle/4C6RUZfEKunpWGoc8",
        description: "Wir freuen uns auf ein Bring & Share mit unseren Liebsten! Sagt uns gerne, ob ihr einen Kuchen, Gebäck, Fingerfood oder etwas zum Snacken mitbringen möchtet. ❤️<br><br><strong>Schon bei der Teilnahme angemeldet? Alles gut — ihr müsst nichts weiter ausfüllen.</strong>"
      },
      {
        time: "17:00", label: "ABENDPARTY", title: "Abendempfang",
        partyOnly: true,
        location: "Rheinliebe am Deich", address: "Heerstraße 45, 40549 Düsseldorf",
        mapUrl: "https://maps.google.com/?q=Rheinliebe+am+Deich+D%C3%BCsseldorf",
        description: ""
      }
    ],

    dressIntro : "Elegante klassische Garderobe in sanften Neutraltönen und tiefen klassischen Farben.",
    dressNote  : "Bitte vermeidet Neonfarben und sehr bunte Muster.",
    dressColors: [
      { name: "Weiß",         cls: "champagne" },
      { name: "Elfenbein",    cls: "ivory"     },
      { name: "Taupe",        cls: "taupe"     },
      { name: "Kakao",        cls: "cocoa"     },
      { name: "Braun",        cls: "charcoal"  },
      { name: "Schwarz",      cls: "black"     }
    ],

    faq: [
      { q: "Kann ich jemanden mitbringen?",     a: "Bitte haltet euch an eure Einladung. Wir hätten alle gerne dabei, haben aber begrenzte Plätze in der Kirche." },
      { q: "Gibt es Parkplätze?",               a: "Ja! Direkt bei der Kirche, in der Umgebung und in Gehweite gibt es einen größeren Parkplatz." },
      { q: "Gibt es eine Wunschliste?",         a: "Keine Wunschliste — aber wenn ihr uns etwas schenken möchtet, würden wir uns sehr über einen finanziellen Beitrag für unser neues Zuhause und unsere Flitterwochen freuen." },
      { q: "Gibt es einen Platz für Kinder?",   a: "Kinder sind herzlich willkommen! Wir bitten nur darum, dass sie während der Zeremonie im Kinderbereich am hinteren Teil der Kirche spielen oder sitzen. Danke ❤️" },
      { q: "Wann sollte ich ankommen?",         a: "Bitte kommt bis 13:30 Uhr, um euren Platz zu finden und euch einzurichten, bevor die Zeremonie um 14:00 Uhr beginnt." },
      { q: "Wen kann ich kontaktieren?",        a: "Der Trauzeuge oder die Trauzeugin sind eure Ansprechpartner — ihr findet sie im Bereich 'Das Team'." }
    ]
  },


  /* ══════════════════════════════════════════════════════════
     RUSSIAN
     ══════════════════════════════════════════════════════════ */
  ru: {
    countdownLabel : "До важного дня",
    countdownDays  : "дней",
    countdownHrs   : "час",
    countdownMin   : "мин",
    countdownSec   : "сек",

    card01Label : "Ждём ответа",
    card01Title : "Участие",
    card02Label : "Наша история",
    card02Title : "Наша история",
    card03Label : "Наша команда",
    card03Title : "Команда",
    card04Label : "Венчание",
    card04Title : "Венчание",
    card04LabelParty : "Наш момент",
    card04TitleParty : "Этот день",
    card05Label : "Дресс-код",
    card05Title : "Дресс-код",
    card06Label : "FAQ",
    card06Title : "FAQ",
    langLabel   : "Язык",

    roleGroomSide    : "Со стороны жениха",
    roleBrideSide    : "Со стороны невесты",
    rolePastorWorship: "Дополнительные контакты",

    crewRoleBestMan     : "Свидетель",
    crewRoleGroomsMan   : "Друг жениха",
    crewRoleMaidOfHonor : "Свидетельница",
    crewRoleBridesMaid  : "Подружка невесты",
    crewRolePastor      : "Пастор",
    crewRoleWorshipTeam : "Группа прославления",
    crewRoleBringShare  : "Bring & Share",

    bringShareAgendaBtn : "🧁 Сообщите, что вы принесёте",

    arrivalNotice  : "Пожалуйста, приходите на 30 минут раньше.",
    arrivalTip     : "Приходите до",
    arrivalTipBody : "Это даст нам время приветствовать всех, собрать угощения и начать церемонию вовремя в",
    arrivalTipNote : "Ваша пунктуальность — это подарок нам. 🎁",

    navCeremony: "💒 Венчание",
    navParty   : "🥂 Вечерний приём",

    rsvpBeginBtn   : "Заполнить анкету →",
    greetingDear   : "Дорогие",
    crewNote       : "Есть вопросы? Обратитесь к кому-нибудь из команды — они будут рады помочь.",

    greetingLetterParty:
      "<p>Мы так рады пригласить вас разделить с нами наш свадебный день — один из самых важных дней в нашей жизни. Мы не хотим отмечать его без вас.</p>" +
      "<p>Пожалуйста, приходите к <strong>13:30</strong> — венчание начнётся ровно в <strong>14:00</strong></p><div class=\"loc-chip\">⛪ Schlosskirche Eller &nbsp;·&nbsp; <a href=\"https://maps.google.com/?q=Schlossallee+6,+40229+D%C3%BCsseldorf\" target=\"_blank\" rel=\"noopener\">Google Maps ↗</a></div>" +
      "<p>🥂 Вечерний банкет с <strong>17:00</strong></p><div class=\"loc-chip\">🥂 Rheinliebe am Deich &nbsp;·&nbsp; <a href=\"https://maps.google.com/?q=Rheinliebe+am+Deich,+Heerstra%C3%9Fe+45,+40549+D%C3%BCsseldorf\" target=\"_blank\" rel=\"noopener\">Google Maps ↗</a></div>" +
      "<p>Это займёт всего минуту — просто дайте нам знать, что придёте, а мы позаботимся об остальном.</p>" +
      "<p class=\"deadline\">Пожалуйста, подтвердите участие до <strong>18 сентября</strong>.</p>",

    greetingLetterPartySingle:
      "<p>Мы так рады пригласить тебя разделить с нами наш свадебный день — один из самых важных дней в нашей жизни. Мы не хотим отмечать его без тебя.</p>" +
      "<p>Пожалуйста, приходи к <strong>13:30</strong> — венчание начнётся ровно в <strong>14:00</strong></p><div class=\"loc-chip\">⛪ Schlosskirche Eller &nbsp;·&nbsp; <a href=\"https://maps.google.com/?q=Schlossallee+6,+40229+D%C3%BCsseldorf\" target=\"_blank\" rel=\"noopener\">Google Maps ↗</a></div>" +
      "<p>🥂 Вечерний банкет с <strong>17:00</strong></p><div class=\"loc-chip\">🥂 Rheinliebe am Deich &nbsp;·&nbsp; <a href=\"https://maps.google.com/?q=Rheinliebe+am+Deich,+Heerstra%C3%9Fe+45,+40549+D%C3%BCsseldorf\" target=\"_blank\" rel=\"noopener\">Google Maps ↗</a></div>" +
      "<p>Это займёт всего минуту — просто дай нам знать, что придёшь, а мы позаботимся об остальном.</p>" +
      "<p class=\"deadline\">Пожалуйста, подтверди участие до <strong>18 сентября</strong>.</p>",

    greetingLetterCeremony:
      "<ul class=\"letter-timeline\">" +
      "<li class=\"letter-timeline-item\"><span class=\"letter-timeline-dot\"></span><div class=\"letter-timeline-body\"><span class=\"letter-timeline-time\">13:30</span><span class=\"letter-timeline-label\">Сбор гостей</span></div></li>" +
      "<li class=\"letter-timeline-item\"><span class=\"letter-timeline-dot\"></span><div class=\"letter-timeline-body\"><span class=\"letter-timeline-time\">14:00</span><span class=\"letter-timeline-label\">Церемония</span></div></li>" +
      "<li class=\"letter-timeline-item\"><span class=\"letter-timeline-dot\"></span><div class=\"letter-timeline-body\"><span class=\"letter-timeline-time\">15:00–16:00</span><span class=\"letter-timeline-label\">Bring &amp; Share приём</span></div></li>" +
      "</ul>" +
      "<p class=\"deadline\">Пожалуйста, подтвердите участие до <strong>18 сентября</strong>.</p>",

    greetingLetterCeremonySingle:
      "<ul class=\"letter-timeline\">" +
      "<li class=\"letter-timeline-item\"><span class=\"letter-timeline-dot\"></span><div class=\"letter-timeline-body\"><span class=\"letter-timeline-time\">13:30</span><span class=\"letter-timeline-label\">Сбор гостей</span></div></li>" +
      "<li class=\"letter-timeline-item\"><span class=\"letter-timeline-dot\"></span><div class=\"letter-timeline-body\"><span class=\"letter-timeline-time\">14:00</span><span class=\"letter-timeline-label\">Церемония</span></div></li>" +
      "<li class=\"letter-timeline-item\"><span class=\"letter-timeline-dot\"></span><div class=\"letter-timeline-body\"><span class=\"letter-timeline-time\">15:00–16:00</span><span class=\"letter-timeline-label\">Bring &amp; Share приём</span></div></li>" +
      "</ul>" +
      "<p class=\"deadline\">Пожалуйста, подтверди участие до <strong>18 сентября</strong>.</p>",

    step1Label       : "Шаг 1 из 2 — Ваши данные и посещение",
    step1LabelChurch : "Шаг 1 из 2 — Ваши данные и посещение венчания",
    step2Label    : "Шаг 2 из 2 — Подтверждение мест",
    firstNameLabel: "Имя",
    lastNameLabel : "Фамилия",
    firstNamePlaceholder: "Имя",
    lastNamePlaceholder : "Фамилия",
    yourNamesLabel   : "Ваши имена",
    familyNameLabel  : "Фамилия",
    emailLabel    : "Email",
    emailPlaceholder: "Адрес электронной почты",
    phoneLabel    : "Телефон",
    phonePlaceholder: "Необязательно",
    nextBtn       : "Далее →",
    backBtn       : "← Назад",
    ceremonyAttendLabel: "💒 Венчание · 16 окт, 14:00",
    eveningAttendLabel : "🥂 Вечерний приём · 16 окт, 17:00",
    attendingBtn      : "Да, конечно",
    notAttendingBtn   : "К сожалению, нет",
    attendingBtnParty : "Буду",
    notAttendingBtnParty: "Не смогу",
    churchOnlyQuestion : "💒 Ты придёшь?",
    churchOnlyYesBtn   : "Да, я буду",
    churchOnlyNoBtn    : "К сожалению, нет",
    guestsLabel        : "Гости",
    guestsHint         : "Выбраны заранее — нажмите, чтобы убрать того, кто не сможет прийти.",
    tlGetTogether      : "Встреча",
    tlCeremony         : "Церемония",
    tlReception        : "Bring & Share",
    tlParty            : "Вечеринка",
    bringShareAttendLabel: "🎂 Bring & Share · После церемонии",
    comingByCarLabel   : "Я приеду на машине",
    comingByCarHint    : "Поможет нам с организацией парковки",
    childrenLabel  : "👶 Дети",
    bringShareLabel: "Внести вклад",
    seatConfirmLabel: "Зарезервировано мест",
    seatHint       : "Скорректируйте при необходимости — каждое место помогает нам в планировании. 🙏",
    declineLabel   : "Оставьте нам сообщение (необязательно)",
    declinePlaceholder: "Мы будем скучать — скажите что-нибудь 💛",
    sendRsvpBtn    : "Подтвердить участие ✓",
    selectAttendanceErr: "Пожалуйста, укажите, сможете ли вы прийти на венчание.",
    rsvpSubmittedBtn   : "Участие подтверждено ✓",
    submitAnotherRsvp  : "Отправить для другого гостя",
    spotifyBtn         : "Добавь свою песню в свадебный плейлист",
    card07Label        : "Праздник",
    card07Title        : "Праздник",
    card07Intro        : "Несколько способов стать частью этого дня — до, во время и после.",
    spotifyTileTitle   : "Свадебный плейлист",
    spotifyTileDesc    : "Добавь песню, которая поднимет тебя с места",
    photoTileTitle     : "Фотостена",
    photoTileDesc      : "Поделись фотографиями с праздника — скоро",
    comingSoon         : "Скоро",
    bsTileTitle        : "Bring & Share",
    bsTileDesc         : "Принесёшь что-нибудь на праздник? Дай нам знать",
    calTileTitle       : "Добавить в календарь",
    calTileDescCeremony: "Сохрани венчание в календарь",
    calTileDescFull    : "Сохрани венчание и вечерний банкет в календарь",

    adultSingular  : "взрослый",
    adultPlural    : "взрослых",
    childSingular  : "ребёнок",
    childPlural    : "детей",

    successKicker          : "СПАСИБО",
    successTitleAttending  : "Мы очень рады видеть вас в наш особенный день.",
    successTitleDecline    : "Жаль, что вы не сможете прийти.",
    successMsgAttending    : "Мы получили ваш ответ. Спасибо, что будете частью этого особенного дня.",
    successMsgDecline      : "Спасибо, что сообщили нам. Вы будете нам не хватать — надеемся отпраздновать вместе в другой раз.",
    successCardAttending   : "Мы очень рады видеть вас в наш особенный день.",
    successCardDecline     : "Жаль, что вы не сможете прийти. Спасибо, что сообщили нам.",

    giftBannerTitle  : "Ваше присутствие — уже наш самый большой подарок",
    giftBannerBody   : "Если хотите нас порадовать — вклад в наш новый дом или медовый месяц значил бы для нас очень много.",
    giftPaypalBtn    : "Благословить онлайн ↗",
    giftNoteCeremony : "В церкви также будет подарочная коробка. ♡",
    giftNoteParty    : "В церкви и на вечернем мероприятии также будет подарочная коробка. ♡",
    bringShareNudge  : "Bring & Share 🧁",

    bannerText: "📋 Пожалуйста, заполните анкету",

    /* ── Soft Gate / Floating Card / Scroll Lock ── */
    gateSalutation   : "Вы приглашены,",
    gateSeatsText    : "Местоположение: Schlosskirche Eller &nbsp;·&nbsp; <a href=\"https://maps.google.com/?q=Schlossallee+6,+40229+D%C3%BCsseldorf\" target=\"_blank\" rel=\"noopener\">Google Maps ↗</a>",
    gateBody         : "Сбор гостей <strong>13:30</strong> → Церемония: <strong>14:00</strong> → Bring & Share приём: <strong>15:00-16:00</strong></br>После церемонии мы будем рады, если вы останетесь на небольшой <strong>приём</strong> у здания церкви. Мы хотели бы организовать <strong>Bring & Share</strong> и будем очень благодарны, если гости принесут торт, пирог или закуски для всех.вы можете принести торт, пирог или закуски для всех. Если вы хотите участвовать, вы сможете записаться позже.",
    gateNote         : "Если вы хотите принять участие в <strong>Bring & Share</strong>, вы сможете записаться позже, когда будете отвечать на приглашение. ♡",
    gateCtaBtn       : "Заполнить анкету →",
    gateSkipBtn      : "Сначала посмотрю сайт",
    scrollLockTitle  : "Одну секунду, {name}",
    scrollLockBody   : "Вы пролистали раздел участия.<br>Это займёт меньше минуты — и для нас<br>очень важно знать, что вы будете с нами.",
    scrollLockCta    : "Заполнить анкету →",
    scrollLockSkip   : "Продолжить просмотр",
    bannerBtn : "Заполнить сейчас ↓",
    viewOnMap : "Посмотреть на карте ↗",

    bsStep1Title    : "Что вы принесёте?",
    bsStep1Hint     : "Сообщите нам, что планируете принести, чтобы мы могли лучше подготовиться. Не нужно готовить на 140 человек! 🙂",
    bsWhatLabel     : "Что вы принесёте? *",
    bsWhatPlaceholder: "Например, яблочный пирог, канапе…",
    bsPortionsLabel  : "Сколько порций? *",
    bsPortionsPlaceholder: "Например, 12",
    bsPortionsSmall  : "Мы планируем около 140 гостей, включая детей. Каждый вклад важен!",
    bsStep2Title    : "О вашем угощении",
    bsFoodTypeLabel  : "Тип еды?",
    bsAllergenLabel  : "Содержит ли ваше угощение аллергены?",
    bsFoodVegan : "Веганское",
    bsFoodVeg   : "Вегетарианское",
    bsFoodGF    : "Без глютена",
    bsFoodMeat  : "С мясом",
    bsAllergenNuts  : "Орехи",
    bsAllergenHoney : "Мёд",
    bsAllergenMilk  : "Коровье молоко",
    bsAllergenEggs  : "Яйца",
    bsAllergenGluten: "Глютен",
    bsStep3Title    : "Ваши контактные данные",
    bsStep3Hint     : "Чтобы мы могли связаться с вами при необходимости.",
    bsNameLabel     : "Полное имя *",
    bsNamePlaceholder: "Ваше полное имя",
    bsPhoneLabel    : "Телефон или Email *",
    bsPhonePlaceholder: "+49 123 456 или email@...",
    bsDoneKicker    : "Вы замечательные 🧁",
    bsDoneTitle     : "Большое спасибо за ваш вклад!",
    bsDoneHint      : "Мы отметили, что вы принесёте, и свяжемся при необходимости.",
    bsArrivalText   : "Пожалуйста, приходите до <strong>13:30</strong> и поставьте ваш вклад на стол <strong>Bring &amp; Share</strong> у входа в церковь — он будет хорошо обозначен. Наша команда позаботится об остальном.",
    bsContactHint   : "Есть вопросы? Обратитесь к <strong>Kathi Meyer</strong> — <a href=\"tel:+491626247906\">+49 162 6247906</a>.",
    bsWarmHint      : "Мы с нетерпением ждём встречи с вами. ♡",
    bsClose         : "Закрыть",

    partyKicker        : "Ещё одно",
    partyTitle         : "Придёте ли вы на вечерний праздник?",
    partyHint          : "Даже если вы не сможете быть на венчании, мы приглашаем вас на вечер — будем рады видеть вас.",
    partyYesBtn        : "Да, я буду",
    partyNoBtn         : "Не смогу",
    partyStep2Kicker   : "Почти готово",
    partyStep2Title    : "Есть ли диетические предпочтения?",
    partyStep2Hint     : "Дайте нам знать, чтобы для всех нашлось что-нибудь вкусное.",
    partyDietVegan     : "Веганское",
    partyDietVeg       : "Вегетарианское",
    partyDietGF        : "Без глютена",
    partyDietHalal     : "Халяль",
    partyDietNone      : "Без ограничений",
    partyNotesLabel    : "Что-то ещё?",
    partyNotesPlaceholder: "Аллергии, пожелания, вопросы…",
    partyDoneKicker    : "Не можем дождаться ♡",
    partyDoneTitle     : "До встречи на празднике!",
    partyDoneHint      : "Мы всё записали. Вот подробности:",
    partyVenueName     : "🎉 Вечерний праздник",
    partyVenueLocation : "📍 Rheinliebe am Deich",
    partyVenueDoors    : "🕔 Двери открываются в",
    partyMapBtn        : "📍 Посмотреть на Google Maps ↗",
    partyDeclinedKicker: "Понятно",
    partyDeclinedTitle : "Спасибо, что сообщили нам.",
    partyDeclinedHint  : "Вы нам будете не хватать — надеемся отпраздновать вместе в другой раз. ♡",

    storyParagraphs: [
      "Наш путь начался с дружбы, объединённой одним призванием — служением в нашей церкви и вкладом в нашу общину, что со временем переросло во что-то более глубокое и серьезное.",
      "Узнавая больше об амбициях, жизненных целях и ценностях друг друга, мы не могли оставаться просто друзьями. Месяцы спустя, 02.03 — во время визита к нашим родным в Норвегии, на небольшом острове, мы обручились и приняли решение провести остаток жизни вместе.",
      "Это решение привело нас к сегодняшнему дню, 16.10, когда мы вступаем в союз на всю жизнь. ❤️"
    ],

    agenda: [
      {
        time: "13:30", label: "ВСТРЕЧА", title: "Встреча гостей",
        location: "Schlosskirche Eller", address: "Schlossallee 6, 40229 Düsseldorf",
        mapUrl: "https://maps.google.com/?q=Schlossallee+6,+40229+D%C3%BCsseldorf",
        description: "Приходите, встречайтесь с близкими и устраивайтесь, прежде чем начнётся церемония."
      },
      {
        time: "14:00", label: "ЦЕРЕМОНИЯ", title: "Начало венчания",
        description: "Пожалуйста, <strong>займите место до 14:00</strong>, чтобы мы могли начать вовремя. Просим вас <strong>убрать телефоны</strong> и насладиться моментом вместе с нами. Наши фотограф и видеограф позаботятся о съёмке."
      },
      {
        time: "15:00–16:00", label: "ПРИЁМ", title: "Bring & Share приём",
        bringAndShare: true, bringAndShareFormUrl: "https://forms.gle/4C6RUZfEKunpWGoc8",
        description: "Мы будем рады Bring & Share с нашими любимыми! Дайте нам знать, если хотите принести пирог, выпечку, закуски или что-нибудь вкусное. ❤️<br><br><strong>Уже зарегистрировались через форму участия? Всё готово — больше ничего заполнять не нужно.</strong>"
      },
      {
        time: "17:00", label: "ВЕЧЕРИНКА", title: "Вечерний приём",
        partyOnly: true,
        location: "Rheinliebe am Deich", address: "Heerstraße 45, 40549 Düsseldorf",
        mapUrl: "https://maps.google.com/?q=Rheinliebe+am+Deich+D%C3%BCsseldorf",
        description: ""
      }
    ],

    dressIntro : "Элегантный классический наряд в мягких нейтральных и глубоких классических тонах.",
    dressNote  : "Пожалуйста, избегайте ярких неоновых тонов и броских рисунков.",
    dressColors: [
      { name: "Белый",       cls: "champagne" },
      { name: "Слоновая кость", cls: "ivory"  },
      { name: "Тауп",        cls: "taupe"     },
      { name: "Какао",       cls: "cocoa"     },
      { name: "Коричневый",  cls: "charcoal"  },
      { name: "Чёрный",      cls: "black"     }
    ],

    faq: [
      { q: "Можно ли привести гостя?",       a: "Пожалуйста, следуйте своему приглашению. Мы рады всем, но количество мест в церкви ограничено." },
      { q: "Есть ли парковка?",              a: "Да! Прямо у церкви, рядом с домами и в пешей доступности есть большая парковка." },
      { q: "Есть ли список подарков?",       a: "Списка нет — но если вы хотите нас порадовать, мы будем очень благодарны за денежный подарок для нашего нового дома и медового месяца." },
      { q: "Есть ли место для детей?",       a: "Дети очень приветствуются! Просим лишь, чтобы во время церемонии они сидели или играли в детском уголке в конце церкви. Спасибо ❤️" },
      { q: "Когда прийти?",                  a: "Пожалуйста, приходите до 13:30, чтобы найти место и устроиться до начала венчания в 14:00." },
      { q: "К кому обратиться?",             a: "Лучший друг или подружка невесты — ваши контактные лица, их вы найдёте в разделе «Команда»." }
    ]
  }
};


/* ══════════════════════════════════════════════════════════
   Language detection: URL ?lang= → localStorage → default EN
   ══════════════════════════════════════════════════════════ */
(function () {
  var params    = new URLSearchParams(window.location.search);
  var langParam = params.get('lang');
  var stored    = localStorage.getItem('wedding_lang');
  var lang = (langParam && window.I18N[langParam]) ? langParam
           : (stored    && window.I18N[stored])    ? stored
           : 'en';
  window.__LANG = lang;
  localStorage.setItem('wedding_lang', lang);
})();


/* ══════════════════════════════════════════════════════════
   t(key) — look up the current language, fall back to EN
   ══════════════════════════════════════════════════════════ */
window.t = function (key) {
  var tr = window.I18N[window.__LANG];
  if (tr && tr[key] !== undefined) return tr[key];
  var en = window.I18N.en;
  if (en && en[key] !== undefined) return en[key];
  return key;
};
