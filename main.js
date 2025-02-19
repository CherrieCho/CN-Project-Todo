//유저가 값을 입력한다
//값을 입력하고 추가버튼을 누르면 할일이 추가됨
// 유저가 삭제버튼을 누르면 할일이 삭제
//체크버튼을 누르면 할일이 끝남 상태가 되면서 밑줄이 그어짐
//진행중, 끝남 탭을 각각 누르면 언더바가 이동함
//진행중, 끝남 탭을 누르면 각각 그 상태인 할일들만 나옴
//전체탭을 누르면 전체아이템 보여주기

let tasks = [];
const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");



addButton.addEventListener("click", addTask);



function addTask(event) {
  event.preventDefault();
  let task = {
    id: randomIDGenerate(), //id generate 함수가 return하는 id값을 사용함
    taskContent: taskInput.value,
    isComplete: false,
  }
  tasks.push(task); //tasks 배열에 task 객체를 넣음
  console.log(task);
  render(); 
  taskInput.value = "";
}

//입력한 할일객체를 담은 tasks 배열을 화면에 그려주는 함수 render
function render() {
  let resultHTML = "";
  //체크 토글 구현
  for (let i = 0; i < tasks.length; i++) {
    if(tasks[i].isComplete == true){
      resultHTML += `    <div class="tasks">
      <div class="task-done">${tasks[i].taskContent}</div>
      <div class="buttons">
        <i class="fa-solid fa-rotate-right" style="color:rgb(44, 153, 236);" onclick="toggleComplete('${tasks[i].id}')"></i>
        <i class="fa-solid fa-trash" style="color: #ff3838;" onclick="deleteTask('${tasks[i].id}')"></i>
      </div>
    </div>`;
    } else{
      resultHTML += `          <div class="tasks">
      <div class="task-name">${tasks[i].taskContent}</div>  
      <div class="buttons">
        <i class="fa-solid fa-check" style="color: #2bee52;" onclick="toggleComplete('${tasks[i].id}')"></i>
        <i class="fa-solid fa-trash" style="color: #ff3838;" onclick="deleteTask('${tasks[i].id}')"></i>
      </div>
    </div>`;
    }
  }
  document.getElementById("list-area").innerHTML = resultHTML;
}

//togglecomplete()에서 tasks배열에 든 객체의 id값을 인수로 넣어 호출함
function toggleComplete(id){
  for(let i = 0; i < tasks.length; i++){
    if(tasks[i].id == id){
      tasks[i].isComplete = !tasks[i].isComplete;
      break;
    }
  }
  render();  //check버튼 클릭하면 toggleComplete()실행해서 할일이 컴플리트처리됨. 그러고나서 render()함수를 호출해서 취소선을 화면에 그려줘야함
}

function deleteTask(id){
  for(let i = 0; i < tasks.length; i++){
    if(tasks[i].id == id){
      tasks.splice(i, 1);
      break;
    }
  }
  render(); //배열에서 삭제된 걸 화면에 나타내줘야 하기때문임
}

//각 task에게 부여할 랜덤한 id값 생성
function randomIDGenerate(){
  return '_' + Math.random().toString(36).substring(2, 9);
}

