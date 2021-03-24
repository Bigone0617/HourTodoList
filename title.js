const titleContainer = document.getElementById("titleContainer");

let Today = new Date();
let Year = Today.toDateString().slice(11,15);
let Month = Today.toDateString().slice(4,7);
let Day = Today.toDateString().slice(8,10);

const timeElement = document.createElement("h1");
const timeText = document.createTextNode(Year + " - " + Month + " - " + Day);

timeElement.appendChild(timeText);

let clock = document.createElement("h3");
let clockText = document.createTextNode(Today.getHours() + "시 " + Today.getMinutes() + "분 " + Today.getSeconds());
clock.appendChild(clockText);


titleContainer.appendChild(timeElement);
titleContainer.appendChild(clock);

setInterval(() => {
    let time = new Date();
    clockText = document.createTextNode(time.getHours() + "시 " + time.getMinutes() + "분 " + time.getSeconds());
    clock.textContent = "";
    clock.appendChild(clockText);
}, 1000);
