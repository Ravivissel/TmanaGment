﻿function getMyTasks(request, successCB, errorCB) {

    // serialize the object to JSON string
    var dataString = JSON.stringify(request);

    $.ajax({ // ajax call starts
        url: 'DashboardWS.asmx/GetMyTasksList',       // server side web service method
        data: dataString,                          // the parameters sent to the server
        type: 'POST',                              // can be also GET
        dataType: 'json',                          // expecting JSON datatype from the server
        contentType: 'application/json; charset = utf-8', // sent to the server
        success: successCB,                // data.d id the Variable data contains the data we get from serverside
        error: errorCB
    }); // end of ajax call
}

function getMyRequestes(request, successCB, errorCB) {

    // serialize the object to JSON string
    var dataString = JSON.stringify(request);

    $.ajax({ // ajax call starts
        url: 'DashboardWS.asmx/GetMyRequestsList',       // server side web service method
        data: dataString,                          // the parameters sent to the server
        type: 'POST',                              // can be also GET
        dataType: 'json',                          // expecting JSON datatype from the server
        contentType: 'application/json; charset = utf-8', // sent to the server
        success: successCB,                // data.d id the Variable data contains the data we get from serverside
        error: errorCB
    }); // end of ajax call
}

function getProjects(request, successCB, errorCB) {

    // serialize the object to JSON string
    var dataString = JSON.stringify(request);

    $.ajax({ // ajax call starts
        url: 'ProjectWS.asmx/GetProjectsList',       // server side web service method
        data: dataString,                          // the parameters sent to the server
        type: 'POST',                              // can be also GET
        dataType: 'json',                          // expecting JSON datatype from the server
        contentType: 'application/json; charset = utf-8', // sent to the server
        success: successCB,                // data.d id the Variable data contains the data we get from serverside
        error: errorCB
    }); // end of ajax call
}

function getRequests(request, successCB, errorCB) {

    // serialize the object to JSON string
    var dataString = JSON.stringify(request);

    $.ajax({ // ajax call starts
        url: 'RequestWS.asmx/GetRequestsList',       // server side web service method
        data: dataString,                          // the parameters sent to the server
        type: 'POST',                              // can be also GET
        dataType: 'json',                          // expecting JSON datatype from the server
        contentType: 'application/json; charset = utf-8', // sent to the server
        success: successCB,                // data.d id the Variable data contains the data we get from serverside
        error: errorCB
    }); // end of ajax call
}

function getAllTasks(successCB, errorCB) {
  
    $.ajax({ // ajax call starts
        url: 'TasksWS.asmx/GetAllTasksList',       // server side web service method
        type: 'POST',                              // can be also GET
        dataType: 'json',                          // expecting JSON datatype from the server
        contentType: 'application/json; charset = utf-8', // sent to the server
        success: successCB,                // data.d id the Variable data contains the data we get from serverside
        error: errorCB
    }); // end of ajax call
}

function insertNewRequest(request, successCB, errorCB) {
    // serialize the object to JSON string
    var dataString = JSON.stringify(request);

    $.ajax({ // ajax call starts
        url: 'RequestWS.asmx/SetRequest',       // server side web service method
        data: dataString,                          // the parameters sent to the server
        type: 'POST',                              // can be also GET
        dataType: 'json',                          // expecting JSON datatype from the server
        contentType: 'application/json; charset = utf-8', // sent to the server
        success: successCB,                // data.d id the Variable data contains the data we get from serverside
        error: errorCB
    }); // end of ajax call
}

function insertNewProjectTask(request, successCB, errorCB) {
    // serialize the object to JSON string
    var dataString = JSON.stringify(request);

    $.ajax({ // ajax call starts
        url: 'TasksWS.asmx/SetActualProjectTask',       // server side web service method
        data: dataString,                          // the parameters sent to the server
        type: 'POST',                              // can be also GET
        dataType: 'json',                          // expecting JSON datatype from the server
        contentType: 'application/json; charset = utf-8', // sent to the server
        success: successCB,                // data.d id the Variable data contains the data we get from serverside
        error: errorCB
    }); // end of ajax call
}

function GetRequest(request, successCB, errorCB) {
    // serialize the object to JSON string
    var dataString = JSON.stringify(request);

    $.ajax({ // ajax call starts
        url: 'RequestWS.asmx/GetRequest',       // server side web service method
        data: dataString,                          // the parameters sent to the server
        type: 'POST',                              // can be also GET
        dataType: 'json',                          // expecting JSON datatype from the server
        contentType: 'application/json; charset = utf-8', // sent to the server
        success: successCB,                // data.d id the Variable data contains the data we get from serverside
        error: errorCB
    }); // end of ajax call
}

function GetProject(request, successCB, errorCB) {
    // serialize the object to JSON string
    var dataString = JSON.stringify(request);

    $.ajax({ // ajax call starts
        url: 'ProjectWS.asmx/GetProject',       // server side web service method
        data: dataString,                          // the parameters sent to the server
        type: 'POST',                              // can be also GET
        dataType: 'json',                          // expecting JSON datatype from the server
        contentType: 'application/json; charset = utf-8', // sent to the server
        success: successCB,                // data.d id the Variable data contains the data we get from serverside
        error: errorCB
    }); // end of ajax call
}
function UpdateProject(request, successCB, errorCB) {
    // serialize the object to JSON string
    var dataString = JSON.stringify(request);

    $.ajax({ // ajax call starts
        url: 'ProjectWS.asmx/UpdateProjects',       // server side web service method
        data: dataString,                          // the parameters sent to the server
        type: 'POST',                              // can be also GET
        dataType: 'json',                          // expecting JSON datatype from the server
        contentType: 'application/json; charset = utf-8', // sent to the server
        success: successCB,                // data.d id the Variable data contains the data we get from serverside
        error: errorCB
    }); // end of ajax call
}

