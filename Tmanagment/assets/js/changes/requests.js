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
        //localStorage.requestList = results;
        GENERAL.REQUESTS.setRequestsList(JSON.stringify(results));

        $.each(results, function (i, row) {

            if (row.Status.Title == "סגורה") {
                return true;
            }

            var btnStr = "";
            var showBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-success btn-sm m-b-5' id='show' title='פרטים נוספים'><i class='fa fa-wpforms'></i></button>";
            var editBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-primary btn-sm m-b-5' id='edit' title='ערוך'><i class='ti-pencil'></i></button>";
            btnStr += showBtn + " " + editBtn;

            table.row.add([row.Id, row.Title, row.Contact_name, row.Contact_phone, row.Assign_to.First_name, row.Status.Title, btnStr]).draw(false);
        });

        $('#datatable-buttons tbody').on('click', '#show', function () {
            var data = table.row($(this).parents('tr')).data();
            arr_details = { requestID: data[0], func: "show", status: data[5] };
            GENERAL.REQUESTS.setRequestsList(JSON.stringify(arr_details));
            location.href = "requestsForm.html";
        });

        $('#datatable-buttons tbody').on('click', '#edit', function () {
            var data = table.row($(this).parents('tr')).data();
            arr_details = { requestID: data[0], func: "edit", status: data[5] };
            GENERAL.REQUESTS.setRequestsList(JSON.stringify(arr_details));
            location.href = "requestsForm.html";
        });

        $('#activeRequests').change(function () {
            refreshTable();
        }); 
    }

    function refreshTable() {
        results = JSON.parse(GENERAL.REQUESTS.getRequestsList());
        var active = $("#activeRequests").prop('checked');
        table.clear().draw();

        if (active == true) {
            $.each(results, function (i, row) {

                if (row.Status.Title == "סגורה") {
                    return true;
                }

                var btnStr = "";
                var showBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-success btn-sm m-b-5' id='show' title='פרטים נוספים'><i class='fa fa-wpforms'></i></button>";
                var editBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-primary btn-sm m-b-5' id='edit' title='ערוך'><i class='ti-pencil'></i></button>";
                btnStr += showBtn + " " + editBtn;

                table.row.add([row.Id, row.Title, row.Contact_name, row.Contact_phone, row.Assign_to.First_name, row.Status.Title, btnStr]).draw(false);
            });
        }
        else {
            $.each(results, function (i, row) {

                var btnStr = "";
                var showBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-success btn-sm m-b-5' id='show' title='פרטים נוספים'><i class='fa fa-wpforms'></i></button>";
                var editBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-primary btn-sm m-b-5' id='edit' title='ערוך'><i class='ti-pencil'></i></button>";
                btnStr += showBtn + " " + editBtn;

                table.row.add([row.Id, row.Title, row.Contact_name, row.Contact_phone, row.Assign_to.First_name, row.Status.Title, btnStr]).draw(false);
            });
        }
    }
});




