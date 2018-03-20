$(document).ready(function () {

    $("#masterPageContext").load("MasterPage.html");

});

$(document).on('click', '#newRequestForm', function () {
    var requestID = -1;
    var arr_details = { requestID: requestID, func: "new" };
    localStorage.requestList = JSON.stringify(arr_details);
    location.href = "requestsForm.html";
});
$(document).on('click', '#newTaskForm', function () {
    var taskID = -1;
    var arr_details = { taskID: taskID, func: "new" };
    localStorage.taskList = JSON.stringify(arr_details);
    location.href = "taskForm.html";
});

