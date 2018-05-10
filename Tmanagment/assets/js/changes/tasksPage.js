$(document).ready(function () {

    var status = "פתוחה"
    var request = {
        status: status
    };
    getTasksNum(request, getOpenTasksNumCB, getOpenTasksNumErrorCB);
    var status = "בתהליך"
    var request = {
        status: status
    };
    getTasksNum(request, getOnProcessTasksNumCB, getOnProcessTasksNumErrorCB);
    getAllTasks(getAllTasksCB, getAllTasksError);

    function getAllTasksCB(results) {
        allTasks = $.parseJSON(results.d);
        //localStorage.taskList = allTasks;
        GENERAL.TASKS.setTasksList(JSON.stringify(allTasks));
        renderAllTaskTable(allTasks);
    }

    function getAllTasksError(error) {
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

    function renderAllTaskTable(allTasks) {

        table = $('#datatable-buttons').DataTable({
            lengthChange: false,
            buttons: ['copy', 'excel', 'pdf'],
            "oLanguage": {
                "sSearch": "<span>חיפוש:</span> _INPUT_" //search
            }
        });

        //Buttons examples
        $.each(allTasks, function (index, row) {

            if (row.Status.Title == "סגורה") {
                return true;
            }

            var btnStr = "";
            var showBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-success btn-sm m-b-5' id='show' title='פרטים נוספים'><i class='fa fa-wpforms'></i></button>";
            var editBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-primary btn-sm m-b-5' id='edit' title='ערוך'><i class='ti-pencil'></i></button>";
            btnStr += showBtn + " " + editBtn;

            table.row.add([row.Id, row.Title, row.Created_by.First_name, row.Assign_to.First_name, row.Start_date, row.End_date, row.Status.Title, btnStr]).draw("false");
        });

        $('#datatable-buttons tbody').on('click', '#show', function () {
            var data = table.row($(this).parents('tr')).data();
            arr_details = { taskID: data[0], func: "show" };
            GENERAL.TASKS.setTasksList(JSON.stringify(arr_details));
            location.href = "taskForm.html";
        });

        $('#datatable-buttons tbody').on('click', '#edit', function () {
            var data = table.row($(this).parents('tr')).data();
            arr_details = { taskID: data[0], func: "edit" };
            GENERAL.TASKS.setTasksList(JSON.stringify(arr_details));
            location.href = "taskForm.html";
        });

        $('#activeTasks').change(function () {
            refreshTable();
        }); 

        table.buttons().container()
            .appendTo('#datatable-buttons_wrapper .col-md-6:eq(0)');
    }

    function refreshTable() {
        allTasks = JSON.parse(GENERAL.TASKS.getTasksList());
        var active = $("#activeTasks").prop('checked');
        table.clear().draw();

        if (active == true) {
            $.each(allTasks, function (index, row) {

                if (row.Status.Title == "סגורה") {
                    return true;
                }

                var btnStr = "";
                var showBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-success btn-sm m-b-5' id='show' title='פרטים נוספים'><i class='fa fa-wpforms'></i></button>";
                var editBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-primary btn-sm m-b-5' id='edit' title='ערוך'><i class='ti-pencil'></i></button>";
                btnStr += showBtn + " " + editBtn;

                table.row.add([row.Id, row.Title, row.Created_by.First_name, row.Assign_to.First_name, row.Start_date, row.End_date, row.Status.Title, btnStr]).draw("false");
            });
        }
        else {
            $.each(allTasks, function (index, row) {

                var btnStr = "";
                var showBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-success btn-sm m-b-5' id='show' title='פרטים נוספים'><i class='fa fa-wpforms'></i></button>";
                var editBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-primary btn-sm m-b-5' id='edit' title='ערוך'><i class='ti-pencil'></i></button>";
                btnStr += showBtn + " " + editBtn;

                table.row.add([row.Id, row.Title, row.Created_by.First_name, row.Assign_to.First_name, row.Start_date, row.End_date, row.Status.Title, btnStr]).draw("false");
            });
        }
    }
});



