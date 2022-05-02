const addTaskWindow = document.querySelector(".Addtask-container");
const addTaskBtn = document.querySelector(".addTaskbtn");
const form = document.querySelector(".form");
const addTaskAnchor = document.querySelector(".addtask-btn");
const selectTaskCategory = document.querySelector("#task-category");
const taskName = document.querySelector(".task-name");
const taskDesc = document.querySelector(".task-desc");
const tasksDiv = document.querySelector(".tasks");
const taskdiv = document.querySelector(".task");
const taskdivList = document.querySelectorAll(".task");
const completedTask = document.querySelector(".completed-task-span");
const quoteTitle = document.querySelector(".title");
const quoteAuthor = document.querySelector(".author");



var dataObj;
    fetch("https://type.fit/api/quotes").then(function(response){
    return response.text()
    }).then(function(data){
        // console.log(JSON.parse(data).length);
        this.dataObj = JSON.parse(data);
        // console.log(dataObj[0].text)
        
        displayQuote();
            
        
    })
    // if(ind < 1643){
    //     ind++;
    // }else{
    //     ind = 0;
    // }


function displayQuote(){
    let ind = Math.floor(Math.random()*dataObj.length);
    quoteTitle.innerHTML = `“${dataObj[ind].text}”`;
    if(!(dataObj[ind].author)){
        quoteAuthor.innerHTML = `- "Anonymous"`;
    }else{
        quoteAuthor.innerHTML = `- ${dataObj[ind].author}`;
    }
   
}

setInterval(function(){
    displayQuote();
}, 3000)

// window.addEventListener("load", function(){
//     let fetchInterval = 30;
//     // ind++;
//     this.setInterval(fetchData, fetchInterval);
// })


// function generateQuotes(){
    
//     console.log("called")

// }
// setInterval(() => {
//     generateQuotes();
// }, 3000);


addTaskBtn.addEventListener("click", function () {
    addTaskWindow.classList.toggle('active');
    addTaskBtn.classList.toggle('active');
});

let task = {}
// adding the tasks to localstorage in javascript

function check() {
    const fieldVal = localStorage.getItem("tasks");
    return fieldVal === null
        ? []
        : JSON.parse(fieldVal); // this will return obj
};

let id = 0;
addTaskAnchor.addEventListener("click", function () {
    if (taskName.value == "" || taskDesc.value == "") {
        alert("You are not allowed to add empty tasks.");
        return;
    } else {
        // console.log(selectTaskCategory.value)
        // console.log(taskName.value)
        // console.log(taskDesc.value)
        let tasks = check();
        // add properties to object
        task.taskname = taskName.value;
        task.taskdesc = taskDesc.value;
        task.category = selectTaskCategory.value;

        // get the time when the task is created 
        const nowTime = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).toLowerCase();

        console.log(nowTime)

        // if push object to the array
        tasks.push({ "id": id, "taskname": taskName.value, "taskdesc": taskDesc.value, "category": selectTaskCategory.value, "time": nowTime });
        id++;
        // adding to the local storage
        localStorage.setItem("tasks", JSON.stringify(tasks));

        // clearing the input fields
        taskName.value = "";
        taskDesc.value = "";

        // removeFromHtml();
        // console.log(tasks)
        window.location.reload(true);
        displayTasks();
    }

});


let count = 1;
function deleteTask(ind) {
    // let tasksList = localStorage.getItem("tasks");
    // let taskArr = JSON.parse(tasksList);
    let taskArr = check();

    let removeTaskdiv = event.target.parentElement.parentElement.parentElement.parentElement;
    console.log(removeTaskdiv)

    //    console.log(ind)
    let newTaskArr = taskArr.filter(function (obj) {
        console.log(obj)
        return obj.id != ind;
    })
    console.log("Tasks: ", taskArr)
    localStorage.setItem("tasks", JSON.stringify(newTaskArr));
    // window.reload();
    removeTaskdiv.remove();
    completedTask.innerHTML = count;
    count++;
    // displayTasks();
}

// function removeFromHtml(){
//     for(let i = 0; i < taskdivList.length; i++){
//         tasksList[i].remove();
//     }
// }

function displayTasks() {
    let tasks = check();
    console.log(tasks);
    console.log(tasks.length);
    // let taskHtml = "";
    for (let i = 0; i < tasks.length; i++) {
        let taskObj = tasks[i];
        console.log(taskObj);
        let taskHtml = `
                <div class="circle" data-category="${taskObj.category}">
                    <p>P</p>
                </div>
                <div class="content">
                    <div class="textBx">
                        <h2>${taskObj.taskname}</h2>
                        <p>${taskObj.taskdesc}</p>
                    </div>
                    <div class="timestamp">
                        <p>${taskObj.time}</p>
                        <div><button class="delete-btn" onclick="deleteTask(${i})">delete</button></div>
                    </div>
                </div>
        `;

        // create html tag
        let childDiv = document.createElement("div");
        childDiv.setAttribute("class", "task");
        childDiv.innerHTML = taskHtml;

        // append task html to its parent html tag
        tasksDiv.appendChild(childDiv);
    }

}

document.addEventListener("DOMContentLoaded", displayTasks());