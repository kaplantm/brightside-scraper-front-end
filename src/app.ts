function checkIfInCharts() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        const reponse = JSON.parse(this.responseText);

        if (reponse && Object.keys(reponse).indexOf("position") !== -1) {
          renderBasedOnBrightsideData(reponse);
        } else {
          displayError();
        }
      } else {
        displayError();
      }
    }
  };
  xhttp.open(
    "GET",
    "https://s3.amazonaws.com/ismrbrightsidestillintheukcharts.com/assets/brightside.json",
    // "./assets/brightside.json",
    true
  );
  xhttp.send();
}

function displayError() {
  document.getElementById("loading-container").style.display = "none";
  document.getElementById("results-container").style.display = "flex";
}

function renderBasedOnBrightsideData(brightsideData) {
  document.getElementById("error").innerHTML = "";

  const { position, updated_at } = brightsideData;
  if (brightsideData.position) {
    document.getElementById("answer").innerHTML =
      "YES, <a href='https://www.officialcharts.com/charts/' target='_blank'>#" +
      position +
      "</a>";
    document.getElementById("info").innerHTML = "";
    document.getElementById("updated_at").innerHTML =
      "Updated: " + getFormattedDateFromEpochTime(updated_at);
  } else {
    document.getElementById("answer").innerHTML = "No";
    document.getElementById("info").innerHTML = "still a bop tho";
  }
  document.getElementById("loading-container").style.display = "none";
  document.getElementById("results-container").style.display = "flex";
}

function getFormattedDateFromEpochTime(updated_at) {
  const date = new Date(0);
  date.setUTCSeconds(updated_at / 1000);
  return date.toLocaleString();
}

document.addEventListener("DOMContentLoaded", checkIfInCharts);
