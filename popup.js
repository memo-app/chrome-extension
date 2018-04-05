'use strict';

// ALARM

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

// APP LAUNCH

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


  // ovo se poziva kad se dobiju podatci o kategorijama sa stranice
  function createCategory(data) {
    // Ovdje ostvarujemo poveznicu s popup.html dijelom u kojem smo definirali apps koristimo
    //var category = document.getElementById('dropdown_items');
    var dropdown = document.getElementById('myDropdown');
    for (var i = 0; i < data.length; i++) {
      var cat = document.createElement('a');
      var categoryName = data[i];
      cat.href = '#'+categoryName;
      cat.id = categoryName;
      cat.className = categoryName;
      cat.innerHTML = categoryName;
      dropdown.appendChild(cat)
      }
  }    


  function CreateAppDisplay() {
    
    // Ovdje ostvarujemo poveznicu s popup.html dijelom u kojem smo definirali apps koristimo
    var appsDiv = document.getElementById('apps');
      // Empty the current content.
    appsDiv.innerHTML = '';
    addApp(appsDiv);
  }


// POST DATA

function postData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkQXQiOiIyMDE4LTA0LTAzVDE4OjIyOjQxLjQ4OFoiLCJsb2dpbnMiOnsiZmFjZWJvb2siOnt9LCJnb29nbGUiOnt9fSwiX2lkIjoiNWFjM2M2NzE2ODU3MzcxMzFmNjg2ODViIiwidXNlcm5hbWUiOiJtYW1hIiwicGFzc3dvcmQiOiIkMmEkMTAkSEJwV1B3ZS5XUHRDa3UuSGNzNVJKT0JPYzVlOUUxNnZGWURxSERudi9VOUt6RHVwSjlPWksiLCJfX3YiOjAsImlhdCI6MTUyMjkzNjI4Mn0.CNGo3kOn531Ow1O6NAZ1x1JtxuL1dI7v0Kbay7rSOd8',//token
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

// GET DATA

function getData(url) {
  // Default options are marked with *
  return fetch(url, { // must match 'Content-Type' header
    cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
    //credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkQXQiOiIyMDE4LTA0LTAzVDE4OjIyOjQxLjQ4OFoiLCJsb2dpbnMiOnsiZmFjZWJvb2siOnt9LCJnb29nbGUiOnt9fSwiX2lkIjoiNWFjM2M2NzE2ODU3MzcxMzFmNjg2ODViIiwidXNlcm5hbWUiOiJtYW1hIiwicGFzc3dvcmQiOiIkMmEkMTAkSEJwV1B3ZS5XUHRDa3UuSGNzNVJKT0JPYzVlOUUxNnZGWURxSERudi9VOUt6RHVwSjlPWksiLCJfX3YiOjAsImlhdCI6MTUyMjkzNjI4Mn0.CNGo3kOn531Ow1O6NAZ1x1JtxuL1dI7v0Kbay7rSOd8',//token
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

// LINK

function GetCurrentLink(){
  document.getElementById("link").value= chrome.extension.getBackgroundPage().myURL
}

// CATEGORY

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

function choiceCategory(category) {
  document.getElementById("category").value=category
}


function displayDropdown() {
  var dropdowns = document.getElementsByClassName("dropdown-content");
  console.log(dropdowns);
  for (var i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (!(openDropdown.classList.contains('show'))) {
      openDropdown.classList.add('show');
    }
  }
}

// SAVE 

function SaveFunction(){
  var ourCategory = document.getElementById("category").value;
  var ourLink = document.getElementById("link").value
  var ourTitle = document.getElementById("title").value 
  var ourDescritption = document.getElementById("description").value

  postData(' https://memoapp.net/api/memos', {link: ourLink, title:ourTitle, description:ourDescritption, categories: [ourCategory]})
  .then(data => console.log(data)) // JSON from `response.json()` call
  .catch(error => console.error(error))
}

 // Initalize the popup window.
 //ovdje definiramo da kod otvaranja te nase ekstenzije onda se stvori link na stranicu
document.addEventListener('DOMContentLoaded', CreateAppDisplay());
document.addEventListener('DOMContentLoaded',  GetCurrentLink);

/* When the user clicks on the button*/
// ovdje definiramo da kada se kline na button definiran u popup.html-u da se pozove funkcija
//An Alarm delay of less than the minimum 1 minute will fire
// in approximately 1 minute incriments if released
document.getElementById('Remember').addEventListener('click', setAlarm);
document.getElementById('RememberNot').addEventListener('click', clearAlarm);
document.getElementById("category").addEventListener("keydown", displayDropdown);
document.getElementById("category").addEventListener("keyup",  filterFunction);
document.getElementById('Save').addEventListener('click', SaveFunction)


// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  
  var myDropdown = document.getElementById("myDropdown");
  if (typeof myDropdown != 'undefined'){
    var dropdown = document.getElementById('myDropdown');
    for (var i = 0; i < myDropdown.children.length; i++) {
      var currentCategory = myDropdown.children[i];
      if (event.target.matches("."+currentCategory.id) ) {
        document.getElementById(currentCategory.id).addEventListener('click', choiceCategory(currentCategory.id));
      }
      }    
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


// TODO: NOT DONE YET

var DataS
function GetAll(){
  getData(' https://memoapp.net/api/categories', {})
  .then(data => {console.log(data),DataS=(data), createCategory(DataS.data)})//,console.log(data)) // JSON from `response.json()` call
  .catch(error => console.error(error))
}

function LOGIN(){

  postData(' https://memoapp.net/api/users/login', {username: "mama", password:"tata"})
  .then(data =>{ console.log(data), console.log("a sta da radim")}) // JSON from `response.json()` call
  .catch(error => console.error(error))
}
//appi/users/login
//document.addEventListener('DOMContentLoaded', LOGIN());
document.addEventListener('DOMContentLoaded', GetAll());




