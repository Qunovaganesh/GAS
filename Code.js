function doGet() {
  return HtmlService.createHtmlOutputFromFile('New'); // make sure your HTML file is named 'New'
}

function saveLocation(lat, long) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form Responses 1");
  const mapLink = `https://www.google.com/maps?q=${lat},${long}`;
  const address = reverseGeocode(lat, long);

  sheet.appendRow([
    new Date(), '', '', '', '', mapLink, address
  ]);
}

function reverseGeocode(lat, long) {
  const response = Maps.newGeocoder().reverseGeocode(lat, long);
  if (response.status === 'OK' && response.results.length > 0) {
    return response.results[0].formatted_address;
  }
  return "Unknown Area";
}
