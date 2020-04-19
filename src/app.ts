import "firebase/database";
import "firebase/auth";
import * as firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAFoJgJdot1w5nlqLty8wBvWjtFZgSQAC8",
  authDomain: "mrbrightside-f7929.firebaseapp.com",
  databaseURL: "https://mrbrightside-f7929.firebaseio.com",
  projectId: "mrbrightside-f7929",
  storageBucket: "mrbrightside-f7929.appspot.com",
  messagingSenderId: "606184561903",
  appId: "1:606184561903:web:9b319fcf4dec1b3e5f0f1a",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let hasTimedOut = false;
const maxTimeInMillis = 5000;

function checkIfInCharts() {
  setTimeout(() => {
    hasTimedOut = true;
    document.getElementById("loading-container").style.display = "none";
    document.getElementById("results-container").style.display = "flex";
  }, maxTimeInMillis);

  firebase.auth().onAuthStateChanged(function (user) {
    if (!hasTimedOut) {
      document.getElementById("error").innerHTML = "";
      if (user) {
        // const songFolder = "songs/test/"; // LOCAL
        const songFolder = "songs/"; // PROD
        firebase
          .database()
          .ref(songFolder + "killers_mrbrightside")
          .once("value")
          .then(function (snapshot) {
            const response = snapshot.val();
            renderBasedOnResponse(response);
          });
      } else {
        // User is signed out.
        // do nothing
      }
    }
  });

  firebase
    .auth()
    .signInAnonymously()
    .catch(function (error) {
      console.log("fb", { error });
    });
}

function renderBasedOnResponse(response) {
  if (response.position !== undefined) {
    const date = new Date(0);
    date.setUTCSeconds(response.updated_at / 1000);

    document.getElementById("answer").innerHTML =
      "YES, " +
      "<a href='https://www.officialcharts.com/charts/' target='_blank'>#" +
      response.position +
      "</a>";
    document.getElementById("info").innerHTML = "";
    document.getElementById("updated_at").innerHTML =
      "Updated: " + date.toLocaleString();
  } else {
    document.getElementById("answer").innerHTML = "No";
    document.getElementById("info").innerHTML = "still a bop tho";
  }
  document.getElementById("loading-container").style.display = "none";
  document.getElementById("results-container").style.display = "flex";
}

document.addEventListener("DOMContentLoaded", checkIfInCharts);
