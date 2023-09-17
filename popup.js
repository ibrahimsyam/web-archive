document.addEventListener("DOMContentLoaded", function () {
  const urlInput = document.getElementById("urlInput");
  const insertButton = document.getElementById("insertButton");

  // Get the current active tab and set its URL in the input field when the popup is opened.
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];
    if (currentTab) {
       var currentTab2 = currentTab[0];
       var url = new URL(currentTab.url);
       var domain = url.hostname;
       var parts = domain.split('.');
       var topLevelDomain = parts[parts.length - 2] + '.' + parts[parts.length - 1];
       urlInput.value = topLevelDomain;

    }
  });

  insertButton.addEventListener("click", function () {
    // Use the URL from the input field as needed.
    const urlToInsert = urlInput.value.trim();

    if (urlToInsert) {
      const newURL = `https://web.archive.org/cdx/search/cdx?url=${urlToInsert}&matchType=domain&fl=original&collapse=urlkey&output=text&filter=statuscode:200`;
      
      // Open the modified URL in a new tab.
      chrome.tabs.create({ url: newURL });
    }
  });
});
