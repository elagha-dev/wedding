/* ============================================================
   OUR STORY — PHOTOS
   To add a photo to the scrollable strip on the site, just add
   one line below with the image path and a short alt text.
   That's it — nothing else needs to change anywhere else.
   Photos render in black & white automatically.
   Optional "focus" field: a CSS object-position value (e.g.
   "center 15%") to override the default top-weighted crop if a
   particular photo still cuts off a face — add it per-photo only
   when needed.
   ============================================================ */
var STORY_PHOTOS = [
  { src: "img/us.jpg",        alt: "Our moment" },
  { src: "img/photo2.jpg",    alt: "The proposal" },
  { src: "img/photo6.jpg",    alt: "Our moment" },
  { src: "img/photo4.jpg",    alt: "Golden hour" },
  { src: "img/photo-847.jpg", alt: "Out and about together" },
  { src: "img/photo-512.jpg", alt: "Mirror selfie" },
  { src: "img/photo-963.jpg", alt: "Singing together on stage" },
  { src: "img/photo-204.jpg", alt: "On stage together, black and white" }
];

/* ── Role translation map ── */
function translateRole(role) {
  var map = {
    "Best Man"     : "crewRoleBestMan",
    "Groom's Man"  : "crewRoleGroomsMan",
    "Maid of Honor": "crewRoleMaidOfHonor",
    "Bride's Maid" : "crewRoleBridesMaid",
    "Pastor"       : "crewRolePastor",
    "Worship Team" : "crewRoleWorshipTeam",
    "Bring & Share": "crewRoleBringShare"
  };
  var key = map[role];
  return key ? t(key) : role;
}

/* ============================================================
   WEDDING SITE — script.js
   Loads content.json → renders DOM, then handles RSVP form.
   ============================================================ */

/* ── 1. CONTENT LOADER ───────────────────────────────────── */

function buildPersonCard(person) {
  const wrap = document.createElement("div");
  wrap.className = "mini-contact-wrap";
  const photoSrc = person.photo || '';
  var photoClass = 'mini-photo';
  if (person.role === 'Worship Team') photoClass = 'mini-photo mini-photo--worship';
  if (person.role === 'Bring & Share') photoClass = 'mini-photo mini-photo--bs';
  const photoHtml = photoSrc
    ? `<span class="${photoClass}"><img src="${photoSrc}" alt="${person.name}" loading="lazy" /></span>`
    : `<span class="${photoClass} mini-photo--placeholder"></span>`;
  const emailHtml = person.email
    ? `<p><span>${t('emailLabel')}</span><a href="mailto:${person.email}">${person.email}</a></p>`
    : '';
  const popoverName = person.hideName ? translateRole(person.role) : person.name;
  wrap.innerHTML = `
    <button type="button" class="party-mini-contact" aria-label="Open ${person.displayName || person.name} contact card">
      ${photoHtml}
      <span class="mini-name">${person.displayName || person.name}</span>
    </button>
    <div class="mini-popover">
      <button type="button" class="mini-popover-close" aria-label="Close">×</button>
      <div class="contact-role">${translateRole(person.role)}</div>
      <h3>${popoverName}</h3>
      ${emailHtml}
      ${person.phone ? `<p><span>${t('phoneLabel')}</span><a href="tel:${person.phone.replace(/\s+/g, "")}">${person.phone}</a></p>` : ''}
    </div>`;
  return wrap;
}

function renderCrewSide(containerId, people) {
  const container = document.getElementById(containerId);
  if (!container || !people) return;
  people.forEach(p => container.appendChild(buildPersonCard(p)));
}

function renderCrewOther(containerId, people) {
  const container = document.getElementById(containerId);
  if (!container || !people) return;
  people.forEach(p => container.appendChild(buildPersonCard(p)));
}

function renderContent(c) {
  /* ── Use translated story paragraphs ── */
  const storyEl = document.getElementById("story-paragraphs");
  var storyParas = t('storyParagraphs');
  if (storyEl && Array.isArray(storyParas)) {
    storyEl.innerHTML = storyParas.map(function(p) { return '<p class="story-text">' + p + '</p>'; }).join('');
  } else if (storyEl && c.loveStory && c.loveStory.paragraphs) {
    storyEl.innerHTML = c.loveStory.paragraphs.map(function(p) { return '<p class="story-text">' + p + '</p>'; }).join('');
  }
  /* ── Swap CONTENT agenda/dressCode/faq with translations ── */
  var tAgenda = t('agenda');
  if (Array.isArray(tAgenda) && c.ceremony) c.ceremony.agenda = tAgenda;
  var tDressIntro = t('dressIntro'); if (typeof tDressIntro === 'string' && c.dressCode) c.dressCode.intro = tDressIntro;
  var tDressNote  = t('dressNote');  if (typeof tDressNote  === 'string' && c.dressCode) c.dressCode.note  = tDressNote;
  var tDressColors = t('dressColors'); if (Array.isArray(tDressColors) && c.dressCode) {
    c.dressCode.colors = tDressColors.map(function(x) { return { name: x.name, class: x.cls }; });
  }
  var tFaq = t('faq'); if (Array.isArray(tFaq)) {
    c.faq = tFaq.map(function(x) { return { question: x.q, answer: x.a }; });
  }
  /* story already rendered above with translations — do not overwrite */

  /* Crew */
  renderCrewSide("crew-groom", c.crew && c.crew.groomSide);
  renderCrewSide("crew-bride", c.crew && c.crew.brideSide);
  renderCrewOther("crew-other", c.crew && c.crew.pastorAndBand);


  /* Ceremony timeline */
  const agendaEl = document.getElementById("ceremony-agenda");
  if (agendaEl && c.ceremony && c.ceremony.agenda) {
    var visibleAgenda = c.ceremony.agenda.filter(function(item) {
      return !item.partyOnly || __inviteParty;
    });
    agendaEl.innerHTML = visibleAgenda.map(function(item, idx) {
      var isLast = idx === visibleAgenda.length - 1;
      var locationHtml = "";
      if (item.location) {
        locationHtml = '<div class="agenda-location">' +
          '<span class="agenda-location-name">' + item.location + '</span>' +
          (item.address ? '<span class="agenda-address">' + item.address + '</span>' : '') +
          (item.mapUrl ? '<a class="agenda-map-link" href="' + item.mapUrl + '" target="_blank" rel="noreferrer">' + t('viewOnMap') + '</a>' : '') +
          '</div>';
      }
      var bringShareHtml = "";
      if (item.bringAndShare && item.bringAndShareFormUrl) {
        bringShareHtml = '<a class="agenda-hint-btn" href="' + item.bringAndShareFormUrl + '" target="_blank" rel="noreferrer">' + t('bringShareAgendaBtn') + '</a>';
      }

      return '<div class="agenda-step' + (isLast ? ' agenda-step--last' : '') + '">' +
        '<div class="agenda-dot-col">' +
          '<div class="agenda-dot"></div>' +
          (!isLast ? '<div class="agenda-line"></div>' : '') +
        '</div>' +
        '<div class="agenda-content">' +
          '<div class="agenda-time-label">' +
            '<span class="agenda-time">' + item.time + '</span>' +
            '<span class="agenda-label">' + (item.label || '') + '</span>' +
          '</div>' +
          '<div class="agenda-title">' + item.title + '</div>' +
          locationHtml +
          '<p class="agenda-desc">' + item.description + '</p>' +
          bringShareHtml +
        '</div>' +
      '</div>';
    }).join("");

    /* Inject scroll anchors into timeline items */
    var steps = agendaEl.querySelectorAll('.agenda-step');
    visibleAgenda.forEach(function(item, idx) {
      if (['CEREMONY','GET TOGETHER','ZEREMONIE','ANKOMMEN','ЦЕРЕМОНИЯ','ВСТРЕЧА'].indexOf(item.label) !== -1) {
        if (steps[idx]) steps[idx].id = 'anchor-ceremony';
      }
      if (item.partyOnly) {
        if (steps[idx]) steps[idx].id = 'anchor-party';
      }
    });

    /* Show timeline nav (both anchors) only when invited to party */
    var timelineNav = document.getElementById('timelineNav');
    if (timelineNav && __inviteParty) {
      timelineNav.style.display = '';
    }
    /* When party invite: update card 04 label/title to broader "The Day" */
    if (__inviteParty) {
      var card04Label = document.getElementById('card04Label');
      var card04Title = document.getElementById('card04Title');
      if (card04Label) card04Label.textContent = t('card04LabelParty');
      if (card04Title) card04Title.textContent = t('card04TitleParty');
    }

    /* Hide celebration card for church-only invites */
    var celebrationCard = document.querySelector('.celebration-card');
    if (celebrationCard && !__inviteParty) {
      celebrationCard.style.display = 'none';
    }

  }

  /* Dress code */
  var dressIntro = document.getElementById("dress-intro");
  var dressNote  = document.getElementById("dress-note");
  var dressPalette = document.getElementById("dress-palette");
  if (dressIntro) dressIntro.textContent = (c.dressCode && c.dressCode.intro) || "";
  if (dressNote)  dressNote.textContent  = (c.dressCode && c.dressCode.note)  || "";
  if (dressPalette && c.dressCode && c.dressCode.colors) {
    dressPalette.innerHTML = c.dressCode.colors
      .map(function(col) { return '<div class="tone ' + col.class + '"><span>' + col.name + '</span></div>'; }).join("");
  }

  /* FAQ */
  var faqEl = document.getElementById("faq-list");
  if (faqEl && c.faq) {
    faqEl.innerHTML = c.faq.map(function(item) {
      return '<div class="faq-item"><details><summary>' + item.question + '</summary><div class="faq-answer">' + item.answer + '</div></details></div>';
    }).join("");
  }

  /* RSVP URLs */
  if (c.rsvp && c.rsvp.googleScriptUrl) window.__GOOGLE_SCRIPT_URL = c.rsvp.googleScriptUrl;
  if (c.rsvp && c.rsvp.giftListUrl)     window.__GIFT_LIST_URL     = c.rsvp.giftListUrl;
  if (c.rsvp && c.rsvp.bringAndShareFormUrl) window.__BRING_SHARE_URL = c.rsvp.bringAndShareFormUrl;
  if (c.rsvp && c.rsvp.paypalUrl) { window.__PAYPAL_URL = c.rsvp.paypalUrl; var _pl = document.getElementById("giftPaypalLink"); if (_pl) _pl.href = c.rsvp.paypalUrl; }
  if (c.rsvp && c.rsvp.bringAndShareSpoc) {
    window.__BRING_SHARE_SPOC = c.rsvp.bringAndShareSpoc;
    var spocEl = document.getElementById("bsSpocName");
    if (spocEl && c.rsvp.bringAndShareSpoc.trim()) {
      spocEl.textContent = c.rsvp.bringAndShareSpoc;
    }
  }

  initPopovers();
}

