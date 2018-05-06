//wait until the dom is loaded
$(document).ready(function () {

    //generate select options
    generateAssignToList();
    generateAssignToProjectList();
    generateAssignToRequestList();

    if (JSON.parse(GENERAL.TASKS.getTasksList()).length != 0) {
        arr_task = JSON.parse(GENERAL.TASKS.getTasksList());
        if (arr_task.func == "edit" || arr_task.func == "show") {
            uploadData(arr_task.taskID);
            if (arr_task.func == "show") {
                $("#task_title").attr('disabled', 'disabled');
                $("#end_date").attr('disabled', 'disabled');
                $("#assign_to_p_or_r").attr('disabled', 'disabled');
                $("#assign_to").attr('disabled', 'disabled');
                $("#assign_to_project").attr('disabled', 'disabled');
                $("#assign_to_request").attr('disabled', 'disabled');
                $("#description").attr('disabled', 'disabled');
                $("#saveTask").attr('disabled', 'disabled');
            }
        }
    }

});

//function to fill form for edit
function uploadData(taskID) {

    var request = {
        taskID: taskID
    };

    GetTask(request, getTaskCB, getTaskErrorCB);
}

function getTaskCB(TaskData) {

    var task = JSON.parse(TaskData.d);
    GENERAL.TASKS.setTasksList(task);

    var e_date = new Date(parseInt(task.End_date.replace('/Date(', '')));
    e_date = e_date.toLocaleDateString("he-IL");

    $("#task_title").val(task.Title); 
    $("#end_date").val(e_date);
    $("#assign_to").val(task.Assign_to.Id); //needs to be changed
    //$("#assign_to").text(task.Assign_to.First_name);
    $("#description").val(task.Description);
}

function getTaskErrorCB(error) {
    console.log(error);
}

//all the select functions starts here

//Assign to employee
function generateAssignToList() {
    GetAssignToList(getAssignToListCB, getAssignToListErrorCB);
}

function getAssignToListCB(AssignToListData) {
    var arr_AssignTo = $.parseJSON(AssignToListData.d);
    $select = $("#assign_to");
    $('<option>', { value: -1, text: 'בחר' }).attr({ 'selected': '', 'disabled': '' }).appendTo($select);
    for (i in arr_AssignTo) {
        $('<option>', { value: arr_AssignTo[i].Id, text: arr_AssignTo[i].First_name }).appendTo($select);
    }
}

function getAssignToListErrorCB(error) {
    console.log(error);
}

//Assign to project
function generateAssignToProjectList() {

    //Need to change! no need for request here
    const userId = 65;
    var groupid = userId;
    var request = {
        employeeId: groupid
    };
    getProjects(request, getAssignToProjectListCB, getAssignToProjectListErrorCB);
}

function getAssignToProjectListCB(AssignToProjectListData) {
    var arr_AssignToProject = $.parseJSON(AssignToProjectListData.d);
    $select = $("#assign_to_project");
    $('<option>', { value: -1, text: 'בחר' }).attr({ 'selected': '', 'disabled': '' }).appendTo($select);
    for (i in arr_AssignToProject) {
        $('<option>', { value: arr_AssignToProject[i].Id, text: arr_AssignToProject[i].Title }).appendTo($select);
    }
}

function getAssignToProjectListErrorCB(error) {
    console.log(error);
}

//Assign to Request                      TODO: need to change only the active request!
function generateAssignToRequestList() {

    //Need to change! no need for request here
    const userId = 65;
    var groupid = userId;
    var request = {
        employeeId: groupid
    };
    getRequests(request, getAssignToRequestListCB, getAssignToRequestListErrorCB);
}

function getAssignToRequestListCB(AssignToRequestListData) {
    var arr_AssignToRequest = $.parseJSON(AssignToRequestListData.d);
    $select = $("#assign_to_request");
    $('<option>', { value: -1, text: 'בחר' }).attr({ 'selected': '', 'disabled': '' }).appendTo($select);
    for (i in arr_AssignToRequest) {
        $('<option>', { value: arr_AssignToRequest[i].Id, text: arr_AssignToRequest[i].Title }).appendTo($select);
    }
}

function getAssignToRequestListErrorCB(error) {
    console.log(error);
}
