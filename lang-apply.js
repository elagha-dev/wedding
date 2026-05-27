/* ============================================================
   lang-apply.js — Applies i18n translations to DOM after
   script.js has rendered all content. Runs last.
   ============================================================ */

(function () {
  /* ── Highlight active lang button ─── */
  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.classList.toggle('is-active', btn.dataset.lang === window.__LANG);
    btn.addEventListener('click', function () {
      var l = btn.dataset.lang;
      if (l === window.__LANG) return;
      var url = new URL(window.location.href);
      url.searchParams.set('lang', l);
      window.location.href = url.toString();
    });
  });

  /* ── Helper: set text or innerHTML ─── */
  function setText(id, key) {
    var el = document.getElementById(id);
    if (el) el.textContent = t(key);
  }
  function setHTML(id, key) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = t(key);
  }
  function setAttr(id, attr, key) {
    var el = document.getElementById(id);
    if (el) el.setAttribute(attr, t(key));
  }
  function setQS(sel, key, html) {
    var el = document.querySelector(sel);
    if (!el) return;
    if (html) el.innerHTML = t(key); else el.textContent = t(key);
  }

  /* ── Card labels / titles ─────────────────────────────── */
  // Card 01
  setQS('.rsvp-card .topline .label', 'card01Label');
  setQS('.rsvp-card h2', 'card01Title');
  // Card 02
  setQS('.story-card .topline .label', 'card02Label');
  setQS('.story-card h2', 'card02Title');
  // Card 03
  setQS('.wedding-party-card .party-topline .label', 'card03Label');
  setQS('.wedding-party-card .party-title', 'card03Title');
  // Card 04 — only if script.js hasn't already set party variant
  var c04label = document.getElementById('card04Label');
  var c04title = document.getElementById('card04Title');
  if (c04label) c04label.textContent = t(window.__inviteParty ? 'card04LabelParty' : 'card04Label');
  if (c04title) c04title.textContent = t(window.__inviteParty ? 'card04TitleParty' : 'card04Title');
  // Card 05
  setQS('.dress-code-card .topline .label', 'card05Label');
  setQS('.dress-code-card h2', 'card05Title');
  // Card 06
  setQS('.faq-card .topline .label', 'card06Label');
  setQS('.faq-card h2', 'card06Title');

  /* ── Crew role labels ───────────────────────────────── */
  var roles = document.querySelectorAll('.party-role');
  if (roles[0]) roles[0].textContent = t('roleGroomSide');
  if (roles[1]) roles[1].textContent = t('roleBrideSide');
  if (roles[2]) roles[2].textContent = t('rolePastorWorship');

  /* ── Countdown labels ────────────────────────────────── */
  var cdLabel = document.querySelector('.countdown-label');
  if (cdLabel) cdLabel.textContent = t('countdownLabel');
  var cdUnits = document.querySelectorAll('.countdown-unit-label');
  var cdKeys = ['countdownDays','countdownHrs','countdownMin','countdownSec'];
  cdUnits.forEach(function(el,i){ if(cdKeys[i]) el.textContent = t(cdKeys[i]); });

  /* ── Arrival notice ──────────────────────────────────── */
  var arrNotice = document.querySelector('.arrival-notice strong');
  if (arrNotice) arrNotice.textContent = t('arrivalNotice');
  var tipLine0 = document.querySelector('.tip-line');
  if (tipLine0) tipLine0.innerHTML = t('arrivalTip') + ' <strong>13:30</strong>';
  var tipBody = document.querySelector('.tip-line.tip-body-text');
  if (tipBody) tipBody.innerHTML = t('arrivalTipBody') + ' <strong>14:00</strong>';
  var tipNote = document.querySelector('.tip-line.tip-note');
  if (tipNote) tipNote.textContent = t('arrivalTipNote');

  /* ── Timeline nav ────────────────────────────────────── */
  var navCeremony = document.querySelector('a[href="#anchor-ceremony"].timeline-nav-btn');
  if (navCeremony) navCeremony.textContent = t('navCeremony');
  var navParty = document.getElementById('partyNavBtn');
  if (navParty) navParty.textContent = t('navParty');

  /* ── RSVP Begin button ───────────────────────────────── */
  var beginBtn = document.getElementById('rsvpBeginBtn');
  if (beginBtn) beginBtn.textContent = t('rsvpBeginBtn');

  /* ── Wizard step labels ──────────────────────────────── */
  var wsl = document.querySelectorAll('.wizard-step-label');
  var wslKeys = ['step1Label','step2Label','step3Label'];
  wsl.forEach(function(el,i){ if(wslKeys[i]) el.textContent = t(wslKeys[i]); });

  /* ── Step 1 field labels/placeholders ───────────────── */
  var fnInput = document.querySelector('[name="first_name"]');
  var lnInput = document.querySelector('[name="last_name"]');
  var emInput = document.querySelector('[name="email"]');
  var phInput = document.querySelector('[name="phone"]');
  if (fnInput) { fnInput.placeholder = t('firstNamePlaceholder'); var fl=fnInput.closest('.field-label'); if(fl){ var sp=fl.querySelector('span'); if(sp) sp.textContent=t('firstNameLabel'); } }
  if (lnInput) { lnInput.placeholder = t('lastNamePlaceholder');  var ll=lnInput.closest('.field-label'); if(ll){ var sp=ll.querySelector('span'); if(sp) sp.textContent=t('lastNameLabel'); } }
  if (emInput) { emInput.placeholder = t('emailPlaceholder'); var el2=emInput.closest('.field-label'); if(el2){ var sp=el2.querySelector('span'); if(sp) sp.textContent=t('emailLabel'); } }
  if (phInput) { phInput.placeholder = t('phonePlaceholder'); var pl=phInput.closest('.field-label'); if(pl){ var sp=pl.querySelector('span'); if(sp) sp.textContent=t('phoneLabel'); } }

  /* Next buttons */
  var wNext1 = document.getElementById('wNext1');
  if (wNext1) wNext1.textContent = t('nextBtn');
  var wBack2 = document.getElementById('wBack2');
  if (wBack2) wBack2.textContent = t('backBtn');
  var wNext2 = document.getElementById('wNext2');
  if (wNext2) wNext2.textContent = t('nextBtn');
  var wBack3 = document.getElementById('wBack3');
  if (wBack3) wBack3.textContent = t('backBtn');

  /* ── Step 2 attendance labels ────────────────────────── */
  var attendLabels = document.querySelectorAll('.attend-label');
  if (attendLabels[0]) attendLabels[0].textContent = t('ceremonyAttendLabel');
  if (attendLabels[1]) attendLabels[1].textContent = t('eveningAttendLabel');

  document.querySelectorAll('.attend-btn--yes').forEach(function(b){ b.textContent = t('attendingBtn'); });
  document.querySelectorAll('.attend-btn--no').forEach(function(b){ b.textContent = t('notAttendingBtn'); });

  var childrenLabel = document.getElementById('childrenLabel');
  if (childrenLabel) childrenLabel.textContent = t('childrenLabel');

  var bsRow = document.querySelector('.check-row span');
  if (bsRow) bsRow.textContent = t('bringShareLabel');

  /* ── Step 3 ──────────────────────────────────────────── */
  var seatLabel = document.querySelector('.seat-confirm-label');
  if (seatLabel) seatLabel.textContent = t('seatConfirmLabel');
  var seatHint = document.querySelector('.seat-confirm-hint');
  if (seatHint) seatHint.textContent = t('seatHint');

  var declineStepLabel = document.querySelector('#declineBlock .wizard-step-label');
  if (declineStepLabel) declineStepLabel.textContent = t('declineLabel');
  var declineMsg = document.getElementById('declineMessage');
  if (declineMsg) declineMsg.placeholder = t('declinePlaceholder');
  var wSubmit = document.getElementById('wSubmit');
  if (wSubmit) wSubmit.textContent = t('sendRsvpBtn');

  /* ── Success overlay ─────────────────────────────────── */
  var rsvpSubmittedBtn = document.getElementById('rsvpSubmittedBtn');
  if (rsvpSubmittedBtn) rsvpSubmittedBtn.textContent = t('rsvpSubmittedBtn');
  var newRsvpBtn2 = document.getElementById('newRsvpBtn2');
  if (newRsvpBtn2) newRsvpBtn2.textContent = t('submitAnotherRsvp');
  var newRsvpBtn = document.getElementById('newRsvpBtn');
  if (newRsvpBtn) newRsvpBtn.textContent = t('submitAnotherRsvp');
  var bsNudgeBtn = document.getElementById('bsNudgeBtn');
  if (bsNudgeBtn) bsNudgeBtn.textContent = t('bringShareNudge');

  /* Gift banner */
  var gbTitle = document.querySelector('.gift-banner-title');
  if (gbTitle) gbTitle.textContent = t('giftBannerTitle');
  var gbBody = document.querySelector('.gift-banner-body');
  if (gbBody) gbBody.textContent = t('giftBannerBody');
  var gbPaypal = document.getElementById('giftPaypalLink');
  if (gbPaypal) gbPaypal.textContent = t('giftPaypalBtn');

  /* ── Bring & Share modal ─────────────────────────────── */
  document.querySelectorAll('.bs-kicker').forEach(function(el){ el.textContent = t('bsKicker'); });
  var bsT1 = document.querySelector('#bsStep1 .bs-title'); if(bsT1) bsT1.textContent = t('bsStep1Title');
  var bsH1 = document.querySelector('#bsStep1 .bs-hint');  if(bsH1) bsH1.textContent = t('bsStep1Hint');
  var bsWL = document.querySelector('#bsStep1 .bs-label span'); if(bsWL) bsWL.textContent = t('bsWhatLabel');
  var bsWI = document.getElementById('bs_what'); if(bsWI) bsWI.placeholder = t('bsWhatPlaceholder');
  var bsPL = document.querySelectorAll('#bsStep1 .bs-label span')[1]; if(bsPL) bsPL.textContent = t('bsPortionsLabel');
  var bsPI = document.getElementById('bs_portions'); if(bsPI) bsPI.placeholder = t('bsPortionsPlaceholder');
  var bsSm = document.querySelector('#bsStep1 small'); if(bsSm) bsSm.textContent = t('bsPortionsSmall');
  var bsT2 = document.querySelector('#bsStep2 .bs-title'); if(bsT2) bsT2.textContent = t('bsStep2Title');
  var bsFoodLabels = document.querySelectorAll('#bsStep2 .bs-label');
  if(bsFoodLabels[0]){ var sp=bsFoodLabels[0].querySelector('span'); if(sp) sp.textContent=t('bsFoodTypeLabel'); }
  if(bsFoodLabels[1]){ var sp=bsFoodLabels[1].querySelector('span'); if(sp) sp.textContent=t('bsAllergenLabel'); }
  // Food type checkboxes
  var foodChecks = document.querySelectorAll('#bsStep2 input[name="food_type"]');
  var foodKeys = ['bsFoodVegan','bsFoodVeg','bsFoodGF','bsFoodMeat'];
  foodChecks.forEach(function(cb,i){ var sp=cb.parentElement.querySelector('span'); if(sp&&foodKeys[i]) sp.textContent=t(foodKeys[i]); });
  // Allergen checkboxes
  var allerChecks = document.querySelectorAll('#bsStep2 input[name="allergen"]');
  var allerKeys = ['bsAllergenNuts','bsAllergenHoney','bsAllergenMilk','bsAllergenEggs','bsAllergenGluten'];
  allerChecks.forEach(function(cb,i){ var sp=cb.parentElement.querySelector('span'); if(sp&&allerKeys[i]) sp.textContent=t(allerKeys[i]); });

  var bsT3 = document.querySelector('#bsStep3 .bs-title'); if(bsT3) bsT3.textContent = t('bsStep3Title');
  var bsH3 = document.querySelector('#bsStep3 .bs-hint');  if(bsH3) bsH3.textContent = t('bsStep3Hint');
  var bsNL = document.querySelector('#bsStep3 .bs-label span'); if(bsNL) bsNL.textContent = t('bsNameLabel');
  var bsNI = document.getElementById('bs_name'); if(bsNI) bsNI.placeholder = t('bsNamePlaceholder');
  var bsPL2 = document.querySelectorAll('#bsStep3 .bs-label span')[1]; if(bsPL2) bsPL2.textContent = t('bsPhoneLabel');
  var bsPhI = document.getElementById('bs_phone'); if(bsPhI) bsPhI.placeholder = t('bsPhonePlaceholder');
  var bsDK = document.querySelector('#bsStepDone .bs-kicker'); if(bsDK) bsDK.textContent = t('bsDoneKicker');
  var bsDT = document.querySelector('#bsStepDone .bs-title'); if(bsDT) bsDT.textContent = t('bsDoneTitle');
  var bsDH = document.querySelector('#bsStepDone .bs-hint'); if(bsDH) bsDH.textContent = t('bsDoneHint');
  var bsAT = document.getElementById('bsArrivalText'); if(bsAT) bsAT.innerHTML = t('bsArrivalText');
  var bsWH = document.querySelector('.bs-hint--warm'); if(bsWH) bsWH.textContent = t('bsWarmHint');
  var bsCloseBtn = document.getElementById('bsDone'); if(bsCloseBtn) bsCloseBtn.textContent = t('bsClose');

  /* ── Next/Back buttons in BS modal ──────────────────── */
  document.querySelectorAll('.bs-next:not(#bsDone)').forEach(function(b){ if(b.id!=='bsSubmit') b.textContent=t('nextBtn'); });
  document.querySelectorAll('.bs-back').forEach(function(b){ b.textContent=t('backBtn'); });

  /* ── Party modal ─────────────────────────────────────── */
  var pK = document.querySelector('#partyStep1 .bs-kicker'); if(pK) pK.textContent=t('partyKicker');
  var pT = document.querySelector('#partyStep1 .bs-title'); if(pT) pT.textContent=t('partyTitle');
  var pH = document.querySelector('#partyStep1 .bs-hint'); if(pH) pH.textContent=t('partyHint');
  var pY = document.getElementById('partyYes'); if(pY) pY.textContent=t('partyYesBtn');
  var pN = document.getElementById('partyNo');  if(pN) pN.textContent=t('partyNoBtn');

  var p2K = document.querySelector('#partyStep2 .bs-kicker'); if(p2K) p2K.textContent=t('partyStep2Kicker');
  var p2T = document.querySelector('#partyStep2 .bs-title'); if(p2T) p2T.textContent=t('partyStep2Title');
  var p2H = document.querySelector('#partyStep2 .bs-hint'); if(p2H) p2H.textContent=t('partyStep2Hint');

  var partyDietChecks = document.querySelectorAll('input[name="party_diet"]');
  var partyDietKeys = ['partyDietVegan','partyDietVeg','partyDietGF','partyDietHalal','partyDietNone'];
  partyDietChecks.forEach(function(cb,i){ var sp=cb.parentElement.querySelector('span'); if(sp&&partyDietKeys[i]) sp.textContent=t(partyDietKeys[i]); });

  var pNL = document.querySelector('#partyStep2 .bs-label span'); if(pNL) pNL.textContent=t('partyNotesLabel');
  var pNI = document.getElementById('partyNotes'); if(pNI) pNI.placeholder=t('partyNotesPlaceholder');

  var pDK = document.querySelector('#partyStepDone .bs-kicker'); if(pDK) pDK.textContent=t('partyDoneKicker');
  var pDT = document.querySelector('#partyStepDone .bs-title'); if(pDT) pDT.textContent=t('partyDoneTitle');
  var pDH = document.querySelector('#partyStepDone .bs-hint'); if(pDH) pDH.textContent=t('partyDoneHint');

  // Party venue block
  var pVenueLines = document.querySelectorAll('#partyStepDone div[style*="background"] div');
  if(pVenueLines[0]) pVenueLines[0].textContent=t('partyVenueName');
  if(pVenueLines[1]) pVenueLines[1].textContent=t('partyVenueLocation');
  if(pVenueLines[2]) pVenueLines[2].innerHTML=t('partyVenueDoors')+' <strong>17:00</strong>';
  var pMapBtn = document.querySelector('#partyStepDone a[href*="maps.google"]'); if(pMapBtn) pMapBtn.textContent=t('partyMapBtn');

  var pDecK = document.querySelector('#partyStepDeclined .bs-kicker'); if(pDecK) pDecK.textContent=t('partyDeclinedKicker');
  var pDecT = document.querySelector('#partyStepDeclined .bs-title'); if(pDecT) pDecT.textContent=t('partyDeclinedTitle');
  var pDecH = document.querySelector('#partyStepDeclined .bs-hint'); if(pDecH) pDecH.textContent=t('partyDeclinedHint');

  /* ── "View on Map" links in agenda ──────────────────── */
  document.querySelectorAll('.agenda-map-link').forEach(function(a){ a.textContent=t('viewOnMap'); });

  /* Content (story/agenda/FAQ/dressCode) is now rendered by script.js directly — no re-render needed. */

  /* ── Patch showSuccessScreen to use i18n ────────────── */
  var _origShowSuccess = window.showSuccessScreen;
  window.showSuccessScreen = function(attending) {
    _origShowSuccess && _origShowSuccess(attending);
    /* Override text with translated versions */
    var sk = document.getElementById('successKicker'); if(sk) sk.textContent = t('successKicker');
    var stEl = document.getElementById('successTitle');
    if(stEl) stEl.textContent = attending ? t('successTitleAttending') : t('successTitleDecline');
    var smEl = document.getElementById('successMessage');
    if(smEl) smEl.textContent = attending ? t('successMsgAttending') : t('successMsgDecline');
    var gbT = document.querySelector('.gift-banner-title'); if(gbT) gbT.textContent=t('giftBannerTitle');
    var gbB = document.querySelector('.gift-banner-body'); if(gbB) gbB.textContent=t('giftBannerBody');
    var gbPP = document.getElementById('giftPaypalLink'); if(gbPP) gbPP.textContent=t('giftPaypalBtn');
    var gbN = document.getElementById('giftBannerNote'); if(gbN) gbN.textContent = t(window.__inviteParty&&attending ? 'giftNoteParty' : 'giftNoteCeremony');
    var nrb = document.getElementById('newRsvpBtn'); if(nrb) nrb.textContent=t('submitAnotherRsvp');
  };


})();
