let addtaskinput = document.getElementById("addtaskinput")
let addtaskbtn = document.getElementById("addtaskbtn")

addtaskbtn.addEventListener("click", function() {
    addtaskinputval = addtaskinput.value;
    if (addtaskinputval.trim() != 0) {
        let webtask = localStorage.getItem("localtasks");
        if (webtask == null) {
            taskObj = [];
        } else {
            taskObj = JSON.parse(webtask);
        }
        taskObj.push({ "task_name": addtaskinputval, "completeStatus": false });
        // console.log(taskObj,"Ram");
        localStorage.setItem("localtasks", JSON.stringify(taskObj));
        addtaskinput.value = '';
    }
    showTask();
})
showTask();


// Show Task Function
function showTask() {
    let webtask = localStorage.getItem("localtasks");
    if (webtask == null) {
        taskObj = [];
    } else {
        taskObj = JSON.parse(webtask);
    }

    let todoHtml = '';
    let completedHtml = '';
    let addTaskList = document.getElementById("addedtasklist");

    taskObj.forEach((item, index) => {
        let taskHtml = '';
        let isCompleted = item.completeStatus;

        if (isCompleted) {
            // Add to completed table
            taskHtml += `<tr>
                          <td style="color: white;">${item.task_name}</td>
                          <td><button type="button" onclick ="deleteitem(${index}, true)" class="btn btn-danger"><i class="fa fa-trash"></i>Delete</button></td>
                        </tr>`;
            completedHtml += taskHtml;
        } else {
            // Add to to-do list table
            let taskCompleteValue = `<td style="color: white;">${item.task_name}</td>`;
            let taskImportantValue = `<td><button type="button" onclick="markImportant(${index})" class="btn btn-info">${item.important ? 'Mark not Important' : 'Mark Important'}</button></td>`;
            taskHtml += `<tr>
                          <td scope='row'>${index + 1}</td>
                          ${taskCompleteValue}
                          <td><button type="button" onclick="editTask(${index})" class="btn btn-primary"><i class="fa fa-edit"></i>Edit</button></td>
                          <td><button type="button" onclick="completeTask(${index})" class="btn btn-success"><i class="fa fa-check-square-o"></i>Mark as Complete</button></td>
                          <td><button type="button" onclick="deleteitem(${index}, false)" class="btn btn-danger"><i class="fa fa-trash"></i>Delete</button></td>
                          ${taskImportantValue}
                        </tr>`;
            todoHtml += taskHtml;
        }
    });

    let completedTaskList = document.getElementById("completedtasklist");
    completedTaskList.innerHTML = completedHtml;

    addTaskList.innerHTML = todoHtml;
}


// complete task
function completeTask(index) {
    let webtask = localStorage.getItem("localtasks");
    let taskObj = JSON.parse(webtask);
    taskObj[index].completeStatus = true;
    localStorage.setItem("localtasks", JSON.stringify(taskObj));
    showTask();
}


// show completed task 
function showCompletedTasks() {
    let webtask = localStorage.getItem("completedtasks");
    if (webtask == null) {
        taskObj = [];
    } else {
        taskObj = JSON.parse(webtask);
    }

    let completedHtml = '';
    let completedTaskList = document.getElementById("completedtasklist");

    taskObj.forEach((item, index) => {
        let taskHtml = '';
        taskHtml += `<tr>
                <td style="font-size: 16px;">${item.task_name}</td>
                <td><button type="button" onclick="deleteitem(${index}, true)" class="text-danger"><i class="fa fa-trash"></i>Delete</button></td>
            </tr>`;
        completedHtml += taskHtml;
    });

    completedTaskList.innerHTML = completedHtml;
}

// Mark Important
function markImportant(index) {
    let webtask = localStorage.getItem("localtasks");
    let taskObj = JSON.parse(webtask);

    taskObj[index].important = !taskObj[index].important;

    localStorage.setItem("localtasks", JSON.stringify(taskObj));

    showTask();

    let importantTaskList = document.getElementById("importanttasklist");
    let importantTaskRows = importantTaskList.getElementsByTagName("tr");
    if (taskObj[index].important) {
        let importantHtml = '';
        importantHtml += `<tr>
                          <td style="color: white;">${index + 1}</td>
                          <td style="color: white;" >${taskObj[index].task_name}</td>
                          <td>
                          <button type="button" onclick="markNotImportant(${index})" class="text-info">
                                  <i class="fa fa-times"></i>Mark Not Important
                              </button>
                          </td>
                       
                          </tr>`;
        importantTaskList.innerHTML += importantHtml;
    } else {
        for (let i = 0; i < importantTaskRows.length; i++) {
            let rowCells = importantTaskRows[i].getElementsByTagName("td");
            let rowTaskIndex = parseInt(rowCells[0].innerText) - 1;
            if (rowTaskIndex === index) {
                importantTaskList.deleteRow(i);
                break;
            }
        }
    }
}