function loadContent() {
  // Content inlined from content.json — works from file:// with no server needed.
  // To update content, edit content.json and ask to re-inline it.
  var CONTENT = {
  "meta": {
    "siteTitle": "Your Digital Invitation to Arina & Elnur's Wedding Ceremony",
    "siteUrl": "https://www.arinaelnur.de",
    "description": "You are warmly invited to Arina & Elnur's wedding ceremony at the Schlosskirche in Eller Düsseldorf, Germany. Join us for a special celebration of love and unity.",
    "ogTitle": "Arina & Elnur Wedding Ceremony Invitation",
    "ogDescription": "You are warmly invited to Arina & Elnur's wedding ceremony at the Schlosskirche in Eller Düsseldorf, Germany. Join us for a special celebration of love and unity.",
    "ogImage": "https://www.arinaelnur.de/img/us.jpg",
    "twitterTitle": "Arina & Elnur Wedding Invitation",
    "twitterDescription": "You are warmly invited to Arina & Elnur's wedding ceremony.",
    "analyticsToken": "40223123959b40ce8820f84cd8bbae11"
  },
  "rsvp": {
    "googleScriptUrl": "https://script.google.com/macros/s/AKfycbwTXSvlokP2p8Htn2K4BuuxpfEix2xJckTKjp068hjSkpk0mTut9DNs130KfofyZcM9QA/exec",
    "giftListUrl": "#",
    "bringAndShareFormUrl": "https://forms.gle/4C6RUZfEKunpWGoc8",
    "bringAndShareSpoc": ""
  },
  "loveStory": {
    "paragraphs": [
      "We met at church, became friends, and somewhere along the way friendship quietly turned into love.",
      "On 02.03, we got engaged — a promise we now carry toward 2026, when we will celebrate our marriage with out loved ones.",
      "Above all, we are grateful for the life God is building in us, and for the joy of serving our Lord together."
    ]
  },
  
  "crew": {
    "groomSide": [
      { "name": "Islam",  "displayName": "Islam",  "photo": "img/isi.jpg",    "role": "Best Man", "email": "islamaghazada@gmail.com",  "phone": "+47 479 61 978" },
      { "name": "Lars",   "displayName": "Lars",   "photo": "img/lars.jpg",   "role": "Groom's Man", "email": "lars.neuhausen@gmail.com",   "phone": "+31 6 10 00 95 29" },
      { "name": "Lucas",  "displayName": "Lucas",  "photo": "img/lucas.jpg",  "role": "Groom's Man", "email": "heidenreich.lu@gmail.com",  "phone": "+49 178 3752258" }
    ],
    "brideSide": [
      { "name": "Alicja", "displayName": "Alicja", "photo": "img/alicja.jpg",  "role": "Maid of Honor","email": "alicjabialkowski@gmail.com","phone": "+49 176 23191761" },
      { "name": "Kris",   "displayName": "Kris",   "photo": "img/kris.jpg",    "role": "Bride's Maid", "email": "kristinenaal@gmail.com",   "phone": "+47 456 66 148" },
      { "name": "Valerie","displayName": "Valerie","photo": "img/valerie.jpg", "role": "Bride's Maid", "email": "valneuhausen@gmail.com","phone": "+31 6 10970211" }
    ],
    "pastorAndBand": [
      { "name": "Felipe", "displayName": "Pastor", "photo": "img/felipe.jpg", "role": "Pastor", "email": "felipe.schuerch@hillsong.de", "phone": "+49 175 2894775" },
      { "name": "Jonas", "displayName": "Worship", "photo": "img/worship-team.jpg", "role": "Worship Team", "email": "jonas.rockhoff@hillsong.de", "phone": "+49 176 56900741" },
      { "name": "Kathi", "displayName": "B&S", "photo": "img/kathi.jpg", "role": "Bring & Share", "phone": "+49 162 6247906" }
    ]
  },
  "ceremony": {
    "agenda": [
      {
        "time": "13:30",
        "label": "GET TOGETHER (BRING & SHARE)",
        "title": "Get Together (Bring & Share)",
        "location": "Schlosskirche Eller",
        "address": "Schlossallee 6, 40229 Düsseldorf",
        "mapUrl": "https://maps.google.com/?q=Schlosskirche+Eller+Düsseldorf",
        "description": "Arrive, meet familiar faces, and settle in before the ceremony begins."
      },
      {
        "time": "14:00",
        "label": "CEREMONY",
        "title": "Ceremony Start",
        "description": "Please <strong>take your seat before 14:00</strong> so we can start on time. We kindly ask you to <strong>put your phones away</strong> and enjoy the moment with us. Our photographer and videographer will take care of capturing the ceremony."
      },
      {
        "time": "15:00–16:00",
        "label": "RECEPTION",
        "title": "Bring & Share Reception",
        "bringAndShare": true,
        "bringAndShareFormUrl": "https://forms.gle/4C6RUZfEKunpWGoc8",
        "description": "We would love a bring & share with our dear ones! Let us know if you'd like to bring a pie, cake, bakery, finger foods, or anything for a little snack. ❤️"
      },
      {
        "time": "17:00",
        "label": "EVENING PARTY",
        "title": "Evening Reception",
        "partyOnly": true,
        "location": "Rheinliebe am Deich",
        "address": "Heerstraße 45, 40549 Düsseldorf",
        "mapUrl": "https://maps.google.com/?q=Rheinliebe+am+Deich+Düsseldorf",
        "description": "Join us as we continue the celebration — an evening reception starting at 17:00 with good food, great company, and all the joy."
      }
    ]
  },
  "dressCode": {
    "intro": "Elegant evening attire in soft neutrals and deep classic tones.",
    "colors": [
      { "name": "White",    "class": "champagne" },
      { "name": "Ivory",     "class": "ivory"     },
      { "name": "Taupe",     "class": "taupe"     },
      { "name": "Cocoa",     "class": "cocoa"     },
      { "name": "Brown",    "class": "charcoal"  },
      { "name": "Black",     "class": "black"     }
    ],
    "note": "Please avoid neon tones and very bright patterns."
  },
  "faq": [
    {
      "question": "Can I bring a plus one?",
      "answer": "Please follow your invite. We would love to have our dear ones but have a limited number of seats in the church."
    },
    {
      "question": "Are there any parking spots?",
      "answer": "Yes! There are some directly at the church, as well as near the houses around it, and a bigger parking area within walking distance."
    },
    {
      "question": "Is there a wish list?",
      "answer": "No wish list — but if you'd like to gift us something, we would be so grateful for a financial contribution toward starting our new home together and celebrating our honeymoon. <a href='https://paypal.me/ElnurAghayev' target='_blank' rel='noreferrer' style='display:inline-block;margin-top:8px;padding:6px 14px;background:#003087;color:#fff;border-radius:4px;text-decoration:none;font-size:0.9em;'>Contribute via PayPal ↗</a>"
    },
    {
      "question": "Is there any place for kids?",
      "answer": "Kids are more than welcome! We would kindly ask that they sit or play in the kids' space at the back of the church during the ceremony. Thank you ❤️"
    },
    {
      "question": "When should I arrive?",
      "answer": "Please arrive by 13:30 to find your seat and settle in before the ceremony begins at 14:00."
    },
    {
      "question": "Who can I contact?",
      "answer": "The best man or maid of honor are your go-to contacts — find them in the Crew section."
    }
  ]
}
;
  renderContent(CONTENT);
}

/* Must be set before loadContent() so agenda renderer sees it */
var __inviteParty = (new URLSearchParams(window.location.search)).get('party') === '1';

loadContent();

/* ── applyI18n: update all data-i18n elements with current language ── */
function applyI18n() {
  /* Keys whose values contain HTML markup — use innerHTML, not textContent */
  var htmlKeys = ['bsArrivalText','bsContactHint','bsWarmHint'];
  /* Text content — only leaf nodes (no nested data-i18n children) */
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    if (el.querySelector('[data-i18n]')) return; /* skip non-leaf */
    var key = el.getAttribute('data-i18n');
    var val = t(key);
    if (typeof val === 'string') {
      if (htmlKeys.indexOf(key) !== -1) el.innerHTML = val;
      else el.textContent = val;
    }
  });
  /* Placeholders */
  document.querySelectorAll('[data-i18n-ph]').forEach(function(el) {
    var key = el.getAttribute('data-i18n-ph');
    var val = t(key);
    if (typeof val === 'string') el.placeholder = val;
  });
  /* Ceremony attend label: default key is churchOnlyQuestion ("Will you be joining us?")
     For party invites, swap to the full "💒 Church Ceremony · 16 Oct, 14:00" label. */
  var attendLabel = document.querySelector('.attend-field .attend-label [data-i18n]');
  if (attendLabel) {
    attendLabel.textContent = __inviteParty ? t('ceremonyAttendLabel') : t('churchOnlyQuestion');
  }
  /* Attend Yes/No buttons — church row
     HTML uses churchOnlyYesBtn/churchOnlyNoBtn keys by default.
     For party invites, swap to the combined phrasing. */
  var attendYesBtnSpan = document.querySelector('#attendYes [data-i18n]');
  var attendNoBtnSpan  = document.querySelector('#attendNo [data-i18n]');
  if (attendYesBtnSpan) attendYesBtnSpan.textContent = __inviteParty ? t('attendingBtn') : t('churchOnlyYesBtn');
  if (attendNoBtnSpan)  attendNoBtnSpan.textContent  = __inviteParty ? t('notAttendingBtn') : t('churchOnlyNoBtn');
  /* Party row: use separate party button labels for combined invites */
  var partyYesBtnSpan = document.querySelector('#partyYesBtn [data-i18n="attendingBtn"]');
  var partyNoBtnSpan  = document.querySelector('#partyNoBtn [data-i18n="notAttendingBtn"]');
  if (partyYesBtnSpan) partyYesBtnSpan.textContent = t(__inviteParty ? 'attendingBtnParty' : 'attendingBtn');
  if (partyNoBtnSpan)  partyNoBtnSpan.textContent  = t(__inviteParty ? 'notAttendingBtnParty' : 'notAttendingBtn');
  /* Mark active lang button */
  document.querySelectorAll('.lang-btn').forEach(function(btn) {
    btn.classList.toggle('is-active', btn.getAttribute('data-lang') === window.__LANG);
  });
}

/* ── Language switcher ────────────────────────────────────── */
document.querySelectorAll('.lang-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var lang = btn.getAttribute('data-lang');
    if (!lang || !window.I18N[lang]) return;
    window.__LANG = lang;
    localStorage.setItem('wedding_lang', lang);
    /* Re-run content rendering with the new language */
    var agendaEl = document.getElementById('ceremony-agenda');
    if (agendaEl) agendaEl.innerHTML = '';
    var storyEl = document.getElementById('story-paragraphs');
    if (storyEl) storyEl.innerHTML = '';
    var faqEl = document.getElementById('faq-list');
    if (faqEl) faqEl.innerHTML = '';
    var dressPalette = document.getElementById('dress-palette');
    if (dressPalette) dressPalette.innerHTML = '';
    /* Clear crew containers */
    ['crew-groom','crew-bride','crew-other'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.innerHTML = '';
    });
    loadContent();
    applyI18n();
  });
});

/* ── 2. POPOVER LOGIC ────────────────────────────────────── */

function initPopovers() {
  document.querySelectorAll(".mini-contact-wrap").forEach(function(wrap) {
    var button  = wrap.querySelector(".party-mini-contact");
    var popover = wrap.querySelector(".mini-popover");
    var close   = wrap.querySelector(".mini-popover-close");
    if (!button || !popover) return;

    function positionPopover() {
      var anchor = wrap.querySelector("img") || button;
      var rect   = anchor.getBoundingClientRect();
      var pWidth = 180;
      var margin = 12;
      var gap    = 10;
      var left = rect.left + rect.width / 2;
      var top  = rect.top - gap;
      var below = false;
      left = Math.max(margin + pWidth / 2, Math.min(left, window.innerWidth - margin - pWidth / 2));
      if (top < 120) { top = rect.bottom + gap; below = true; }
      popover.style.setProperty("--mini-left", left + "px");
      popover.style.setProperty("--mini-top",  top  + "px");
      popover.style.transform = below ? "translate(-50%, 0)" : "translate(-50%, -100%)";
      popover.classList.toggle("popover-below", below);
    }

    button.addEventListener("click", function(e) {
      e.preventDefault(); e.stopPropagation();
      document.querySelectorAll(".mini-contact-wrap.is-open").forEach(function(other) {
        if (other !== wrap) other.classList.remove("is-open");
      });
      wrap.classList.toggle("is-open");
      if (wrap.classList.contains("is-open")) positionPopover();
    });

    if (close) {
      close.addEventListener("click", function(e) {
        e.preventDefault(); e.stopPropagation();
        wrap.classList.remove("is-open");
      });
    }
  });

  window.addEventListener("resize", function() {
    document.querySelectorAll(".mini-contact-wrap.is-open").forEach(function(wrap) {
      var button  = wrap.querySelector(".party-mini-contact");
      var popover = wrap.querySelector(".mini-popover");
      if (!button || !popover) return;
      var anchor = wrap.querySelector("img") || button;
      var rect   = anchor.getBoundingClientRect();
      var left = Math.max(12 + 90, Math.min(rect.left + rect.width / 2, window.innerWidth - 12 - 90));
      var top  = rect.top - 10;
      var below = top < 120;
      if (below) top = rect.bottom + 10;
      popover.style.setProperty("--mini-left", left + "px");
      popover.style.setProperty("--mini-top",  top  + "px");
      popover.style.transform = below ? "translate(-50%, 0)" : "translate(-50%, -100%)";
    });
  });

  document.addEventListener("click", function() {
    document.querySelectorAll(".mini-contact-wrap.is-open")
      .forEach(function(w) { w.classList.remove("is-open"); });
  });
}


/* ── 3. RSVP WIZARD ──────────────────────────────────────── */

/* DOM refs */
var attendanceSelect  = document.getElementById("attendanceSelect");
var partyAttendSelect = document.getElementById("partyAttendSelect");
var kidsCount         = document.getElementById("kidsCount");
var kidsCountDisplay  = document.getElementById("kidsCountDisplay");
var kidsMinus         = document.getElementById("kidsMinus");
var kidsPlus          = document.getElementById("kidsPlus");
var totalSeatsInput   = document.getElementById("totalSeats");
var bringShareCheckbox= document.getElementById("bringShareCheckbox");
var bringShareRow     = document.getElementById("bringShareRow");
var eveningAttendField= document.getElementById("eveningAttendField");
var rsvpStatus        = document.getElementById("rsvpStatus");
var rsvpSuccess       = document.getElementById("rsvpSuccess");
var rsvpCard          = document.querySelector(".rsvp-card");
var rsvpWizard        = document.getElementById("rsvpWizard");
var guestChecksEl     = document.getElementById("guestChecks");
var successKicker     = document.getElementById("successKicker");
var successTitle      = document.getElementById("successTitle");
var successMessage    = document.getElementById("successMessage");
var newRsvpBtn        = document.getElementById("newRsvpBtn");
var giftBanner        = document.getElementById("giftBanner");

