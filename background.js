// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


'use strict';

chrome.alarms.onAlarm.addListener(function() {
  chrome.browserAction.setBadgeText({text: ''});
  chrome.notifications.create({
      type:     'basic',
      iconUrl:  'slon.png',
      title:    'Memo reminder',
      message:  'You saved this link minutes ago.',
      priority: 0});
});

chrome.notifications.onButtonClicked.addListener(function() {
  chrome.storage.sync.get(['minutes'], function(item) {
    chrome.browserAction.setBadgeText({text: 'ON'});
    chrome.alarms.create({delayInMinutes: item.minutes});
  });
});
var myURL = "about:blank"; // A default url just in case below code doesn't work
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) { // onUpdated should fire when the selected tab is changed or a link is clicked 
    chrome.tabs.getSelected(null, function(tab) {
        myURL = tab.url;
    });
});
