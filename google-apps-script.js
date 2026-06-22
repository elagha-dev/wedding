// ============================================================
//  Arina & Elnur Wedding — Google Apps Script  (v8 — Completely Streamlined)
//  Paste into script.google.com → deploy as NEW Web App.
// ============================================================

var RSVP_SHEET_NAME        = "RSVPs";
var PARTY_SHEET_NAME       = "PartyRSVPs";
var BRING_SHARE_SHEET_NAME = "BringShare";

// Helper function to create a simple, clean date and time string
function getSimpleTimestamp() {
  var tz = SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone();
  return Utilities.formatDate(new Date(), tz, "yyyy-MM-dd HH:mm");
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", version: "v8", message: "Wedding RSVP script is live." }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss   = SpreadsheetApp.getActiveSpreadsheet();
    var type = (data.type || "rsvp").trim().toLowerCase();
    var currentTimestamp = getSimpleTimestamp();

    // ── Get or create each sheet ──────────────────────────────────
    var rsvpSheet = ss.getSheetByName(RSVP_SHEET_NAME);
    if (!rsvpSheet) {
      rsvpSheet = ss.insertSheet(RSVP_SHEET_NAME);
      rsvpSheet.appendRow([
        "Date & Time","First Name","Last Name","Full Name",
        "Email","Phone","Invited to Party","Ceremony Attendance","Evening Attendance",
        "Guests Attending","Children","Total Seats","Join Bring & Share","Decline Note"
      ]);
    }

    var partySheet = ss.getSheetByName(PARTY_SHEET_NAME);
    if (!partySheet) {
      partySheet = ss.insertSheet(PARTY_SHEET_NAME);
      partySheet.appendRow(["Date & Time","Name","Party Attending","Dietary","Notes","Coming by Car"]);
    }

    var bsSheet = ss.getSheetByName(BRING_SHARE_SHEET_NAME);
    if (!bsSheet) {
      bsSheet = ss.insertSheet(BRING_SHARE_SHEET_NAME);
      bsSheet.appendRow(["Date & Time","Name","Contact","What","Portions","Food Type","Allergens"]);
    }

    // ── Route by type ─────────────────────────────────────────────
    if (type === "party_rsvp") {
      partySheet.appendRow([
        currentTimestamp,
        data.name            || "",
        data.party_attending || "",
        data.party_dietary   || "",
        data.party_notes     || "",
        data.coming_by_car   || ""
      ]);

    } else if (type === "rsvp_decline_note") {
      var noteGuestName  = data.name || "";
      var noteText        = data.decline_note || "";
      var declineNoteCol  = 14; /* "Decline Note" is the 14th column on RSVPs */

      var matchedRow = -1;
      if (noteGuestName) {
        var lastRsvpRow = rsvpSheet.getLastRow();
        if (lastRsvpRow > 1) {
          /* Column D = "Full Name" — search bottom-up so we match the
             most recent RSVP from this guest, not an older one. */
          var fullNames = rsvpSheet.getRange(2, 4, lastRsvpRow - 1, 1).getValues();
          for (var j = fullNames.length - 1; j >= 0; j--) {
            if (fullNames[j][0] === noteGuestName) { matchedRow = j + 2; break; }
          }
        }
      }

      if (matchedRow > -1) {
        rsvpSheet.getRange(matchedRow, declineNoteCol).setValue(noteText);
      }

    } else if (type === "bring_share") {
      bsSheet.appendRow([
        currentTimestamp,
        data.name      || "",
        data.contact   || "",
        data.what      || "",
        data.portions  || "",
        data.food_type || "",
        data.allergens || ""
      ]);

    } else {
      // Standard ceremony RSVP
      var invitedToParty = data.invited_to_party || "No";

      // Clean data logic for Evening Attendance
      var eveningAttendance = data.party_attendance || "";
      if (invitedToParty === "No") {
        eveningAttendance = "";
      }

      rsvpSheet.appendRow([
        currentTimestamp,
        data.first_name       || "",
        data.last_name        || "",
        data.name             || "",
        data.email            || "",
        data.phone            || "",
        invitedToParty,
        data.attendance       || "",
        eveningAttendance,
        data.guests_attending || "0",
        data.children         || "0",
        data.seats            || "0",
        data.join_bring_share || "",
        data.decline_note     || ""
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

// ── SETUP: Run this manually once to force-generate your new clean headers ──
// SAFE VERSION: only creates sheets that don't exist yet and adds missing
// headers to a blank row 1. It will NEVER clear or delete existing data.
function setupSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  var sheets = [
    { name: RSVP_SHEET_NAME, headers: ["Date & Time","First Name","Last Name","Full Name","Email","Phone","Invited to Party","Ceremony Attendance","Evening Attendance","Guests Attending","Children","Total Seats","Join Bring & Share","Decline Note"] },
    { name: PARTY_SHEET_NAME, headers: ["Date & Time","Name","Party Attending","Dietary","Notes","Coming by Car"] },
    { name: BRING_SHARE_SHEET_NAME, headers: ["Date & Time","Name","Contact","What","Portions","Food Type","Allergens"] }
  ];

  sheets.forEach(function(s) {
    var sheet = ss.getSheetByName(s.name);
    if (!sheet) {
      sheet = ss.insertSheet(s.name);
      sheet.appendRow(s.headers);
    } else if (sheet.getLastRow() === 0) {
      sheet.appendRow(s.headers);
    } else {
      Logger.log('Skipped "' + s.name + '" — already has data, left untouched.');
    }
  });
}
