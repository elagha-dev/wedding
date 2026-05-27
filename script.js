/* ============================================================
   WEDDING SITE — script.js
   Loads content.json → renders DOM, then handles RSVP form.
   ============================================================ */

/* ── 1. CONTENT LOADER ───────────────────────────────────── */

function buildPersonCard(person) {
  const wrap = document.createElement("div");
  wrap.className = "mini-contact-wrap";
  wrap.innerHTML = `
    <button type="button" class="party-mini-contact" aria-label="Open ${person.name} contact card">
      <span class="mini-photo"><img src="${person.photo}" alt="${person.name}" loading="lazy" /></span>
      <span class="mini-name">${person.displayName || person.name}</span>
    </button>
    <div class="mini-popover">
      <button type="button" class="mini-popover-close" aria-label="Close">×</button>
      <div class="contact-role">${person.role}</div>
      <h3>${person.name}</h3>
      <p><span>Email</span><a href="mailto:${person.email}">${person.email}</a></p>
      <p><span>Phone</span><a href="tel:${person.phone.replace(/\s+/g, "")}">${person.phone}</a></p>
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
  /* Love story */
  const storyEl = document.getElementById("story-paragraphs");
  if (storyEl && c.loveStory && c.loveStory.paragraphs) {
    storyEl.innerHTML = c.loveStory.paragraphs
      .map(t => `<p class="story-text">${t}</p>`).join("");
  }

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
          (item.mapUrl ? '<a class="agenda-map-link" href="' + item.mapUrl + '" target="_blank" rel="noreferrer">View on Map ↗</a>' : '') +
          '</div>';
      }
      var bringShareHtml = "";
      if (item.bringAndShare && item.bringAndShareFormUrl) {
        bringShareHtml = '<a class="agenda-hint-btn" href="' + item.bringAndShareFormUrl + '" target="_blank" rel="noreferrer">🧁 Let us know what you\'ll bring</a>';
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
      if (item.label === 'CEREMONY' || item.label === 'GET TOGETHER') {
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
      if (card04Label) card04Label.textContent = 'The Moment';
      if (card04Title) card04Title.textContent = 'The Day';
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
      return '<div class="faq-item"><details><summary>' + item.question + '</summary><p>' + item.answer + '</p></details></div>';
    }).join("");
  }

  /* RSVP URLs */
  if (c.rsvp && c.rsvp.googleScriptUrl) window.__GOOGLE_SCRIPT_URL = c.rsvp.googleScriptUrl;
  if (c.rsvp && c.rsvp.giftListUrl)     window.__GIFT_LIST_URL     = c.rsvp.giftListUrl;
  if (c.rsvp && c.rsvp.bringAndShareFormUrl) window.__BRING_SHARE_URL = c.rsvp.bringAndShareFormUrl;
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
    "ogImage": "https://www.arinaelnur.de/us.jpg",
    "twitterTitle": "Arina & Elnur Wedding Invitation",
    "twitterDescription": "You are warmly invited to Arina & Elnur's wedding ceremony.",
    "analyticsToken": "40223123959b40ce8820f84cd8bbae11"
  },
  "rsvp": {
    "googleScriptUrl": "https://script.google.com/macros/s/AKfycbywYNtXJj8X_gVWnVOwen1YsC26331emv7QVmPC3RozcH9-JhEKPIWaCYhXmaSd5iuTJA/exec",
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
      { "name": "Islam",  "displayName": "Islam",  "photo": "isi.jpg",    "role": "Best Man", "email": "islam@example.com",  "phone": "+49 123 4567892" },
      { "name": "Lars",   "displayName": "Lars",   "photo": "lars.png",   "role": "Groom's Man", "email": "lars@example.com",   "phone": "+49 123 4567890" },
      { "name": "Lucas",  "displayName": "Lucas",  "photo": "lucas.png",            "role": "Groom's Man", "email": "lucas@example.com",  "phone": "+49 123 4567892" }
    ],
    "brideSide": [
      { "name": "Alicja", "displayName": "Alicja", "photo": "alicja.jpg",  "role": "Maid of Honor","email": "alicja@example.com","phone": "+49 123 4567893" },
      { "name": "Kris",   "displayName": "Kris",   "photo": "kris.png",    "role": "Bride's Maid", "email": "kris@example.com",   "phone": "+49 123 4567891" },
      { "name": "Valerie","displayName": "Valerie","photo": "valerie.png", "role": "Bride's Maid", "email": "valerie@example.com","phone": "+49 123 4567893" }
    ],
    "pastorAndBand": [
      { "name": "Felipe", "displayName": "Felipe", "photo": "felipe.jpg", "role": "Pastor", "email": "felipe@example.com", "phone": "+49 123 4567891" },
      { "name": "Jonas&Jenny",  "displayName": "Rockhoffs",   "photo": "jonasnjenny.jpg",  "role": "Worship Team",   "email": "jonas@example.com",  "phone": "+49 123 4567893" },
      { "name": "David",  "displayName": "David",   "photo": "plivi.jpg",  "role": "Worship Team",   "email": "jenny@example.com",  "phone": "+49 123 4567893" }
    ]
  },
  "ceremony": {
    "agenda": [
      {
        "time": "13:30",
        "label": "GET TOGETHER",
        "title": "Get Together",
        "location": "Schlosskirche Eller",
        "address": "Schlossallee 10, 40229 Düsseldorf",
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
        "description": "Join us as we continue the celebration into the evening! Music, dancing, and more joy with our closest friends and family."
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
      "answer": "No wish list — but if you'd like to gift us something, we would be so grateful for a financial contribution toward starting our new home together and celebrating our honeymoon."
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
var declineMessage    = document.getElementById("declineMessage");
var declineBlock      = document.getElementById("declineBlock");
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

/* Wizard step elements */
var wStep1  = document.getElementById("wStep1");
var wStep2  = document.getElementById("wStep2");
var wStep3  = document.getElementById("wStep3");
var wNext1  = document.getElementById("wNext1");
var wBack2  = document.getElementById("wBack2");
var wNext2  = document.getElementById("wNext2");
var wBack3  = document.getElementById("wBack3");
var wSubmit = document.getElementById("wSubmit");

/* Seat stepper (step 3) */
var seatDisplay = document.getElementById("seatDisplay");
var seatSummary = document.getElementById("seatSummary");
var seatMinus   = document.getElementById("seatMinus");
var seatPlus    = document.getElementById("seatPlus");
var seatConfirm = document.getElementById("seatConfirm");

/* Attend buttons (step 2) */
var attendYesBtn  = document.getElementById("attendYes");
var attendNoBtn   = document.getElementById("attendNo");
var partyYesBtn   = document.getElementById("partyYesBtn");
var partyNoBtn    = document.getElementById("partyNoBtn");

/* ── Global state ─────────────────────────────────────────── */
var __guests    = [];
var __partyRsvp = {};
var __manualSeatOverride = false; /* true once user touches seat stepper */
var __seatCount = 1;

function getGuestCode() {
  var p = new URLSearchParams(window.location.search);
  return p.get("guest") || p.get("invite") || "";
}

/* ── Wizard dot progress ──────────────────────────────────── */
function setWizardStep(n) {
  [wStep1, wStep2, wStep3].forEach(function(s, i) {
    if (!s) return;
    s.classList.toggle("is-active", i + 1 === n);
  });
  document.querySelectorAll(".wizard-dot").forEach(function(d, i) {
    d.classList.toggle("is-active", i + 1 === n);
    d.classList.toggle("is-done",   i + 1 < n);
  });
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
  if (!attending && bringShareCheckbox) bringShareCheckbox.checked = false;
  /* Kids: show if attending anything */
  var anyAttending = attending || isPartyAttending();
  var childrenRow = document.getElementById("childrenRow");
  if (childrenRow) childrenRow.style.display = anyAttending ? "" : "none";
  if (!anyAttending) setChildrenCount(0);
  recalcSeats();
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
  var firstField = rsvpWizard && rsvpWizard.querySelector('[name="first_name"]');
  var lastField  = rsvpWizard && rsvpWizard.querySelector('[name="last_name"]');
  if (!firstField) return;
  var checked = [];
  if (guestChecksEl) {
    guestChecksEl.querySelectorAll('input[type="checkbox"]').forEach(function(cb) {
      if (cb.checked) checked.push(cb.value);
    });
  }
  if (checked.length === 0) {
    firstField.value = ''; if (lastField) lastField.value = '';
  } else if (checked.length === 1) {
    var parts = checked[0].split(/\s+/);
    firstField.value = parts[0] || '';
    if (lastField) lastField.value = parts.slice(1).join(' ');
  } else {
    firstField.value = checked.join(' & ');
    if (lastField) lastField.value = '';
  }
}

function buildGuestChecks(guests) {
  if (!guestChecksEl || !guests || !guests.length) return;
  guestChecksEl.innerHTML = '';
  var isMultiple = guests.length > 1;

  /* Update field labels based on guest count */
  var firstLabel = document.querySelector('[name="first_name"]');
  var lastLabel  = document.querySelector('[name="last_name"]');
  if (firstLabel) {
    var fl = firstLabel.closest('.field-label');
    if (fl) fl.querySelector('span').textContent = isMultiple ? 'Your names' : 'First name';
    firstLabel.placeholder = isMultiple ? 'Your names' : 'First name';
  }
  if (lastLabel) {
    var ll = lastLabel.closest('.field-label');
    if (ll) ll.querySelector('span').textContent = isMultiple ? 'Family name' : 'Last name';
    lastLabel.placeholder = isMultiple ? 'Family name' : 'Last name';
  }

  /* Build toggle buttons (no visible checkboxes) */
  var wrap = document.createElement('div');
  wrap.className = 'guest-toggle-wrap';
  guests.forEach(function(name, i) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'attend-btn guest-toggle-btn is-active';
    btn.dataset.guestIndex = i;
    btn.dataset.guestName  = name;
    btn.textContent = name;
    /* Hidden checkbox behind the button for form data */
    var cb = document.createElement('input');
    cb.type = 'checkbox'; cb.name = 'guest_' + i; cb.value = name; cb.checked = true;
    cb.style.display = 'none';
    cb.id = 'guestCb_' + i;
    btn.addEventListener('click', function() {
      var active = btn.classList.toggle('is-active');
      cb.checked = active;
      recalcSeats(); fillNameFromGuests();
    });
    wrap.appendChild(btn);
    wrap.appendChild(cb);
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
  if (seatDisplay) seatDisplay.textContent = String(__seatCount);
  if (seatSummary) {
    var adults   = isAttending() ? checkedGuestCount() : (isPartyAttending() ? checkedGuestCount() : 0);
    var children = getChildrenCount();
    var parts = [];
    if (adults > 0)   parts.push(adults   + (adults   === 1 ? " adult"  : " adults"));
    if (children > 0) parts.push(children + (children === 1 ? " child"  : " children"));
    seatSummary.textContent = parts.length ? "(" + parts.join(" + ") + ")" : "";
  }
  if (seatConfirm) seatConfirm.style.display = (__seatCount > 0) ? "" : "none";
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
    if (cardThanksMsg) cardThanksMsg.textContent = attending
      ? "We cannot wait to celebrate with you."
      : "We are sorry you cannot make it. Thank you for letting us know.";
  }
  /* Show full-screen overlay with gift info */
  if (rsvpSuccess) {
    rsvpSuccess.classList.add("is-visible");
    rsvpSuccess.scrollTop = 0;
    document.body.style.overflow = "hidden";
  }
  if (successKicker) successKicker.textContent = "THANK YOU";
  if (successTitle)  successTitle.textContent  = attending
    ? "We cannot wait to celebrate with you."
    : "We are sorry you cannot make it.";
  if (successMessage) successMessage.textContent = attending
    ? "Your RSVP has been received. Thank you for being part of this special day."
    : "Thank you for letting us know. You will be missed, and we hope to celebrate together another time.";

  /* Gift banner: show when attending anything; note text depends on party */
  if (giftBanner) {
    giftBanner.style.display = attending ? "" : "none";
    var paypalLink = document.getElementById("giftPaypalLink");
    if (paypalLink) paypalLink.href = window.__PAYPAL_URL || "#";
    var giftNote = document.getElementById("giftBannerNote");
    if (giftNote) {
      var partyAttending = isPartyAttending();
      giftNote.textContent = partyAttending
        ? "A gift box will be at the church entrance and at the reception venue. Thank you so much. ♡"
        : "A gift box will be at the church entrance. Thank you so much. ♡";
    }
  }

  /* Bring & Share nudge */
  var nudgeBtn = document.getElementById("bsNudgeBtn");
  if (nudgeBtn) nudgeBtn.style.display = (attending && bringShareCheckbox && bringShareCheckbox.checked) ? "" : "none";

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
  }
  if (bringShareCheckbox) bringShareCheckbox.checked = false;
  if (declineMessage) declineMessage.value = "";
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
  setWizardStep(1);
}

/* ── Wire up attend buttons ───────────────────────────────── */
if (attendYesBtn) attendYesBtn.addEventListener("click", function() { setAttendance("Yes"); });
if (attendNoBtn)  attendNoBtn.addEventListener("click",  function() { setAttendance("No");  });
if (partyYesBtn)  partyYesBtn.addEventListener("click",  function() { setPartyAttendance("Yes"); });
if (partyNoBtn)   partyNoBtn.addEventListener("click",   function() { setPartyAttendance("No");  });

/* Kids stepper */
if (kidsMinus) kidsMinus.addEventListener("click", function() { setChildrenCount(getChildrenCount() - 1); });
if (kidsPlus)  kidsPlus.addEventListener("click",  function() { setChildrenCount(getChildrenCount() + 1); });

/* Seat stepper */
if (seatMinus) seatMinus.addEventListener("click", function() { __manualSeatOverride = true; setSeatCount(__seatCount - 1); });
if (seatPlus)  seatPlus.addEventListener("click",  function() { __manualSeatOverride = true; setSeatCount(__seatCount + 1); });

/* New RSVP button */
if (newRsvpBtn) newRsvpBtn.addEventListener("click", function(e) { e.preventDefault(); resetWizard(); });

/* ── Wizard step navigation ───────────────────────────────── */
if (wNext1) wNext1.addEventListener("click", function() {
  var fn = rsvpWizard && rsvpWizard.querySelector('[name="first_name"]');
  var em = rsvpWizard && rsvpWizard.querySelector('[name="email"]');
  if (fn && !fn.value.trim()) { fn.focus(); fn.setAttribute("placeholder", "Required ↑"); return; }
  if (em && !em.checkValidity()) { em.focus(); return; }
  setWizardStep(2);
  /* Show evening row if party invite */
  if (eveningAttendField) eveningAttendField.style.display = __inviteParty ? "" : "none";
  onAttendanceChange();
});

if (wBack2) wBack2.addEventListener("click", function() { setWizardStep(1); });

if (wNext2) wNext2.addEventListener("click", function() {
  /* Validate: ceremony attendance must be chosen */
  if (!attendanceSelect || attendanceSelect.value === "") {
    var rsvpSt = document.getElementById("rsvpStatus") || { textContent: "" };
    var errMsg = document.createElement("p");
    errMsg.style.cssText = "color:#7a5133;font-size:10px;letter-spacing:.05em;margin:6px 0 0;font-family:WeddingSerif,Georgia,serif;";
    errMsg.id = "attendErr";
    errMsg.textContent = "Please select your attendance for the ceremony.";
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
  /* Show/hide decline block */
  var anyAttending = isAttending() || isPartyAttending();
  if (declineBlock) declineBlock.style.display = !anyAttending ? "" : "none";
  if (seatConfirm)  seatConfirm.style.display  =  anyAttending ? "" : "none";
  setWizardStep(3);
  updateSeatDisplay();
});

if (wBack3) wBack3.addEventListener("click", function() { setWizardStep(2); });

if (wSubmit) wSubmit.addEventListener("click", async function() {
  var attending      = isAttending();
  var partyAttending = isPartyAttending();
  var anyAttending   = attending || partyAttending;
  var fn  = (rsvpWizard && rsvpWizard.querySelector('[name="first_name"]') || {}).value || "";
  var ln  = (rsvpWizard && rsvpWizard.querySelector('[name="last_name"]')  || {}).value || "";
  var em  = (rsvpWizard && rsvpWizard.querySelector('[name="email"]')      || {}).value || "";
  var ph  = (rsvpWizard && rsvpWizard.querySelector('[name="phone"]')      || {}).value || "";
  var msg = (declineMessage && declineMessage.value) || "";

  var guestNames = __guests.length
    ? __guests.filter(function(_, i) {
        var cb = guestChecksEl && guestChecksEl.querySelector('input[name="guest_' + i + '"]');
        return !cb || cb.checked;
      }).join(", ")
    : (fn + " " + ln).trim();

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
    last_name:           ln,
    name:                (fn + " " + ln).trim(),
    email:               em,
    phone:               ph,
    invited_to_party:    __inviteParty  ? "Yes" : "No",
    attendance:          attending      ? "Yes" : "No",
    party_attendance:    partyAttending ? "Yes" : "No",
    guests_attending:    guestNames,
    children:            anyAttending   ? String(getChildrenCount()) : "0",
    seats:               anyAttending   ? String(__seatCount) : "0",
    join_bring_share:    attending && bringShareCheckbox && bringShareCheckbox.checked ? "Yes" : "No"
  };

  try {
    await fetch(scriptUrl, {
      method: "POST", mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (rsvpStatus) rsvpStatus.textContent = "";
    var rsvpFullName = (fn + " " + ln).trim();
    window.__lastRsvpName = rsvpFullName;
    var wantsBringShare = attending && bringShareCheckbox && bringShareCheckbox.checked;
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
onAttendanceChange();
setWizardStep(1);


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
  bringShareCheckbox.addEventListener("change", function() {
    /* Just track the checkbox — modal opens after RSVP submit if checked */
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
  var foodTypes = document.querySelectorAll('input[name="food_type"]:checked');
  if (!foodTypes.length) {
    if (bsStatus) bsStatus.textContent = "Please select at least one food type.";
    bsShow(bsStep2);
    return;
  }
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
   Single ceremony:       ?p1=Elnur
   Couple ceremony:       ?p1=Elnur&p2=Arina
   Single + party:        ?p1=Elnur&party=1
   Couple + party:        ?p1=Elnur&p2=Arina&party=1
   ─────────────────────────────────────────────────────────── */
(function() {
  var params = new URLSearchParams(window.location.search);
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
        setWizardStep(1);
      });
    }
    return;
  }

  /* ── Tab title ─────────────────────────────────────────── */
  var tabName = (p1 && p2) ? (p1 + ' & ' + p2) : (p1 || displayName);
  document.title = tabName + ' \u2014 You\u2019re invited \u2665';

  /* ── Store globally for submit handler ─────────────────── */
  __guests = guests;

  /* ── Pre-fill name fields ──────────────────────────────── */
  var firstField = document.querySelector('[name="first_name"]');
  var lastField  = document.querySelector('[name="last_name"]');
  if (firstField && prefillFirst) firstField.value = prefillFirst;
  if (lastField  && prefillLast)  lastField.value  = prefillLast;

  /* ── Guest checkboxes (couples only) ───────────────────── */
  if (guests.length >= 2) {
    buildGuestChecks(guests);
    recalcSeats();
    updateAttendanceLabel();
    fillNameFromGuests();
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
    nameSpan.textContent = 'Dear ' + displayName + ',';
    nameEl.appendChild(nameSpan);

    /* Letter paragraphs sit inside the greeting box */
    var letterDiv = document.createElement('div');
    letterDiv.className = 'rsvp-greeting-letter';
    if (hasParty) {
      letterDiv.innerHTML =
        "<p>Arina and I are so excited to have you with us on our wedding day \u2014 truly one of the most important days of our lives, and we wouldn\u2019t want to share it without you.</p>" +
        "<p>We\u2019re getting married at the <strong>church ceremony</strong> on <strong>16 October at 14:00</strong>, and afterwards we\u2019ll celebrate well into the evening at our <strong>reception starting at 17:00</strong> \u2014 dinner, dancing, and all the good things.</p>" +
        "<p>It only takes a minute to let us know you\u2019ll be there. If you can make it to both \u2014 wonderful. If you can only join us for the evening \u2014 we\u2019ll take it, gladly. Just let us know below.</p>" +
        "<p class=\"deadline\">Please let us know your RSVP by <strong>18 September</strong>.</p>";
    } else {
      letterDiv.innerHTML =
        "<p>Arina and I are so happy to invite you to witness one of the most meaningful moments of our lives \u2014 our wedding ceremony.</p>" +
        "<p>We\u2019re tying the knot at the <strong>church on 16 October at 14:00</strong>, and we would be truly honoured to have you there with us as we say our vows.</p>" +
        "<p>It only takes a minute \u2014 just let us know you\u2019ll be coming, and we\u2019ll take care of the rest.</p>" +
        "<p class=\"deadline\">Please let us know your RSVP by <strong>18 September</strong>.</p>";
    }
    nameEl.appendChild(letterDiv);
    rsvpIntroEl.insertAdjacentElement('afterbegin', nameEl);

    /* Clear the old instructions container */
    if (instrEl) instrEl.innerHTML = "<p class=\"rsvp-intro-note\">Any questions? Reach out to anyone in the crew \u2014 they\u2019re wonderful and happy to help.</p>";
  }

  /* ── "Begin your RSVP" button ───────────────────────────── */
  var rsvpBeginBtn = document.getElementById('rsvpBeginBtn');
  if (rsvpBeginBtn) {
    rsvpBeginBtn.addEventListener('click', function() {
      if (rsvpIntroEl)   rsvpIntroEl.classList.add('is-hidden');
      if (rsvpWizardEl)  rsvpWizardEl.classList.remove('is-hidden');
      setWizardStep(1);
    });
  }
})();


/* ── STICKY RSVP REMINDER BANNER ────────────────────────────
   Appears at the bottom of the page on mobile (≤920px) and
   at the top-right on desktop. Does NOT go away until RSVP
   is actually submitted (success screen shown).
   ─────────────────────────────────────────────────────────── */
(function() {
  // Inject the banner HTML
  var banner = document.createElement('div');
  banner.id = 'rsvpBanner';
  banner.innerHTML =
    '<span id="rsvpBannerText">📋 Please complete your RSVP</span>' +
    '<button id="rsvpBannerBtn">RSVP now \u2193</button>';
  document.body.appendChild(banner);

  // Inject minimal banner styles (no changes to styles.css)
  var style = document.createElement('style');
  style.textContent = [
    '#rsvpBanner {',
    '  display: none;',
    '  position: fixed;',
    '  z-index: 9999;',
    '  background: #31271C;',
    '  color: #EBE2DA;',
    '  font-family: inherit;',
    '  align-items: center;',
    '  justify-content: space-between;',
    '  gap: 12px;',
    '  box-shadow: 0 -2px 20px rgba(0,0,0,.25);',
    '  transition: opacity .3s;',
    '}',
    /* Mobile: bottom bar */
    '@media (max-width: 920px) {',
    '  #rsvpBanner {',
    '    bottom: 0; left: 0; right: 0;',
    '    padding: 14px 20px;',
    '    font-size: 14px;',
    '  }',
    '}',
    /* Desktop: top-right pill */
    '@media (min-width: 921px) {',
    '  #rsvpBanner {',
    '    top: 14px; right: 14px;',
    '    border-radius: 2px;',
    '    padding: 10px 16px;',
    '    font-size: 11px;',
    '    letter-spacing: .06em;',
    '  }',
    '}',
    '#rsvpBannerText { flex: 1; }',
    '#rsvpBannerBtn {',
    '  flex-shrink: 0;',
    '  background: #EBE2DA;',
    '  color: #31271C;',
    '  border: none;',
    '  padding: 7px 16px;',
    '  font-family: inherit;',
    '  font-size: inherit;',
    '  font-weight: 600;',
    '  letter-spacing: .08em;',
    '  text-transform: uppercase;',
    '  cursor: pointer;',
    '  white-space: nowrap;',
    '  border-radius: 1px;',
    '}',
    '#rsvpBannerBtn:hover { opacity: .85; }'
  ].join('\n');
  document.head.appendChild(style);

  var submitted = false;

  function isSuccessVisible() {
    var s = document.getElementById('rsvpSuccess');
    return s && (s.classList.contains('is-visible') || getComputedStyle(s).display !== 'none');
  }

  function updateBanner() {
    if (submitted || isSuccessVisible()) {
      banner.style.display = 'none';
      return;
    }
    banner.style.display = 'flex';
  }

  // Watch RSVP success div for class changes
  var successEl = document.getElementById('rsvpSuccess');
  if (successEl) {
    new MutationObserver(function() {
      if (isSuccessVisible()) { submitted = true; }
      updateBanner();
    }).observe(successEl, { attributes: true, attributeFilter: ['class', 'style'] });
  }

  // Scroll to RSVP card on click
  document.getElementById('rsvpBannerBtn').addEventListener('click', function() {
    var card = document.querySelector('.rsvp-card');
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // On desktop the card is always visible in the grid, so just focus first field
      var firstInput = card.querySelector('input');
      if (firstInput) setTimeout(function() { firstInput.focus(); }, 400);
    }
  });

  window.addEventListener('resize', updateBanner);

  // Initial state — small delay so success screen has time to render on reload
  setTimeout(updateBanner, 100);
})();


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

    var notes = (document.getElementById('partyNotes') || {}).value || '';

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
        party_notes:     notes
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
