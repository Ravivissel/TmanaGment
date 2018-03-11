$(document).ready(function () {

    var table = $('#datatable-buttons').DataTable({
        lengthChange: false,
        buttons: ['copy', 'excel', 'pdf'],
        "oLanguage": {
            "sSearch": "<span>חיפוש:</span> _INPUT_" //search
        }
    });

    table.buttons().container()
        .appendTo('#datatable-buttons_wrapper .col-md-6:eq(0)');

    addDataToTable();


    function addDataToTable() {
        table.clear().draw();

        //Need to change to be dynamic from the user login session
        const userId = 85;

        var groupid = userId;
        var request = {
            employeeId: groupid
        };

        getRequests(request, getRequestsCB, getRequestsErrorCB);
    }

    function getRequestsCB(result) {
        renderRequestsPage(result);
    }

    function getRequestsErrorCB(error) {
        console.log(error);
    }

    function renderRequestsPage(RequestsData) {
        results = $.parseJSON(RequestsData.d);
        $.each(results, function (i, row) {
            table.row.add([row.Title, row.Contact_name, row.Contact_phone, row.Assign_to.First_name]).draw(false);
        });
    }

});
