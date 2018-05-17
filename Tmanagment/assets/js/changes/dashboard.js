$(document).ready(function () {

    //Need to change to be dynamic from the user login session
    const userId = 75;
    var groupid = userId;
    var request = {
        employeeId: groupid
    };

    userName = GENERAL.USERS.getUserName();
    var uName = {
        userName: userName
    };

    getMyUserName(uName, getMyUserNameCB, getMyUserNameErrorCB);
    getOpenRequestsNum(getOpenRequestsNumCB, getOpenRequestsNumErrorCB);
    getOpenProjectsNum(getOpenProjectsNumCB, getOpenProjectsNumErrorCB);
    getMyTasks(request, getMyTaskCB, getMyTaskErrorCB);
    getMyRequestes(request, getMyRequestCB, getMyRequestErrorCB);

    function getMyTaskCB(result) {
        renderMyTaskTable(result);
    }

    function getMyTaskErrorCB(error) {
        console.log(error);
    }

    function renderMyTaskTable(myTaskData) {
        results = $.parseJSON(myTaskData.d);
        $.each(results, function (i, row) {

            var e_date = new Date(parseInt(row.End_date.replace('/Date(', '')));
            e_date = e_date.toLocaleDateString("he-IL");

            dynamicLi = '<tr id="' + row.Task_id + '"><td>' + row.Task_id + '</td><td>' + row.Task_title + '</td><td>' + row.Project_title + '</td><td>' + row.Assign_to + '</td><td>' + e_date + '</td><td>' + row.Status + '</td></tr>';
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

    function getMyUserNameCB(result) {
        userName = $.parseJSON(result.d);
        $('#welcome-user').append(userName);
    }

    function getMyUserNameErrorCB(error) {
        console.log(error);
    }

    function getOpenRequestsNumCB(result) {
        counter = $.parseJSON(result.d);
        $('#openRequests').append(counter);
    }

    function getOpenRequestsNumErrorCB(error) {
        console.log(error);
    }

    function getOpenProjectsNumCB(result) {
        counter = $.parseJSON(result.d);
        $('#onProcessProjects').append(counter);
    }

    function getOpenProjectsNumErrorCB(error) {
        console.log(error);
    }

    //Calender
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