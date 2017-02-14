chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
  if(changeInfo.url) {
    var matched = changeInfo.url.match(/&query=([%0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힝]+)/);
    if(matched !== null) {
      chrome.storage.local.set({ 'lastQuery': decodeURI(matched[1]) });
    }
  }

});