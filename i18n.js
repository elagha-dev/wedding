/* ============================================================
   i18n.js — Multilingual support: EN / DE / RU
   All UI strings in one place. Loaded before script.js.
   Language is set via ?lang=de or ?lang=ru URL param,
   OR by the user clicking the language switcher.
   ============================================================ */

window.I18N = {

  en: {
    /* ── Language switcher label ── */
    langLabel: "Language",

    /* ── Countdown ── */
    countdownLabel: "Until the big day",
    countdownDays: "days", countdownHrs: "hrs",
    countdownMin: "min",  countdownSec: "sec",

    /* ── Card labels / titles ── */
    card01Label: "Kindly Reply",   card01Title: "RSVP",
    card02Label: "Our Story",      card02Title: "Our Story",
    card03Label: "Planning Crew",  card03Title: "The Crew",
    card04Label: "Church Ceremony",card04Title: "Church Ceremony",
    card04LabelParty: "The Moment",card04TitleParty: "The Day",
    card05Label: "Dress Code",     card05Title: "Dress Code",
    card06Label: "FAQ",            card06Title: "FAQ",

    /* ── Crew roles ── */
    roleGroomSide: "Groom's Side",
    roleBrideSide: "Bride's Side",
    rolePastorWorship: "Pastor & Worship",

    /* ── Arrival notice ── */
    arrivalNotice: "Please arrive 30 minutes early.",
    arrivalTip: "Arrive by",
    arrivalTipBody: "This gives us time to welcome everyone, collect the Bring & Share items, and start the ceremony on time at",
    arrivalTipNote: "Your punctuality is a gift to us. 🎁",

    /* ── Timeline nav ── */
    navCeremony: "💒 Wedding Ceremony",
    navParty: "🥂 Evening Reception",

    /* ── RSVP Intro ── */
    rsvpBeginBtn: "Begin your RSVP →",

    /* ── RSVP Wizard steps ── */
    step1Label: "Step 1 of 3 — Your Details",
    step2Label: "Step 2 of 3 — Attendance",
    step3Label: "Step 3 of 3 — Confirm Seats",

    /* ── Step 1 fields ── */
    firstNameLabel: "First name", firstNamePlaceholder: "First name",
    lastNameLabel: "Last name",   lastNamePlaceholder: "Last name",
    yourNamesLabel: "Your names", yourNamesPlaceholder: "Your names",
    familyNameLabel: "Family name", familyNamePlaceholder: "Family name",
    emailLabel: "Email",          emailPlaceholder: "Email address",
    phoneLabel: "Phone",          phonePlaceholder: "Optional",
    nextBtn: "Next →",

    /* ── Step 2 attendance ── */
    ceremonyAttendLabel: "💒 Church Ceremony · 16 Oct, 14:00",
    eveningAttendLabel: "🥂 Evening Reception · 16 Oct, 17:00",
    attendingBtn: "Attending",
    notAttendingBtn: "Not Attending",
    childrenLabel: "Children attending",
    bringShareLabel: "I'll join the Bring & Share",
    backBtn: "← Back",

    /* ── Step 3 seats ── */
    seatConfirmLabel: "Total seats reserved for you",
    seatHint: "Adjust if needed — every seat helps us plan. 🙏",
    declineLabel: "Leave us a note (optional)",
    declinePlaceholder: "We'll miss you — feel free to say something 💛",
    sendRsvpBtn: "Send RSVP ✓",

    /* ── Seat summary ── */
    adult: "adult", adults: "adults",
    child: "child",  children: "children",

    /* ── Validation ── */
    requiredPlaceholder: "Required ↑",
    selectAttendanceErr: "Please select your attendance for the ceremony.",

    /* ── Success screen ── */
    successKicker: "THANK YOU",
    successTitleAttending: "We cannot wait to celebrate with you.",
    successTitleDecline: "We are sorry you cannot make it.",
    successMsgAttending: "Your RSVP has been received. Thank you for being part of this special day.",
    successMsgDecline: "Thank you for letting us know. You will be missed, and we hope to celebrate together another time.",
    giftBannerTitle: "Your presence is already our greatest gift",
    giftBannerBody: "If you would like to honour our new home with something from your heart, we gratefully welcome a monetary gift — cash at the venue or via PayPal:",
    giftPaypalBtn: "Pay via PayPal ↗",
    giftNoteParty: "A gift box will be at the church entrance and at the reception venue. Thank you so much. ♡",
    giftNoteCeremony: "A gift box will be at the church entrance. Thank you so much. ♡",
    rsvpSubmittedBtn: "RSVP Submitted ✓",
    submitAnotherRsvp: "Submit another RSVP",
    bringShareNudge: "Bring & Share 🧁",

    /* ── Bring & Share modal ── */
    bsKicker: "Bring & Share",
    bsStep1Title: "What are you bringing?",
    bsStep1Hint: "Let us know what you plan to bring so we can plan ahead. You're not expected to bring for 140 people! 🙂",
    bsWhatLabel: "What will you bring? *",
    bsWhatPlaceholder: "e.g. apple pie, finger sandwiches…",
    bsPortionsLabel: "How many portions? *",
    bsPortionsPlaceholder: "e.g. 12",
    bsPortionsSmall: "We are planning for ~140 guests incl. kids. Every contribution helps!",
    bsStep2Title: "About your food",
    bsFoodTypeLabel: "What type of food? *",
    bsAllergenLabel: "Does your food include allergens?",
    bsStep3Title: "Your contact details",
    bsStep3Hint: "So we can reach you about logistics.",
    bsNameLabel: "Full Name *",
    bsNamePlaceholder: "Your full name",
    bsPhoneLabel: "Phone or Email *",
    bsPhonePlaceholder: "+49 123 456 or email@...",
    bsDoneKicker: "You're amazing 🧁",
    bsDoneTitle: "Thank you so much for your contribution!",
    bsDoneHint: "We've noted what you're bringing and will be in touch if needed.",
    bsArrivalText: "Please arrive by <strong>13:30</strong> and hand your contribution to <strong id=\"bsSpocName\">our team</strong> at the entrance.",
    bsWarmHint: "We can't wait to celebrate with you. ♡",
    bsClose: "Close",
    bsFoodVegan: "Vegan", bsFoodVeg: "Vegetarian", bsFoodGF: "Gluten-free", bsFoodMeat: "Contains meat",
    bsAllergenNuts: "Nuts", bsAllergenHoney: "Honey", bsAllergenMilk: "Cow Milk", bsAllergenEggs: "Eggs", bsAllergenGluten: "Gluten",

    /* ── Party modal ── */
    partyKicker: "One more thing",
    partyTitle: "Will you join us at the evening celebration?",
    partyHint: "Even if you can't make the ceremony, you're warmly welcome to join us in the evening. We'd love to have you there too.",
    partyYesBtn: "Yes, I'll be there",
    partyNoBtn: "I can't make the party",
    partyStep2Kicker: "Almost done",
    partyStep2Title: "Any dietary needs?",
    partyStep2Hint: "Let us know so we can make sure there's something for everyone.",
    partyDietVegan: "Vegan", partyDietVeg: "Vegetarian", partyDietGF: "Gluten-free",
    partyDietHalal: "Halal", partyDietNone: "No restrictions",
    partyNotesLabel: "Anything else we should know?",
    partyNotesPlaceholder: "Allergies, needs, questions…",
    partyDoneKicker: "Can't wait ♡",
    partyDoneTitle: "See you at the party!",
    partyDoneHint: "We've noted everything. Here are the details:",
    partyVenueName: "🎉 Evening Celebration",
    partyVenueLocation: "📍 Rheinliebe am Deich",
    partyVenueDoors: "🕔 Doors open at",
    partyMapBtn: "📍 View on Google Maps ↗",
    partyDeclinedKicker: "Understood",
    partyDeclinedTitle: "Thank you for letting us know.",
    partyDeclinedHint: "We'll miss you at the party — but hope to celebrate together another time. ♡",

    /* ── RSVP greeting letter ── */
    greetingIntro: "Dear",
    greetingParaWarm: "We are so happy you're here! We'd love for you to let us know if you'll be joining us.",
    greetingParaDeadline: "Please reply by <strong>1 September 2026</strong> — this helps us plan everything with care. ♡",
    greetingPartyExtra: "You're invited to the full day — <strong>ceremony at 14:00</strong> and <strong>evening celebration at 17:00</strong>.",
    genericIntro: "We're so glad you're here! Please take a moment to let us know if you'll be joining us on our special day.",
    genericDeadline: "Please reply by <strong>1 September 2026</strong>.",

    /* ── View on map ── */
    viewOnMap: "View on Map ↗",

    /* ── Greeting letter (personalized invite) ── */
    greetingDear: "Dear",
    greetingLetterParty:
      "<p>Arina and I are so excited to have you with us on our wedding day — truly one of the most important days of our lives, and we wouldn’t want to share it without you.</p>" +
      "<p>We’re getting married at the <strong>church ceremony</strong> on <strong>16 October at 14:00</strong>, and afterwards we’ll celebrate well into the evening at our <strong>reception starting at 17:00</strong> — dinner, dancing, and all the good things.</p>" +
      "<p>It only takes a minute to let us know you’ll be there. Just let us know below.</p>" +
      "<p class=\"deadline\">Please let us know your RSVP by <strong>18 September</strong>.</p>",
    greetingLetterCeremony:
      "<p>Arina and I are so happy to invite you to witness one of the most meaningful moments of our lives — our wedding ceremony.</p>" +
      "<p>We’re tying the knot at the <strong>church on 16 October at 14:00</strong>, and we would be truly honoured to have you there with us as we say our vows.</p>" +
      "<p>It only takes a minute — just let us know you’ll be coming, and we’ll take care of the rest.</p>" +
      "<p class=\"deadline\">Please let us know your RSVP by <strong>18 September</strong>.</p>",
    crewNote: "Any questions? Reach out to anyone in the crew — they’re wonderful and happy to help.",
    bannerText: "\uD83D\uDCCB Please complete your RSVP",
    bannerBtn: "RSVP now \u2193",
    successCardAttending: "We cannot wait to celebrate with you.",
    successCardDecline: "We are sorry you cannot make it. Thank you for letting us know.",
  },

  de: {
    langLabel: "Sprache",
    countdownLabel: "Noch bis zum großen Tag",
    countdownDays: "Tage", countdownHrs: "Std",
    countdownMin: "Min",  countdownSec: "Sek",

    card01Label: "Bitte antworten",   card01Title: "RSVP",
    card02Label: "Unsere Geschichte", card02Title: "Unsere Geschichte",
    card03Label: "Planungsteam",      card03Title: "Das Team",
    card04Label: "Kirchliche Trauung",card04Title: "Kirchliche Trauung",
    card04LabelParty: "Der Moment",   card04TitleParty: "Der Tag",
    card05Label: "Dresscode",         card05Title: "Dresscode",
    card06Label: "FAQ",               card06Title: "FAQ",

    roleGroomSide: "Seite des Bräutigams",
    roleBrideSide: "Seite der Braut",
    rolePastorWorship: "Pastor & Worship",

    arrivalNotice: "Bitte kommt 30 Minuten früher.",
    arrivalTip: "Ankunft bis",
    arrivalTipBody: "So haben wir Zeit, alle zu begrüßen, die Bring & Share-Beiträge zu sammeln und die Zeremonie pünktlich um",
    arrivalTipNote: "Eure Pünktlichkeit ist ein Geschenk für uns. 🎁",

    navCeremony: "💒 Trauung",
    navParty: "🥂 Abendempfang",

    rsvpBeginBtn: "RSVP beginnen →",

    step1Label: "Schritt 1 von 3 — Deine Angaben",
    step2Label: "Schritt 2 von 3 — Teilnahme",
    step3Label: "Schritt 3 von 3 — Plätze bestätigen",

    firstNameLabel: "Vorname", firstNamePlaceholder: "Vorname",
    lastNameLabel: "Nachname", lastNamePlaceholder: "Nachname",
    yourNamesLabel: "Eure Namen", yourNamesPlaceholder: "Eure Namen",
    familyNameLabel: "Familienname", familyNamePlaceholder: "Familienname",
    emailLabel: "E-Mail",      emailPlaceholder: "E-Mail-Adresse",
    phoneLabel: "Telefon",     phonePlaceholder: "Optional",
    nextBtn: "Weiter →",

    ceremonyAttendLabel: "💒 Kirchliche Trauung · 16. Okt, 14:00",
    eveningAttendLabel: "🥂 Abendempfang · 16. Okt, 17:00",
    attendingBtn: "Ich komme",
    notAttendingBtn: "Ich kann nicht",
    childrenLabel: "Kinder, die teilnehmen",
    bringShareLabel: "Ich mache beim Bring & Share mit",
    backBtn: "← Zurück",

    seatConfirmLabel: "Reservierte Plätze insgesamt",
    seatHint: "Anpassen wenn nötig — jeder Platz hilft uns planen. 🙏",
    declineLabel: "Schreib uns etwas (optional)",
    declinePlaceholder: "Wir werden euch vermissen — sagt uns gerne etwas 💛",
    sendRsvpBtn: "RSVP absenden ✓",

    adult: "Erwachsener", adults: "Erwachsene",
    child: "Kind", children: "Kinder",

    requiredPlaceholder: "Pflichtfeld ↑",
    selectAttendanceErr: "Bitte wähle deine Teilnahme für die Zeremonie.",

    successKicker: "DANKE",
    successTitleAttending: "Wir freuen uns riesig, euch dabei zu haben.",
    successTitleDecline: "Schade, dass ihr nicht kommen könnt.",
    successMsgAttending: "Euer RSVP ist eingegangen. Danke, dass ihr Teil dieses besonderen Tages seid.",
    successMsgDecline: "Danke für eure Rückmeldung. Ihr werdet fehlen, und wir hoffen, bald zusammen zu feiern.",
    giftBannerTitle: "Eure Anwesenheit ist bereits unser größtes Geschenk",
    giftBannerBody: "Wenn ihr uns mit einem Herzensgeschenk beehren möchtet, freuen wir uns über einen finanziellen Beitrag — bar vor Ort oder per PayPal:",
    giftPaypalBtn: "Per PayPal bezahlen ↗",
    giftNoteParty: "Eine Geschenkbox steht am Kircheneingang und am Empfangsort. Vielen Dank. ♡",
    giftNoteCeremony: "Eine Geschenkbox steht am Kircheneingang. Vielen Dank. ♡",
    rsvpSubmittedBtn: "RSVP abgesendet ✓",
    submitAnotherRsvp: "Weiteres RSVP absenden",
    bringShareNudge: "Bring & Share 🧁",

    bsKicker: "Bring & Share",
    bsStep1Title: "Was bringst du mit?",
    bsStep1Hint: "Sag uns, was du mitbringen möchtest, damit wir planen können. Du musst nicht für 140 Personen kochen! 🙂",
    bsWhatLabel: "Was bringst du mit? *",
    bsWhatPlaceholder: "z.B. Apfelkuchen, Fingerfood…",
    bsPortionsLabel: "Wie viele Portionen? *",
    bsPortionsPlaceholder: "z.B. 12",
    bsPortionsSmall: "Wir planen für ca. 140 Gäste inkl. Kinder. Jeder Beitrag hilft!",
    bsStep2Title: "Über dein Essen",
    bsFoodTypeLabel: "Welche Art von Speise? *",
    bsAllergenLabel: "Enthält dein Essen Allergene?",
    bsStep3Title: "Deine Kontaktdaten",
    bsStep3Hint: "Damit wir dich bei der Logistik erreichen können.",
    bsNameLabel: "Vollständiger Name *",
    bsNamePlaceholder: "Dein vollständiger Name",
    bsPhoneLabel: "Telefon oder E-Mail *",
    bsPhonePlaceholder: "+49 123 456 oder email@...",
    bsDoneKicker: "Du bist toll 🧁",
    bsDoneTitle: "Vielen herzlichen Dank für deinen Beitrag!",
    bsDoneHint: "Wir haben notiert, was du mitbringst, und melden uns bei Bedarf.",
    bsArrivalText: "Bitte komm bis <strong>13:30 Uhr</strong> und übergib deinen Beitrag <strong id=\"bsSpocName\">unserem Team</strong> am Eingang.",
    bsWarmHint: "Wir können es kaum erwarten, mit euch zu feiern. ♡",
    bsClose: "Schließen",
    bsFoodVegan: "Vegan", bsFoodVeg: "Vegetarisch", bsFoodGF: "Glutenfrei", bsFoodMeat: "Mit Fleisch",
    bsAllergenNuts: "Nüsse", bsAllergenHoney: "Honig", bsAllergenMilk: "Kuhmilch", bsAllergenEggs: "Eier", bsAllergenGluten: "Gluten",

    partyKicker: "Noch etwas",
    partyTitle: "Kommt ihr auch zur Abendfeier?",
    partyHint: "Auch wenn ihr nicht zur Trauung kommen könnt, seid ihr herzlich zur Abendfeier eingeladen.",
    partyYesBtn: "Ja, ich bin dabei",
    partyNoBtn: "Ich kann leider nicht",
    partyStep2Kicker: "Fast geschafft",
    partyStep2Title: "Besondere Ernährungswünsche?",
    partyStep2Hint: "Sagt uns Bescheid, damit für alle etwas dabei ist.",
    partyDietVegan: "Vegan", partyDietVeg: "Vegetarisch", partyDietGF: "Glutenfrei",
    partyDietHalal: "Halal", partyDietNone: "Keine Einschränkungen",
    partyNotesLabel: "Noch etwas, das wir wissen sollten?",
    partyNotesPlaceholder: "Allergien, Wünsche, Fragen…",
    partyDoneKicker: "Wir freuen uns ♡",
    partyDoneTitle: "Bis zur Party!",
    partyDoneHint: "Alles notiert. Hier sind die Details:",
    partyVenueName: "🎉 Abendfeier",
    partyVenueLocation: "📍 Rheinliebe am Deich",
    partyVenueDoors: "🕔 Einlass ab",
    partyMapBtn: "📍 Auf Google Maps ansehen ↗",
    partyDeclinedKicker: "Verstanden",
    partyDeclinedTitle: "Danke für deine Rückmeldung.",
    partyDeclinedHint: "Wir vermissen euch bei der Party — hoffen aber, bald zusammen zu feiern. ♡",

    greetingIntro: "Liebe(r)",
    greetingParaWarm: "Wir freuen uns so sehr, dass du hier bist! Bitte gib uns Bescheid, ob du dabei sein kannst.",
    greetingParaDeadline: "Bitte antworte bis <strong>1. September 2026</strong> — das hilft uns, alles liebevoll zu planen. ♡",
    greetingPartyExtra: "Du bist zum gesamten Tag eingeladen — <strong>Trauung um 14:00 Uhr</strong> und <strong>Abendfeier um 17:00 Uhr</strong>.",
    genericIntro: "Wir freuen uns, dass du hier bist! Bitte nimm dir einen Moment und sag uns, ob du an unserem besonderen Tag dabei sein kannst.",
    genericDeadline: "Bitte antworte bis <strong>1. September 2026</strong>.",

    viewOnMap: "Auf der Karte anzeigen ↗",

    /* ── Greeting letter ── */
    greetingDear: "Liebe/Lieber",
    greetingLetterParty:
      "<p>Arina und ich freuen uns so sehr, euch an unserem Hochzeitstag bei uns zu haben — einem der wichtigsten Tage unseres Lebens. Wir möchten ihn nicht ohne euch erleben.</p>" +
      "<p>Wir heiraten bei der <strong>kirchlichen Trauung</strong> am <strong>16. Oktober um 14:00 Uhr</strong>, und danach feiern wir bis in den Abend bei unserem <strong>Empfang ab 17:00 Uhr</strong> — mit Essen, Tanzen und allem, was dazugehört.</p>" +
      "<p>Es dauert nur eine Minute — gebt uns einfach Bescheid, dass ihr kommt. Wir kümmern uns um den Rest.</p>" +
      "<p class=\"deadline\">Bitte gebt uns bis zum <strong>18. September</strong> Rückmeldung.</p>",
    greetingLetterCeremony:
      "<p>Arina und ich laden euch herzlich ein, einen der bedeutsamsten Momente unseres Lebens mitzuerleben — unsere Hochzeitszeremonie.</p>" +
      "<p>Wir geben uns das Jawort in der <strong>Kirche am 16. Oktober um 14:00 Uhr</strong>, und wir wären sehr geührt, euch dabei zu haben.</p>" +
      "<p>Es dauert nur eine Minute — gebt uns einfach Bescheid, dass ihr kommt.</p>" +
      "<p class=\"deadline\">Bitte gebt uns bis zum <strong>18. September</strong> Rückmeldung.</p>",
    crewNote: "Fragen? Wendet euch an jemanden aus dem Team — sie helfen euch gerne weiter.",
    bannerText: "\uD83D\uDCCB Bitte RSVP ausfüllen",
    bannerBtn: "Jetzt RSVP \u2193",
    successCardAttending: "Wir können es kaum erwarten, mit euch zu feiern.",
    successCardDecline: "Wir bedauern, dass ihr nicht dabei sein könnt. Danke für eure Rückmeldung.",
  },

  ru: {
    langLabel: "Язык",
    countdownLabel: "До важного дня",
    countdownDays: "дней", countdownHrs: "час",
    countdownMin: "мин",  countdownSec: "сек",

    card01Label: "Подтвердите участие", card01Title: "RSVP",
    card02Label: "Наша история",        card02Title: "Наша история",
    card03Label: "Команда организации", card03Title: "Наша команда",
    card04Label: "Венчание",            card04Title: "Венчание",
    card04LabelParty: "Наш момент",     card04TitleParty: "Этот день",
    card05Label: "Дресс-код",           card05Title: "Дресс-код",
    card06Label: "Вопросы и ответы",    card06Title: "Вопросы и ответы",

    roleGroomSide: "Сторона жениха",
    roleBrideSide: "Сторона невесты",
    rolePastorWorship: "Пастор и группа прославления",

    arrivalNotice: "Пожалуйста, приходите на 30 минут раньше.",
    arrivalTip: "Приходите до",
    arrivalTipBody: "Это даст нам время поприветствовать всех, принять блюда и начать церемонию вовремя в",
    arrivalTipNote: "Ваша пунктуальность — это подарок для нас. 🎁",

    navCeremony: "💒 Венчание",
    navParty: "🥂 Вечерний приём",

    rsvpBeginBtn: "Начать RSVP →",

    step1Label: "Шаг 1 из 3 — Ваши данные",
    step2Label: "Шаг 2 из 3 — Участие",
    step3Label: "Шаг 3 из 3 — Подтверждение мест",

    firstNameLabel: "Имя",         firstNamePlaceholder: "Имя",
    lastNameLabel: "Фамилия",      lastNamePlaceholder: "Фамилия",
    yourNamesLabel: "Ваши имена",  yourNamesPlaceholder: "Ваши имена",
    familyNameLabel: "Фамилия",    familyNamePlaceholder: "Фамилия",
    emailLabel: "Электронная почта", emailPlaceholder: "Адрес эл. почты",
    phoneLabel: "Телефон",           phonePlaceholder: "Необязательно",
    nextBtn: "Далее →",

    ceremonyAttendLabel: "💒 Венчание · 16 окт, 14:00",
    eveningAttendLabel: "🥂 Вечерний приём · 16 окт, 17:00",
    attendingBtn: "Буду присутствовать",
    notAttendingBtn: "Не смогу прийти",
    childrenLabel: "Дети, которые придут",
    bringShareLabel: "Я присоединюсь к Bring & Share",
    backBtn: "← Назад",

    seatConfirmLabel: "Всего зарезервированных мест",
    seatHint: "При необходимости измените — каждое место помогает нам в планировании. 🙏",
    declineLabel: "Оставьте нам сообщение (необязательно)",
    declinePlaceholder: "Нам будет вас не хватать — не стесняйтесь написать что-нибудь 💛",
    sendRsvpBtn: "Отправить RSVP ✓",

    adult: "взрослый", adults: "взрослых",
    child: "ребёнок", children: "детей",

    requiredPlaceholder: "Обязательно ↑",
    selectAttendanceErr: "Пожалуйста, выберите, придёте ли вы на венчание.",

    successKicker: "СПАСИБО",
    successTitleAttending: "Мы не можем дождаться, когда отпразднуем вместе с вами.",
    successTitleDecline: "Жаль, что вы не сможете прийти.",
    successMsgAttending: "Ваш ответ получен. Спасибо, что будете частью этого особенного дня.",
    successMsgDecline: "Спасибо, что дали нам знать. Вас будет не хватать, и мы надеемся отпраздновать вместе в другой раз.",
    giftBannerTitle: "Ваше присутствие — уже наш лучший подарок",
    giftBannerBody: "Если вы хотите порадовать нас чем-то от души, мы будем благодарны за денежный подарок — наличными на месте или через PayPal:",
    giftPaypalBtn: "Оплатить через PayPal ↗",
    giftNoteParty: "Ящик для подарков будет у входа в церковь и на вечернем приёме. Большое спасибо. ♡",
    giftNoteCeremony: "Ящик для подарков будет у входа в церковь. Большое спасибо. ♡",
    rsvpSubmittedBtn: "RSVP отправлен ✓",
    submitAnotherRsvp: "Отправить ещё один RSVP",
    bringShareNudge: "Bring & Share 🧁",

    bsKicker: "Bring & Share",
    bsStep1Title: "Что вы принесёте?",
    bsStep1Hint: "Сообщите нам, что вы планируете принести, чтобы мы могли всё спланировать. Готовить на 140 человек не нужно! 🙂",
    bsWhatLabel: "Что вы принесёте? *",
    bsWhatPlaceholder: "напр. яблочный пирог, закуски…",
    bsPortionsLabel: "Сколько порций? *",
    bsPortionsPlaceholder: "напр. 12",
    bsPortionsSmall: "Мы планируем на ~140 гостей включая детей. Любой вклад важен!",
    bsStep2Title: "О вашем угощении",
    bsFoodTypeLabel: "Тип блюда? *",
    bsAllergenLabel: "Содержит ли ваше блюдо аллергены?",
    bsStep3Title: "Ваши контактные данные",
    bsStep3Hint: "Чтобы мы могли связаться с вами по логистике.",
    bsNameLabel: "Полное имя *",
    bsNamePlaceholder: "Ваше полное имя",
    bsPhoneLabel: "Телефон или e-mail *",
    bsPhonePlaceholder: "+49 123 456 или email@...",
    bsDoneKicker: "Вы замечательны 🧁",
    bsDoneTitle: "Большое спасибо за ваш вклад!",
    bsDoneHint: "Мы записали, что вы принесёте, и свяжемся при необходимости.",
    bsArrivalText: "Пожалуйста, приходите до <strong>13:30</strong> и передайте ваш вклад <strong id=\"bsSpocName\">нашей команде</strong> у входа.",
    bsWarmHint: "Мы с нетерпением ждём праздника с вами. ♡",
    bsClose: "Закрыть",
    bsFoodVegan: "Веганское", bsFoodVeg: "Вегетарианское", bsFoodGF: "Без глютена", bsFoodMeat: "С мясом",
    bsAllergenNuts: "Орехи", bsAllergenHoney: "Мёд", bsAllergenMilk: "Коровье молоко", bsAllergenEggs: "Яйца", bsAllergenGluten: "Глютен",

    partyKicker: "Ещё кое-что",
    partyTitle: "Придёте ли вы на вечерний праздник?",
    partyHint: "Даже если вы не сможете прийти на венчание, мы будем рады видеть вас вечером.",
    partyYesBtn: "Да, я буду",
    partyNoBtn: "Не смогу прийти",
    partyStep2Kicker: "Почти готово",
    partyStep2Title: "Особые пожелания к питанию?",
    partyStep2Hint: "Сообщите нам, чтобы мы позаботились о каждом.",
    partyDietVegan: "Веган", partyDietVeg: "Вегетарианец", partyDietGF: "Без глютена",
    partyDietHalal: "Халяль", partyDietNone: "Без ограничений",
    partyNotesLabel: "Что-то ещё, что мы должны знать?",
    partyNotesPlaceholder: "Аллергии, пожелания, вопросы…",
    partyDoneKicker: "С нетерпением ждём ♡",
    partyDoneTitle: "До встречи на вечеринке!",
    partyDoneHint: "Всё записано. Вот детали:",
    partyVenueName: "🎉 Вечерний праздник",
    partyVenueLocation: "📍 Rheinliebe am Deich",
    partyVenueDoors: "🕔 Двери открываются в",
    partyMapBtn: "📍 Посмотреть на Google Maps ↗",
    partyDeclinedKicker: "Понятно",
    partyDeclinedTitle: "Спасибо, что дали нам знать.",
    partyDeclinedHint: "Вас будет не хватать на вечеринке — но надеемся отпраздновать вместе в другой раз. ♡",

    greetingIntro: "Дорогой(-ая)",
    greetingParaWarm: "Как мы рады, что вы здесь! Пожалуйста, сообщите нам, сможете ли вы прийти.",
    greetingParaDeadline: "Ответьте, пожалуйста, до <strong>1 сентября 2026 года</strong> — это поможет нам всё тщательно спланировать. ♡",
    greetingPartyExtra: "Вы приглашены на весь день — <strong>венчание в 14:00</strong> и <strong>вечерний приём в 17:00</strong>.",
    genericIntro: "Как мы рады, что вы здесь! Пожалуйста, уделите минуту и сообщите, сможете ли вы прийти в наш особенный день.",
    genericDeadline: "Ответьте, пожалуйста, до <strong>1 сентября 2026 года</strong>.",

    viewOnMap: "Посмотреть на карте ↗",

    /* ── Greeting letter ── */
    greetingDear: "Дорогие",
    greetingLetterParty:
      "<p>Мы так рады пригласить вас разделить с нами наш свадебный день — один из самых важных дней в нашей жизни. Мы не хотим отмечать его без вас.</p>" +
      "<p>Венчание состоится в <strong>церкви 16 октября в 14:00</strong>, а после мы будем праздновать до вечера на <strong>банкете, начиная с 17:00</strong> — ужин, танцы и всё самое хорошее.</p>" +
      "<p>Это займёт всего минуту — просто дайте нам знать, что придёте, а мы позаботимся об остальном.</p>" +
      "<p class=\"deadline\">Пожалуйста, ответьте до <strong>18 сентября</strong>.</p>",
    greetingLetterCeremony:
      "<p>Мы с радостью приглашаем вас стать свидетелями одного из самых важных моментов нашей жизни — нашего венчания.</p>" +
      "<p>Мы заключим брак в <strong>церкви 16 октября в 14:00</strong>, и нам будет очень дорого видеть вас рядом, когда мы произносим клятвы.</p>" +
      "<p>Это займёт всего минуту — просто дайте нам знать, что придёте.</p>" +
      "<p class=\"deadline\">Пожалуйста, ответьте до <strong>18 сентября</strong>.</p>",
    crewNote: "Есть вопросы? Обратитесь к кому-нибудь из команды — они будут рады помочь.",
    bannerText: "\uD83D\uDCCB Пожалуйста, заполните RSVP",
    bannerBtn: "RSVP сейчас \u2193",
    successCardAttending: "Мы не можем дождаться, когда отпразднуем вместе с вами.",
    successCardDecline: "Жаль, что вы не сможете прийти. Спасибо, что сообщили нам.",
  }
};