// Mark Not to Important
function markNotImportant(index) {
    let webtask = localStorage.getItem("localtasks");
    let taskObj = JSON.parse(webtask);

    taskObj[index].important = false;

    localStorage.setItem("localtasks", JSON.stringify(taskObj));

    showTask();

    let importantTaskList = document.getElementById("importanttasklist");
    let importantTaskRows = importantTaskList.getElementsByTagName("tr");
    for (let i = 0; i < importantTaskRows.length; i++) {
        let rowCells = importantTaskRows[i].getElementsByTagName("td");
        let rowTaskIndex = parseInt(rowCells[0].innerText) - 1;
        if (rowTaskIndex === index) {
            importantTaskList.deleteRow(i);
            break;
        }
    }
}

// Edit Task

function editTask(index) {
    let saveindex = document.getElementById("saveindex");
    let addtaskbtn = document.getElementById("addtaskbtn");
    let savetaskbtn = document.getElementById("savetaskbtn");
    saveindex.value = index;
    let webtask = localStorage.getItem("localtasks");
    let taskObj = JSON.parse(webtask);

    addtaskinput.value = taskObj[index]['task_name'];
    addtaskbtn.style.display = "none";
    savetaskbtn.style.display = "block";
}

// Save Task

let savetaskbtn = document.getElementById("savetaskbtn");
savetaskbtn.addEventListener("click", function() {
    let addtaskbtn = document.getElementById("addtaskbtn");
    let webtask = localStorage.getItem("localtasks");
    let taskObj = JSON.parse(webtask);
    let saveindex = document.getElementById("saveindex").value;

    for (keys in taskObj[saveindex]) {
        if (keys == 'task_name') {
            taskObj[saveindex].task_name = addtaskinput.value;
        }
    }

    // taskObj[saveindex] = {'task_name : addtaskinput.value, 'completeStatus':false};


    savetaskbtn.style.display = "none";
    addtaskbtn.style.display = "block";
    localStorage.setItem("localtasks", JSON.stringify(taskObj));
    addtaskinput.value = '';
    showTask();
})


// DELETE ITEM

function deleteitem(index) {
    let webtask = localStorage.getItem("localtasks");
    let taskObj = JSON.parse(webtask);
    taskObj.splice(index, 1);
    localStorage.setItem("localtasks", JSON.stringify(taskObj));
    showTask();
}

// // Complete task
let addedtasklist = document.getElementById("addedtasklist");
addedtasklist.addEventListener("click", function(e) {
    console.log(e);

    let webtask = localStorage.getItem("localtasks");
    let taskObj = JSON.parse(webtask);

    let myTarget = e.target;
    if (myTarget.classList[0] === 'text-success') {
        let myTargetid = myTarget.getAttribute("id");

        myTargetpresibling = myTarget.parentElement.previousElementSibling.previousElementSibling;

        for (keys in taskObj[myTargetid]) {
            if (keys == 'completeStatus' && taskObj[myTargetid][keys] == true) {
                taskObj[myTargetid].completeStatus = false;
            } else if (keys == 'completeStatus' && taskObj[myTargetid][keys] == false) {
                taskObj[myTargetid].completeStatus = true;
            }
        }
        localStorage.setItem("localtasks", JSON.stringify(taskObj));
        showTask();
    }

})

// Delete All Btn
let deleteallbtn = document.getElementById("deleteallbtn");
deleteallbtn.addEventListener("click", function() {
    let savetaskbtn = document.getElementById("savetaskbtn");
    let addtaskbtn = document.getElementById("addtaskbtn");
    let webtask = localStorage.getItem("localtasks");
    let taskObj = JSON.parse(webtask);
    if (webtask == null) {
        taskObj = [];
    } else {
        taskObj = JSON.parse(webtask);
        taskObj = [];
    }
    savetaskbtn.style.display = "none";
    localStorage.setItem("localtasks", JSON.stringify(taskObj));

    showTask();
})


// Search List
let searchtext = document.getElementById("searchtextbox");
searchtext.addEventListener("input", function() {
    let tableRows = document.querySelectorAll("#addedtasklist tbody tr");
    let searchText = searchtext.value.toLowerCase();

    tableRows.forEach(function(row) {
        let taskCompleteValue = row.querySelector('td:nth-child(2)').textContent.toLowerCase();

        if (taskCompleteValue.includes(searchText)) {
            row.style.display = "table-row";
        } else {
            row.style.display = "none";
        }
    });
});