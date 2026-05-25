// ============================================================
//  Arina & Elnur Wedding — Google Apps Script  (v4 — fixed)
//  Paste into script.google.com → deploy as NEW Web App.
//
//  ⚠️  HOW TO REDEPLOY CORRECTLY:
//  1. Open script.google.com and find your project
//  2. Paste this ENTIRE file, replacing all existing code
//  3. Click "Deploy" → "New deployment"  ← MUST be NEW, not edit existing
//  4. Type: Web App | Execute as: Me | Who has access: Anyone
//  5. Click Deploy → copy the new URL
//  6. Update content.json → rsvp.googleScriptUrl with the new URL
//
//  WHY: Google Apps Script versioning means editing an existing
//  deployment does NOT update the live endpoint. Each code change
//  needs a brand new deployment URL.
//
//  Sheets auto-created on first use:
//  "RSVPs"       — ceremony attendance
//  "PartyRSVPs"  — evening party attendance + dietary
//  "BringShare"  — bring & share contributions
// ============================================================

var RSVP_SHEET_NAME        = "RSVPs";
var PARTY_SHEET_NAME       = "PartyRSVPs";
var BRING_SHARE_SHEET_NAME = "BringShare";

// ── GET: smoke-test — visit the URL in a browser to confirm it's live ──
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", version: "v4", message: "Wedding RSVP script is live." }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── POST: receives ceremony RSVPs, party RSVPs, and bring & share entries ──
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss   = SpreadsheetApp.getActiveSpreadsheet();
    var type = (data.type || "rsvp").trim().toLowerCase();

    // ── Get or create each sheet ──────────────────────────────────
    var rsvpSheet = ss.getSheetByName(RSVP_SHEET_NAME);
    if (!rsvpSheet) {
      rsvpSheet = ss.insertSheet(RSVP_SHEET_NAME);
      rsvpSheet.appendRow([
        "Timestamp","Type","Guest Code",
        "First Name","Last Name","Full Name","Guests Attending",
        "Email","Phone",
        "Ceremony Attendance","Children","Total Seats",
        "Join Bring & Share","Message",
        "Invited to Party"
      ]);
    }

    var partySheet = ss.getSheetByName(PARTY_SHEET_NAME);
    if (!partySheet) {
      partySheet = ss.insertSheet(PARTY_SHEET_NAME);
      partySheet.appendRow(["Timestamp","Name","Party Attending","Dietary","Notes"]);
    }

    var bsSheet = ss.getSheetByName(BRING_SHARE_SHEET_NAME);
    if (!bsSheet) {
      bsSheet = ss.insertSheet(BRING_SHARE_SHEET_NAME);
      bsSheet.appendRow(["Timestamp","Name","Contact","What","Portions","Food Type","Allergens"]);
    }

    // ── Route by type ─────────────────────────────────────────────
    if (type === "party_rsvp") {
      partySheet.appendRow([
        data.timestamp       || new Date().toISOString(),
        data.name            || "",
        data.party_attending || "",
        data.party_dietary   || "",
        data.party_notes     || ""
      ]);

    } else if (type === "bring_share") {
      bsSheet.appendRow([
        data.timestamp || new Date().toISOString(),
        data.name      || "",
        data.contact   || "",
        data.what      || "",
        data.portions  || "",
        data.food_type || "",
        data.allergens || ""
      ]);

    } else {
      // Standard ceremony RSVP
      rsvpSheet.appendRow([
        data.timestamp        || new Date().toISOString(),
        "rsvp",
        data.guest_code       || "",
        data.first_name       || "",
        data.last_name        || "",
        data.name             || "",
        data.guests_attending || "",
        data.email            || "",
        data.phone            || "",
        data.attendance       || "",
        data.children         || "0",
        data.seats            || "0",
        data.join_bring_share || "",
        data.message          || "",
        data.invited_to_party || "No"
      ]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok", type: type }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
