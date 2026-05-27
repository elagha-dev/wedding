/* ============================================================
   lang-apply.js — Applies i18n translations to the DOM.
   Runs after script.js. Uses window.t() from i18n.js.
   ============================================================ */

(function () {

  /* ── Highlight active lang button + wire clicks ── */
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

  /* If language is English, nothing to translate */
  if (window.__LANG === 'en') return;

  /* ── 1. Translate all [data-i18n] spans/elements ── */
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var key = el.getAttribute('data-i18n');
    var val = t(key);
    if (typeof val === 'string') el.textContent = val;
  });

  /* ── 2. Translate all [data-i18n-ph] placeholders ── */
  document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
    var key = el.getAttribute('data-i18n-ph');
    el.placeholder = t(key);
  });

  /* ── 3. card04 label/title — depends on party invite flag ── */
  var c04label = document.getElementById('card04Label');
  var c04title = document.getElementById('card04Title');
  if (c04label) {
    var span04l = c04label.querySelector('[data-i18n]') || c04label;
    span04l.textContent = t(window.__inviteParty ? 'card04LabelParty' : 'card04Label');
  }
  if (c04title) {
    var span04t = c04title.querySelector('[data-i18n]') || c04title;
    span04t.textContent = t(window.__inviteParty ? 'card04TitleParty' : 'card04Title');
  }

  /* ── 4. Translate sticky RSVP banner (created dynamically by script.js) ── */
  function translateBanner() {
    var bannerText = document.getElementById('rsvpBannerText');
    var bannerBtn  = document.getElementById('rsvpBannerBtn');
    if (bannerText) bannerText.textContent = t('bannerText');
    if (bannerBtn)  bannerBtn.textContent  = t('bannerBtn');
  }
  /* Try immediately and again after short delay (banner injected by script.js) */
  translateBanner();
  setTimeout(translateBanner, 150);

  /* ── 5. Translate the RSVP Begin button text ── */
  var beginBtn = document.getElementById('rsvpBeginBtn');
  if (beginBtn) {
    var beginSpan = beginBtn.querySelector('[data-i18n]') || beginBtn;
    beginSpan.textContent = t('rsvpBeginBtn');
  }

  /* ── 6. Translate wizard Next/Back/Submit buttons ── */
  ['wNext1','wNext2'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) { var sp = el.querySelector('[data-i18n]') || el; sp.textContent = t('nextBtn'); }
  });
  ['wBack2','wBack3'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) { var sp = el.querySelector('[data-i18n]') || el; sp.textContent = t('backBtn'); }
  });
  var wSubmit = document.getElementById('wSubmit');
  if (wSubmit) { var sp = wSubmit.querySelector('[data-i18n]') || wSubmit; sp.textContent = t('sendRsvpBtn'); }

  /* ── 7. Bring & Share modal next/back/submit/close buttons ── */
  ['bsNext1','bsNext2'].forEach(function(id) {
    var el = document.getElementById(id); if (el) el.textContent = t('nextBtn');
  });
  ['bsBack2','bsBack3'].forEach(function(id) {
    var el = document.getElementById(id); if (el) el.textContent = t('backBtn');
  });
  var bsSubmit = document.getElementById('bsSubmit');
  if (bsSubmit) bsSubmit.textContent = t('sendRsvpBtn');
  var bsDone = document.getElementById('bsDone');
  if (bsDone) bsDone.textContent = t('bsClose');

  /* ── 8. Party modal next/back/close buttons ── */
  var partyNext1 = document.getElementById('partyNext1');
  if (partyNext1) partyNext1.textContent = t('nextBtn');
  var partyBack2 = document.getElementById('partyBack2');
  if (partyBack2) partyBack2.textContent = t('backBtn');
  var partyNext2 = document.getElementById('partyNext2');
  if (partyNext2) partyNext2.textContent = t('sendRsvpBtn');
  ['partyDone','partyDoneDeclined'].forEach(function(id) {
    var el = document.getElementById(id); if (el) el.textContent = t('bsClose');
  });

  /* ── 9. Patch the personalized greeting injected by script.js ── */
  /* script.js now calls t('greetingDear'), t('greetingLetterParty'), t('crewNote')
     so we only need a fallback observer in case it ran before i18n loaded */
  var rsvpIntro = document.getElementById('rsvpIntro');
  if (rsvpIntro) {
    function patchGreeting() {
      var nameSpan = rsvpIntro.querySelector('.rsvp-greeting-name');
      if (nameSpan) {
        /* Re-prefix with correct "Dear/Liebe/Дорогие" */
        var raw = nameSpan.textContent;
        /* raw looks like "Dear Elnur," or "Liebe Elnur," — replace the prefix */
        var comma = raw.lastIndexOf(',');
        if (comma !== -1) {
          var guestName = raw.substring(raw.indexOf(' ') + 1, comma);
          nameSpan.textContent = t('greetingDear') + ' ' + guestName + ',';
        }
      }
      var noteEl = rsvpIntro.querySelector('.rsvp-intro-note');
      if (noteEl) noteEl.textContent = t('crewNote');

      var letterDiv = rsvpIntro.querySelector('.rsvp-greeting-letter');
      if (letterDiv) {
        letterDiv.innerHTML = window.__inviteParty
          ? t('greetingLetterParty')
          : t('greetingLetterCeremony');
      }
    }
    patchGreeting();
    /* Also watch for late injection */
    var obs = new MutationObserver(function() { patchGreeting(); });
    obs.observe(rsvpIntro, { childList: true, subtree: true });
    setTimeout(function() { patchGreeting(); obs.disconnect(); }, 600);
  }

  /* ── 10. Success overlay (shown on RSVP submit — patch showSuccessScreen) ── */
  var _origShow = window.showSuccessScreen;
  window.showSuccessScreen = function(attending) {
    _origShow && _origShow(attending);
    var sk = document.getElementById('successKicker');
    if (sk) { var sp = sk.querySelector('[data-i18n]') || sk; sp.textContent = t('successKicker'); }
    var st = document.getElementById('successTitle');
    if (st) { var sp = st.querySelector('[data-i18n]') || st; sp.textContent = t(attending ? 'successTitleAttending' : 'successTitleDecline'); }
    var sm = document.getElementById('successMessage');
    if (sm) { var sp = sm.querySelector('[data-i18n]') || sm; sp.textContent = t(attending ? 'successMsgAttending' : 'successMsgDecline'); }
    /* gift banner */
    var gbTitle = document.querySelector('.gift-banner-title');
    if (gbTitle) { var sp = gbTitle.querySelector('[data-i18n]') || gbTitle; sp.textContent = t('giftBannerTitle'); }
    var gbBody = document.querySelector('.gift-banner-body');
    if (gbBody) { var sp = gbBody.querySelector('[data-i18n]') || gbBody; sp.textContent = t('giftBannerBody'); }
    var gbPaypal = document.getElementById('giftPaypalLink');
    if (gbPaypal) { var sp = gbPaypal.querySelector('[data-i18n]') || gbPaypal; sp.textContent = t('giftPaypalBtn'); }
    var gbNote = document.getElementById('giftBannerNote');
    if (gbNote) gbNote.textContent = t(window.__inviteParty && attending ? 'giftNoteParty' : 'giftNoteCeremony');
    var nrb = document.getElementById('newRsvpBtn');
    if (nrb) { var sp = nrb.querySelector('[data-i18n]') || nrb; sp.textContent = t('submitAnotherRsvp'); }
  };

  /* ── 11. Translate agenda "View on Map" links (rendered by script.js) ── */
  document.querySelectorAll('.agenda-map-link').forEach(function(a) {
    a.textContent = t('viewOnMap');
  });
  /* Also patch after a tick in case script.js runs concurrently */
  setTimeout(function() {
    document.querySelectorAll('.agenda-map-link').forEach(function(a) {
      a.textContent = t('viewOnMap');
    });
  }, 50);

  /* ── 12. Translate in-card thank you (shown after submit) ── */
  var rsvpCardThanksMsg = document.getElementById('rsvpCardThanksMsg');
  if (rsvpCardThanksMsg) {
    /* This is set dynamically; patch showSuccessScreen already covers it */
  }


/* ── 13. Lang bar position: drop to bottom: 18px when RSVP banner hides ── */
(function() {
  var langBar = document.getElementById('langBar');
  if (!langBar) return;
  function syncLangBarPos() {
    var banner = document.getElementById('rsvpBanner');
    var bannerVisible = banner && banner.style.display !== 'none' && getComputedStyle(banner).display !== 'none';
    if (window.innerWidth <= 920) {
      langBar.style.bottom = bannerVisible ? '74px' : '18px';
    } else {
      langBar.style.bottom = '18px';
    }
  }
  /* Run now and observe banner visibility changes */
  syncLangBarPos();
  var bannerEl = document.getElementById('rsvpBanner');
  if (bannerEl) {
    new MutationObserver(syncLangBarPos).observe(bannerEl, { attributes: true, attributeFilter: ['style'] });
  }
  window.addEventListener('resize', syncLangBarPos);
})();

})();