/* Wizard elements (single step) */
var wStep1  = document.getElementById("wStep1");
var wSubmit = document.getElementById("wSubmit");

/* Attend buttons */
var attendYesBtn  = document.getElementById("attendYes");
var attendNoBtn   = document.getElementById("attendNo");
var partyYesBtn   = document.getElementById("partyYesBtn");
var partyNoBtn    = document.getElementById("partyNoBtn");

/* ── Global state ─────────────────────────────────────────── */
var __guests    = [];
var __isCouple  = false;
var __partyRsvp = {};
var __manualSeatOverride = false; /* true once user touches seat stepper */
var __seatCount = 1;

function getGuestCode() {
  var p = new URLSearchParams(window.location.search);
  return p.get("guest") || p.get("invite") || "";
}

/* ── Sync invite-type dependent UI: evening row ── */
function applyInviteTypeUI() {
  if (eveningAttendField) eveningAttendField.style.display = __inviteParty ? "" : "none";
}

/* ── Attendance helpers ──────────────────────────────────── */
function isAttending()      { return (attendanceSelect  ? attendanceSelect.value  : "")    === "Yes"; }
function isPartyAttending() { return (partyAttendSelect ? partyAttendSelect.value : "No")  === "Yes"; }

function setAttendance(val) {
  if (attendanceSelect) attendanceSelect.value = val;
  if (attendYesBtn) attendYesBtn.classList.toggle("is-active", val === "Yes");
  if (attendNoBtn)  attendNoBtn.classList.toggle("is-active",  val === "No");
  onAttendanceChange();
}

function setPartyAttendance(val) {
  if (partyAttendSelect) partyAttendSelect.value = val;
  if (partyYesBtn) partyYesBtn.classList.toggle("is-active", val === "Yes");
  if (partyNoBtn)  partyNoBtn.classList.toggle("is-active",  val === "No");
  onAttendanceChange();
}

function onAttendanceChange() {
  var attending = isAttending();
  /* Bring & Share only for church attendees */
  if (bringShareRow) bringShareRow.style.display = attending ? "" : "none";
  if (!attending && bringShareCheckbox) { bringShareCheckbox.classList.remove('is-active'); bringShareCheckbox.setAttribute('aria-pressed','false'); }
  /* Kids: show if attending anything */
  var anyAttending = attending || isPartyAttending();
  var childrenRow = document.getElementById("childrenRow");
  if (childrenRow) childrenRow.style.display = anyAttending ? "" : "none";
  if (!anyAttending) setChildrenCount(0);
  /* Decline note only when not attending anything, and only once a choice has been made */
  var choiceMade = (attendanceSelect && attendanceSelect.value !== "");
  recalcSeats();
  updateSelectionSummary();
}

/* ── Children stepper ─────────────────────────────────────── */
function getChildrenCount() { return Math.max(0, Number((kidsCount && kidsCount.value) || 0)); }

function setChildrenCount(next) {
  var v = Math.min(10, Math.max(0, Number(next) || 0));
  if (kidsCount) kidsCount.value = String(v);
  if (kidsCountDisplay) kidsCountDisplay.textContent = String(v);
  if (!__manualSeatOverride) recalcSeats();
}

/* ── Guest checkboxes ─────────────────────────────────────── */
function fillNameFromGuests() {
  /* Keep first_name locked to the full originally-invited party
     (e.g. "Patrick & Steffi") regardless of which guests are toggled
     on/off, so the sheet always shows who the RSVP belongs to —
     even on a full decline. */
  var firstField = rsvpWizard && rsvpWizard.querySelector('[name="first_name"]');
  if (!firstField) return;
  firstField.value = __guests.length ? __guests.join(' & ') : firstField.value;
  autoFitNameField(firstField);
}

/* Shrinks font-size for long combined names so they fit without being clipped */
function autoFitNameField(field) {
  if (!field) return;
  var len = (field.value || '').length;
  var size;
  if (len <= 16)      size = 12;
  else if (len <= 22) size = 11;
  else if (len <= 28) size = 10;
  else if (len <= 34) size = 9;
  else                size = 8;
  field.style.fontSize = size + 'px';
}
(function() {
  var fnField = document.querySelector('[name="first_name"]');
  if (fnField) fnField.addEventListener('input', function() { autoFitNameField(fnField); });
})();

function buildGuestChecks(guests) {
  /* Re-query in case the element wasn't in the DOM when the var was first set */
  if (!guestChecksEl) guestChecksEl = document.getElementById('guestChecks');
  if (!guestChecksEl || !guests || !guests.length) return;
  guestChecksEl.innerHTML = '';

  /* Add "Guests" label above the toggle buttons */
  var guestLabel = document.createElement('span');
  guestLabel.className = 'attend-label';
  guestLabel.style.display = 'block';
  guestLabel.style.marginBottom = '2px';
  guestLabel.textContent = t('guestsLabel') || 'GUESTS';
  guestChecksEl.appendChild(guestLabel);

  /* Add hint about pre-selection */
  var guestHint = document.createElement('p');
  guestHint.style.cssText = 'font-family:WeddingSerif,Georgia,serif;font-size:10px;color:rgba(49,39,28,.45);letter-spacing:.02em;margin:0 0 8px;';
  guestHint.textContent = t('guestsHint') || 'Pre-selected — tap to deselect if someone can\'t attend.';
  guestChecksEl.appendChild(guestHint);

  /* Build per-guest Yes/No rows. Each guest gets their own explicit
     attendance choice instead of a single ambiguous toggle pill.
     The "Yes" button carries .guest-toggle-btn.is-active so existing
     downstream logic (checkedGuestCount, fillNameFromGuests, payload
     building) keeps working unchanged — it just reads off the hidden
     checkbox / is-active state as before. */
  var wrap = document.createElement('div');
  wrap.className = 'guest-toggle-wrap guest-yesno-wrap';
  guests.forEach(function(name, i) {
    var row = document.createElement('div');
    row.className = 'guest-yesno-row';

    var nameLabel = document.createElement('span');
    nameLabel.className = 'guest-yesno-name';
    nameLabel.textContent = name;
    row.appendChild(nameLabel);

    /* Hidden checkbox behind the pair for form data — unchanged contract */
    var cb = document.createElement('input');
    cb.type = 'checkbox'; cb.name = 'guest_' + i; cb.value = name; cb.checked = true;
    cb.style.display = 'none';
    cb.id = 'guestCb_' + i;

    var pair = document.createElement('div');
    pair.className = 'guest-yesno-pair';

    var yesBtn = document.createElement('button');
    yesBtn.type = 'button';
    yesBtn.className = 'attend-btn guest-toggle-btn guest-yes-btn is-active';
    yesBtn.dataset.guestIndex = i;
    yesBtn.dataset.guestName  = name;
    yesBtn.textContent = t('yesBtnShort') || 'Yes';

    var noBtn = document.createElement('button');
    noBtn.type = 'button';
    noBtn.className = 'attend-btn guest-no-btn';
    noBtn.dataset.guestIndex = i;
    noBtn.textContent = t('noBtnShort') || 'No';

    function setGuestState(attending) {
      cb.checked = attending;
      yesBtn.classList.toggle('is-active', attending);
      noBtn.classList.toggle('is-active', !attending);
      /* For couple invites, derive attendance from guest selections */
      if (guestChecksEl && guestChecksEl.querySelectorAll('.guest-toggle-btn').length > 0) {
        var anyActive = guestChecksEl.querySelectorAll('.guest-toggle-btn.is-active').length > 0;
        setAttendance(anyActive ? 'Yes' : 'No');
      }
      recalcSeats(); fillNameFromGuests(); updateSelectionSummary();
    }

    yesBtn.addEventListener('click', function() { setGuestState(true); });
    noBtn.addEventListener('click', function() { setGuestState(false); });

    pair.appendChild(yesBtn);
    pair.appendChild(noBtn);
    row.appendChild(pair);
    row.appendChild(cb);
    wrap.appendChild(row);
  });
  guestChecksEl.appendChild(wrap);
}

function checkedGuestCount() {
  if (!guestChecksEl) return 1;
  var boxes = guestChecksEl.querySelectorAll('input[type="checkbox"]');
  if (!boxes.length) return 1;
  var n = 0; boxes.forEach(function(b) { if (b.checked) n++; }); return n;
}

function updateAttendanceLabel() {}

/* ── Seat calculation ─────────────────────────────────────── */
function recalcSeats() {
  if (__manualSeatOverride) return __seatCount;
  var adults   = isAttending() ? checkedGuestCount() : (isPartyAttending() ? checkedGuestCount() : 0);
  var children = getChildrenCount();
  var total    = Math.max(isAttending() || isPartyAttending() ? 1 : 0, adults + children);
  __seatCount = total;
  if (totalSeatsInput) totalSeatsInput.value = String(total);
  updateSeatDisplay();
  return total;
}

function updateSeatDisplay() {
  /* Seat UI removed from the simplified RSVP; __seatCount is still tracked
     internally for the submitted payload (used by Bring & Share / planning). */
}

/* ── Live payload bar + submit button update ─────────────── */
function updateSelectionSummary() {
  var ppAttendance = document.getElementById('ppAttendance');
  var ppGuests     = document.getElementById('ppGuests');

  /* Collect active guest names */
  var activeNames = [];
  if (guestChecksEl) {
    guestChecksEl.querySelectorAll('.guest-toggle-btn.is-active').forEach(function(btn) {
      activeNames.push(btn.dataset.guestName || btn.textContent.trim());
    });
  }

  var hasGuests = guestChecksEl && guestChecksEl.querySelectorAll('.guest-toggle-btn').length > 0;
  var attendingEffectively = isAttending() && (!hasGuests || activeNames.length > 0);

  /* ── Payload bar ── */
  if (ppAttendance) ppAttendance.textContent = attendingEffectively ? 'Yes' : 'No';
  /* For single invites there are no guest-toggle-btns — fall back to the URL-parsed name */
  var guestDisplay = activeNames.length > 0
    ? activeNames.join(', ')
    : (!hasGuests && isAttending() && __guests.length > 0 ? __guests.join(', ') : '—');
  if (ppGuests) ppGuests.textContent = guestDisplay;

  /* ── Submit button morphs like the prototype ── */
  if (wSubmit && hasGuests) {
    var btnSpan = wSubmit.querySelector('span') || wSubmit;
    if (activeNames.length === 0) {
      /* Decline state — ghost button */
      btnSpan.textContent = t('sendRsvpBtnDecline') || "We sadly can't make it";
      wSubmit.style.background   = 'transparent';
      wSubmit.style.color        = 'rgba(49,39,28,.5)';
      wSubmit.style.border       = '1px solid rgba(49,39,28,.22)';
    } else {
      /* Attending state — filled orange */
      btnSpan.textContent = t('sendRsvpBtn') || 'Confirm attendance ✓';
      wSubmit.style.background   = '#E07020';
      wSubmit.style.color        = '#fff';
      wSubmit.style.border       = '1px solid #E07020';
    }
  }
}

function setSeatCount(v) {
  __seatCount = Math.max(0, Math.min(30, v));
  if (totalSeatsInput) totalSeatsInput.value = String(__seatCount);
  updateSeatDisplay();
}

