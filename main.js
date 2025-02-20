//유저가 값을 입력한다
//값을 입력하고 추가버튼을 누르면 할일이 추가됨
// 유저가 삭제버튼을 누르면 할일이 삭제
//체크버튼을 누르면 할일이 끝남 상태가 되면서 밑줄이 그어짐
//진행중, 끝남 탭을 각각 누르면 언더바가 이동함
//진행중, 끝남 탭을 누르면 각각 그 상태인 할일들만 나옴
//전체탭을 누르면 전체아이템 보여주기

let tasks = [];
let list = [];
let filterList = [];
let mode = "all";
const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const tabs = document.querySelectorAll(".status div");
const deleteAll = document.getElementById("delete-all");
const underLine = document.getElementById("underline");

addButton.addEventListener("click", addTask);
deleteAll.addEventListener("click", deleteThemAll);

//.status 밑의 div 중에 0번째인 underline 빼고 이벤트리스너 추가
for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}
//언더바 슬라이딩
tabs.forEach((menu) => {
  if (menu.id !== "underline") {
    menu.addEventListener("click", (e) => indicator(e));
  }
});

function indicator(e) {
  //클릭한 아이템의 왼쪽 시작점(offsetLeft)부터 아이템의 width만큼 슬라이드
  underLine.style.left = e.currentTarget.offsetLeft + "px";
  underLine.style.width = e.currentTarget.offsetWidth + "px";
  underLine.style.top =
    e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}

//할일 추가
function addTask(event) {
  event.preventDefault();
  let task = {
    id: randomIDGenerate(), //id generate 함수가 return하는 id값을 사용함
    taskContent: taskInput.value,
    isComplete: false,
  };
  if (taskInput.value == "") {
    alert("내용을 입력해 주세요!");
    return;
  }
  tasks.push(task); //tasks 배열에 task 객체를 넣음
  console.log(task);
  render();
  taskInput.value = "";
}

//입력한 할일객체를 담은 tasks 배열을 화면에 그려주는  UI 업데이트 함수 render
function render() {
  //내가 선택한 탭에 따라서 리스트를 다르게 보여줌
  if (mode === "all") {
    list = tasks;
  } else if (mode === "ongoing" || mode === "done") {
    list = filterList;
  }

  //화면에 표시
  let resultHTML = "";

  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `    <div class="tasks">
      <div class="task-done">${list[i].taskContent}</div>
      <div class="buttons">
        <i class="fa-solid fa-rotate-right" style="color:rgb(44, 153, 236);" onclick="toggleComplete('${list[i].id}')"></i>
        <i class="fa-solid fa-trash" style="color: #ff3838;" onclick="deleteTask('${list[i].id}')"></i>
      </div>
    </div>`;
    } else {
      resultHTML += `          <div class="tasks">
      <div class="task-name">${list[i].taskContent}</div>
      <div class="buttons">
        <i class="fa-solid fa-check" style="color: #2bee52;" onclick="toggleComplete('${list[i].id}')"></i>
        <i class="fa-solid fa-trash" style="color: #ff3838;" onclick="deleteTask('${list[i].id}')"></i>
      </div>
    </div>`;
    }
  }
  document.getElementById("list-area").innerHTML = resultHTML;
}

//toggleComplete()에서 tasks배열에 든 객체의 id값을 인수로 넣어 호출함
function toggleComplete(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == id) {
      tasks[i].isComplete = !tasks[i].isComplete;
      break;
    }
  }
  // 모드에 맞게 filterList 업데이트
  if (mode === "ongoing") {
    filterList = tasks.filter((task) => !task.isComplete);
  } else if (mode === "done") {
    filterList = tasks.filter((task) => task.isComplete);
  }

  render(); //check버튼 클릭하면 toggleComplete()실행해서 할일이 컴플리트처리됨. 그러고나서 render()함수를 호출해서 취소선을 화면에 그려줘야함
}

function deleteTask(id) {
  if (confirm("정말 삭제할까요?")) {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id == id) {
        tasks.splice(i, 1);
        break;
      }
    }

    for (let i = 0; i < filterList.length; i++) {
      if (filterList[i].id == id) {
        filterList.splice(i, 1);
        break;
      }
    }
  }
  console.log(tasks);
  render(); //배열에서 삭제된 걸 화면에 나타내줘야 하기때문임
}

function deleteThemAll() {
  if (confirm("정말 모두 삭제할까요?")) {
    if (tasks.length === 0 && filterList.length === 0) {
      alert("삭제할 할일이 없습니다!");
      return;
    }
    tasks.splice(0, tasks.length);
    filterList.splice(0, filterList.length);
  }
  render();
}

//parameter event는 클릭이벤트가 일어난 요소에 대한 정보를 담음
function filter(event) {
  mode = event.target.id;
  filterList = [];

  if (mode === "all") {
    render();
  } else if (mode === "ongoing") {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].isComplete === false) {
        filterList.push(tasks[i]);
      }
    }
    render();
  } else if (mode === "done") {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].isComplete === true) {
        filterList.push(tasks[i]);
      }
    }
    render();
  }
  console.log(filterList);
}

//각 task에게 부여할 랜덤한 id값 생성
function randomIDGenerate() {
  return "_" + Math.random().toString(36).substring(2, 9);
}
