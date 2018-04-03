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
document.getElementById('Remember').addEventListener('click', setAlarm);
document.getElementById('RememberNot').addEventListener('click', clearAlarm);


function postData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkQXQiOiIyMDE4LTAzLTE1VDIyOjI2OjA1Ljk4NloiLCJsb2dpbnMiOnsiZmFjZWJvb2siOnt9LCJnb29nbGUiOnt9fSwiX2lkIjoiNWFhYWYyZmRiODMxNWQyMTUzOTVkMDhiIiwidXNlcm5hbWUiOiJOZWtvSW1lIiwicGFzc3dvcmQiOiIkMmEkMTAkdmFaOWJZZTR0WTRCbkdmM244OXpKdVdEdjZjMG53Snp1NDZsVldkaUZCb2Zab3FSMVQ2UzIiLCJfX3YiOjAsImlhdCI6MTUyMjc4Njg4MX0.fdrFyR3xTyyGIpQrTjiapozF0hyBLjxLgr463VpWNMM',//token
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
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */

document.getElementById("category").addEventListener("keydown", myFunction);
document.getElementById("category").addEventListener("keyup",  filterFunction);
document.getElementById('Save').addEventListener('click', SaveFunction)

function SaveFunction(){
  var ourCategory = document.getElementById("category").value;
  var ourLink = document.getElementById("link").value
  var ourTitle = document.getElementById("title").value 
  var ourDescritption = document.getElementById("description").value

  postData(' https://memoapp.net/api/memos', {link: ourLink, title:ourTitle, description:ourDescritption, categories: [ourCategory]})
  .then(data => console.log(data)) // JSON from `response.json()` call
  .catch(error => console.error(error))
}

function choiceCategory(category) {
  document.getElementById("category").value=category

}
function myFunction() {
  var dropdowns = document.getElementsByClassName("dropdown-content");
  var i;
  for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains('show')) {
      //openDropdown.classList.remove('show');
    }
    else{
      openDropdown.classList.add('show');
    }
  }
  //document.getElementById("myDropdown").style.background = "yellow"
}

function filterFunction() {
  
  var input, filter, ul, li, a, i;
  input = document.getElementById("category");
  filter = input.value.toUpperCase();
  a = document.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
      if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
          a[i].style.display = "";
      } else {
          a[i].style.display = "none";
      }
  }
}
// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  
  if (event.target.matches('.cat') ) {
    document.getElementById("cat").addEventListener('click', choiceCategory("cat"));
    
  }
  if (event.target.matches('.dog') ) {
    document.getElementById("dog").addEventListener('click', choiceCategory("dog"));
    
  }
  if (event.target.matches('.animal') ) {
    document.getElementById("animal").addEventListener('click',choiceCategory("animal"));
    
  }

  if (!event.target.matches('.category') && !event.target.matches('.CategoryInput') ) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }

}

// Copy link
function fallbackCopyTextToClipboard(text) {
  document.getElementById("link").value = text;
  
  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

}
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}
document.addEventListener('DOMContentLoaded',  function(event) {
  copyTextToClipboard(window.location.href);
});


var DataS
function GetAll(){
  getData(' https://memoapp.net/api/categories', {})
  .then(data => {console.log(data),DataS=(data)})//,console.log(data)) // JSON from `response.json()` call
  .catch(error => console.error(error))

}
//appi/users/login
document.addEventListener('DOMContentLoaded', LOGIN());
document.addEventListener('DOMContentLoaded', GetAll());
///api/categories

function LOGIN(){

  postData(' https://memoapp.net/api/users/login', {username: "NekoIme", password:"NekoIme"})
  .then(data =>{ console.log(data), console.log("a sta da radim")}) // JSON from `response.json()` call
  .catch(error => console.error(error))
}

function getData(url) {
  // Default options are marked with *
  return fetch(url, { // must match 'Content-Type' header
    cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
    //credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkQXQiOiIyMDE4LTAzLTE1VDIyOjI2OjA1Ljk4NloiLCJsb2dpbnMiOnsiZmFjZWJvb2siOnt9LCJnb29nbGUiOnt9fSwiX2lkIjoiNWFhYWYyZmRiODMxNWQyMTUzOTVkMDhiIiwidXNlcm5hbWUiOiJOZWtvSW1lIiwicGFzc3dvcmQiOiIkMmEkMTAkdmFaOWJZZTR0WTRCbkdmM244OXpKdVdEdjZjMG53Snp1NDZsVldkaUZCb2Zab3FSMVQ2UzIiLCJfX3YiOjAsImlhdCI6MTUyMjc4Njg4MX0.fdrFyR3xTyyGIpQrTjiapozF0hyBLjxLgr463VpWNMM',//token
      'Content-Type': 'application/json',
      'user-agent': 'MemoApp Chrome Extension v0.1'
    },
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    //mode: 'cors', // no-cors, cors, *same-origin
    //redirect: 'follow', // *manual, follow, error
    //referrer: 'no-referrer', // *client, no-referrer
  })
  .then(response => response.json()) // parses response to JSON
}