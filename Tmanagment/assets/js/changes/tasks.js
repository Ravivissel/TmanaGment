$(document).ready(function () {

    GetTasksStatistics(GetTasksStatisticsCB, GetTasksStatisticsErrorCB);

    function GetTasksStatisticsCB(results) {
        var resultsArray = $.parseJSON(results.d);
        var statistics = resultsArray[0];

        $('#almostLateChart').attr("data-percent", statistics.almost_late_tasks_percent);
        $('#almostLateChart').attr("data-text", statistics.almost_late_tasks_percent + "%");

        $('#lateTasksChart').attr("data-percent", statistics.late_tasks_percent);
        $('#lateTasksChart').attr("data-text", statistics.late_tasks_percent + "%");

        $('#openTasksChart').attr("data-percent", statistics.open_tasks_percent);
        $('#openTasksChart').attr("data-text", statistics.open_tasks_percent + "%");

        $('#inProgressTasksChart').attr("data-percent", statistics.tasks_in_progress_percent);
        $('#inProgressTasksChart').attr("data-text", statistics.tasks_in_progress_percent + "%");

        $('#almostLateTasks').append(statistics.almost_late_tasks);
        $('#lateTasks').append(statistics.late_tasks);
        $('#openTasks').append(statistics.open_tasks);
        $('#inProcessTasks').append(statistics.tasks_in_progress);

        $('.circliful-chart').circliful();
    }

    function GetTasksStatisticsErrorCB(err) {
        console.log(err);
    }

    var user = getFromLocalStorage(localStorageConstants.employees.user);
    var userId = user.Id;
    var userType = user.User_type;
    var request = {
        employeeId: userId,
        userType: userType
    };

    getAllProjectsTasks(request, getAllProjectsTasksCB, getAllProjectsTasksErrorCB);
    getAllRequestsTasks(request, getAllRequestsTasksCB, getAllRequestsTasksErrorCB);

    function getAllProjectsTasksCB(results) {
        var allProjectsTasks = $.parseJSON(results.d);
        setToLocalStorage(localStorageConstants.Tasks.TasksList,allProjectsTasks);
        renderAllProjectsTaskTable(allProjectsTasks);
    }

    function getAllProjectsTasksErrorCB(error) {
        console.log(error);
    }

    function getAllRequestsTasksCB(results) {
        var allRequestsTasks = $.parseJSON(results.d);
        setToLocalStorage(localStorageConstants.requests.RequestsTasksList,allRequestsTasks)
        renderAllRequestsTaskTable(allRequestsTasks);
    }

    function getAllRequestsTasksErrorCB(error) {
        console.log(error);
    }

    function renderAllProjectsTaskTable(allProjectsTasks) {

        ProjectsTaskTable = $('#datatable-buttons').DataTable({
            lengthChange: false,
            buttons: ['copy', 'excel', 'pdf'],
            "oLanguage": {
                "sSearch": "<span>חיפוש:</span> _INPUT_", //search
                "sProcessing": "מעבד...",
                "sLengthMenu": "הצג _MENU_ פריטים",
                "sZeroRecords": "לא נמצאו רשומות מתאימות",
                "sInfo": "_START_ עד _END_ מתוך _TOTAL_ רשומות",
                "sInfoEmpty": "0 עד 0 מתוך 0 רשומות",
                "sInfoFiltered": "(מסונן מסך _MAX_  רשומות)",
                "sInfoPostFix": "",
                "sUrl": "",
                "oPaginate": {
                    "sFirst": "ראשון",
                    "sPrevious": "הקודם",
                    "sNext": "הבא",
                    "sLast": "אחרון"
                }
            }
        });

        //Buttons examples
        $.each(allProjectsTasks, function (index, row) {

            if (row.Actual_task.Status.Title == "סגורה") {
                return true;
            }

            var s_date = new Date(parseInt(row.Actual_task.Start_date.replace('/Date(', '')));
            s_date = s_date.toLocaleDateString("he-IL");

            var e_date = new Date(parseInt(row.Actual_task.End_date.replace('/Date(', '')));
            e_date = e_date.toLocaleDateString("he-IL");

            var btnStr = "";
            var showBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-success btn-sm m-b-5' id='show' title='פרטים נוספים'><i class='fa fa-wpforms'></i></button>";
            var editBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-primary btn-sm m-b-5' id='edit' title='עריכה'><i class='ti-pencil'></i></button>";
            btnStr += showBtn + " " + editBtn;

            ProjectsTaskTable.row.add([row.Actual_task.Id, row.Actual_task.Title, row.Project.Title, row.Actual_task.Created_by.First_name, row.Actual_task.Assign_to.First_name, s_date, e_date, row.Actual_task.Status.Title, btnStr]).draw("false");
        });

        $('#datatable-buttons').find('tbody').on('click', '#show', function () {
            var data = ProjectsTaskTable.row($(this).parents('tr')).data();
            var arr_details = { taskID: data[0], func: "show" };
            setToLocalStorage(localStorageConstants.projects.ProjectsTasksList,arr_details);
            location.href = "../../../pages/taskForm.html";
        });

        $('#datatable-buttons').find('tbody').on('click', '#edit', function () {
            var data = ProjectsTaskTable.row($(this).parents('tr')).data();
            var arr_details = { taskID: data[0], func: "edit" };
            setToLocalStorage(localStorageConstants.projects.ProjectsTasksList,arr_details);
            location.href = "../../../pages/taskForm.html";
        });

        $('#activeProjectsTasks').change(function () {
            refreshProjectsTaskTable();
        });

        ProjectsTaskTable.buttons().container()
            .appendTo('#datatable-buttons_wrapper .col-md-6:eq(0)');
    }

    function refreshProjectsTaskTable() {
        var allProjectsTasks = getFromLocalStorage(localStorageConstants.projects.ProjectsTasksList);
        var active = $("#activeProjectsTasks").prop('checked');
        ProjectsTaskTable.clear().draw();

        if (active == true) {
            $.each(allProjectsTasks, function (index, row) {

                if (row.Actual_task.Status.Title == "סגורה") {
                    return true;
                }

                var s_date = new Date(parseInt(row.Actual_task.Start_date.replace('/Date(', '')));
                s_date = s_date.toLocaleDateString("he-IL");

                var e_date = new Date(parseInt(row.Actual_task.End_date.replace('/Date(', '')));
                e_date = e_date.toLocaleDateString("he-IL");

                var btnStr = "";
                var showBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-success btn-sm m-b-5' id='show' title='פרטים נוספים'><i class='fa fa-wpforms'></i></button>";
                var editBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-primary btn-sm m-b-5' id='edit' title='עריכה'><i class='ti-pencil'></i></button>";
                btnStr += showBtn + " " + editBtn;

                ProjectsTaskTable.row.add([row.Actual_task.Id, row.Actual_task.Title, row.Project.Title, row.Actual_task.Created_by.First_name, row.Actual_task.Assign_to.First_name, s_date, e_date, row.Actual_task.Status.Title, btnStr]).draw("false");
            });
        }
        else {
            $.each(allProjectsTasks, function (index, row) {

                var s_date = new Date(parseInt(row.Actual_task.Start_date.replace('/Date(', '')));
                s_date = s_date.toLocaleDateString("he-IL");

                var e_date = new Date(parseInt(row.Actual_task.End_date.replace('/Date(', '')));
                e_date = e_date.toLocaleDateString("he-IL");

                var btnStr = "";
                var showBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-success btn-sm m-b-5' id='show' title='פרטים נוספים'><i class='fa fa-wpforms'></i></button>";
                var editBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-primary btn-sm m-b-5' id='edit' title='עריכה'><i class='ti-pencil'></i></button>";
                btnStr += showBtn + " " + editBtn;

                ProjectsTaskTable.row.add([row.Actual_task.Id, row.Actual_task.Title, row.Project.Title, row.Actual_task.Created_by.First_name, row.Actual_task.Assign_to.First_name, s_date, e_date, row.Actual_task.Status.Title, btnStr]).draw("false");
            });
        }
    }

    function renderAllRequestsTaskTable(allRequestsTasks) {

        RequestsTaskTable = $('#datatable-buttons2').DataTable({
            lengthChange: false,
            buttons: ['copy', 'excel', 'pdf'],
            "oLanguage": {
                "sSearch": "<span>חיפוש:</span> _INPUT_", //search
                "sProcessing": "מעבד...",
                "sLengthMenu": "הצג _MENU_ פריטים",
                "sZeroRecords": "לא נמצאו רשומות מתאימות",
                "sInfo": "_START_ עד _END_ מתוך _TOTAL_ רשומות",
                "sInfoEmpty": "0 עד 0 מתוך 0 רשומות",
                "sInfoFiltered": "(מסונן מסך _MAX_  רשומות)",
                "sInfoPostFix": "",
                "sUrl": "",
                "oPaginate": {
                    "sFirst": "ראשון",
                    "sPrevious": "הקודם",
                    "sNext": "הבא",
                    "sLast": "אחרון"
                }
            }

        });

        //Buttons examples
        $.each(allRequestsTasks, function (index, row) {

            if (row.Actual_task.Status.Title == "סגורה") {
                return true;
            }

            var s_date = new Date(parseInt(row.Actual_task.Start_date.replace('/Date(', '')));
            s_date = s_date.toLocaleDateString("he-IL");

            var e_date = new Date(parseInt(row.Actual_task.End_date.replace('/Date(', '')));
            e_date = e_date.toLocaleDateString("he-IL");

            var btnStr = "";
            var showBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-success btn-sm m-b-5' id='show' title='פרטים נוספים'><i class='fa fa-wpforms'></i></button>";
            var editBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-primary btn-sm m-b-5' id='edit' title='עריכה'><i class='ti-pencil'></i></button>";
            btnStr += showBtn + " " + editBtn;

            RequestsTaskTable.row.add([row.Actual_task.Id, row.Actual_task.Title, row.Request.Title, row.Actual_task.Created_by.First_name, row.Actual_task.Assign_to.First_name, s_date, e_date, row.Actual_task.Status.Title, btnStr]).draw("false");
        });

        $('#datatable-buttons2').find('tbody').on('click', '#show', function () {
            var data = RequestsTaskTable.row($(this).parents('tr')).data();
            var arr_details = { taskID: data[0], func: "show", status: data[7] };
            setToLocalStorage(localStorageConstants.requests.RequestsTasksList,arr_details);
            location.href = "../../../pages/taskForm.html";
        });

        $('#datatable-buttons2').find('tbody').on('click', '#edit', function () {
            var data = RequestsTaskTable.row($(this).parents('tr')).data();
            var arr_details = { taskID: data[0], func: "edit", status: data[7] };
            setToLocalStorage(localStorageConstants.requests.RequestsTasksList,arr_details);
            location.href = "../../../pages/taskForm.html";
        });

        $('#activeRequestsTasks').change(function () {
            refreshRequestsTaskTable();
        });

        RequestsTaskTable.buttons().container()
            .appendTo('#datatable-buttons2_wrapper .col-md-6:eq(0)');
    }

    function refreshRequestsTaskTable() {
        var allRequestsTasks = getFromLocalStorage(localStorageConstants.requests.RequestsTasksList);
        var active = $("#activeRequestsTasks").prop('checked');
        RequestsTaskTable.clear().draw();

        if (active === true) {
            $.each(allRequestsTasks, function (index, row) {

                if (row.Actual_task.Status.Title === "סגורה") {
                    return true;
                }

                var s_date = new Date(parseInt(row.Actual_task.Start_date.replace('/Date(', '')));
                s_date = s_date.toLocaleDateString("he-IL");

                var e_date = new Date(parseInt(row.Actual_task.End_date.replace('/Date(', '')));
                e_date = e_date.toLocaleDateString("he-IL");

                var btnStr = "";
                var showBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-success btn-sm m-b-5' id='show' title='פרטים נוספים'><i class='fa fa-wpforms'></i></button>";
                var editBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-primary btn-sm m-b-5' id='edit' title='עריכה'><i class='ti-pencil'></i></button>";
                btnStr += showBtn + " " + editBtn;

                RequestsTaskTable.row.add([row.Actual_task.Id, row.Actual_task.Title, row.Request.Title, row.Actual_task.Created_by.First_name, row.Actual_task.Assign_to.First_name, s_date, e_date, row.Actual_task.Status.Title, btnStr]).draw("false");
            });
        }
        else {
            $.each(allRequestsTasks, function (index, row) {

                var s_date = new Date(parseInt(row.Actual_task.Start_date.replace('/Date(', '')));
                s_date = s_date.toLocaleDateString("he-IL");

                var e_date = new Date(parseInt(row.Actual_task.End_date.replace('/Date(', '')));
                e_date = e_date.toLocaleDateString("he-IL");

                var btnStr = "";
                var showBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-success btn-sm m-b-5' id='show' title='פרטים נוספים'><i class='fa fa-wpforms'></i></button>";
                var editBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-primary btn-sm m-b-5' id='edit' title='עריכה'><i class='ti-pencil'></i></button>";
                btnStr += showBtn + " " + editBtn;

                RequestsTaskTable.row.add([row.Actual_task.Id, row.Actual_task.Title, row.Request.Title, row.Actual_task.Created_by.First_name, row.Actual_task.Assign_to.First_name, s_date, e_date, row.Actual_task.Status.Title, btnStr]).draw("false");
            });
        }
    }
});



