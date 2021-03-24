const todoListContainer = document.getElementById("todoListContainer");

const saveTodo = (time) => {
    const value = document.getElementById("input"+time).value;

    debugger;

    if(localStorage.getItem(time+"todo") !== null){
        localStorage.removeItem(time+"todo");
    }

    localStorage.setItem(time+"todo", value);
}

const makeTodo = (time) => {
    let todoNode = document.createElement("div");

    todoNode.id ="div" + time;

    todoNode.setAttribute("id", "todoTime"+time);

    // 시간별 todo 노드
    let timeNode = document.createElement("div");
    let timeText = document.createTextNode(time + "시  :  ");

    timeNode.style.margin = "0";
    timeNode.style.width = "auto%";
    timeNode.style.marginRight ="10px";
    timeNode.style.float = "left";

    
    let todoInput = document.createElement("input");

    todoInput.id = "input" + time;
    

    let saveBtn = document.createElement("button");
    let btnText = document.createTextNode("Save");
    saveBtn.appendChild(btnText);

    saveBtn.addEventListener("click", function(){
        saveTodo(time);
    });

    timeNode.appendChild(timeText);
    
    todoNode.appendChild(timeNode);
    todoNode.appendChild(todoInput);
    todoNode.appendChild(saveBtn);

    // 부모 컨테이너에 붙이기
    document.getElementById("todoListContainer").appendChild(todoNode);
}

const makeList = () => {
    for(var i = 0; i < 24; i++){
        makeTodo(i);
    }
}

makeList();