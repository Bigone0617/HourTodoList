const todoListContainer = document.getElementById("todoListContainer");

const saveTodo = (time, isDone) => {
    const value = document.getElementById("input"+time).value;

    if(localStorage.getItem(time+"todo") !== null){
        localStorage.removeItem(time+"todo");
    }

    localStorage.setItem(time+"todo", JSON.stringify({value : value, isDone : isDone}));
}

const setValue = (time) => {
    const values = localStorage.getItem(time+"todo");

    if(values !== null ){
        const inputBox = document.getElementById("input"+time)
        inputBox.value = JSON.parse(values).value;

        if(JSON.parse(values).isDone){
            inputBox.readOnly = true;
            inputBox.style.background = "#A9A9A9";

            document.getElementById("save"+time).hidden = true;
            document.getElementById("modify"+time).hidden = false;
        }
    }
    
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

    timeNode.appendChild(timeText);

    // input
    let todoInput = document.createElement("input");

    todoInput.id = "input" + time;
    
    // 저장 버튼
    let saveBtn = document.createElement("button");
    let btnSaveText = document.createTextNode("Save");
    saveBtn.appendChild(btnSaveText);

    saveBtn.id = "save"+time;

    saveBtn.addEventListener("click", function(){
        saveTodo(time, false);
    });

    // 완료 버튼
    let doneBtn = document.createElement("button");
    let btnDoneText = document.createTextNode("Done");
    doneBtn.appendChild(btnDoneText);

    doneBtn.id = "done"+time;

    // 수정 버튼
    let modifyBtn = document.createElement("button");
    let btnModifyText = document.createTextNode("Modify");
    modifyBtn.appendChild(btnModifyText);

    modifyBtn.id = "modify"+time;
    modifyBtn.hidden = true;

    // 완료버트 클릭
    doneBtn.addEventListener("click", function(){
        // save 버튼 숨기기
        saveBtn.hidden = true;
        
        // 인풋 막기
        todoInput.readOnly = true;
        todoInput.style.backgroundColor = "#A9A9A9";

        // 수정버튼 보이기
        modifyBtn.hidden = false;

        saveTodo(time, true);
    });

    modifyBtn.addEventListener("click", function(){
        // save 버튼 보이기
        saveBtn.hidden = false;
        
        // 인풋 입력가능하게 풀기
        todoInput.readOnly = false;
        todoInput.style.backgroundColor = null;

        // 수정버튼 숨기기
        modifyBtn.hidden = true;
    });

    
    todoNode.appendChild(timeNode);
    todoNode.appendChild(todoInput);
    todoNode.appendChild(saveBtn);
    todoNode.appendChild(doneBtn);
    todoNode.appendChild(modifyBtn);

    // 부모 컨테이너에 붙이기
    todoListContainer.appendChild(todoNode);

    // 저장된 todo가 있으면 값 넣어주기
    setValue(time);
}

const makeList = () => {
    for(var i = 0; i < 24; i++){
        makeTodo(i);
    }
}

makeList();