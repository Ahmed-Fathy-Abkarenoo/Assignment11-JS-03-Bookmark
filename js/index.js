var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var tableBody = document.getElementById("tableBody");
var validationAlert = document.getElementById("validationAlert");

var sitesBookmarked = JSON.parse(localStorage.getItem("sitesBookmarked")) ?? [];
displaySite(sitesBookmarked);

function addSite() {
  if (
    /^((http(s?)):\/\/)([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?\/?$/gi.test(
      siteUrl.value
    ) &&
    /^[a-zA-Z]{2,}[a-zA-Z]$/gi.test(siteName.value)
  ) {
    getInputValues();
    storeData(sitesBookmarked);
    clearInputs();
  } else {
    validationAlert.classList.add("d-block");
  }
}

function getInputValues() {
  var sites = {
    name: siteName.value,
    url: siteUrl.value,
  };
  sitesBookmarked.push(sites);
}

function displaySite(arr) {
  var valueBox = "";
  for (var i = 0; i < arr.length; i++) {
    valueBox += `
    <tr>
    <td>${i}</td>
    <td>${arr[i].name}</td>
    <td><a href="${arr[i].url}" class="btn btn-primary" target="_blank"><i class="fa-solid fa-eye"></i> Visit</a></td>
    <td><button onclick="deleteSite(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
  </tr>`;
  }

  tableBody.innerHTML = valueBox;
}

function clearInputs() {
  siteName.value = "";
  siteUrl.value = "";
  siteName.classList.remove("is-valid", "is-invalid");
  siteUrl.classList.remove("is-valid", "is-invalid");
}

function storeData(arr) {
  localStorage.setItem("sitesBookmarked", JSON.stringify(arr));
  displaySite(arr);
}

function deleteSite(index) {
  sitesBookmarked.splice(index, 1);
  storeData(sitesBookmarked);
}

function nameValidation() {
  if (/^[a-zA-Z]{2,}[a-zA-Z]$/gi.test(siteName.value)) {
    siteName.classList.remove("is-invalid");
    siteName.classList.add("is-valid");
  } else {
    siteName.classList.remove("is-valid");
    siteName.classList.add("is-invalid");
  }
}

function urlValidation() {
  if (
    /^((http(s?)):\/\/)([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?\/?$/gi.test(
      siteUrl.value
    )
  ) {
    siteUrl.classList.remove("is-invalid");
    siteUrl.classList.add("is-valid");
  } else {
    siteUrl.classList.remove("is-valid");
    siteUrl.classList.add("is-invalid");
  }
}

function closeValidationAlert() {
  validationAlert.classList.remove("d-block");
}

/**


 not include the code, this is for me 

// function visitSite(siteurl) {
//   window.open(`"${siteurl}"`, "_blank");
//   console.log(siteurl);
// }

// function storeData(arr) {
//   for (var i = 0; i < arr.length; i++) {
//     localStorage.setItem(`site-${i}`, JSON.stringify(arr[i]));
//   }
// }


  // <td><button onclick="visitSite(${arr[i].url})" class="btn btn-primary"><i class="fa-solid fa-eye"></i> Visit</button></td>



 */
