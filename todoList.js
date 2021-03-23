const todoListContainer = document.getElementById("todoListContainer");

const saveTodo = () => {
    debugger;
}

const makeTodo = (time) => {
    let todoNode = document.createElement("div");

    todoNode.setAttribute("id", "todoTime"+time);

    // 시간별 todo 노드
    let timeNode = document.createElement("div");
    let timeText = document.createTextNode(time + "시  :  ");

    timeNode.style.margin = "0";
    timeNode.style.width = "auto%";
    timeNode.style.marginRight ="10px";
    timeNode.style.float = "left";

    
    let todoInput = document.createElement("input");

    let saveBtn = document.createElement("button");
    let btnText = document.createTextNode("Save");
    saveBtn.appendChild(btnText);

    timeNode.appendChild(timeText);
    
    todoNode.appendChild(timeNode);
    todoNode.appendChild(todoInput);
    todoNode.appendChild(saveBtn);

    // 부모 컨테이너에 붙이기
    document.getElementById("listForm").appendChild(todoNode);
}

const makeList = () => {
    const newForm = document.createElement("form");
    newForm.id = "listForm";

    todoListContainer.appendChild(newForm);

    newForm.addEventListener("submit", function(){
        saveTodo();
    })

    for(var i = 0; i < 24; i++){
        makeTodo(i);
    }
}

makeList();