// function checkIfInCharts() {
//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function () {
//     if (this.readyState == 4) {
//       if (this.status == 200) {
//         const reponse = JSON.parse(this.responseText);
//         if (reponse && reponse.found !== undefined) {
//           if (reponse.found && reponse.position) {
//             document.getElementById("answer").innerHTML = "YES";
//             document.getElementById("info").innerHTML =
//               "<a href='https://www.officialcharts.com/charts/' target='_blank'>Its at #" +
//               reponse.position +
//               "</a>";
//           } else {
//             document.getElementById("answer").innerHTML = "No";
//             document.getElementById("info").innerHTML = "What a bummer.";
//           }
//         }
//       }
//       document.getElementById("loading-container").style.display = "none";
//       document.getElementById("results-container").style.display = "flex";
//     }
//   };
//   xhttp.open(
//     "GET",
//     "http://127.0.0.1:8000/charts/singles?artist=Killers&title=Mr%20Brightside",
//     // "https://1uqnvk9yy3.execute-api.us-east-1.amazonaws.com/api/charts/singles?artist=Killers&title=Mr%20Brightside",
//     true
//   );
//   xhttp.send();

function checkIfInCharts() {
  console.log("checkIfInCharts");
}

document.addEventListener("DOMContentLoaded", checkIfInCharts);