function GetAssignToList(successCB, errorCB) {

    $.ajax({ // ajax call starts
        url: 'EmployeeWS.asmx/GetAssignToList',       // server side web service method
        type: 'POST',                              // can be also GET
        dataType: 'json',                          // expecting JSON datatype from the server
        contentType: 'application/json; charset = utf-8', // sent to the server
        success: successCB,                // data.d id the Variable data contains the data we get from serverside
        error: errorCB
    }); // end of ajax call
}

function GetTask(request, successCB, errorCB) {
    // serialize the object to JSON string
    var dataString = JSON.stringify(request);

    $.ajax({ // ajax call starts
        url: 'TasksWS.asmx/GetTask',       // server side web service method
        data: dataString,                          // the parameters sent to the server
        type: 'POST',                              // can be also GET
        dataType: 'json',                          // expecting JSON datatype from the server
        contentType: 'application/json; charset = utf-8', // sent to the server
        success: successCB,                // data.d id the Variable data contains the data we get from serverside
        error: errorCB
    }); // end of ajax call
}

function loginCheck(request, successCB, errorCB) {

    // serialize the object to JSON string
    var dataString = JSON.stringify(request);

    $.ajax({ // ajax call starts
        url: 'LoginWS.asmx/LoginUser',       // server side web service method
        data: dataString,                          // the parameters sent to the server
        type: 'POST',                              // can be also GET
        dataType: 'json',                          // expecting JSON datatype from the server
        contentType: 'application/json; charset = utf-8', // sent to the server
        success: successCB,                // data.d id the Variable data contains the data we get from serverside
        error: errorCB
    }); // end of ajax call
}

function getMyUserName(uName, successCB, errorCB) {

    // serialize the object to JSON string
    var dataString = JSON.stringify(uName);

    $.ajax({ // ajax call starts
        url: 'DashboardWS.asmx/GetMyUserName',       // server side web service method
        data: dataString,                          // the parameters sent to the server
        type: 'POST',                              // can be also GET
        dataType: 'json',                          // expecting JSON datatype from the server
        contentType: 'application/json; charset = utf-8', // sent to the server
        success: successCB,                // data.d id the Variable data contains the data we get from serverside
        error: errorCB
    }); // end of ajax call
}

function getCustomers(request, successCB, errorCB) {

    // serialize the object to JSON string
    var dataString = JSON.stringify(request);

    $.ajax({ // ajax call starts
        url: 'CustomerWS.asmx/GetCustomersList',       // server side web service method
        data: dataString,                          // the parameters sent to the server
        type: 'POST',                              // can be also GET
        dataType: 'json',                          // expecting JSON datatype from the server
        contentType: 'application/json; charset = utf-8', // sent to the server
        success: successCB,                // data.d id the Variable data contains the data we get from serverside
        error: errorCB
    }); // end of ajax call
}

function insertNewCustomer(request, successCB, errorCB) {
    // serialize the object to JSON string
    var dataString = JSON.stringify(request);

    $.ajax({ // ajax call starts
        url: 'CustomerWS.asmx/SetCustomer',       // server side web service method
        data: dataString,                          // the parameters sent to the server
        type: 'POST',                              // can be also GET
        dataType: 'json',                          // expecting JSON datatype from the server
        contentType: 'application/json; charset = utf-8', // sent to the server
        success: successCB,                // data.d id the Variable data contains the data we get from serverside
        error: errorCB
    }); // end of ajax call
}

function GetCustomer(request, successCB, errorCB) {
    // serialize the object to JSON string
    var dataString = JSON.stringify(request);

    $.ajax({ // ajax call starts
        url: 'CustomerWS.asmx/GetCustomer',       // server side web service method
        data: dataString,                          // the parameters sent to the server
        type: 'POST',                              // can be also GET
        dataType: 'json',                          // expecting JSON datatype from the server
        contentType: 'application/json; charset = utf-8', // sent to the server
        success: successCB,                // data.d id the Variable data contains the data we get from serverside
        error: errorCB
    }); // end of ajax call
}

function DeactivateCustomer(request) {

    // serialize the object to JSON string
    var dataString = JSON.stringify(request);

    $.ajax({ // ajax call starts
        url: 'CustomerWS.asmx/DeactivateCustomer',       // server side web service method
        data: dataString,                          // the parameters sent to the server
        type: 'POST',                              // can be also GET
        dataType: 'json',                          // expecting JSON datatype from the server
        contentType: 'application/json; charset = utf-8', // sent to the server
        success: function (data) { },                // data.d id the Variable data contains the data we get from serverside
        error: function (err) { alert("Error"); }
    }); // end of ajax call
}

function getOpenRequestsNum(successCB, errorCB) {

    $.ajax({ // ajax call starts
        url: 'DashboardWS.asmx/GetOpenRequestsNum',       // server side web service method
        type: 'POST',                              // can be also GET
        dataType: 'json',                          // expecting JSON datatype from the server
        contentType: 'application/json; charset = utf-8', // sent to the server
        success: successCB,                // data.d id the Variable data contains the data we get from serverside
        error: errorCB
    }); // end of ajax call
}

function getTasksNum(request, successCB, errorCB) {
    // serialize the object to JSON string
    var dataString = JSON.stringify(request);

    $.ajax({ // ajax call starts
        url: 'TasksWS.asmx/GetTasksNum',       // server side web service method
        data: dataString,                          // the parameters sent to the server
        type: 'POST',                              // can be also GET
        dataType: 'json',                          // expecting JSON datatype from the server
        contentType: 'application/json; charset = utf-8', // sent to the server
        success: successCB,                // data.d id the Variable data contains the data we get from serverside
        error: errorCB
    }); // end of ajax call
}