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
        "Guests Attending","Children","Total Seats","Join Bring & Share"
      ]);
    }

    var partySheet = ss.getSheetByName(PARTY_SHEET_NAME);
    if (!partySheet) {
      partySheet = ss.insertSheet(PARTY_SHEET_NAME);
      partySheet.appendRow(["Date & Time","Name","Party Attending","Dietary","Notes"]);
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
        data.party_notes     || ""
      ]);

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
        data.join_bring_share || ""
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
function setupSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  var sheets = [
    { name: RSVP_SHEET_NAME, headers: ["Date & Time","First Name","Last Name","Full Name","Email","Phone","Invited to Party","Ceremony Attendance","Evening Attendance","Guests Attending","Children","Total Seats","Join Bring & Share"] },
    { name: PARTY_SHEET_NAME, headers: ["Date & Time","Name","Party Attending","Dietary","Notes"] },
    { name: BRING_SHARE_SHEET_NAME, headers: ["Date & Time","Name","Contact","What","Portions","Food Type","Allergens"] }
  ];
  
  sheets.forEach(function(s) {
    var sheet = ss.getSheetByName(s.name);
    if (sheet) {
      sheet.clear();
    } else {
      sheet = ss.insertSheet(s.name);
    }
    sheet.appendRow(s.headers);
  });
}