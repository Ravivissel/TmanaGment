$(document).ready(function () {

    var status = "פתוחה";
    var request = {
        status: status
    };
    getTasksNum(request, getOpenTasksNumCB, getOpenTasksNumErrorCB);
    var status = "בתהליך";
    var request = {
        status: status
    };
    getTasksNum(request, getOnProcessTasksNumCB, getOnProcessTasksNumErrorCB);
    getAllProjectsTasks(getAllProjectsTasksCB, getAllProjectsTasksErrorCB);
    getAllRequestsTasks(getAllRequestsTasksCB, getAllRequestsTasksErrorCB);

    function getAllProjectsTasksCB(results) {
        allProjectsTasks = $.parseJSON(results.d);
        GENERAL.TASKS.setProjectsTasksList(JSON.stringify(allProjectsTasks));
        renderAllProjectsTaskTable(allProjectsTasks);
    }

    function getAllProjectsTasksErrorCB(error) {
        console.log(error);
    }

    function getAllRequestsTasksCB(results) {
        allRequestsTasks = $.parseJSON(results.d);
        GENERAL.TASKS.setRequestsTasksList(JSON.stringify(allRequestsTasks));
        renderAllRequestsTaskTable(allRequestsTasks);
    }

    function getAllRequestsTasksErrorCB(error) {
        console.log(error);
    }

    function getOpenTasksNumCB(result) {
        counter = $.parseJSON(result.d);
        $('#openTasks').append(counter);
    }

    function getOpenTasksNumErrorCB(error) {
        console.log(error);
    }

    function getOnProcessTasksNumCB(result) {
        counter = $.parseJSON(result.d);
        $('#inProcessTasks').append(counter);
    }

    function getOnProcessTasksNumErrorCB(error) {
        console.log(error);
    }

    function renderAllProjectsTaskTable(allProjectsTasks) {

        ProjectsTaskTable = $('#datatable-buttons').DataTable({
            lengthChange: false,
            buttons: ['copy', 'excel', 'pdf'],
            "oLanguage": {
                "sSearch": "<span>חיפוש:</span> _INPUT_" //search
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
            var editBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-primary btn-sm m-b-5' id='edit' title='ערוך'><i class='ti-pencil'></i></button>";
            btnStr += showBtn + " " + editBtn;

            ProjectsTaskTable.row.add([row.Actual_task.Id, row.Actual_task.Title, row.Project.Title, row.Actual_task.Created_by.First_name, row.Actual_task.Assign_to.First_name, s_date, e_date, row.Actual_task.Status.Title, btnStr]).draw("false");
        });

        $('#datatable-buttons tbody').on('click', '#show', function () {
            var data = ProjectsTaskTable.row($(this).parents('tr')).data();
            arr_details = { taskID: data[0], func: "show", status: data[7] };
            GENERAL.TASKS.setProjectsTasksList(JSON.stringify(arr_details));
            location.href = "taskForm.html";
        });

        $('#datatable-buttons tbody').on('click', '#edit', function () {
            var data = ProjectsTaskTable.row($(this).parents('tr')).data();
            arr_details = { taskID: data[0], func: "edit", status: data[7] };
            GENERAL.TASKS.setProjectsTasksList(JSON.stringify(arr_details));
            location.href = "taskForm.html";
        });

        $('#activeProjectsTasks').change(function () {
            refreshProjectsTaskTable();
        }); 

        ProjectsTaskTable.buttons().container()
            .appendTo('#datatable-buttons_wrapper .col-md-6:eq(0)');
    }

    function refreshProjectsTaskTable() {
        allProjectsTasks = JSON.parse(GENERAL.TASKS.getProjectsTasksList());
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
                var editBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-primary btn-sm m-b-5' id='edit' title='ערוך'><i class='ti-pencil'></i></button>";
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
                var editBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-primary btn-sm m-b-5' id='edit' title='ערוך'><i class='ti-pencil'></i></button>";
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
                "sSearch": "<span>חיפוש:</span> _INPUT_" //search
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
            var editBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-primary btn-sm m-b-5' id='edit' title='ערוך'><i class='ti-pencil'></i></button>";
            btnStr += showBtn + " " + editBtn;

            RequestsTaskTable.row.add([row.Actual_task.Id, row.Actual_task.Title, row.Request.Title, row.Actual_task.Created_by.First_name, row.Actual_task.Assign_to.First_name, s_date, e_date, row.Actual_task.Status.Title, btnStr]).draw("false");
        });

        $('#datatable-buttons2 tbody').on('click', '#show', function () {
            var data = RequestsTaskTable.row($(this).parents('tr')).data();
            arr_details = { taskID: data[0], func: "show", status: data[7] };
            GENERAL.TASKS.setRequestsTasksList(JSON.stringify(arr_details));
            location.href = "taskForm.html";
        });

        $('#datatable-buttons2 tbody').on('click', '#edit', function () {
            var data = RequestsTaskTable.row($(this).parents('tr')).data();
            arr_details = { taskID: data[0], func: "edit", status: data[7] };
            GENERAL.TASKS.setRequestsTasksList(JSON.stringify(arr_details));
            location.href = "taskForm.html";
        });

        $('#activeRequestsTasks').change(function () {
            refreshRequestsTaskTable();
        });

        RequestsTaskTable.buttons().container()
            .appendTo('#datatable-buttons2_wrapper .col-md-6:eq(0)');
    }

    function refreshRequestsTaskTable() {
        allRequestsTasks = JSON.parse(GENERAL.TASKS.getRequestsTasksList());
        var active = $("#activeRequestsTasks").prop('checked');
        RequestsTaskTable.clear().draw();

        if (active == true) {
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
                var editBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-primary btn-sm m-b-5' id='edit' title='ערוך'><i class='ti-pencil'></i></button>";
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
                var editBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-primary btn-sm m-b-5' id='edit' title='ערוך'><i class='ti-pencil'></i></button>";
                btnStr += showBtn + " " + editBtn;

                RequestsTaskTable.row.add([row.Actual_task.Id, row.Actual_task.Title, row.Request.Title, row.Actual_task.Created_by.First_name, row.Actual_task.Assign_to.First_name, s_date, e_date, row.Actual_task.Status.Title, btnStr]).draw("false");
            });
        }
    }
});



