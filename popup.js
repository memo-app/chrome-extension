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
//document.getElementById('sampleSecond').addEventListener('click', setAlarm);
//document.getElementById('15min').addEventListener('click', setAlarm);
//document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);

function postData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkQXQiOiIyMDE4LTAzLTE1VDIyOjI2OjA1Ljk4NloiLCJsb2dpbnMiOnsiZmFjZWJvb2siOnt9LCJnb29nbGUiOnt9fSwiX2lkIjoiNWFhYWYyZmRiODMxNWQyMTUzOTVkMDhiIiwidXNlcm5hbWUiOiJOZWtvSW1lIiwicGFzc3dvcmQiOiIkMmEkMTAkdmFaOWJZZTR0WTRCbkdmM244OXpKdVdEdjZjMG53Snp1NDZsVldkaUZCb2Zab3FSMVQ2UzIiLCJfX3YiOjAsImlhdCI6MTUyMjc3MDA1Mn0.jwUaC9yM9CphdOOnipx3X0EFvtdjApyGbIilFOaP2wk',//token
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
document.getElementById("drop").addEventListener('click', myFunction);
document.getElementById("CategoryInput").addEventListener("keyup", filterFunction);
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
  document.getElementById("myDropdown").classList.toggle('show');
}

function filterFunction() {
  
  var input, filter, ul, li, a, i;
  input = document.getElementById("CategoryInput");
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

  if (!event.target.matches('.dropbtn') && !event.target.matches('.CategoryInput') ) {

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




