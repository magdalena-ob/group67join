let currentProfile;
setURL('http://gruppe-67.developerakademie.com/smallest_backend_ever');

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) { elmnt.innerHTML = this.responseText; }
          if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
  loadUserImg()
}

/**
 * This function shows the menu for mobile
 */
function showMenu() {
  document.getElementById('menu-mobile').classList.add('show-overlay-menu');
}

function closeMenu() {
  document.getElementById('menu-mobile').classList.remove('show-overlay-menu');
}

async function loadUserImg() {
  await downloadFromServer();
  currentProfile = await JSON.parse(backend.getItem('currentProfile')) || [];
  let user = await JSON.parse(backend.getItem('user')) || [];
  console.log('user :', user)
  console.log('currentProfile :', currentProfile)

  for (let i = 0; i < currentProfile.length; i++) {
    const currentUser = currentProfile[i];

    filterProfil = user.filter(t => t['userName'] == currentUser['name']);
  }

  if (filterProfil[0]['userImage']) {
    document.getElementById('userImg').src = `${filterProfil[0]['userImage']}`;
    document.getElementById('userImgMobile').src = `${filterProfil[0]['userImage']}`;
  } else {
    document.getElementById('userImg').src = `img/user.png`;
    document.getElementById('userImgMobile').src = `img/user.png`;
  }

  if (filterProfil[0]['userName']) {
    document.getElementById('userName').innerHTML = `${filterProfil[0]['userName']}`;
    document.getElementById('userNameMobile').innerHTML = `${filterProfil[0]['userName']}`;
  } else {
    document.getElementById('userName').innerHTML = 'Guest';
    document.getElementById('userNameMobile').innerHTML = 'Guest';
  }
}

function showName() {
  document.getElementById('userName').classList.remove('d-none');
}

function hideName() {
  document.getElementById('userName').classList.add('d-none');
}

function showNameMobile() {
  document.getElementById('userNameMobile').classList.remove('d-none');
}

function hideNameMobile() {
  document.getElementById('userNameMobile').classList.add('d-none');
}

/**
 * This function leads to the upload.html
 */
function openUpload() {
  window.location = "upload.html";
}


