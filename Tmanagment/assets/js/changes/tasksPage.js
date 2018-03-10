var configuration = {

    staticData: true

};



$(document).ready(function () {


    var allTasks;

    if (!configuration.staticData) {
        getAllTasks(getAllTasksCB, getAllTasksError);

        function getAllTasksCB(results) {


            allTasks = $.parseJSON(results.d);
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
            select: true


        });
        //Buttons examples
        $.each(allTasks, function (index, row) {
            table.row.add([row.Id, row.Title, row.Description, row.Start_date, row.End_date, row.Created_by.First_name, row.Assign_to.First_name]).draw("false");
        });

        // Key Tables

        $('#key-table').DataTable({
            keys: true
        });

        // Responsive Datatable
        $('#responsive-datatable').DataTable();

        // Multi Selection Datatable
        $('#selection-datatable').DataTable({
            select: {
                style: 'multi'
            }
        });
        table.buttons().container()
            .appendTo('#datatable-buttons_wrapper .col-md-6:eq(0)');
    }
});



