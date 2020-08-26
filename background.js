chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  console.log('Turning ' + tab.url + ' red!');
  /*chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red"'
  });*/
  chrome.tabs.executeScript({
    //code: 'console.log(document.getElementById("Test"));'
    
    file: 'code_for_raw_sen.js'
    
  })
});