/* ── Success screen ───────────────────────────────────────── */
function showSuccessScreen(attending) {
  if (rsvpWizard)  rsvpWizard.classList.add("is-hidden");
  /* Show in-card thank you note */
  var cardThanks = document.getElementById("rsvpCardThanks");
  var cardThanksMsg = document.getElementById("rsvpCardThanksMsg");
  if (cardThanks) {
    cardThanks.classList.add("is-visible");
    if (cardThanksMsg) cardThanksMsg.textContent = attending ? t('successCardAttending') : t('successCardDecline');
  }
  /* Show full-screen overlay with gift info */
  if (rsvpSuccess) {
    rsvpSuccess.classList.add("is-visible");
    rsvpSuccess.scrollTop = 0;
    document.body.style.overflow = "hidden";
  }
  if (successKicker) successKicker.textContent = t('successKicker');
  if (successTitle)  successTitle.textContent  = attending ? t('successTitleAttending') : t('successTitleDecline');
  if (successMessage) successMessage.textContent = attending ? t('successMsgAttending') : t('successMsgDecline');

  /* Gift banner: show when attending anything; note text depends on party */
  if (giftBanner) {
    giftBanner.style.display = attending ? "" : "none";
    var paypalLink = document.getElementById("giftPaypalLink");
    if (paypalLink) paypalLink.href = window.__PAYPAL_URL || "https://paypal.me/ElnurAghayev";
    var giftNote = document.getElementById("giftBannerNote");
    if (giftNote) {
      var partyAttending = isPartyAttending();
      giftNote.textContent = partyAttending
        ? t('giftNoteParty')
        : t('giftNoteCeremony');
    }
  }

  /* Bring & Share nudge */
  var nudgeBtn = document.getElementById("bsNudgeBtn");
  if (nudgeBtn) nudgeBtn.style.display = (attending && bringShareCheckbox && bringShareCheckbox.classList.contains('is-active')) ? "" : "none";

  /* Always show new RSVP link */
  if (newRsvpBtn) newRsvpBtn.style.display = "inline-flex";
}

/* ── Reset wizard ─────────────────────────────────────────── */
function resetWizard() {
  __manualSeatOverride = false;
  __seatCount = 1;
  if (attendanceSelect)  attendanceSelect.value  = "";
  if (partyAttendSelect) partyAttendSelect.value = "No";
  if (rsvpWizard) {
    rsvpWizard.querySelectorAll('input[type="text"],input[type="email"],input[type="tel"]').forEach(function(el) { el.value = ""; });
  }
  if (guestChecksEl) {
    guestChecksEl.querySelectorAll('input[type="checkbox"]').forEach(function(cb) { cb.checked = true; });
    guestChecksEl.querySelectorAll('.guest-toggle-btn').forEach(function(btn) { btn.classList.add('is-active'); });
    guestChecksEl.querySelectorAll('.guest-no-btn').forEach(function(btn) { btn.classList.remove('is-active'); });
  }
  if (bringShareCheckbox) { bringShareCheckbox.classList.remove('is-active'); bringShareCheckbox.setAttribute('aria-pressed','false'); }
  setChildrenCount(0);
  setAttendance("Yes");
  setPartyAttendance("No");
  if (rsvpSuccess) rsvpSuccess.classList.remove("is-visible");
  /* On reset: go back to intro, hide wizard */
  var introEl = document.getElementById("rsvpIntro");
  if (introEl)    introEl.classList.remove("is-hidden");
  if (rsvpWizard) rsvpWizard.classList.add("is-hidden");
  var cardThanks = document.getElementById("rsvpCardThanks");
  if (cardThanks) cardThanks.classList.remove("is-visible");
  document.body.style.overflow = "";
  /* Also fix pre-selection state */
  if (attendanceSelect)  attendanceSelect.value = "";
  if (partyAttendSelect) partyAttendSelect.value = "";
}

/* ── Wire up attend buttons ───────────────────────────────── */
if (attendYesBtn) attendYesBtn.addEventListener("click", function() { setAttendance("Yes"); });
if (attendNoBtn)  attendNoBtn.addEventListener("click",  function() { setAttendance("No");  });
if (partyYesBtn)  partyYesBtn.addEventListener("click",  function() { setPartyAttendance("Yes"); });
if (partyNoBtn)   partyNoBtn.addEventListener("click",   function() { setPartyAttendance("No");  });

/* Kids stepper */
if (kidsMinus) kidsMinus.addEventListener("click", function() { setChildrenCount(getChildrenCount() - 1); updateSelectionSummary(); });
if (kidsPlus)  kidsPlus.addEventListener("click",  function() { setChildrenCount(getChildrenCount() + 1); updateSelectionSummary(); });

/* New RSVP button */
if (newRsvpBtn) newRsvpBtn.addEventListener("click", function(e) { e.preventDefault(); resetWizard(); });

