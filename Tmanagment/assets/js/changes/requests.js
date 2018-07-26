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
                "sPrevious": "הקודם",
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
        var user = getFromLocalStorage(localStorageConstants.employees.user);

        var userId = user.Id;
        var userType = user.User_type;
        var request = {
            employeeId: userId,
            userType: userType
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
        var results = $.parseJSON(RequestsData.d);
        //localStorage.requestList = results;
        setToLocalStorage(localStorageConstants.requests.RequestsList, results);

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

        $('#datatable-buttons').find('tbody').on('click', '#show', function () {
            var data = table.row($(this).parents('tr')).data();
            var arr_details = {requestID: data[0], func: "show"};
            setToLocalStorage(localStorageConstants.requests.RequestsTasksList,arr_details);
            location.href = "../../../pages/requestsForm.html";
        });

        $('#datatable-buttons').find('tbody').on('click', '#edit', function () {
            var data = table.row($(this).parents('tr')).data();
            var arr_details = {requestID: data[0], func: "edit", status: data[5]};
            setToLocalStorage(localStorageConstants.requests.RequestsTasksList,arr_details);
            location.href = "../../../pages/requestsForm.html";
        });

        $('#activeRequests').change(function () {
            refreshTable();
        });
    }

    function refreshTable() {
        var results = getFromLocalStorage(localStorageConstants.requests.RequestsList);
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




