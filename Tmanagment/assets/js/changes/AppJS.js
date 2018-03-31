$(document).on('vclick', "#taskPage", function () {

    $.mobile.changePage("#Tasks", { transition: "slide", changeHash: false });

    getAllTasks(getAllTasksCB, getAllTasksError);

    // Swipe to remove list item
    $(document).on("swipeleft swiperight", "#list li", function (event) {
        var listitem = $(this),
            // These are the classnames used for the CSS transition
            dir = event.type === "swipeleft" ? "left" : "right",
            // Check if the browser supports the transform (3D) CSS transition
            transition = $.support.cssTransform3d ? dir : false;
        confirmAndDelete(listitem, transition);
    });
    // If it's not a touch device...
    if (!$.mobile.support.touch) {
        // Remove the class that is used to hide the delete button on touch devices
        $("#list").removeClass("touch");
        // Click delete split-button to remove list item
        $(".delete").on("click", function () {
            var listitem = $(this).parent("li");
            confirmAndDelete(listitem);
        });
    }
    function confirmAndDelete(listitem, transition) {
        // Highlight the list item that will be removed
        listitem.children(".ui-btn").addClass("ui-btn-active");
        // Inject topic in confirmation popup after removing any previous injected topics
        $("#confirm .topic").remove();
        listitem.find(".topic").clone().insertAfter("#question");
        // Show the confirmation popup
        $("#confirm").popup("open");
        // Proceed when the user confirms
        $("#confirm #yes").on("click", function () {
            // Remove with a transition
            if (transition) {
                listitem
                    // Add the class for the transition direction
                    .addClass(transition)
                    // When the transition is done...
                    .on("webkitTransitionEnd transitionend otransitionend", function () {
                        // ...the list item will be removed
                        listitem.remove();
                        // ...the list will be refreshed and the temporary class for border styling removed
                        $("#list").listview("refresh").find(".border-bottom").removeClass("border-bottom");
                    })
                    // During the transition the previous button gets bottom border
                    .prev("li").children("a").addClass("border-bottom")
                    // Remove the highlight
                    .end().end().children(".ui-btn").removeClass("ui-btn-active");
            }
            // If it's not a touch device or the CSS transition isn't supported just remove the list item and refresh the list
            else {
                listitem.remove();
                $("#list").listview("refresh");
            }
        });
        // Remove active state and unbind when the cancel button is clicked
        $("#confirm #cancel").on("click", function () {
            listitem.children(".ui-btn").removeClass("ui-btn-active");
            $("#confirm #yes").off();
        });
    }
});

function renderTasks(results) {
    //this is the callBackFunc 
    results = $.parseJSON(results.d);
    $("#list").empty();
    $.each(results, function (i, row) {
        dynamicLi =
            '<li class="ui-li-has-alt">' +
            '<a href="#" data-id="' + row.Id + '" class="ui-btn">' +
            '<h3>' + row.Title + '</h3>' +
            '<p class="topic"><strong>' + row.Created_by.First_name + '>אלי</strong></p>' +
            '<p>' + row.Start_date + '</p>' +
            '<p class="ui-li-aside"><strong>' + row.End_date + '</strong></p>' +
            '</a>' +
            '<a href="#" class="delete ui-btn ui-btn-icon-notext ui-icon-delete" title="Delete"></a>' +
            '</li>';
        $('#list').append(dynamicLi);
    });
}

function getAllTasksCB(results) {

    renderTasks(results);

}

function getAllTasksError(error) {

    console.log(error);
}

////DatePicker end_date
//jQuery('#end_date').datepicker({
//    toggleActive: true,
//    clearBtn: true,
//    autoclose: true,
//    format: 'dd/mm/yyyy'
//});

$(document).on('vclick', "#calendarPage", function () {
    $.mobile.changePage("#Calendar", { transition: "slide", changeHash: false });
});

$(document).on("pagebeforeshow", "#Calendar", function () {

    var initialLocaleCode = 'he';
    $('#calendar').fullCalendar({

        header:
            {
                left: 'listMonth,month,agendaDay',
                center: '',
                right: 'title'
            },


        footer: {
            center: 'next,today,prev'
        },
        businessHours: {
            // days of week. an array of zero-based day of week integers (0=Sunday)
            dow: [0, 1, 2, 3, 4], // Sunday - Thursday

            start: '8:00', // a start time (10am in this example)
            end: '17:00', // an end time (6pm in this example)
        },
        defaultView: 'month',
        defaultDate: '2018-03-12',
        locale: initialLocaleCode,
        buttonIcons: false, // show the prev/next text
        eventLimit: true, // allow "more" link when too many events

        navLinks: true, // can click day/week names to navigate views
        displayEventTime: false, // don't show the time column in list view
        nowIndicator: true,
        height: 'parent',
        width: 'parent',
        googleCalendarApiKey: 'AIzaSyBj-sXH532hBn373ojVSNCkS8zRTETXlTw',
        lang: 'he',
        
        
        eventBackgroudColor: '#2494be',
        eventColor: '#2494be',
        eventTextColor: "#ffffff",
        events: 'hcpiii8esnk92cdeha13bm3ris@group.calendar.google.com',
        loading: function (bool) {
            if (bool) $('#loadingConfCalendarBlock').show();
            else $('#loadingConfCalendarBlock').hide();
        },
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