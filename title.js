const titleContainer = document.getElementById("titleContainer");

let Today = new Date();
let Year = Today.toDateString().slice(11,15);
let Month = Today.toDateString().slice(4,7);
let Day = Today.toDateString().slice(8,10);

// 매달 마지막 날
let LastDay = new Date(Today.getYear(), Today.getMonth()+1,0).toDateString().slice(8,10);

// 렌더시 오늘날짜를 day 변수에 지정
setDay(Today.getDate());

const timeElement = document.createElement("h1");
const timeText = document.createTextNode("Today : " + Year + " - " + Month + " - " + Day);

timeElement.appendChild(timeText);

let clock = document.createElement("h3");
let clockText = document.createTextNode("Now : " + Today.getHours() + "시 " + Today.getMinutes() + "분 " + Today.getSeconds());
clock.appendChild(clockText);


titleContainer.appendChild(timeElement);
titleContainer.appendChild(clock);

setInterval(() => {
    let time = new Date();
    clockText = document.createTextNode(time.getHours() + "시 " + time.getMinutes() + "분 " + time.getSeconds());
    clock.textContent = "";
    clock.appendChild(clockText);
}, 1000);

// 일별 만들기
const makeDayList = (lastDay) => {
    const daysContainer = document.createElement("div");

    for(let i = 0; i < lastDay; i++){
        let day = document.createElement("a");
        let dayTxt = document.createTextNode("  " + (i+1) + "일  ");
        day.append(dayTxt);

        // 일 클릭시 그 날짜의 할일을 보여줌
        day.addEventListener("click", function(){

            // 스타일 바꾸기
            for(aTag of document.getElementsByTagName("a")){
                aTag.style.fontWeight = "";
            }
            day.style.fontWeight = "bold";

            // input값 바꾸기
            let inputs = document.getElementsByTagName("input");
            let numberTxt = day.text.replace(/[^0-9]/g, "");
            let clickDayTodos = localStorage.getItem("Day"+numberTxt);
            
            for(input of inputs){
                let intId = Number.parseInt(input.id.replace(/[^0-9]/g, ""));
                // 선택한 날짜에 todo가 있고, 자기 시간에 맞는 todo가 있으면 그값으로 넣어줌
                if(clickDayTodos !== null && JSON.parse(clickDayTodos)[intId] !== undefined){
                    input.value = JSON.parse(clickDayTodos)[intId][intId+"todo"].value;
                }else{
                    input.value = "";
                }                
            }

            //day값 바꿔주기
            setDay(numberTxt);
        }.bind(this));

        // 마우스 올라왔을때 bold
        // day.addEventListener("mouseover", function(){
        //     day.style.fontWeight = "bold";
        // });

        // // 포커스가 나가면 bold 해제
        // day.addEventListener("mouseout", function(){
        //     day.style.fontWeight = "";
        // })
        
        day.style.cursor = "pointer";

        daysContainer.appendChild(day);
    }

    titleContainer.appendChild(daysContainer);
}

makeDayList(LastDay);