/* ── Submit (single step: validate then send) ─────────────── */
if (wSubmit) wSubmit.addEventListener("click", async function() {
  var fnField = rsvpWizard && rsvpWizard.querySelector('[name="first_name"]');

  /* Validate: ceremony attendance must be chosen */
  if (!attendanceSelect || attendanceSelect.value === "") {
    var errMsg = document.createElement("p");
    errMsg.style.cssText = "color:#7a5133;font-size:10px;letter-spacing:.05em;margin:6px 0 0;font-family:WeddingSerif,Georgia,serif;";
    errMsg.id = "attendErr";
    errMsg.textContent = t('selectAttendanceErr');
    var existing = document.getElementById("attendErr");
    if (existing) existing.remove();
    var attendField = document.querySelector(".attend-field");
    if (attendField) attendField.appendChild(errMsg);
    return;
  }
  var existingErr = document.getElementById("attendErr");
  if (existingErr) existingErr.remove();

  /* Build seat total from current state */
  __manualSeatOverride = false;
  recalcSeats();
  onAttendanceChange();

  var attending      = isAttending();
  var partyAttending = isPartyAttending();
  var anyAttending   = attending || partyAttending;
  var fn  = (rsvpWizard && rsvpWizard.querySelector('[name="first_name"]') || {}).value || "";
  
  var checkedGuestNames = __guests.length
    ? __guests.filter(function(_, i) {
        var cb = guestChecksEl && guestChecksEl.querySelector('input[name="guest_' + i + '"]');
        return !cb || cb.checked;
      }).join(", ")
    : (fn + " " + ln).trim();

  /* If everyone was deselected (declining), still record who the
     decline belongs to — fall back to the full guest list instead
     of sending an empty string, so the sheet shows who can't make it. */
  var guestNames = checkedGuestNames || __guests.join(", ") || (fn + " " + ln).trim();

  var scriptUrl = window.__GOOGLE_SCRIPT_URL;
  if (!scriptUrl) {
    if (rsvpStatus) rsvpStatus.textContent = "RSVP ready — add your Google Apps Script URL in content.json.";
    return;
  }
  if (rsvpStatus) rsvpStatus.textContent = "Sending…";
  if (wSubmit) wSubmit.disabled = true;

  var payload = {
    type:                "rsvp",
    first_name:          fn,
    name:                fn,
    invited_to_party:    __inviteParty  ? "Yes" : "No",
    attendance:          attending      ? "Yes" : "No",
    party_attendance:    partyAttending ? "Yes" : "No",
    guests_attending:    guestNames,
    children:            anyAttending   ? String(getChildrenCount()) : "0",
    seats:               anyAttending   ? String(__seatCount) : "0",
    join_bring_share:    attending && bringShareCheckbox && bringShareCheckbox.classList.contains('is-active') ? "Yes" : "No"
  };

  try {
    await fetch(scriptUrl, {
      method: "POST", mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (rsvpStatus) rsvpStatus.textContent = "";
    var rsvpFullName = fn.trim() || (__guests.length === 1 ? __guests[0] : __guests.join(' & '));
    window.__lastRsvpName = rsvpFullName;
    var wantsBringShare = attending && bringShareCheckbox && bringShareCheckbox.classList.contains('is-active');
    window.__pendingBringShare = wantsBringShare ? rsvpFullName : null;
    showSuccessScreen(anyAttending);
    if (wantsBringShare) {
      setTimeout(function() { openBringShare(rsvpFullName); }, 500);
    }
  } catch(err) {
    if (rsvpStatus) rsvpStatus.textContent = "Something went wrong. Please try again.";
    if (wSubmit) wSubmit.disabled = false;
  }
});

/* Initialise */
applyInviteTypeUI();
onAttendanceChange();


/* ── BRING & SHARE MODAL ─────────────────────────────────── */

var bsOverlay  = document.getElementById("bsOverlay");
var bsClose    = document.getElementById("bsClose");
var bsStep1    = document.getElementById("bsStep1");
var bsStep2    = document.getElementById("bsStep2");
var bsStep3    = document.getElementById("bsStep3");
var bsStepDone = document.getElementById("bsStepDone");
var bsNext1    = document.getElementById("bsNext1");
var bsNext2    = document.getElementById("bsNext2");
var bsBack2    = document.getElementById("bsBack2");
var bsBack3    = document.getElementById("bsBack3");
var bsSubmit   = document.getElementById("bsSubmit");
var bsDone     = document.getElementById("bsDone");
var bsStatus   = document.getElementById("bsStatus");

function bsShow(step) {
  [bsStep1, bsStep2, bsStep3, bsStepDone].forEach(function(s) {
    s.classList.add("is-hidden");
  });
  step.classList.remove("is-hidden");
}

function openBringShare(prefillName) {
  /* Pre-fill name from RSVP form if available */
  var bsName = document.getElementById("bs_name");
  if (bsName && !bsName.value && prefillName) {
    bsName.value = prefillName;
  }
  bsShow(bsStep1);
  bsOverlay.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeBringShare() {
  bsOverlay.classList.remove("is-open");
  document.body.style.overflow = "";
}

/* Open modal when bring&share checkbox is ticked after RSVP success */
if (bringShareCheckbox) {
  bringShareCheckbox.addEventListener("click", function() {
    var active = bringShareCheckbox.classList.toggle('is-active');
    bringShareCheckbox.setAttribute('aria-pressed', active ? 'true' : 'false');
    updateSelectionSummary(); /* Just track the checkbox — modal opens after RSVP submit if checked */
  });
}

/* bsNudgeBtn opens the Bring & Share modal */
var bsNudgeBtnEl = document.getElementById("bsNudgeBtn");
if (bsNudgeBtnEl) {
  bsNudgeBtnEl.addEventListener("click", function(e) {
    e.preventDefault();
    var prefill = window.__lastRsvpName || "";
    openBringShare(prefill);
  });
}

/* Celebration card Bring & Share tile */
var celebrationBsBtn = document.getElementById("celebrationBsBtn");
if (celebrationBsBtn) {
  celebrationBsBtn.addEventListener("click", function(e) {
    e.preventDefault();
    var prefill = window.__lastRsvpName || "";
    openBringShare(prefill);
  });
}

if (bsClose)  bsClose.addEventListener("click", closeBringShare);
if (bsDone)   bsDone.addEventListener("click", closeBringShare);

bsOverlay && bsOverlay.addEventListener("click", function(e) {
  if (e.target === bsOverlay) closeBringShare();
});

/* Step navigation */
if (bsNext1) bsNext1.addEventListener("click", function() {
  var what = document.getElementById("bs_what");
  var portions = document.getElementById("bs_portions");
  if (!what.value.trim()) { what.focus(); return; }
  if (!portions.value || portions.value < 1) { portions.focus(); return; }
  bsShow(bsStep2);
});

if (bsBack2) bsBack2.addEventListener("click", function() { bsShow(bsStep1); });
if (bsNext2) bsNext2.addEventListener("click", function() {
  if (bsStatus) bsStatus.textContent = "";
  bsShow(bsStep3);
});

if (bsBack3) bsBack3.addEventListener("click", function() { bsShow(bsStep2); });

if (bsSubmit) bsSubmit.addEventListener("click", async function() {
  var name  = document.getElementById("bs_name");
  var phone = document.getElementById("bs_phone");
  if (!name.value.trim())  { name.focus(); return; }
  if (!phone.value.trim()) { phone.focus(); return; }

  var allergens = Array.from(document.querySelectorAll('input[name="allergen"]:checked'))
    .map(function(el) { return el.value; }).join(", ") || "None";
  var foodTypes = Array.from(document.querySelectorAll('input[name="food_type"]:checked'))
    .map(function(el) { return el.value; }).join(", ");

  var payload = {
    type:           "bring_share",
    name:           name.value.trim(),
    contact:        phone.value.trim(),
    what:           document.getElementById("bs_what").value.trim(),
    portions:       document.getElementById("bs_portions").value,
    allergens:      allergens,
    food_type:      foodTypes
  };

  var scriptUrl = window.__GOOGLE_SCRIPT_URL;
  if (!scriptUrl) {
    if (bsStatus) bsStatus.textContent = "Add your Google Script URL in content.json.";
    return;
  }

  bsSubmit.textContent = "Sending…";
  bsSubmit.disabled = true;

  try {
    await fetch(scriptUrl, {
      method: "POST", mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    bsShow(bsStepDone);
  } catch(err) {
    if (bsStatus) bsStatus.textContent = "Something went wrong. Please try again.";
    bsSubmit.textContent = "Send ✓";
    bsSubmit.disabled = false;
  }
});

/* Hook into RSVP success handled directly in submit handler above */


/* ── PERSONALIZED RSVP ───────────────────────────────────────
   Pretty URL (new):      ?w=philipp-doro        (couple, ceremony)
   Pretty URL + venue:    ?w=philipp-doro&v=1    (couple, full day)
   Pretty URL single:     ?w=philipp             (single, ceremony)
   Pretty URL single+v:   ?w=philipp&v=1         (single, full day)
   Legacy still works:    ?p1=Elnur&p2=Arina&party=1
   ─────────────────────────────────────────────────────────── */
(function() {
  var params = new URLSearchParams(window.location.search);

  // ── Pretty ?w= URL decoding ──────────────────────────────
  var w = (params.get('w') || '').trim();
  if (w) {
    var parts = w.split('-');
    // capitalise each part
    var cap = function(s){ return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase(); };
    if (parts.length >= 2) {
      params.set('p1', cap(parts[0]));
      params.set('p2', cap(parts.slice(1).join('-')));
    } else {
      params.set('p1', cap(parts[0]));
    }
    if (params.get('v') === '1') params.set('party', '1');
  }

  var p1     = (params.get('p1')   || '').trim();
  var p2     = (params.get('p2')   || '').trim();
  var name   = (params.get('name') || '').trim();
  var party  = params.get('party') === '1';

  /* Store globally so RSVP wizard and submit handler can read it */
  __inviteParty = party;

  var displayName  = '';
  var prefillFirst = '';
  var prefillLast  = '';
  var guests       = [];
  var isCouple     = false;

  if (p1 && p2) {
    guests       = [p1, p2];
    displayName  = p1 + ' & ' + p2;
    prefillFirst = p1;
    isCouple     = true;
  } else if (p1) {
    guests       = [p1];
    displayName  = p1;
    prefillFirst = p1;
  } else if (name) {
    var parts    = name.split(/\s+/);
    prefillFirst = parts[0] || '';
    prefillLast  = parts.slice(1).join(' ');
    displayName  = name;
  }

  /* ── Always hide wizard and show intro, even with no name ─ */
  var rsvpWizardEl0 = document.getElementById('rsvpWizard');
  if (rsvpWizardEl0) rsvpWizardEl0.classList.add('is-hidden');

  if (!displayName) {
    /* No guest name — show generic intro with Begin button wired */
    var rsvpBeginBtnGeneric = document.getElementById('rsvpBeginBtn');
    var rsvpIntroGeneric    = document.getElementById('rsvpIntro');
    if (rsvpBeginBtnGeneric) {
      rsvpBeginBtnGeneric.addEventListener('click', function() {
        if (rsvpIntroGeneric)  rsvpIntroGeneric.classList.add('is-hidden');
        if (rsvpWizardEl0)     rsvpWizardEl0.classList.remove('is-hidden');
        applyInviteTypeUI();
      });
    }
    return;
  }

  /* ── Tab title ─────────────────────────────────────────── */
  var tabName = (p1 && p2) ? (p1 + ' & ' + p2) : (p1 || displayName);
  document.title = tabName + ' \u2014 You\u2019re invited \u2665';

  /* ── OG / social meta — swap title & description for party invites ── */
  (function() {
    var ogTitle = document.querySelector('meta[property="og:title"]');
    var ogDesc  = document.querySelector('meta[property="og:description"]');
    var twTitle = document.querySelector('meta[name="twitter:title"]');
    var twDesc  = document.querySelector('meta[name="twitter:description"]');
    if (party) {
      var pTitle = 'Arina & Elnur \u2014 Wedding Celebration';
      var pDesc  = 'We\u2019re so happy to have you with us \u2014 join us for our wedding ceremony on 16 October 2026 at 14:00 and the evening reception at 17:00 at Rheinliebe D\u00fcsseldorf.';
      if (ogTitle) ogTitle.setAttribute('content', pTitle);
      if (ogDesc)  ogDesc.setAttribute('content',  pDesc);
      if (twTitle) twTitle.setAttribute('content', pTitle);
      if (twDesc)  twDesc.setAttribute('content',  pDesc);
    } else {
      var cTitle = 'Arina & Elnur \u2014 Invitation to the Wedding Ceremony';
      var cDesc  = 'We would love to have you witness our big day with us \u2014 join us for our wedding ceremony on 16 October 2026 at 14:00 at the Schlosskirche D\u00fcsseldorf.';
      if (ogTitle) ogTitle.setAttribute('content', cTitle);
      if (ogDesc)  ogDesc.setAttribute('content',  cDesc);
      if (twTitle) twTitle.setAttribute('content', cTitle);
      if (twDesc)  twDesc.setAttribute('content',  cDesc);
    }
  })();

  /* ── Store globally for submit handler ─────────────────── */
  __guests   = guests;
  __isCouple = isCouple;

  /* ── Pre-fill name fields ──────────────────────────────── */
  var firstField = document.querySelector('[name="first_name"]');
    if (firstField && prefillFirst) firstField.value = prefillFirst;

  /* ── Guest checkboxes (couples only) ───────────────────── */
  if (guests.length >= 2) {
    buildGuestChecks(guests);
    recalcSeats();
    updateAttendanceLabel();
    fillNameFromGuests();
    /* Hide the Yes/No attend buttons — guest toggles ARE the attendance mechanism */
    var churchAttendField = document.querySelector('.attend-field');
    if (churchAttendField) churchAttendField.style.display = 'none';
    /* Auto-set attendance to Yes since all guests are pre-selected */
    setAttendance('Yes');
    /* Sync submit button and payload bar to initial state */
    updateSelectionSummary();
  }

  /* ── Hide wizard until Begin is clicked ───────────────── */
  var rsvpWizardEl = document.getElementById('rsvpWizard');
  if (rsvpWizardEl) rsvpWizardEl.classList.add('is-hidden');

  /* ── Build warm personal letter in intro ───────────────── */
  var rsvpIntroEl = document.getElementById('rsvpIntro');
  var instrEl     = document.getElementById('rsvpIntroInstructions');
  if (rsvpIntroEl && !document.getElementById('rsvp-greeting')) {
    var hasParty = __inviteParty;

    /* ── Greeting box: name + full letter together ── */
    var nameEl = document.createElement('div');
    nameEl.id        = 'rsvp-greeting';
    nameEl.className = 'rsvp-greeting';

    var nameSpan = document.createElement('span');
    nameSpan.className   = 'rsvp-greeting-name';
    nameSpan.textContent = t('greetingDear') + ' ' + displayName + ',';
    nameEl.appendChild(nameSpan);

    /* Letter paragraphs sit inside the greeting box */
    var letterDiv = document.createElement('div');
    letterDiv.className = 'rsvp-greeting-letter';
    if (hasParty) {
      letterDiv.innerHTML = __isCouple ? t('greetingLetterParty') : t('greetingLetterPartySingle');
    } else {
      letterDiv.innerHTML = __isCouple ? t('greetingLetterCeremony') : t('greetingLetterCeremonySingle');
    }
    nameEl.appendChild(letterDiv);
    rsvpIntroEl.insertAdjacentElement('afterbegin', nameEl);

    /* Clear the old instructions container */
    if (instrEl) instrEl.innerHTML = '<p class="rsvp-intro-note">' + t('crewNote') + '</p>';
  }

  /* ── "Begin your RSVP" button ───────────────────────────── */
  var rsvpBeginBtn = document.getElementById('rsvpBeginBtn');
  if (rsvpBeginBtn) {
    rsvpBeginBtn.addEventListener('click', function() {
      if (rsvpIntroEl)   rsvpIntroEl.classList.add('is-hidden');
      if (rsvpWizardEl)  rsvpWizardEl.classList.remove('is-hidden');
      applyInviteTypeUI();
    });
  }
})();

/* ── applyI18n on initial load — runs here so __inviteParty is final ── */
applyI18n();


/* ── STICKY RSVP BANNER: removed — replaced by personalised gate + floating card system ── */


/* ── PARTY RSVP WIZARD ───────────────────────────────────────
   Opens automatically after ceremony RSVP submitted (if ?party=1)
   Collects party attendance + dietary needs, sends to same sheet.
   ─────────────────────────────────────────────────────────── */
(function() {
  var overlay      = document.getElementById('partyOverlay');
  var partyClose   = document.getElementById('partyClose');
  var partyYesBtn  = document.getElementById('partyYes');
  var partyNoBtn   = document.getElementById('partyNo');
  var partyAttendVal = document.getElementById('partyAttendValue');
  var partyNext1   = document.getElementById('partyNext1');
  var partyBack2   = document.getElementById('partyBack2');
  var partyNext2   = document.getElementById('partyNext2');
  var partyDone    = document.getElementById('partyDone');
  var partyDoneD   = document.getElementById('partyDoneDeclined');
  var partyStatus  = document.getElementById('partyStatus');

  var step1 = document.getElementById('partyStep1');
  var step2 = document.getElementById('partyStep2');
  var stepDone = document.getElementById('partyStepDone');
  var stepDeclined = document.getElementById('partyStepDeclined');

  function partyShow(el) {
    [step1, step2, stepDone, stepDeclined].forEach(function(s) {
      if (s) s.classList.add('is-hidden');
    });
    if (el) el.classList.remove('is-hidden');
  }

  function closeParty() {
    if (overlay) overlay.style.display = 'none';
    document.body.style.overflow = '';
    /* Chain to Bring & Share if the checkbox was ticked */
    if (window.__pendingBringShare) {
      var prefill = window.__pendingBringShare;
      window.__pendingBringShare = null;
      setTimeout(function() { openBringShare(prefill); }, 350);
    }
  }

  window.openPartyWizard = function() {
    if (!overlay) return;
    partyShow(step1);
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    /* Reset */
    if (partyAttendVal) partyAttendVal.value = 'Yes';
    if (partyYesBtn) partyYesBtn.classList.add('is-active');
    if (partyNoBtn)  partyNoBtn.classList.remove('is-active');
  };

  /* Attend toggle */
  if (partyYesBtn) partyYesBtn.addEventListener('click', function() {
    if (partyAttendVal) partyAttendVal.value = 'Yes';
    partyYesBtn.classList.add('is-active');
    if (partyNoBtn) partyNoBtn.classList.remove('is-active');
  });
  if (partyNoBtn) partyNoBtn.addEventListener('click', function() {
    if (partyAttendVal) partyAttendVal.value = 'No';
    partyNoBtn.classList.add('is-active');
    if (partyYesBtn) partyYesBtn.classList.remove('is-active');
  });

  /* Step 1 → next */
  if (partyNext1) partyNext1.addEventListener('click', async function() {
    var attending = (partyAttendVal && partyAttendVal.value) === 'Yes';
    if (attending) {
      partyShow(step2);
    } else {
      /* Not attending party — record "No" to sheet, then show declined screen */
      __partyRsvp = { attending: 'No', dietary: '', notes: '' };
      var scriptUrl = window.__GOOGLE_SCRIPT_URL;
      if (scriptUrl) {
        var partyPayload = {
          type:            'party_rsvp',
          timestamp:       new Date().toISOString(),
          name:            window.__lastRsvpName || '',
          party_attending: 'No',
          party_dietary:   '',
          party_notes:     ''
        };
        try {
          await fetch(scriptUrl, {
            method: 'POST', mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(partyPayload)
          });
        } catch(e) { /* silent */ }
      }
      partyShow(stepDeclined);
    }
  });

  /* Step 2 back */
  if (partyBack2) partyBack2.addEventListener('click', function() { partyShow(step1); });

  /* Step 2 submit */
  if (partyNext2) partyNext2.addEventListener('click', async function() {
    var dietary = Array.from(
      document.querySelectorAll('input[name="party_diet"]:checked')
    ).map(function(cb) { return cb.value; }).join(', ');

    var notes   = (document.getElementById('partyNotes') || {}).value || '';
    var byCar   = (document.getElementById('comingByCar') && document.getElementById('comingByCar').checked) ? 'Yes' : 'No';

    __partyRsvp = { attending: 'Yes', dietary: dietary, notes: notes };

    /* Send party data as a separate row / update to the sheet */
    var scriptUrl = window.__GOOGLE_SCRIPT_URL;
    if (scriptUrl) {
      if (partyStatus) partyStatus.textContent = 'Saving…';
      var partyPayload = {
        type:            'party_rsvp',
        timestamp:       new Date().toISOString(),
        name:            window.__lastRsvpName || '',
        party_attending: 'Yes',
        party_dietary:   dietary,
        party_notes:     notes,
        coming_by_car:   byCar
      };
      console.log('[PartyRSVP] Sending payload:', JSON.stringify(partyPayload));
      console.log('[PartyRSVP] To URL:', scriptUrl);
      try {
        await fetch(scriptUrl, {
          method: 'POST', mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(partyPayload)
        });
        console.log('[PartyRSVP] Fetch sent (no-cors — check sheet for result)');
      } catch(e) {
        console.error('[PartyRSVP] Fetch error:', e);
        if (partyStatus) partyStatus.textContent = 'Network error — check console.';
      }
      if (partyStatus) partyStatus.textContent = '';
    } else {
      console.warn('[PartyRSVP] No script URL — check content.json');
    }

    partyShow(stepDone);
  });

  /* Close buttons */
  if (partyClose)  partyClose.addEventListener('click', closeParty);
  if (partyDone)   partyDone.addEventListener('click', closeParty);
  if (partyDoneD)  partyDoneD.addEventListener('click', closeParty);
  if (overlay) overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeParty();
  });
})();


/* ── WEDDING COUNTDOWN ───────────────────────────────────────
   Live ticking countdown on the left banner.
   ─────────────────────────────────────────────────────────── */
(function() {
  var target = new Date('2026-10-16T14:00:00');
  var elDays  = document.getElementById('cd-days');
  var elHours = document.getElementById('cd-hours');
  var elMins  = document.getElementById('cd-mins');
  var elSecs  = document.getElementById('cd-secs');
  if (!elDays) return;

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function tick() {
    var now  = new Date();
    var diff = target - now;
    if (diff <= 0) {
      elDays.textContent  = '00';
      elHours.textContent = '00';
      elMins.textContent  = '00';
      elSecs.textContent  = '00';
      return;
    }
    var days  = Math.floor(diff / 864e5);
    var hours = Math.floor((diff % 864e5) / 36e5);
    var mins  = Math.floor((diff % 36e5)  / 6e4);
    var secs  = Math.floor((diff % 6e4)   / 1e3);
    elDays.textContent  = days;
    elHours.textContent = pad(hours);
    elMins.textContent  = pad(mins);
    elSecs.textContent  = pad(secs);
  }

  tick();
  setInterval(tick, 1000);
})();

/* ── Close RSVP success overlay ──────────────────────────── */
var rsvpSuccessClose = document.getElementById("rsvpSuccessClose");
if (rsvpSuccessClose) {
  rsvpSuccessClose.addEventListener("click", function() {
    if (rsvpSuccess) rsvpSuccess.classList.remove("is-visible");
    document.body.style.overflow = "";
  });
}

/* ── "RSVP Submitted" button — reopens overlay ───────────── */
var rsvpSubmittedBtn = document.getElementById("rsvpSubmittedBtn");
if (rsvpSubmittedBtn) {
  rsvpSubmittedBtn.addEventListener("click", function() {
    if (rsvpSuccess) {
      rsvpSuccess.classList.add("is-visible");
      rsvpSuccess.scrollTop = 0;
      document.body.style.overflow = "hidden";
    }
  });
}

/* ── Second "submit another RSVP" link (in-card) ─────────── */
var newRsvpBtn2 = document.getElementById("newRsvpBtn2");
if (newRsvpBtn2) {
  newRsvpBtn2.addEventListener("click", function(e) {
    e.preventDefault();
    resetWizard();
  });
}

/* ── Shared: scroll the RSVP card/wizard into view ──────────
   Desktop (≥921px) is a fixed two-pane layout — the page itself
   never scrolls (html/body overflow:hidden); only .rsvp-card scrolls
   internally. Mobile (≤920px) is a single column — the whole page
   scrolls and .rsvp-card has no internal scroll of its own.
   window.scrollTo() only ever covers the mobile case (and is a
   silent no-op on desktop), so this checks which one actually
   applies at call time and scrolls the right thing. */
function weScrollRsvpIntoView(target, topBufferPx) {
  if (!target) return;
  var card        = document.querySelector('.rsvp-card');
  var cardScrolls = card && card.scrollHeight > card.clientHeight + 1;

  if (cardScrolls) {
    /* Desktop: .rsvp-card is the scroll container. */
    var targetTop = target.getBoundingClientRect().top
                   - card.getBoundingClientRect().top
                   + card.scrollTop;
    card.scrollTo({ top: Math.max(targetTop - 8, 0), behavior: 'smooth' });
  } else {
    /* Mobile: the whole page scrolls. */
    target.style.scrollMarginTop = (topBufferPx || 14) + 'px';
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}


/* ============================================================
   CARD ZOOM OVERLAY — Desktop only (≥ 921px)
   Each card gets a small zoom icon (top-right).
   Clicking opens a focused overlay with the full card content.
   ============================================================ */
(function () {
  if (window.innerWidth <= 920) return;

  /* ── SVG icons ── */
  /* Four-corner "open / expand" icon — elegant, not search-like */
  var zoomSVG =
    '<svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M1 4.5V1.5A.5.5 0 011.5 1H4.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="M9.5 1H12.5A.5.5 0 0113 1.5V4.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="M13 9.5V12.5a.5.5 0 01-.5.5H9.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="M4.5 13H1.5A.5.5 0 011 12.5V9.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';

  /* ── Overlay backdrop (single, reused) ── */
  var backdrop = document.createElement('div');
  backdrop.className = 'card-overlay-backdrop';
  backdrop.innerHTML =
    '<div class="card-overlay-panel" role="dialog" aria-modal="true">' +
    '  <button class="card-overlay-close" aria-label="Close">×</button>' +
    '  <div class="card-overlay-body"></div>' +
    '</div>';
  document.body.appendChild(backdrop);

  var panel = backdrop.querySelector('.card-overlay-panel');
  var body  = backdrop.querySelector('.card-overlay-body');
  var closeBtn = backdrop.querySelector('.card-overlay-close');

  function openOverlay(cardEl, cardKey) {
    body.innerHTML = buildOverlayContent(cardEl, cardKey);
    backdrop.setAttribute('data-card', cardKey);
    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    panel.scrollTop = 0;
    /* Re-init popovers inside overlay if crew card */
    if (cardKey === 'crew') initPopovers();
  }

  function closeOverlay() {
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(function () { body.innerHTML = ''; backdrop.removeAttribute('data-card'); }, 220);
  }

  closeBtn.addEventListener('click', closeOverlay);
  backdrop.addEventListener('click', function (e) { if (e.target === backdrop) closeOverlay(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeOverlay(); });

  /* ── Content builders per card ── */
  function buildOverlayContent(cardEl, cardKey) {
    switch (cardKey) {
      case 'rsvp':     return buildRsvp(cardEl);
      case 'story':    return buildStory(cardEl);
      case 'crew':     return buildCrew(cardEl);
      case 'ceremony': return buildCeremony(cardEl);
      case 'dress':    return buildDress(cardEl);
      case 'faq':      return buildFaq(cardEl);
      default:         return '';
    }
  }

  function kicker(cardEl) {
    var label = cardEl.querySelector('.label, .party-topline .label');
    var num   = cardEl.querySelector('.number');
    return '<span class="overlay-kicker">' +
      (num ? num.textContent + ' · ' : '') +
      (label ? label.textContent.trim() : '') +
      '</span>';
  }

  function h2(cardEl, idOverride) {
    var el = idOverride ? document.getElementById(idOverride) : cardEl.querySelector('h2');
    return el ? '<h2>' + el.innerHTML + '</h2>' : '';
  }

  /* 01 — RSVP */
  function buildRsvp(cardEl) {
    var letter = window.__inviteParty
      ? (__isCouple ? t('greetingLetterParty') : t('greetingLetterPartySingle'))
      : (__isCouple ? t('greetingLetterCeremony') : t('greetingLetterCeremonySingle'));
    return kicker(cardEl) +
      h2(cardEl) +
      '<div class="overlay-rsvp-note">' + letter + '</div>' +
      '<a href="#" class="overlay-rsvp-scroll-btn" id="overlayRsvpCta">' + t('rsvpBeginBtn') + '</a>';
  }

  /* 02 — Love Story */
  function buildStory(cardEl) {
    var parasEl = document.getElementById('story-paragraphs');
    var parasHtml = parasEl ? parasEl.innerHTML : '';
    /* Collect photos straight from the single source of truth */
    var photos = (window.STORY_PHOTOS || []).map(function (p) {
      return '<img src="' + p.src + '" alt="' + (p.alt || '') + '" loading="lazy">';
    });
    return kicker(cardEl) +
      h2(cardEl) +
      '<div>' + parasHtml + '</div>' +
      (photos.length ? '<div class="overlay-photo-grid">' + photos.join('') + '</div>' : '');
  }

  /* 03 — Crew */
  function buildCrew(cardEl) {
    var groomEl  = document.getElementById('crew-groom');
    var brideEl  = document.getElementById('crew-bride');
    var otherEl  = document.getElementById('crew-other');
    function sectionHtml(labelKey, el) {
      if (!el || !el.children.length) return '';
      return '<div class="overlay-crew-section">' +
        '<span class="overlay-crew-role-label">' + t(labelKey) + '</span>' +
        '<div class="crew-side" style="display:flex;gap:10px;flex-wrap:wrap;">' + el.innerHTML + '</div>' +
        '</div>';
    }
    return kicker(cardEl) +
      h2(cardEl) +
      sectionHtml('roleGroomSide', groomEl) +
      sectionHtml('roleBrideSide', brideEl) +
      sectionHtml('rolePastorWorship', otherEl);
  }

  /* 04 — Ceremony */
  function buildCeremony(cardEl) {
    var agendaEl = document.getElementById('ceremony-agenda');
    var card04TitleEl = document.getElementById('card04Title');
    var titleHtml = card04TitleEl
      ? '<h2>' + card04TitleEl.innerHTML + '</h2>'
      : h2(cardEl);
    var noticeEl = cardEl.querySelector('.arrival-notice');
    return kicker(cardEl) +
      titleHtml +
      (noticeEl ? '<div style="margin-bottom:20px;">' + noticeEl.innerHTML + '</div>' : '') +
      '<div class="overlay-agenda">' + (agendaEl ? agendaEl.innerHTML : '') + '</div>';
  }

  /* 05 — Dress Code */
  function buildDress(cardEl) {
    var introEl   = document.getElementById('dress-intro');
    var paletteEl = document.getElementById('dress-palette');
    var noteEl    = document.getElementById('dress-note');
    return kicker(cardEl) +
      h2(cardEl) +
      (introEl   ? '<p>' + introEl.textContent + '</p>' : '') +
      (paletteEl ? '<div class="overlay-dress-palette dress-palette">' + paletteEl.innerHTML + '</div>' : '') +
      (noteEl    ? '<p style="font-size:12px;opacity:.7;">' + noteEl.textContent + '</p>' : '');
  }

  /* 06 — FAQ */
  function buildFaq(cardEl) {
    var faqEl = document.getElementById('faq-list');
    return kicker(cardEl) +
      h2(cardEl) +
      '<div class="overlay-faq">' + (faqEl ? faqEl.innerHTML : '') + '</div>';
  }

  /* ── Inject zoom buttons into each card ── */
  var cardMap = [
    { sel: '.rsvp-card',        key: 'rsvp'     },
    { sel: '.story-card',       key: 'story'    },
    { sel: '.wedding-party-card', key: 'crew'   },
    { sel: '.ceremony-card',    key: 'ceremony' },
    { sel: '.dress-code-card',  key: 'dress'    },
    { sel: '.faq-card',         key: 'faq'      }
  ];

  cardMap.forEach(function (def) {
    var card = document.querySelector(def.sel);
    if (!card) return;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'card-zoom-btn';
    btn.setAttribute('aria-label', 'Zoom — open expanded view');
    btn.innerHTML = zoomSVG;

    /* Place inside the topline row so it aligns with the label */
    var topline = card.querySelector('.topline, .party-topline');
    if (topline) {
      topline.style.display = 'flex';
      topline.style.alignItems = 'center';
      topline.appendChild(btn);
    } else {
      card.appendChild(btn);
    }

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      openOverlay(card, def.key);
    });
  });

  /* ── RSVP CTA in overlay: scroll to card and close ── */
  backdrop.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'overlayRsvpCta') {
      e.preventDefault();
      closeOverlay();
      setTimeout(function () {
        var beginBtn = document.getElementById('rsvpBeginBtn');
        if (beginBtn) beginBtn.click();

        /* Target the card itself, not wStep1 — landing right at the
           top of the step pushes the "01 / Participation" header
           off-screen above it. */
        var target = document.querySelector('.rsvp-card');

        var ribbon        = document.getElementById('weRsvpDeadline');
        var ribbonVisible = ribbon && ribbon.classList.contains('we-visible');
        var topBuffer     = ribbonVisible ? 68 : 14;

        weScrollRsvpIntoView(target, topBuffer);
      }, 260);
    }
  });

  /* Hide on resize to mobile */
  window.addEventListener('resize', function () {
    if (window.innerWidth <= 920) closeOverlay();
  });

})();


