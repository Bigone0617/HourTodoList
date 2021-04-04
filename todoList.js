const todoListContainer = document.getElementById("todoListContainer");


// 저장 버튼 = 할일 저장
const saveTodo = (time, isDone) => {
    const value = document.getElementById("input"+time).value;
    let todoId = time+"todo";
    let todoArr = [];


    if(localStorage.getItem("Day"+getDay()) !== null){
        todoArr = JSON.parse(localStorage.getItem("Day"+getDay()));
        
        // 이미 그시간에 저장되어 있는 할일있을 경우 인덱스구하기
        var overlapIndex = todoArr.findIndex((todo, index) => todo[todoId] !== undefined);

        // 이미 그 시간에 저장되어 있는 할일이 있으면 바꿔치기
        if(overlapIndex !== -1){
            todoArr[overlapIndex] = {
                [todoId] : {
                    value : value,
                    isDone : isDone
                }
            }
        }else{
            todoArr = todoArr.concat([
                {[todoId] : {
                    value : value,
                    isDone : isDone
                }}
            ]);
        }

        
    }else{
        todoArr = [
            {[todoId] : {
                value : value,
                isDone : isDone
            }}
        ]
    };

    localStorage.setItem("Day"+getDay(), JSON.stringify(todoArr));
}

// input에 값 넣기
const setValue = (time, today) => {
    const storageValue = localStorage.getItem("Day"+today);

    if(storageValue !== null ){
        let todos = JSON.parse(storageValue);
        let timeTodo = todos.find(todo => todo[time+"todo"]);

        const inputBox = document.getElementById("input"+time)
        inputBox.value = timeTodo !== undefined ? timeTodo[time+"todo"].value : "";

        if(timeTodo !== undefined && timeTodo[time+"todo"].isDone){
            inputBox.readOnly = true;
            inputBox.style.background = "#A9A9A9";

            document.getElementById("save"+time).hidden = true;
            document.getElementById("modify"+time).hidden = false;
        }
    }
    
}

// todo ui그리기
const makeTodo = (time, today) => {
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

        saveTodo(time, false);
    });

    todoNode.appendChild(timeNode);
    todoNode.appendChild(todoInput);
    todoNode.appendChild(saveBtn);
    todoNode.appendChild(doneBtn);
    todoNode.appendChild(modifyBtn);

    // 부모 컨테이너에 붙이기
    todoListContainer.appendChild(todoNode);

    // 저장된 todo가 있으면 값 넣어주기
    setValue(time, today);
}

const makeList = () => {
    for(var i = 0; i < 24; i++){
        makeTodo(i, getDay());
    }
}

makeList();