'use strict';

function setAlarm(event) {
  let minutes = parseFloat(event.target.value);
  chrome.browserAction.setBadgeText({text: 'ON'});
  chrome.alarms.create({delayInMinutes: minutes});
  chrome.storage.sync.set({minutes: minutes});
  window.close();
}

function clearAlarm() {
  chrome.browserAction.setBadgeText({text: ''});
  chrome.alarms.clearAll();
  window.close();
}

function launchApp() {
  postData(' https://memoapp.net/api/memos', {link: "nekiLink", title:"NekiTitle", description:"NekiDeskripsn", categories: []})
  .then(data => console.log(data)) // JSON from `response.json()` call
  .catch(error => console.error(error))
  window.open("https://memoapp.net/");
  window.close(); // Only needed on OSX because of crbug.com/63594
}
  
  // Adds DOM nodes for |app| into |appsDiv|.
function addApp(appsDiv) {
    var div = document.createElement('div');
    div.className = 'app' + ' Memo_app_link';

    div.onclick = function() {
      launchApp();
    };

    var img = document.createElement('img');
    img.src = 'slon.png';
    div.appendChild(img);

    var title = document.createElement('span');
    title.className = 'app_title';
    //title.innerText = 'Memo app';
    div.appendChild(title);

    appsDiv.appendChild(div);
  }

  function CreateAppDisplay() {
    
    // Ovdje ostvarujemo poveznicu s popup.html dijelom u kojem smo definirali apps koristimo
    var appsDiv = document.getElementById('apps');
  
    // Empty the current content.
    appsDiv.innerHTML = '';
    addApp(appsDiv);
  }

  //ovdje definiramo da kod otvaranja te nase ekstenzije onda se stvori link na stranicu
  // Initalize the popup window.
document.addEventListener('DOMContentLoaded', CreateAppDisplay());

// ovdje definiramo da kada se kline na button definiran u popup.html-u da se pozove funkcija
//An Alarm delay of less than the minimum 1 minute will fire
// in approximately 1 minute incriments if released
document.getElementById('sampleSecond').addEventListener('click', setAlarm);
document.getElementById('15min').addEventListener('click', setAlarm);
document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);

function postData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkQXQiOiIyMDE4LTAzLTE1VDIyOjI2OjA1Ljk4NloiLCJfaWQiOiI1YWFhZjJmZGI4MzE1ZDIxNTM5NWQwOGIiLCJ1c2VybmFtZSI6Ik5la29JbWUiLCJwYXNzd29yZCI6IiQyYSQxMCR2YVo5YlllNHRZNEJuR2Yzbjg5ekp1V0R2NmMwbndKenU0NmxWV2RpRkJvZlpvcVIxVDZTMiIsIl9fdiI6MCwiaWF0IjoxNTIyMTY3MTUxfQ.rzDElGVPqzdUCZVMOD_h0qhBFReHQpBU716R9cShG7g',//token
      'Content-Type': 'application/json',
      'user-agent': 'MemoApp Chrome Extension v0.1'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //mode: 'cors', // no-cors, cors, *same-origin
    //redirect: 'follow', // *manual, follow, error
    //referrer: 'no-referrer', // *client, no-referrer
  })
  .then(response => response.json()) // parses response to JSON
}
