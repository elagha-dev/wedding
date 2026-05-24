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
var kidsCheckbox     = document.getElementById("kidsCheckbox");
var kidsCount        = document.getElementById("kidsCount");
var kidsCountDisplay = document.getElementById("kidsCountDisplay");
var kidsMinus        = document.getElementById("kidsMinus");
var kidsPlus         = document.getElementById("kidsPlus");
var bringShareRow      = document.getElementById("bringShareRow");
var bringShareCheckbox = document.getElementById("bringShareCheckbox");
var rsvpSuccess        = document.getElementById("rsvpSuccess");
var newRsvpBtn       = document.getElementById("newRsvpBtn");
var successKicker    = document.getElementById("successKicker");
var successTitle     = document.getElementById("successTitle");
var successMessage   = document.getElementById("successMessage");
var giftLink         = document.getElementById("giftLink");
var bringShareLink   = document.getElementById("bringShareLink");
var rsvpStatus       = document.getElementById("rsvpStatus");
var rsvpCard         = document.querySelector(".rsvp-card");

function getGuestCode() {
  var p = new URLSearchParams(window.location.search);
  return p.get("guest") || p.get("invite") || "";
}

function setKidsCount(next) {
  if (!kidsCount) return;
  var v = Math.min(10, Math.max(1, Number(next) || 1));
  kidsCount.value = String(v);
  if (kidsCountDisplay) kidsCountDisplay.textContent = String(v);
  // Swap attendance option text based on party size — value stays "Yes" for the sheet
  var yesOption = document.querySelector('#attendanceSelect option[value="Yes"]');
  if (yesOption) {
    yesOption.textContent = v > 1 ? 'Yes, we will be there' : 'Yes, I will be there';
  }
}

function updateConditionalFields() {
  if (!form || !attendanceSelect) return;
  var attending = attendanceSelect.value === "Yes";
  if (yesOnlyFields) yesOnlyFields.classList.toggle("is-hidden", !attending);
  if (declineNote)   declineNote.classList.toggle("is-visible", !attending);
  if (!attending) {
    var kids = form.querySelector('[name="with_kids"]');
    if (kids) kids.checked = false;
    if (bringShareCheckbox) bringShareCheckbox.checked = false;
    if (bringShareRow) bringShareRow.classList.add("is-hidden");
    setKidsCount(0);
  }
  /* bring&share field follows its own checkbox, not attendance */
  // seats stepper: always show when attending, always visible (no checkbox needed)
  var seatsRow = document.querySelector(".seats-row");
  if (seatsRow) seatsRow.classList.toggle("kids-active", attending);
  if (attending && kidsCount && Number(kidsCount.value) < 1) setKidsCount(1);
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
  var joinedBringShare = attending && fd && fd.has("bring_share");

  /* show/hide whole action row */
  var successActions = document.getElementById("successActions");
  if (successActions) successActions.classList.toggle("is-hidden", !attending);

  /* gift list */
  var giftLinkEl = document.getElementById("giftLink");
  if (giftLinkEl) giftLinkEl.classList.toggle("is-visible", attending);

  /* bring button: always show when attending; sub-line handles fallback */
  var nudgeBtn = document.getElementById("bsNudgeBtn");
  if (nudgeBtn) nudgeBtn.style.display = attending ? "" : "none";
}

function resetForm() {
  if (form) form.reset();
  setKidsCount(1);
  updateConditionalFields();
  if (rsvpSuccess) rsvpSuccess.classList.remove("is-visible");
  if (form)        form.classList.remove("is-hidden");
  if (rsvpCard)    rsvpCard.classList.remove("success-attending", "success-declined");
}

if (attendanceSelect)    attendanceSelect.addEventListener("change", updateConditionalFields);
if (bringShareCheckbox)  bringShareCheckbox.addEventListener("change", function() {
  if (bringShareRow) bringShareRow.classList.toggle("is-hidden", !bringShareCheckbox.checked);
});
if (kidsMinus)        kidsMinus.addEventListener("click", function() { setKidsCount(Number(kidsCount.value) - 1); });
if (kidsPlus)         kidsPlus.addEventListener("click",  function() { setKidsCount(Number(kidsCount.value) + 1); });
if (newRsvpBtn) newRsvpBtn.addEventListener("click", function(e) { e.preventDefault(); resetForm(); });

