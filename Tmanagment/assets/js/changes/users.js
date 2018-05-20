$(document).ready(function () {

    table = $('#datatable-buttons').DataTable({
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
                "sPrevious": "קודם",
                "sNext": "הבא",
                "sLast": "אחרון"
            }
        }
    });

    table.buttons().container()
        .appendTo('#datatable-buttons_wrapper .col-md-6:eq(0)');

    var request = {
        id: null
    }

    GetEmployees(request, getEmployeesCB, getEmployeesError);
    $('#datatable-buttons tbody').on('click', '#edit', function () {
        var data = table.row($(this).parents('tr')).data();
        var arr_details = { userID: data[0], func: "edit" };
         GENERAL.USERS.setUser(JSON.stringify(arr_details));
         location.href = "userForm.html";
    });

    function getEmployeesCB(results) {
        renderEmployeesTable(results);
    }

    function getEmployeesError(err) {
        console.log(err);
    }

    function renderEmployeesTable(employeesData) {

        var results = $.parseJSON(employeesData.d);
        $.each(results, function (i, row) {

            var btnStr = "";
            var editBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-primary btn-sm m-b-5' id='edit' title='עריכה'><i class='ti-pencil'></i></button>";
            btnStr += editBtn;

            table.row.add([row.Id, row.First_name, row.Last_name, row.Phone_number, row.Title, row.User_name, row.User_type, btnStr]).draw(false);
        });
    }
});


