// ============================================================
//  Arina & Elnur Wedding — Google Apps Script
//  Paste into script.google.com → deploy as Web App.
//
//  Sheets used:
//  "RSVPs"      — main ceremony RSVPs (one row per guest/couple)
//  "PartyRSVPs" — party attendance tracked SEPARATELY
//  "BringShare" — bring & share contributions
//
//  RSVPs sheet columns:
//  A  Timestamp          B  Type
//  C  Guest Code         D  First Name       E  Last Name
//  F  Full Name          G  Guests Attending
//  H  Email              I  Phone
//  J  Ceremony Attendance  K  Children        L  Total Seats
//  M  Join Bring & Share   N  Message
//  O  Invited to Party
//
//  PartyRSVPs sheet columns:
//  A  Timestamp   B  Name   C  Party Attending   D  Dietary   E  Notes
//
//  BringShare sheet columns:
//  A  Timestamp   B  Name   C  Contact   D  What   E  Portions   F  Food Type   G  Allergens
// ============================================================

var RSVP_SHEET_NAME       = "RSVPs";
var PARTY_SHEET_NAME      = "PartyRSVPs";
var BRING_SHARE_SHEET_NAME = "BringShare";

function doPost(e) {
  try {
    var data  = JSON.parse(e.postData.contents);
    var ss    = SpreadsheetApp.getActiveSpreadsheet();
    var type  = data.type || "rsvp";

    // ── Main RSVPs sheet ──────────────────────────────────────────
    var rsvpSheet = ss.getSheetByName(RSVP_SHEET_NAME) || ss.getActiveSheet();
    if (rsvpSheet.getLastRow() === 0) {
      rsvpSheet.appendRow([
        "Timestamp","Type","Guest Code",
        "First Name","Last Name","Full Name","Guests Attending",
        "Email","Phone",
        "Ceremony Attendance","Children","Total Seats",
        "Join Bring & Share","Message",
        "Invited to Party"
      ]);
    }

    // ── Party RSVPs sheet ─────────────────────────────────────────
    var partySheet = ss.getSheetByName(PARTY_SHEET_NAME);
    if (!partySheet) {
      partySheet = ss.insertSheet(PARTY_SHEET_NAME);
      partySheet.appendRow(["Timestamp","Name","Party Attending","Dietary","Notes"]);
    }

    // ── Bring & Share sheet ───────────────────────────────────────
    var bsSheet = ss.getSheetByName(BRING_SHARE_SHEET_NAME);
    if (!bsSheet) {
      bsSheet = ss.insertSheet(BRING_SHARE_SHEET_NAME);
      bsSheet.appendRow(["Timestamp","Name","Contact","What","Portions","Food Type","Allergens"]);
    }

    // ── Route by type ─────────────────────────────────────────────

    if (type === "party_rsvp") {
      // Separate party RSVP row — goes ONLY to PartyRSVPs sheet
      partySheet.appendRow([
        data.timestamp || new Date().toISOString(),
        data.name      || "",
        data.party_attending || "",
        data.party_dietary   || "",
        data.party_notes     || ""
      ]);

    } else if (type === "bring_share") {
      // Bring & Share entry — goes ONLY to BringShare sheet
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
      // Standard ceremony RSVP — goes ONLY to RSVPs sheet
      // "Invited to Party" is a simple Yes/No flag — details are in PartyRSVPs
      rsvpSheet.appendRow([
        data.timestamp       || new Date().toISOString(),
        "rsvp",
        data.guest_code      || "",
        data.first_name      || "",
        data.last_name       || "",
        data.name            || "",
        data.guests_attending || "",
        data.email           || "",
        data.phone           || "",
        data.attendance      || "",
        data.children        || "0",
        data.seats           || "0",
        data.join_bring_share || "",
        data.message         || "",
        data.invited_to_party || "No"
      ]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({status:"ok"}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({status:"error",message:err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// HOW TO DEPLOY:
// 1. script.google.com → New project → paste this code
// 2. Deploy → New deployment → Web App
// 3. Execute as: Me  |  Access: Anyone
// 4. Copy the Web App URL → paste into content.json → rsvp.googleScriptUrl
//
// SHEETS CREATED AUTOMATICALLY:
//   RSVPs       — ceremony attendance (Invited to Party = Yes/No flag only)
//   PartyRSVPs  — separate party attendance + dietary
//   BringShare  — what guests are bringing
