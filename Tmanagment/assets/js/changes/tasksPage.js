var configuration = {

    staticData: false

};


$(document).ready(function () {


    var allTasks;

    if (!configuration.staticData) {
        getAllTasks(getAllTasksCB, getAllTasksError);

        function getAllTasksCB(results) {

            allTasks = $.parseJSON(results.d);
            localStorage.taskList = allTasks;
            renderAllTaskTable(allTasks);

        }

        function getAllTasksError(error) {

            console.log(error);
        }
    }

    else {

        allTasks = [
            {
                "Id": 1,
                "Description": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta ",
                "Title": "Prof.",
                "Start_date": "1811-12-11T00:00:00",
                "End_date": "1939-02-20T00:00:00",
                "Created_by": {
                    "Id": 73,
                    "First_name": "Douglas",
                    "Last_name": null,
                    "Phone_number": 0,
                    "Title": null
                },
                "Assign_to": {
                    "Id": 1,
                    "First_name": "Lillian",
                    "Last_name": null,
                    "Phone_number": 0,
                    "Title": null
                }
            }
            ];
        renderAllTaskTable(allTasks);
    }

    function renderAllTaskTable(allTasks) {

        var table = $('#datatable-buttons').DataTable({
            lengthChange: false,
            buttons: ['copy', 'excel', 'pdf'],
            "oLanguage": {
                "sSearch": "<span>חיפוש:</span> _INPUT_" //search
            }

        });
        //Buttons examples
        $.each(allTasks, function (index, row) {

            var btnStr = "";
            var showBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-success btn-sm m-b-5' id='show' title='פרטים נוספים'><i class='fa fa-wpforms'></i></button>";
            var editBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-primary btn-sm m-b-5' id='edit' title='ערוך'><i class='ti-pencil'></i></button>";
            btnStr += showBtn + " " + editBtn;

            table.row.add([row.Id, row.Title, row.Description, row.Start_date, row.End_date, row.Created_by.First_name, row.Assign_to.First_name, btnStr]).draw("false");
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

        table.buttons().container()
            .appendTo('#datatable-buttons_wrapper .col-md-6:eq(0)');
    }
});



