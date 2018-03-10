function init()  {

    //Need to change to be dynamic from the user login session
    const userId = 75;

    var groupid = userId;
    var request = {
        employeeId: groupid
    };
    getMyTasks(request, getMyTaskCB, getMyTaskErrorCB);
    getMyRequestes(request, getMyRequestCB, getMyRequestErrorCB);
}

function getMyTaskCB(result) {
    //var myTasksArray = JSON.parse(result.d);
    //var myTasksData = myTasksArray[0];
    renderMyTaskTable(result);
}

function getMyTaskErrorCB(error) {
    console.log(error);
}

function renderMyTaskTable(myTaskData) {
    //var counter = 0;
    //var str = "";
    results = $.parseJSON(myTaskData.d);
    $("#myTasksTableBody").empty();
    $.each(results, function (i, row) {
        dynamicLi = '<tr id=""><td>1</td><td>' + row.Task_title + '</td><td>' + row.Project_name + '</td><td>' + row.Assign_to + '</td><td>' + row.End_date + '</td><td>' + row.Status + '</td></tr>';
        $('#myTasksTableBody').append(dynamicLi);
    });
}

function getMyRequestCB(result) {
    renderMyRequestTable(result);
}

function getMyRequestErrorCB(error) {
    console.log(error);
}

function renderMyRequestTable(myRequestData) {
    results = $.parseJSON(myRequestData.d);
    $("#myRequestsTableBody").empty();
    $.each(results, function (i, row) {
        dynamicLi = '<tr id=""><td>1</td><td>' + row.Title + '</td><td>' + row.Contact_name + '</td><td>' + row.Contact_phone + '</td></tr>';
        $('#myRequestsTableBody').append(dynamicLi);
    });
}