/* ══════════════════════════════════════════════════════════════
   RSVP ENGAGEMENT SYSTEM
   Phase 1 — Soft Gate (full-screen welcome on load)
   Phase 2 — Floating Seat Card (persistent after gate dismissed)
   Phase 3 — Scroll Lock (nudge if they scroll past RSVP card)
   ══════════════════════════════════════════════════════════════ */
(function() {

  /* ── Read guest params ── */
  var params      = new URLSearchParams(window.location.search);

  /* Decode pretty ?w= URLs (e.g. ?w=elnur-arina&v=1) */
  var _w = (params.get('w') || '').trim();
  if (_w) {
    var _cap = function(s) { return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase(); };
    var _parts = _w.split('-');
    if (_parts.length >= 2) {
      if (!params.get('p1')) params.set('p1', _cap(_parts[0]));
      if (!params.get('p2')) params.set('p2', _cap(_parts.slice(1).join('-')));
    } else {
      if (!params.get('p1')) params.set('p1', _cap(_parts[0]));
    }
    if (params.get('v') === '1' && !params.get('party')) params.set('party', '1');
  }

  var p1          = (params.get('p1')   || '').trim();
  var p2          = (params.get('p2')   || '').trim();
  var hasParty    = params.get('party') === '1';
  var isCouple    = !!(p1 && p2);
  var displayName = p1 && p2 ? p1 + ' & ' + p2 : (p1 || '');

  /* No named guest → skip the whole system */
  if (!displayName) return;

  /* ── RSVP success detection (shared across all phases) ── */
  var rsvpDone = false;
  function checkRsvpDone() {
    var s = document.getElementById('rsvpSuccess');
    return s && (s.classList.contains('is-visible') || getComputedStyle(s).display !== 'none');
  }
  var successEl = document.getElementById('rsvpSuccess');
  if (successEl) {
    new MutationObserver(function() {
      if (checkRsvpDone()) {
        rsvpDone = true;
        dismissAll();
      }
    }).observe(successEl, { attributes: true, attributeFilter: ['class','style'] });
  }

  function dismissAll() {
    hideGate();
    hideSeatCard();
    hideScrollLock();
    var deadlineEl = document.getElementById('weRsvpDeadline');
    if (deadlineEl) deadlineEl.style.display = 'none';
  }

  /* ── Inject styles ── */
  var css = document.createElement('style');
  css.textContent = `
    /* ── Soft Gate ─────────────────────────────── */
    #weGate {
      position: fixed; inset: 0; z-index: 8000;
      display: flex; align-items: center; justify-content: center;
      transition: opacity .7s ease, visibility .7s ease;
    }
    #weGate.we-hidden { opacity: 0; visibility: hidden; pointer-events: none; }
    #weGateBackdrop {
      position: absolute; inset: 0;
      background: rgba(42,32,26,.52);
      backdrop-filter: blur(10px) saturate(.75);
      -webkit-backdrop-filter: blur(10px) saturate(.75);
    }
    #weGateCard {
      position: relative;
      background: #FDFAF7;
      border: 1px solid #E2D8CF;
      max-width: 400px; width: 90%;
      padding: 44px 36px 36px;
      text-align: center;
      box-shadow: 0 32px 72px rgba(42,32,26,.18), 0 0 0 1px rgba(122,82,54,.12);
      animation: weCardRise .85s cubic-bezier(.16,1,.3,1) both;
    }
    @keyframes weCardRise {
      from { opacity:0; transform: translateY(28px) scale(.97); }
      to   { opacity:1; transform: translateY(0)     scale(1);   }
    }
    #weGateCard .we-mono {
      font-family: WeddingSerif, Georgia, serif;
      font-size: 10px; letter-spacing: .35em; text-transform: uppercase;
      color: #7a5133; margin-bottom: 18px;
    }
    #weGateCard .we-rule {
      width: 32px; height: 1px; background: #C4956A; margin: 0 auto 18px;
    }
    #weGateCard .we-salut {
      font-family: WeddingSerif, Georgia, serif;
      font-style: italic; font-size: 13px; color: #8a7464; margin-bottom: 4px;
    }
    #weGateCard .we-guestname {
      font-family: WeddingSerif, Georgia, serif;
      font-size: clamp(20px, 8vw, 36px); font-weight: 300; color: #2A201A;
      line-height: 1.15; margin-bottom: 18px; letter-spacing: -.01em;
      overflow-wrap: break-word; word-break: break-word; hyphens: auto;
    }
    #weGateCard .we-seat-badge {
      display: inline-flex; align-items: center; gap: 6px;
      background: rgba(122,82,54,.08); border: 1px solid rgba(122,82,54,.2);
      padding: 7px 14px; font-family: WeddingSerif,Georgia,serif;
      font-size: 11px; color: #7a5133; letter-spacing: .06em;
      margin-bottom: 20px;
    }
    #weGateCard .we-body {
      font-family: WeddingSerif, Georgia, serif;
      font-size: 12.5px; font-weight: 400; color: #8a7464;
      line-height: 1.75; margin-bottom: 28px; letter-spacing: .01em;
    }
    #weGateCard .we-body strong { color: #2A201A; font-weight: 600; }
    #weGateCta {
      display: block; width: 100%;
      background: #31271C; color: #EBE2DA; border: none;
      padding: 14px 20px;
      font-family: WeddingSerif, Georgia, serif;
      font-size: 10px; letter-spacing: .22em; text-transform: uppercase;
      cursor: pointer; transition: background .2s, transform .15s;
      margin-bottom: 10px;
    }
    #weGateCta:hover { background: #7a5133; transform: translateY(-1px); }
    #weGateSkip {
      background: none; border: none;
      font-family: WeddingSerif, Georgia, serif;
      font-size: 10px; font-weight: 400; color: #aaa098;
      letter-spacing: .14em; text-transform: uppercase;
      cursor: pointer; padding: 6px; transition: color .2s;
      display: block; width: 100%; text-align: center;
    }
    #weGateSkip:hover { color: #2A201A; }
    .we-gate-note {
      font-family: WeddingSerif, Georgia, serif;
      font-size: 11.5px; color: #7a6a5c;
      line-height: 1.7; letter-spacing: .01em;
      border-top: 1px solid rgba(196,149,106,.2);
      padding-top: 14px; margin-bottom: 20px;
      font-style: italic;
    }

    /* ── Deadline ribbon ────────────────────────── */
    #weRsvpDeadline {
      position: fixed; top: 0; left: 50%; z-index: 7000;
      transform: translateX(-50%) translateY(-56px);
      background: rgba(42,32,26,.92);
      border-bottom: 1px solid rgba(196,149,106,.3);
      padding: 8px 22px;
      display: flex; align-items: center; gap: 10px;
      font-family: WeddingSerif, Georgia, serif;
      font-size: 11px; color: #C4956A; letter-spacing: .08em;
      backdrop-filter: blur(8px);
      transition: transform .5s cubic-bezier(.16,1,.3,1);
      white-space: nowrap; pointer-events: none;
    }
    #weRsvpDeadline.we-visible { transform: translateX(-50%) translateY(0); }
    #weRsvpDeadline .we-dot {
      width: 6px; height: 6px; background: #C4956A; border-radius: 50%;
      animation: weBlink 1.6s ease-in-out infinite;
      flex-shrink: 0;
    }
    @keyframes weBlink {
      0%,100% { opacity:1; } 50% { opacity:.2; }
    }

    /* ── Floating seat card ─────────────────────── */
    #weSeatCard {
      position: fixed; bottom: 24px; right: 24px; z-index: 7500;
      transform: translateY(100px); opacity: 0;
      transition: transform .55s cubic-bezier(.16,1,.3,1), opacity .55s ease;
      pointer-events: none;
    }
    #weSeatCard.we-visible { transform: translateY(0); opacity: 1; pointer-events: all; }
    #weSeatCard.we-pulse .we-seat-inner {
      animation: wePulse 2.8s ease-in-out infinite;
    }
    @keyframes wePulse {
      0%,100% { box-shadow: 0 8px 28px rgba(42,32,26,.18), 0 0 0 0 rgba(196,149,106,.45); }
      50%      { box-shadow: 0 8px 28px rgba(42,32,26,.22), 0 0 0 8px rgba(196,149,106,0); }
    }
    .we-seat-inner {
      background: #31271C; border: 1px solid rgba(196,149,106,.28);
      padding: 14px 18px 14px 14px;
      display: flex; align-items: center; gap: 12px;
      cursor: pointer; transition: transform .2s, background .2s;
      box-shadow: 0 8px 28px rgba(42,32,26,.2);
      max-width: 240px;
    }
    .we-seat-inner:hover { transform: translateY(-2px); background: #3d3026; }
    .we-seat-icon {
      width: 34px; height: 34px; flex-shrink: 0;
      background: rgba(196,149,106,.12); border: 1px solid rgba(196,149,106,.25);
      display: flex; align-items: center; justify-content: center;
      font-size: 15px;
    }
    .we-seat-text { flex: 1; min-width: 0; }
    .we-seat-lbl {
      font-family: WeddingSerif, Georgia, serif;
      font-size: 9px; letter-spacing: .22em; text-transform: uppercase;
      color: #C4956A; margin-bottom: 2px;
    }
    .we-seat-name {
      font-family: WeddingSerif, Georgia, serif;
      font-size: 16px; color: #FDFAF7; font-weight: 300;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .we-seat-arr { color: #C4956A; font-size: 13px; flex-shrink: 0; transition: transform .2s; }
    .we-seat-inner:hover .we-seat-arr { transform: translateX(3px); }
    #weSeatDismiss {
      position: absolute; top: -8px; right: -8px;
      width: 20px; height: 20px;
      background: #8a7464; border: none; color: #FDFAF7;
      font-size: 10px; border-radius: 50%; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background .2s; line-height: 1;
    }
    #weSeatDismiss:hover { background: #31271C; }

    /* ── Scroll lock overlay ────────────────────── */
    #weScrollLock {
      position: fixed; inset: 0; z-index: 7800;
      background: rgba(42,32,26,0);
      display: flex; align-items: center; justify-content: center;
      pointer-events: none;
      transition: background .5s ease;
    }
    #weScrollLock.we-locked {
      background: rgba(42,32,26,.78);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      pointer-events: all;
    }
    #weScrollLockContent {
      text-align: center; padding: 40px 32px; max-width: 360px; width: 90%;
      opacity: 0; transform: scale(.95);
      transition: opacity .45s ease, transform .45s ease;
      pointer-events: none;
    }
    #weScrollLock.we-locked #weScrollLockContent {
      opacity: 1; transform: scale(1); pointer-events: all;
    }
    .we-lock-icon { font-size: 28px; margin-bottom: 14px; display: block;
      animation: weLockWiggle 3.5s ease-in-out infinite; }
    @keyframes weLockWiggle {
      0%,88%,100% { transform: rotate(0deg); }
      91% { transform: rotate(-9deg); }
      95% { transform: rotate(9deg); }
    }
    .we-lock-title {
      font-family: WeddingSerif, Georgia, serif;
      font-size: 26px; font-weight: 300; color: #FDFAF7;
      margin-bottom: 10px; letter-spacing: -.01em;
    }
    .we-lock-body {
      font-family: WeddingSerif, Georgia, serif;
      font-size: 13px; color: rgba(253,250,247,.55);
      line-height: 1.75; margin-bottom: 26px; letter-spacing: .01em;
    }
    #weScrollLockCta {
      display: inline-block;
      background: #C4956A; color: #2A201A; border: none;
      padding: 13px 30px;
      font-family: WeddingSerif, Georgia, serif;
      font-size: 10px; letter-spacing: .22em; text-transform: uppercase;
      cursor: pointer; transition: background .2s, transform .15s;
      margin-bottom: 10px;
    }
    #weScrollLockCta:hover { background: #d4a87d; transform: translateY(-1px); }
    #weScrollLockSkip {
      display: block; background: none; border: none;
      font-family: WeddingSerif, Georgia, serif;
      font-size: 10px; color: rgba(253,250,247,.3);
      letter-spacing: .14em; text-transform: uppercase;
      cursor: pointer; padding: 8px; transition: color .2s;
      width: 100%; text-align: center; margin: 0 auto;
    }
    #weScrollLockSkip:hover { color: rgba(253,250,247,.65); }

    @media (max-width: 480px) {
      #weGateCard { padding: 32px 22px 26px; }
      #weSeatCard { bottom: 72px; right: 14px; }
    }
  `;
  document.head.appendChild(css);

  /* ── Build deadline text ── */
  function daysUntilDeadline() {
    var now = new Date();
    var d   = new Date('2026-09-18T23:59:59');
    var diff = Math.ceil((d - now) / 86400000);
    return diff > 0 ? diff : 0;
  }

  /* ── Greeting text ── */
  var salutation = t('gateSalutation');
  var seatsText  = t('gateSeatsText');

  /* ── SOFT GATE HTML ── */
  var gate = document.createElement('div');
  gate.id = 'weGate';
  gate.innerHTML =
    '<div id="weGateBackdrop"></div>' +
    '<div id="weGateCard">' +
      '<div class="we-mono">Arina &amp; Elnur\'s Wedding</div>' +
      '<div class="we-rule"></div>' +
      '<div class="we-salut">' + salutation + '</div>' +
      '<div class="we-guestname">' + displayName + '</div>' +
      '<div class="we-seat-badge">♡ ' + seatsText + '</div>' +
      '<div class="we-body">' + t('gateBody') + '</div>' +
      '<div class="we-gate-note">' + t('gateNote') + '</div>' +
      '<button id="weGateCta">' + t('gateCtaBtn') + '</button>' +
      '<button id="weGateSkip">' + t('gateSkipBtn') + '</button>' +
    '</div>';
  document.body.appendChild(gate);

  /* ── DEADLINE RIBBON ── */
  var days = daysUntilDeadline();
  if (days > 0) {
    var ribbon = document.createElement('div');
    ribbon.id = 'weRsvpDeadline';
    ribbon.innerHTML = '<span class="we-dot"></span> Confirm attendance by 18.09';
    document.body.appendChild(ribbon);
  }

  /* ── FLOATING SEAT CARD ── */
  var seatCard = document.createElement('div');
  seatCard.id = 'weSeatCard';
  seatCard.innerHTML =
    '<button id="weSeatDismiss" title="Dismiss">×</button>' +
    '<div class="we-seat-inner" id="weSeatInner">' +
      '<div class="we-seat-icon">💌</div>' +
      '<div class="we-seat-text">' +
        '<div class="we-seat-lbl">Elnur & Arina · 16.10.2026</div>' +
        '<div class="we-seat-name">' + displayName + '</div>' +
      '</div>' +
      '<div class="we-seat-arr">→</div>' +
    '</div>';
  document.body.appendChild(seatCard);

  /* ── SCROLL LOCK ── */
  var scrollLock = document.createElement('div');
  scrollLock.id = 'weScrollLock';
  var lockName = isCouple ? displayName : (p1 || displayName.split(' ')[0]);
  scrollLock.innerHTML =
    '<div id="weScrollLockContent">' +
      '<span class="we-lock-icon">💌</span>' +
      '<div class="we-lock-title">' + t('scrollLockTitle').replace('{name}', lockName) + '</div>' +
      '<div class="we-lock-body">' + t('scrollLockBody') + '</div>' +
      '<button id="weScrollLockCta">' + t('scrollLockCta') + '</button>' +
      '<button id="weScrollLockSkip">' + t('scrollLockSkip') + '</button>' +
    '</div>';
  document.body.appendChild(scrollLock);

  /* ── State ── */
  var gateSkipped      = false;
  var seatVisible      = false;
  var lockTriggered    = false;
  var lockActive       = false;
  var rsvpCardPassed   = false;

  /* ── Helpers ── */
  function hideGate() { gate.classList.add('we-hidden'); }

  function showDeadline() {
    var r = document.getElementById('weRsvpDeadline');
    if (r) setTimeout(function() { r.classList.add('we-visible'); }, 350);
  }

  var seatDismissed    = false;

  function showSeatCard() {
    if (seatVisible || rsvpDone || seatDismissed) return;
    seatVisible = true;
    seatCard.classList.add('we-visible');
    setTimeout(function() { seatCard.classList.add('we-pulse'); }, 1200);
  }

  function hideSeatCard() {
    seatCard.classList.remove('we-visible');
    seatVisible = false;
  }

  function scrollToRSVP(opts) {
    opts = opts || {};
    var wasLocked = lockActive;
    hideScrollLock();

    function go() {
      if (opts.openWizard) {
        var beginBtn = document.getElementById('rsvpBeginBtn');
        if (beginBtn) beginBtn.click();
      }

      /* Target the card itself, not wStep1 — landing right at the
         top of the step pushes the "01 / Participation" header
         off-screen above it. */
      var target = document.querySelector('.rsvp-card');

      var ribbon        = document.getElementById('weRsvpDeadline');
      var ribbonVisible = ribbon && ribbon.classList.contains('we-visible');
      var topBuffer     = ribbonVisible ? 68 : 14; /* ribbon height + gap, or just breathing room */

      weScrollRsvpIntoView(target, topBuffer);
    }

    /* If the scroll-lock backdrop was up, its .5s fade is still covering
       the screen — wait for it to clear before opening/scrolling to the
       wizard. Triggering it immediately is what made the wizard appear
       to "bleed" through the still-dissolving overlay. */
    if (wasLocked) {
      setTimeout(go, 520);
    } else {
      go();
    }
  }

  function hideScrollLock() {
    scrollLock.classList.remove('we-locked');
    lockActive = false;
  }

  function triggerScrollLock() {
    if (lockActive || rsvpDone) return;
    lockTriggered = true;
    lockActive    = true;
    setTimeout(function() { scrollLock.classList.add('we-locked'); }, 300);
  }

  /* ── Gate buttons ── */
  document.getElementById('weGateCta').addEventListener('click', function() {
    hideGate();
    showDeadline();
    gateSkipped = false;
    setTimeout(function() {
      scrollToRSVP({ openWizard: true });
    }, 720); /* gate fades over .7s — wait it out so the wizard
                 doesn't appear/scroll while it's still dissolving
                 over the invite section */
  });

  document.getElementById('weGateSkip').addEventListener('click', function() {
    hideGate();
    showDeadline();
    gateSkipped = true;
    setTimeout(showSeatCard, 2500);
  });

  /* ── Seat card ── */
  document.getElementById('weSeatInner').addEventListener('click', function() {
    hideSeatCard();
    setTimeout(function() {
      scrollToRSVP({ openWizard: true });
    }, 560); /* seat card fades over .55s */
  });
  document.getElementById('weSeatDismiss').addEventListener('click', function(e) {
    e.stopPropagation();
    seatDismissed = true;
    hideSeatCard();
  });

  /* ── Scroll lock buttons ── */
  document.getElementById('weScrollLockCta').addEventListener('click', function() {
    scrollToRSVP({ openWizard: true });
  });
  document.getElementById('weScrollLockSkip').addEventListener('click', function() {
    hideScrollLock();
    // lockTriggered stays true — never show again
    showSeatCard();
  });

  /* ── Scroll watcher ── */
  var rsvpCard = document.querySelector('.rsvp-card');
  window.addEventListener('scroll', function() {
    if (rsvpDone) return;

    // Show seat card on first scroll if gate was skipped
    if (gateSkipped && !seatVisible && window.scrollY > 60) {
      showSeatCard();
    }

    // Detect if RSVP card has been scrolled past
    if (rsvpCard && gateSkipped) {
      var rect = rsvpCard.getBoundingClientRect();
      if (rect.bottom < -80 && !lockTriggered) {
        triggerScrollLock();
      }
    }
  }, { passive: true });

})();

