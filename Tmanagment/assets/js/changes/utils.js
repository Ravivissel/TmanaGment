$(document).ready(function () {

    $("#masterPageContext").load("MasterPage.html");

});

$(document).on('click', '#newRequestsForm', function () {
    requestID = -1;
    arr_details = { requestID: requestID, func: "new" };
    localStorage.requestList = JSON.stringify(arr_details);
    //location.href = "requestsForm.html";
});

$(document).on('click', '#newTaskForm', function () {
    taskID = -1;
    arr_details = { taskID: taskID, func: "new" };
    localStorage.taskList = JSON.stringify(arr_details);
});

 