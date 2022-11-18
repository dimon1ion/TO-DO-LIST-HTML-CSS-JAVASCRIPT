const filter = document.querySelector("#filter");
const buttonAdd = document.querySelector("#buttonAdd");
const tasksBlock = document.querySelector("#tasksBlock");
let beforeSort = null;

buttonAdd.addEventListener("click", () => {
    filter.removeAttribute("hidden");
    tasksBlock.classList.add("border");
    changeFilterToUp();

    let task = document.createElement("div");
    task.classList.add("task");
    
    let input = document.createElement("input");
    input.type = "text";
    input.classList.add("task__input");

    input.addEventListener("keypress", () => {
        beforeSort = null;
        changeFilterToUp();
    })

    let deleteButton = document.createElement("div");
    deleteButton.classList.add("delete_button");
    deleteButton.addEventListener("click", (event) => {
        beforeSort = null;
        changeFilterToUp();
        event.target.closest(".task").remove();
        if (tasksBlock.childElementCount == 0) {
            filter.setAttribute("hidden", "");
            tasksBlock.classList.remove("border");
        }
    });

    task.append(input, deleteButton);

    tasksBlock.prepend(task);
});

filter.addEventListener("click", () => {
    if(filter.classList.contains("up")){
        changeFilterToDown();
        sortTasksBlock();
    }
    else{
        changeFilterToUp();
        returnToPreviousViewTasksBlock();
    }
});


function sortTasksBlock(){
    beforeSort = [...tasksBlock.children];

    let str1, str2;
    let sortedElements = [...beforeSort]; 
    sortedElements.sort((a, b) => {
        str1 = a.querySelector("input").value;
        str2 = b.querySelector("input").value;
        if (str1 > str2) {
            return 1;
        }
        else if(str1 < str2){
            return -1;
        }
        return 0;
    });
    reloadTasksBlock(sortedElements);
}

function returnToPreviousViewTasksBlock() {
    if (beforeSort !== null) {
        reloadTasksBlock(beforeSort);
    }
}

function reloadTasksBlock(htmlCollection) {
    tasksBlock.innerHTML = "";
    tasksBlock.append(...htmlCollection);
}

function changeFilterToUp(){
    filter.classList.remove("down");
    filter.classList.add("up");
}

function changeFilterToDown(){
    filter.classList.remove("up");
    filter.classList.add("down");
}