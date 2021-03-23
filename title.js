const titleContainer = document.getElementById("titleContainer");

let Today = new Date().toDateString();
let Year = Today.slice(11,15);
let Month = Today.slice(4,7);
let Day = Today.slice(8,10);

const timeElement = document.createElement("h1");
const timeText = document.createTextNode(Year + " - " + Month + " - " + Day);

timeElement.appendChild(timeText);

titleContainer.appendChild(timeElement);
