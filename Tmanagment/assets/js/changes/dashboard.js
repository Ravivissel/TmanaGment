function getUserID(request) {

    // serialize the object to JSON string
    var dataString = JSON.stringify(request);

    $.ajax({ // ajax call starts
        url: 'LoginWS.asmx/UserID',                    // server side web service method
        data: dataString,                                 // the parameters sent to the server
        type: 'POST',                                     // can be also GET
        async: false,
        dataType: 'json',                                 // expecting JSON datatype from the server
        contentType: 'application/json; charset = utf-8', // sent to the server
        success: function (data)
        {
            userInDB = JSON.parse(data.d);                // data.d id the Variable data contains the data we get from serverside
        },                
        error: function (error)
        { console.log(error); }
    }); // end of ajax call
    return userInDB;
}

function init() {
    var user = checkCookie();
    var request = { userName: user};
    var userId = getUserID(request);
    var groupid = userId;
    var request = {
        employeeId: groupid
    };
    getMyTasks(request, getMyTaskCB, getMyTaskErrorCB);
    getMyRequestes(request, getMyRequestCB, getMyRequestErrorCB);
    $('#welcome-user').append(user);
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
    $.each(results, function (i, row) {
        dynamicLi = '<tr id="' + row.Task_id + '"><td>' + row.Task_id + '</td><td>' + row.Task_title + '</td><td>' + row.Project_title + '</td><td>' + row.Assign_to + '</td><td>' + row.End_date + '</td><td>' + row.Status + '</td></tr>';
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
        dynamicLi = '<tr id="' + row.Request_id + '"><td>' + row.Request_id + '</td><td>' + row.Request_title + '</td><td>' + row.Contact_name + '</td><td>' + row.Contact_phone + '</td></tr>';
        $('#myRequestsTableBody').append(dynamicLi);
    });
}

//Calender
$(document).ready(function () {


    var initialLocaleCode = 'he';
    $('#calendar').fullCalendar({

        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listMonth'
        },

        defaultDate: '2018-03-12',
        locale: initialLocaleCode,
        buttonIcons: false, // show the prev/next text
        weekNumbers: true,
        eventLimit: true, // allow "more" link when too many events
        height: 500,
        width: 300,
        navLinks: true, // can click day/week names to navigate views
        displayEventTime: false, // don't show the time column in list view

        googleCalendarApiKey: 'AIzaSyBj-sXH532hBn373ojVSNCkS8zRTETXlTw',
        eventColor: '#3bafda',
        lang: 'he',
        events: 'hcpiii8esnk92cdeha13bm3ris@group.calendar.google.com',

        eventClick: function (event) {
            // opens events in a popup window
            window.open(event.url, 'gcalevent', 'width=700,height=600');
            return false;
        },

        loading: function (bool) {
            $('#loading').toggle(bool);
        }

    });

});