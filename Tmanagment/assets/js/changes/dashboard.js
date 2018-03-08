function init() {

    //Need to change to be dynamic from the user login session
    const userId = 75;

    var groupid = userId;
    var request = {
        employeeId: groupid
    };
    getMyTasks(request, getMyTaskCB, getMyTaskErrorCB);
    getMyRequestes(request, getMyRequestCB, getMyRequestErrorCB);
};

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

//Calender
 $(document).ready(function() {
   
    
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

      eventClick: function(event) {
        // opens events in a popup window
        window.open(event.url, 'gcalevent', 'width=700,height=600');
        return false;
      },

      loading: function(bool) {
        $('#loading').toggle(bool);
      }

    });

  });
}