updateConditionalFields();

if (form) {
  form.addEventListener("submit", async function(e) {
    e.preventDefault();
    var fd      = new FormData(form);
    var data    = Object.fromEntries(fd.entries());
    var attending = data.attendance === "Yes";

    var selectedSeats = attending ? Math.max(1, Number(data.seats_count || 1)) : 0;

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

    var payload = {
      timestamp:       new Date().toISOString(),
      guest_code:      getGuestCode(),
      first_name:      data.first_name      || "",
      last_name:       data.last_name       || "",
      name:            ((data.first_name || "") + " " + (data.last_name || "")).trim(),
      email:           data.email           || "",
      phone:           data.phone           || "",
      attendance:      data.attendance      || "",
      join_bring_share: attending && fd.has("bring_share") ? "Yes" : "No",
      seats:           attending ? String(selectedSeats) : "0",
      bring_and_share: attending ? (data.bring_and_share || "") : "",
      message:         data.message         || ""
    };

    try {
      await fetch(scriptUrl, {
        method: "POST", mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (rsvpStatus) rsvpStatus.textContent = "";
      var wantsBringShare = attending && bringShareCheckbox && bringShareCheckbox.checked;
      /* Capture name BEFORE reset so modal can pre-fill it */
      var rsvpFirstName = (form.querySelector('[name="first_name"]') || {}).value || "";
      var rsvpLastName  = (form.querySelector('[name="last_name"]')  || {}).value || "";
      form.reset();
      setKidsCount(0);
      updateConditionalFields();
      showSuccessScreen(attending, fd);
      if (wantsBringShare) {
        var prefill = (rsvpFirstName + " " + rsvpLastName).trim();
        setTimeout(function() { openBringShare(prefill); }, 500);
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

/* bsNudgeBtn is now a direct <a> link to Google Form - no JS needed */

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
    sheet:          "BringShare",
    full_name:      name.value.trim(),
    phone:          phone.value.trim(),
    what_bringing:  document.getElementById("bs_what").value.trim(),
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
   Single:  ?name=Anna           or  ?p1=Anna
   Couple:  ?p1=Anna&p2=Lars     (seat default: 2)
   Family:  ?name=The+Müllers&seats=4
   ─────────────────────────────────────────────────────────── */
(function() {
  var params = new URLSearchParams(window.location.search);
  var p1     = (params.get('p1')    || '').trim();
  var p2     = (params.get('p2')    || '').trim();
  var name   = (params.get('name')  || '').trim();
  var seats  = parseInt(params.get('seats') || '0', 10);

  var displayName = '';
  var prefillFirst = '';
  var prefillLast  = '';

  if (p1 && p2) {
    // Couple via ?p1=Anna&p2=Lars
    displayName  = p1 + ' & ' + p2;
    prefillFirst = p1;
    if (!seats) seats = 2;
  } else if (p1) {
    // Single via ?p1=Anna
    displayName  = p1;
    prefillFirst = p1;
    if (!seats) seats = 1;
  } else if (name) {
    // Generic via ?name=Anna+Müller
    var parts = name.split(/\s+/);
    prefillFirst = parts[0] || '';
    prefillLast  = parts.slice(1).join(' ');
    displayName  = name;
    if (!seats) seats = 1;
  }

  if (!displayName) return;

  // Pre-fill name fields
  var firstField = document.querySelector('[name="first_name"]');
  var lastField  = document.querySelector('[name="last_name"]');
  if (firstField && prefillFirst) firstField.value = prefillFirst;
  if (lastField  && prefillLast)  lastField.value  = prefillLast;

  // Default seat count
  if (seats >= 1) setKidsCount(seats);

  // Insert greeting box
  var rsvpH2 = document.querySelector('.rsvp-card h2');
  if (rsvpH2 && !document.getElementById('rsvp-greeting')) {
    var greeting = document.createElement('p');
    greeting.id = 'rsvp-greeting';
    greeting.className = 'rsvp-greeting';
    greeting.textContent = 'Dear ' + displayName + ', we\u2019d love to have you there.';
    rsvpH2.insertAdjacentElement('afterend', greeting);
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
