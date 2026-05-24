function doPost(e) {
  const ss   = SpreadsheetApp.getActiveSpreadsheet();
  const data = JSON.parse(e.postData.contents);

  if (data.sheet === "BringShare") {
    const sheet = ss.getSheetByName("BringShare");
    sheet.appendRow([
      new Date(),
      data.full_name     || "",
      data.phone         || "",
      data.what_bringing || "",
      data.portions      || "",
      data.allergens     || "",
      data.food_type     || ""
    ]);

  } else {
    const sheet = ss.getSheetByName("RSVP") || ss.getActiveSheet();
    sheet.appendRow([
      new Date(),                      // A  Timestamp
      data.guest_code        || "",    // B  Guest Code
      data.first_name        || "",    // C  First Name
      data.last_name         || "",    // D  Last Name
      data.name              || "",    // E  Full Name
      data.email             || "",    // F  Email
      data.phone             || "",    // G  Phone
      data.attendance        || "",    // H  Attendance
      data.join_bring_share  || "",    // I  Bring&Share
      data.with_kids         || "",    // J  With Kids
      data.kids_count        || "",    // K  Number of Kids
      data.message           || ""     // L  Message
    ]);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
