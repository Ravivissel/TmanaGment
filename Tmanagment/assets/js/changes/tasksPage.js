
$(document).ready(function () {

    getAllTasks(getAllTasksCB, getAllTasksError);

    function getAllTasksCB(results) {

        var allTasks = $.parseJSON(results.d);
        var table = $('#datatable-buttons').DataTable();

        $.each(allTasks, function (index, row) {

            table.row.add([row.Id, row.Title, row.Description, row.Start_date, row.End_date, row.Created_by.First_name, row.Assign_to.First_name]).draw("false");
           
        });
    
      

        //Buttons examples
        var table = $('#datatable-buttons').DataTable({
            lengthChange: false,
            buttons: ['copy', 'excel', 'pdf']
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



    };

    function getAllTasksError(error) {

        console.log(error);
    }
});



