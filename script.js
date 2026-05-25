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
    agendaEl.innerHTML = c.ceremony.agenda.map(function(item, idx) {
      var isLast = idx === c.ceremony.agenda.length - 1;
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
    "googleScriptUrl": "https://script.google.com/macros/s/AKfycbxIghwo-9tkQNRFR9FUnPSfsG4rTMPYh1Z9CD-NOLST7pIv1D1OoQkOG5mDsJNlViiGtw/exec",
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


/* ── 3. RSVP FORM ────────────────────────────────────────── */

var form             = document.getElementById("rsvpForm");
var attendanceSelect = document.getElementById("attendanceSelect");
var yesOnlyFields    = document.getElementById("yesOnlyFields");
var declineNote      = document.getElementById("declineNote");
var kidsCount        = document.getElementById("kidsCount");      // children hidden input
var kidsCountDisplay = document.getElementById("kidsCountDisplay");
var kidsMinus        = document.getElementById("kidsMinus");
var kidsPlus         = document.getElementById("kidsPlus");
var totalSeatsInput  = document.getElementById("totalSeats");
var bringShareCheckbox = document.getElementById("bringShareCheckbox");
var rsvpSuccess        = document.getElementById("rsvpSuccess");
var newRsvpBtn       = document.getElementById("newRsvpBtn");
var successKicker    = document.getElementById("successKicker");
var successTitle     = document.getElementById("successTitle");
var successMessage   = document.getElementById("successMessage");
var giftLink         = document.getElementById("giftLink");
var rsvpStatus       = document.getElementById("rsvpStatus");
var rsvpCard         = document.querySelector(".rsvp-card");
var guestChecksEl    = document.getElementById("guestChecks");

/* Guest names from URL — set during personalization, read here */
var __guests = [];       /* e.g. ["Elnur", "Arina"] or ["Elnur"] */
var __inviteParty = false; /* true when ?party=1 in URL */
var __partyRsvp = {};      /* collected party answers from wizard step 2 */

function getGuestCode() {
  var p = new URLSearchParams(window.location.search);
  return p.get("guest") || p.get("invite") || "";
}

/* ── Children stepper ─────────────────────────────────────── */
function getChildrenCount() {
  return Math.max(0, Number((kidsCount && kidsCount.value) || 0));
}

function setChildrenCount(next) {
  var v = Math.min(10, Math.max(0, Number(next) || 0));
  if (kidsCount) kidsCount.value = String(v);
  if (kidsCountDisplay) kidsCountDisplay.textContent = String(v);
  recalcSeats();
}

/* ── Guest checkboxes ─────────────────────────────────────── */
function fillNameFromGuests() {
  var firstField = form && form.querySelector('[name="first_name"]');
  var lastField  = form && form.querySelector('[name="last_name"]');
  if (!firstField) return;

  var checked = [];
  if (guestChecksEl) {
    guestChecksEl.querySelectorAll('input[type="checkbox"]').forEach(function(cb) {
      if (cb.checked) checked.push(cb.value);
    });
  }

  if (checked.length === 0) {
    /* nobody checked — clear */
    firstField.value = '';
    if (lastField) lastField.value = '';
  } else if (checked.length === 1) {
    /* single person — split on space into first / last */
    var parts = checked[0].split(/\s+/);
    firstField.value = parts[0] || '';
    if (lastField) lastField.value = parts.slice(1).join(' ');
  } else {
    /* multiple people — join as "Anna & Lars" in first name, blank last */
    firstField.value = checked.join(' & ');
    if (lastField) lastField.value = '';
  }
}

function buildGuestChecks(guests) {
  if (!guestChecksEl || !guests || !guests.length) return;
  guestChecksEl.innerHTML = '';
  guests.forEach(function(name, i) {
    var label = document.createElement('label');
    label.className = 'check-row guest-check-row';
    var cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.name = 'guest_' + i;
    cb.value = name;
    cb.checked = true;
    cb.addEventListener('change', function() {
      recalcSeats();
      updateAttendanceLabel();
      fillNameFromGuests();
    });
    var span = document.createElement('span');
    span.textContent = name;
    label.appendChild(cb);
    label.appendChild(span);
    guestChecksEl.appendChild(label);
  });
}

function checkedGuestCount() {
  if (!guestChecksEl) return 1;
  var boxes = guestChecksEl.querySelectorAll('input[type="checkbox"]');
  if (!boxes.length) return 1; /* no named guests — single seat */
  var count = 0;
  boxes.forEach(function(b) { if (b.checked) count++; });
  return count;
}

function recalcSeats() {
  var adults   = checkedGuestCount();
  var children = getChildrenCount();
  var total    = adults + children;
  if (totalSeatsInput) totalSeatsInput.value = String(total);
  return total;
}

function updateAttendanceLabel() {
  var adults = checkedGuestCount();
  /* label is now just "Attending" — no swap needed */
}

function updateConditionalFields() {
  if (!form) return;
  var attendInput = document.getElementById("attendanceSelect");
  var attending = (attendInput ? attendInput.value : "Yes") === "Yes";
  if (yesOnlyFields) yesOnlyFields.classList.toggle("is-hidden", !attending);
  if (declineNote)   declineNote.classList.toggle("is-visible", !attending);
  if (!attending) {
    if (bringShareCheckbox) bringShareCheckbox.checked = false;
    setChildrenCount(0);
  }
  var seatsRow = document.querySelector(".seats-row");
  if (seatsRow) seatsRow.classList.toggle("kids-active", attending);
  recalcSeats();
}

function showSuccessScreen(attending, fd) {
  if (form)        form.classList.add("is-hidden");
  if (rsvpSuccess) rsvpSuccess.classList.add("is-visible");
  if (rsvpCard) {
    rsvpCard.classList.toggle("success-attending",  attending);
    rsvpCard.classList.toggle("success-declined",  !attending);
  }
  if (successKicker) successKicker.textContent = "THANK YOU";
  if (successTitle)  successTitle.textContent  = attending ? "We cannot wait to celebrate with you." : "We are sorry you cannot make it.";
  if (successMessage) successMessage.textContent = attending
    ? "Your RSVP has been received. Thank you for being part of this special day."
    : "Thank you for letting us know. You will be missed, and we hope to celebrate together another time.";
  if (giftLink) {
    giftLink.href = window.__GIFT_LIST_URL || "#";
    giftLink.classList.toggle("is-visible", attending);
  }

  /* Add to Calendar — Google Calendar link */
  var calBtn = document.getElementById("addToCalBtn");
  if (calBtn && attending) {
    var calUrl = [
      "https://www.google.com/calendar/render?action=TEMPLATE",
      "&text=Arina+%26+Elnur+Wedding",
      "&dates=20261016T113000Z/20261016T163000Z",
      "&details=Wedding+ceremony+at+Schlosskirche+D%C3%BCsseldorf",
      "&location=Schlo%C3%9Fallee+6%2C+40229+D%C3%BCsseldorf%2C+Germany",
      "&sf=true&output=xml"
    ].join("");
    calBtn.href = calUrl;
    calBtn.style.display = "";
  } else if (calBtn) {
    calBtn.style.display = "none";
  }
  var joinedBringShare = attending && fd && fd.has("bring_share");

  /* show/hide attending-only actions */
  var successActions = document.getElementById("successActions");
  if (successActions) successActions.style.display = attending ? "" : "none";

  /* gift list */
  var giftLinkEl = document.getElementById("giftLink");
  if (giftLinkEl) giftLinkEl.classList.toggle("is-visible", attending);

  /* bring button: only show when attending */
  var nudgeBtn = document.getElementById("bsNudgeBtn");
  if (nudgeBtn) nudgeBtn.style.display = attending ? "" : "none";

  /* New RSVP button: ALWAYS visible regardless of attendance */
  var newRsvp = document.getElementById("newRsvpBtn");
  if (newRsvp) { newRsvp.style.display = "inline-flex"; newRsvp.style.removeProperty && newRsvp.style.removeProperty("visibility"); }
}

function resetForm() {
  if (form) form.reset();
  /* Re-check all guest checkboxes */
  if (guestChecksEl) {
    guestChecksEl.querySelectorAll('input[type="checkbox"]').forEach(function(cb) { cb.checked = true; });
  }
  setChildrenCount(0);
  setAttendance("Yes");
  if (rsvpSuccess) rsvpSuccess.classList.remove("is-visible");
  if (form)        form.classList.remove("is-hidden");
  if (rsvpCard)    rsvpCard.classList.remove("success-attending", "success-declined");
}

/* Attend buttons — replace dropdown */
var attendYesBtn = document.getElementById("attendYes");
var attendNoBtn  = document.getElementById("attendNo");
var attendInput  = document.getElementById("attendanceSelect");

function setAttendance(val) {
  if (attendInput) attendInput.value = val;
  if (attendYesBtn) attendYesBtn.classList.toggle("is-active", val === "Yes");
  if (attendNoBtn)  attendNoBtn.classList.toggle("is-active",  val === "No");
  updateConditionalFields();
}

if (attendYesBtn) attendYesBtn.addEventListener("click", function() { setAttendance("Yes"); });
if (attendNoBtn)  attendNoBtn.addEventListener("click",  function() { setAttendance("No");  });
if (kidsMinus) kidsMinus.addEventListener("click", function() { setChildrenCount(getChildrenCount() - 1); });
if (kidsPlus)  kidsPlus.addEventListener("click",  function() { setChildrenCount(getChildrenCount() + 1); });
if (newRsvpBtn) newRsvpBtn.addEventListener("click", function(e) { e.preventDefault(); resetForm(); });

updateConditionalFields();

if (form) {
  form.addEventListener("submit", async function(e) {
    e.preventDefault();
    var fd      = new FormData(form);
    var data    = Object.fromEntries(fd.entries());
    var attending = (document.getElementById("attendanceSelect") || {value:"Yes"}).value === "Yes";
    data.attendance = attending ? "Yes" : "No";

    var selectedSeats = attending ? Math.max(1, recalcSeats()) : 0;

    var emailField = form.querySelector('[name="email"]');
    if (emailField && !emailField.checkValidity()) {
      if (rsvpStatus) rsvpStatus.textContent = "Please enter a valid email address.";
      emailField.focus();
      return;
    }

    var scriptUrl = window.__GOOGLE_SCRIPT_URL;
    if (!scriptUrl) {
      if (rsvpStatus) rsvpStatus.textContent = "RSVP ready — add your Google Apps Script URL in content.json.";
      return;
    }

    if (rsvpStatus) rsvpStatus.textContent = "Sending…";

    /* Build guest names string for sheet */
    var guestNames = __guests.length
      ? __guests.filter(function(_, i) {
          var cb = guestChecksEl && guestChecksEl.querySelector('input[name="guest_' + i + '"]');
          return !cb || cb.checked;
        }).join(", ")
      : ((data.first_name || "") + " " + (data.last_name || "")).trim();

    var payload = {
      timestamp:        new Date().toISOString(),
      guest_code:       getGuestCode(),
      first_name:       data.first_name      || "",
      last_name:        data.last_name        || "",
      name:             ((data.first_name || "") + " " + (data.last_name || "")).trim(),
      guests_attending: guestNames,
      email:            data.email           || "",
      phone:            data.phone           || "",
      attendance:       data.attendance      || "",
      join_bring_share: attending && fd.has("bring_share") ? "Yes" : "No",
      children:         attending ? String(getChildrenCount()) : "0",
      seats:            attending ? String(selectedSeats) : "0",
      message:          data.message         || "",
      /* Party details go to PartyRSVPs sheet separately — just flag here */
      invited_to_party: __inviteParty ? "Yes" : "No"
    };

    try {
      await fetch(scriptUrl, {
        method: "POST", mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (rsvpStatus) rsvpStatus.textContent = "";
      var wantsBringShare = attending && bringShareCheckbox && bringShareCheckbox.checked;
      /* Capture name BEFORE reset so modals can pre-fill it */
      var rsvpFirstName = (form.querySelector("[name='first_name']") || {}).value || "";
      var rsvpLastName  = (form.querySelector("[name='last_name']")  || {}).value || "";
      var rsvpFullName  = (rsvpFirstName + " " + rsvpLastName).trim();
      /* Store globally — party wizard and B&S both need it AFTER form reset */
      window.__lastRsvpName = rsvpFullName;
      form.reset();
      setChildrenCount(0);
      updateConditionalFields();
      showSuccessScreen(attending, fd);
      /* Store B&S prefill globally so party wizard can chain to it after closing */
      window.__pendingBringShare = wantsBringShare ? rsvpFullName : null;

      if (__inviteParty && attending) {
        /* Open party wizard first; B&S opens after party wizard closes if needed */
        setTimeout(function() { openPartyWizard(); }, 600);
      } else if (wantsBringShare) {
        setTimeout(function() { openBringShare(rsvpFullName); }, 500);
      }
    } catch(err) {
      if (rsvpStatus) rsvpStatus.textContent = "Something went wrong. Please try again.";
    }
  });
}


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

  if (!displayName) return;

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

  /* ── Greeting box (rich version) ───────────────────────── */
  var rsvpH2 = document.querySelector('.rsvp-card h2');
  if (rsvpH2 && !document.getElementById('rsvp-greeting')) {

    /* Countdown to wedding day */
    var weddingDate = new Date('2026-10-16T00:00:00');
    var today       = new Date();
    today.setHours(0,0,0,0);
    var daysLeft    = Math.ceil((weddingDate - today) / (1000 * 60 * 60 * 24));
    var countdownText = daysLeft > 0
      ? daysLeft + ' days until the big day'
      : daysLeft === 0 ? 'Today is the day!' : '';

    /* Context-aware sub-line based on invite type */
    var hasParty = __inviteParty;
    var subText = hasParty
      ? 'We would love to have you with us \u2014 at the church as we tie our knot, and with us as we celebrate into the night.'
      : 'We would love to have you witness our special day as we tie our knot at the church ceremony.';

    /* Build the greeting element */
    var greeting = document.createElement('div');
    greeting.id  = 'rsvp-greeting';
    greeting.className = 'rsvp-greeting';

    var nameSpan = document.createElement('span');
    nameSpan.className = 'rsvp-greeting-name';
    nameSpan.textContent = 'Dear ' + displayName + ',';

    var subSpan = document.createElement('span');
    subSpan.className = 'rsvp-greeting-sub';
    subSpan.textContent = subText;

    greeting.appendChild(nameSpan);
    greeting.appendChild(subSpan);
    rsvpH2.insertAdjacentElement('afterend', greeting);

    /* Deadline + countdown — sits below the greeting */
    var deadlineDate = new Date('2026-09-04T00:00:00');
    var daysToDeadline = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));

    var deadlineText = '';
    if (daysToDeadline > 0) {
      deadlineText = 'Please reply by 4 September — ' + daysToDeadline + ' days left';
    } else if (daysToDeadline === 0) {
      deadlineText = 'Today is the last day to RSVP!';
    } else {
      deadlineText = 'RSVP deadline has passed — please reach out directly';
    }

    /* Insert deadline first, then countdown below it */
    var deadline = document.createElement('span');
    deadline.className = 'rsvp-deadline';
    deadline.textContent = deadlineText;
    greeting.insertAdjacentElement('afterend', deadline);

    if (countdownText) {
      var countdown = document.createElement('span');
      countdown.className = 'rsvp-countdown';
      countdown.textContent = countdownText;
      deadline.insertAdjacentElement('afterend', countdown);
    }
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
  if (partyNext1) partyNext1.addEventListener('click', function() {
    var attending = (partyAttendVal && partyAttendVal.value) === 'Yes';
    if (attending) {
      partyShow(step2);
    } else {
      /* Not attending party — store and close */
      __partyRsvp = { attending: 'No', dietary: '', notes: '' };
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
      try {
        await fetch(scriptUrl, {
          method: 'POST', mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(partyPayload)
        });
      } catch(e) { /* silent — main RSVP already saved */ }
      if (partyStatus) partyStatus.textContent = '';
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