/* ── Detect language ───────────────────────────────────────── */
(function() {
  var params = new URLSearchParams(window.location.search);
  var langParam = params.get('lang');
  var stored = (typeof localStorage !== 'undefined') ? localStorage.getItem('wedding_lang') : null;
  var lang = (langParam && window.I18N[langParam]) ? langParam
           : (stored && window.I18N[stored])       ? stored
           : 'en';
  window.__LANG = lang;
  if (typeof localStorage !== 'undefined') localStorage.setItem('wedding_lang', lang);
})();

/* ── t() shorthand ─────────────────────────────────────────── */
window.t = function(key) {
  return (window.I18N[window.__LANG] && window.I18N[window.__LANG][key] !== undefined)
    ? window.I18N[window.__LANG][key]
    : (window.I18N.en[key] || key);
};

/* ── Multilingual content.json translations ────────────────── */
window.CONTENT_TRANSLATIONS = {
  de: {
    loveStory: {
      paragraphs: [
        "Wir haben uns in der Kirche kennengelernt, wurden Freunde — und irgendwann verwandelte sich diese Freundschaft still in Liebe.",
        "Am 02.03 haben wir uns verlobt — ein Versprechen, das wir nun Richtung 2026 tragen, wenn wir unsere Ehe mit unseren Liebsten feiern werden.",
        "Vor allem sind wir dankbar für das Leben, das Gott in uns aufbaut, und für die Freude, unserem Herrn gemeinsam zu dienen."
      ]
    },
    ceremony: {
      agenda: [
        { time: "13:30", label: "ANKOMMEN", title: "Ankommen", location: "Schlosskirche Eller", address: "Schlossallee 10, 40229 Düsseldorf", mapUrl: "https://maps.google.com/?q=Schlosskirche+Eller+Düsseldorf", description: "Ankunft, bekannte Gesichter treffen und ankommen, bevor die Zeremonie beginnt." },
        { time: "14:00", label: "ZEREMONIE", title: "Beginn der Zeremonie", description: "Bitte <strong>nehmt eure Plätze vor 14:00 Uhr ein</strong>, damit wir pünktlich beginnen können. Wir bitten euch, <strong>die Handys wegzulegen</strong> und den Moment mit uns zu genießen. Unser Fotograf und Videograf kümmern sich um die Aufnahmen." },
        { time: "15:00–16:00", label: "EMPFANG", title: "Bring & Share Empfang", bringAndShare: true, bringAndShareFormUrl: "https://forms.gle/4C6RUZfEKunpWGoc8", description: "Wir würden uns über ein Bring & Share mit unseren Lieben freuen! Sagt uns, ob ihr einen Kuchen, Torten, Backwaren, Fingerfood oder etwas für einen kleinen Snack mitbringen möchtet. ❤️" }
      ]
    },
    dressCode: {
      intro: "Elegante Abendgarderobe in sanften Neutraltönen und tiefen klassischen Farben.",
      colors: [
        { name: "Weiß", class: "champagne" }, { name: "Elfenbein", class: "ivory" },
        { name: "Taupe", class: "taupe" },    { name: "Kakao", class: "cocoa" },
        { name: "Braun", class: "charcoal" },  { name: "Schwarz", class: "black" }
      ],
      note: "Bitte vermeidet Neonfarben und sehr auffällige Muster."
    },
    faq: [
      { question: "Kann ich eine Begleitung mitbringen?", answer: "Bitte haltet euch an eure Einladung. Wir würden uns über jeden freuen, aber die Plätze in der Kirche sind begrenzt." },
      { question: "Gibt es Parkplätze?", answer: "Ja! Direkt bei der Kirche, in der Umgebung und in einer kurzen Entfernung gibt es ausreichend Parkmöglichkeiten." },
      { question: "Gibt es eine Wunschliste?", answer: "Keine Wunschliste — aber wenn ihr uns etwas schenken möchtet, wären wir sehr dankbar über einen finanziellen Beitrag für unser neues Zuhause und unsere Flitterwochen." },
      { question: "Gibt es einen Kinderbereich?", answer: "Kinder sind herzlich willkommen! Wir bitten darum, dass sie während der Zeremonie im Kinderbereich hinten in der Kirche sitzen oder spielen. Danke ❤️" },
      { question: "Wann soll ich ankommen?", answer: "Bitte kommt bis 13:30 Uhr, um euren Platz zu finden und euch einzurichten, bevor die Zeremonie um 14:00 Uhr beginnt." },
      { question: "Wen kann ich kontaktieren?", answer: "Der Trauzeuge oder die Brautjungfer sind eure Ansprechpartner — schaut in den Teambereich." }
    ]
  },
  ru: {
    loveStory: {
      paragraphs: [
        "Мы познакомились в церкви, стали друзьями — и где-то по дороге дружба тихо переросла в любовь.",
        "02.03 мы обручились — обещание, которое несём в 2026 год, когда отпразднуем наш брак с близкими.",
        "Прежде всего, мы благодарны за жизнь, которую Бог строит в нас, и за радость служить нашему Господу вместе."
      ]
    },
    ceremony: {
      agenda: [
        { time: "13:30", label: "ВСТРЕЧА", title: "Встреча гостей", location: "Schlosskirche Eller", address: "Schlossallee 10, 40229 Düsseldorf", mapUrl: "https://maps.google.com/?q=Schlosskirche+Eller+Düsseldorf", description: "Приходите, встречайтесь с близкими и устраивайтесь, прежде чем начнётся церемония." },
        { time: "14:00", label: "ЦЕРЕМОНИЯ", title: "Начало церемонии", description: "Пожалуйста, <strong>займите свои места до 14:00</strong>, чтобы мы начали вовремя. Просим вас <strong>убрать телефоны</strong> и насладиться моментом вместе с нами. Фотограф и видеограф сделают все снимки." },
        { time: "15:00–16:00", label: "ФУРШЕТ", title: "Фуршет Bring & Share", bringAndShare: true, bringAndShareFormUrl: "https://forms.gle/4C6RUZfEKunpWGoc8", description: "Мы будем рады совместному фуршету с нашими близкими! Сообщите, хотите ли вы принести пирог, торт, выпечку, закуски или что-нибудь для лёгкого перекуса. ❤️" }
      ]
    },
    dressCode: {
      intro: "Элегантный вечерний наряд в мягких нейтральных и глубоких классических тонах.",
      colors: [
        { name: "Белый", class: "champagne" }, { name: "Слоновая кость", class: "ivory" },
        { name: "Тауп", class: "taupe" },       { name: "Какао", class: "cocoa" },
        { name: "Коричневый", class: "charcoal" }, { name: "Чёрный", class: "black" }
      ],
      note: "Пожалуйста, избегайте ярких неоновых тонов и броских рисунков."
    },
    faq: [
      { question: "Можно ли привести гостя?", answer: "Пожалуйста, следуйте вашему приглашению. Мы рады каждому, но количество мест в церкви ограничено." },
      { question: "Есть ли парковка?", answer: "Да! Прямо у церкви, вокруг неё и немного поодаль есть достаточно парковочных мест." },
      { question: "Есть ли список подарков?", answer: "Списка подарков нет — но если вы хотите нас порадовать, мы будем очень признательны за денежный подарок для нашего нового дома и медового месяца." },
      { question: "Есть ли место для детей?", answer: "Дети очень приветствуются! Просим, чтобы во время церемонии они сидели или играли в детском уголке в задней части церкви. Спасибо ❤️" },
      { question: "Когда прийти?", answer: "Пожалуйста, приходите к 13:30, чтобы найти своё место и устроиться до начала церемонии в 14:00." },
      { question: "К кому обратиться?", answer: "Шафер или подружка невесты — ваши главные контакты, найдите их в разделе команды." }
    ]
  }
};
