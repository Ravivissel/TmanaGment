$(document).ready(function () {

    //generate select options
    //generateAssignToList();
    //generateAssignToProjectList();
    //generateAssignToRequestList();
    //initializeSelect2();


    // DO NOT REMOVE : GLOBAL FUNCTIONS!
    var errorClass = 'invalid';
    var errorElement = 'em';
    var $serviceForm = $('#taskForm').validate({
        highlight: function (element) {
            jQuery(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            jQuery(element).closest('.form-group').removeClass('has-error');
        },

        // Rules for form validation
        rules: {
            task_title: {
                required: true
            },
            assign_to: {
                required: true
            },
            end_date: {
                required: true
            },
            assign_to_p_or_r: {
                required: true
            },
            assign_to_project: {
                required: true
            },
            assign_to_request: {
                required: true
            }
        },

        submitHandler: function (form, event) {
            event.preventDefault();
            //Start of insert request code

            var task_title = $("#task_title").val();
            var end_date = $("#end_date").val();
            var assign_to = $("#assign_to option:selected").val();
            var description = $("#description").val();
            var created_by = "1"; // change to be the actual user
            //check's if it is a new request or an update
            var func = arr_task.func;
            var taskID = arr_task.taskID;

            if ($("#assign_to_p_or_r option:selected").val() === 1) {
                var assign_to_project = $("#assign_to_project option:selected").val();
                var request = { taskID: taskID, task_title: task_title, end_date: end_date, assign_to: assign_to, assign_to_project: assign_to_project, description: description, created_by: created_by, func: func };
                //call the ajax func
                //insertNewProjectTask(request, insertNewTaskCB, insertNewTaskErrorCB);
            }
            if ($("#assign_to_p_or_r option:selected").val() === 2) {
                var assign_to_request = $("#assign_to_request option:selected").val();
                request = { taskID: taskID, task_title: task_title, end_date: end_date, assign_to: assign_to, assign_to_request: assign_to_request, description: description, created_by: created_by, func: func };
                //call the ajax func
                //insertNewRequestTask(request, insertNewTaskCB, insertNewTaskErrorCB); TODO: create this func
            }

        },

        // Messages for form validation
        messages: {
            task_title: {
                required: "אנא הכנס שם משימה"
            },
            assign_to: {
                required: "אנא בחר עובד"
            },
            end_date: {
                required: "אנא בחר תאריך יעד"
            },
            assign_to_p_or_r: {
                required: "אנא בחר שיוך, פרוייקט או פנייה"
            },
            assign_to_project: {
                required: "אנא בחר פרוייקט"
            },
            assign_to_request: {
                required: "אנא בחר פנייה"
            }
        }
    });

    // DO NOT REMOVE : GLOBAL FUNCTIONS!
    errorClass = 'invalid';
    errorElement = 'em';
    var $loginForm = $('#loginForm').validate({

        highlight: function (element) {
            jQuery(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            jQuery(element).closest('.form-group').removeClass('has-error');
        },

        // Rules for form validation
        rules: {
            userName: {
                required: true
            },
            password: {
                required: true
            }
        },

        submitHandler: function (form, event) {
            event.preventDefault();
            //START OF login check code

            userName = $("#userName").val();
            password = $("#password").val();
            setCookie("username", userName, 1 / 24);
            //save = $("#checkbox-signup").prop('checked');
            var request = { userName: userName, password: password };
            //call the ajax func
            loginCheck(request, LoginCheckCB, LoginCheckErrorCB);
        },

        // Messages for form validation
        messages: {
            userName: {
                required: "אנא הכנס שם משתמש"
            },
            password: {
                required: "אנא הכנס סיסמא"
            }
        }
    });

    function LoginCheckCB(result) {
        var userInDB = JSON.parse(result.d);
        if (userInDB) {
            swal({
                title: "ברוך הבא",
                type: "success",
                timer: 1000,
                showConfirmButton: false
            });
            setTimeout(function () {
                $.mobile.changePage("#mainDash");
                createMainDash();
            }, 1001);
        }
        else {
            //alert("פרטים שגויים");
            swal({
                title: "שם משתמש או סיסמא שגוי",
                type: "warning",
                timer: 1000,
                showConfirmButton: false
            });
        }
    }

    function LoginCheckErrorCB(error) {
        console.log(error);
    }

    function createMainDash() {
        userName = GENERAL.USERS.getUserName();
        $('#welcome-user').append(userName);

        //Need to change to be dynamic from the user login session
        const userId = 65;
        var groupid = userId;
        var request = {
            employeeId: groupid
        };
        getProjects(request, getOpenedProjectsCB, getOpenedProjectsErrorCB); 
    }

    function getOpenedProjectsCB(result) {
        renderActiveProjectsPage(result);
    }

    function getOpenedProjectsErrorCB(error) {
        console.log(error);
    }

    function renderActiveProjectsPage(openedProjectsData) {
        results = $.parseJSON(openedProjectsData.d);
        //for the projectForm page
        localStorage.openedProjectsList = results;
        $("#openedProjects").empty();
        $.each(results, function (i, row) {
            dynamicLi =
                '<div class="col-sm-4 col-lg-4 col-xs-12" style="text-align:right">' +
                '<div class="card m-b-20">' +
                '<div class="card-body" id="' + row.Id + '">' +
                '<h2 class="card-title">' + row.Title + '</h2>' +
                '<p class="card-text">' + row.Project_manager.First_name + ' משימות </p>' +
                '</div></div></div>';
            $('#openedProjects').append(dynamicLi);
        });
    }

    $(document).on('vclick', "#taskPage", function () {

        $.mobile.changePage("#Tasks");

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

    function getAllTasksCB(results) {

        renderTasks(results);

    }

    function getAllTasksError(error) {

        console.log(error);
    }

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

});

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