/* ── Add to Calendar ─────────────────────────────────────────
   Generates an .ics file with 1 or 2 events depending on
   whether the guest has party=1 in their URL params.
   ──────────────────────────────────────────────────────────── */
(function() {
  var calTile = document.getElementById('calendarTile');
  if (!calTile) return;

  var params   = new URLSearchParams(window.location.search);
  var hasParty = params.get('party') === '1';

  // Update tile description if full day
  if (hasParty) {
    var descEl = document.getElementById('calTileDesc');
    if (descEl) {
      var lang = document.documentElement.lang || 'en';
      var fullDayDescs = {
        en: 'Save both the ceremony & evening to your calendar',
        de: 'Zeremonie & Abendempfang im Kalender speichern',
        ru: 'Сохрани оба события в календарь'
      };
      descEl.textContent = fullDayDescs[lang] || fullDayDescs.en;
    }
  }

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function icsDate(year, month, day, hour, minute) {
    return year + '' + pad(month) + pad(day) + 'T' + pad(hour) + pad(minute) + '00';
  }

  function makeEvent(uid, summary, dtstart, dtend, location, description) {
    return [
      'BEGIN:VEVENT',
      'UID:' + uid,
      'DTSTAMP:' + icsDate(2026, 6, 4, 0, 0) + 'Z',
      'DTSTART;TZID=Europe/Berlin:' + dtstart,
      'DTEND;TZID=Europe/Berlin:' + dtend,
      'SUMMARY:' + summary,
      'LOCATION:' + location,
      'DESCRIPTION:' + description,
      'END:VEVENT'
    ].join('\r\n');
  }

  calTile.addEventListener('click', function(e) {
    e.preventDefault();

    var events = [];

    // Ceremony — always included
    events.push(makeEvent(
      'ae-ceremony-20261016@arinaelnur.de',
      'Arina & Elnur — Wedding Ceremony',
      icsDate(2026, 10, 16, 14, 0),
      icsDate(2026, 10, 16, 16, 0),
      'Schlosskirche Düsseldorf\\, Benrather Str. 5\\, 40213 Düsseldorf',
      'Please arrive by 13:30. https://maps.google.com/?q=Schlosskirche+Düsseldorf'
    ));

    // Evening — only for party guests
    if (hasParty) {
      events.push(makeEvent(
        'ae-party-20261016@arinaelnur.de',
        'Arina & Elnur — Evening Reception',
        icsDate(2026, 10, 16, 17, 0),
        icsDate(2026, 10, 16, 23, 59),
        'Rheinliebe am Deich\\, Heerstraße 45\\, 40549 Düsseldorf',
        'Evening reception. https://maps.google.com/?q=Rheinliebe+am+Deich'
      ));
    }

    var ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Arina & Elnur//Wedding//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      events.join('\r\n'),
      'END:VCALENDAR'
    ].join('\r\n');

    var blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    var url  = URL.createObjectURL(blob);
    var a    = document.createElement('a');
    a.href     = url;
    a.download = 'arina-elnur-wedding.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
})();

/* ── Love Story photo carousel: render from STORY_PHOTOS + progress/arrows ── */
(function () {
  function init() {
    var strip = document.getElementById('storyPhotoScroll');
    var fillEl = document.getElementById('storyPhotoProgressFill');
    var counterEl = document.getElementById('storyPhotoCounter');
    var prevBtn = document.getElementById('storyPhotoPrev');
    var nextBtn = document.getElementById('storyPhotoNext');
    if (!strip) return;

    var photos = window.STORY_PHOTOS || [];

    /* Build the strip's HTML straight from the photo list above.
       Adding a photo to STORY_PHOTOS is all that's needed — this
       renders it, and the "coming soon" tile always stays last.
       Photos render in black & white via the .story-photo-scroll
       filter, so any new entry inherits it automatically. Each
       entry can optionally set a "focus" (CSS object-position
       value, e.g. "center 10%") to keep faces in frame. */
    var html = photos.map(function (p) {
      var posStyle = p.focus ? ' style="object-position:' + p.focus + '"' : '';
      return '<div class="story-photo-box">' +
               '<img src="' + p.src + '" alt="' + (p.alt || '') + '" loading="lazy"' + posStyle + '>' +
             '</div>';
    }).join('') +
      '<div class="story-photo-box story-photo-gallery story-photo-gallery--soon">' +
        '<span class="gallery-label">Photos from the wedding will be shared here</span>' +
      '</div>';
    strip.innerHTML = html;

    var boxes = strip.querySelectorAll('.story-photo-box');
    if (!boxes.length) return;

    var total = boxes.length;
    if (counterEl) counterEl.textContent = '1 / ' + total;

    function currentIndex() {
      var boxWidth = boxes[0].offsetWidth || 1;
      var idx = Math.round(strip.scrollLeft / boxWidth);
      return Math.max(0, Math.min(idx, total - 1));
    }

    function setActive(idx) {
      if (fillEl) fillEl.style.width = (total > 1 ? (idx / (total - 1)) * 100 : 100) + '%';
      if (counterEl) counterEl.textContent = (idx + 1) + ' / ' + total;
      if (prevBtn) prevBtn.disabled = idx === 0;
      if (nextBtn) nextBtn.disabled = idx === total - 1;
    }
    setActive(0);

    function goTo(idx) {
      idx = Math.max(0, Math.min(idx, total - 1));
      var boxWidth = boxes[0].offsetWidth || 1;
      strip.scrollTo({ left: idx * boxWidth, behavior: 'smooth' });
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(currentIndex() - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(currentIndex() + 1); });

    var ticking = false;
    strip.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        setActive(currentIndex());
        ticking = false;
      });
    }, { passive: true });

    window.addEventListener('resize', function () { setActive(currentIndex()); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
