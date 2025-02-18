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
  const taskContent = taskInput.value;
  tasks.push(taskContent);
  render();
}

//입력한 할일을 담은 tasks 배열을 화면에 그려주는 함수 render
function render() {
  let resultHTML = "";
  for (let task of tasks) {
    resultHTML += `          <div class="tasks">
            <div class="task-name">${task}</div>
            <div class="buttons">
              <button>check</button>
              <button>delete</button>
            </div>
          </div>`;
  }
  document.getElementById("list-area").innerHTML = resultHTML;
}
