$(document).ready(function () {

    table = $('#datatable-buttons').DataTable({
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

        getCustomers(request, getCustomersCB, getCustomersErrorCB);
    }

    function getCustomersCB(result) {
        renderCustomersPage(result);
    }

    function getCustomersErrorCB(error) {
        console.log(error);
    }

    function renderCustomersPage(CustomersData) {
        results = $.parseJSON(CustomersData.d);
        //localStorage.customerList = results;
        GENERAL.CUSTOMERS.setCustomersList(JSON.stringify(results));

        $.each(results, function (i, row) {

            if (row.Active == "N") {
                return true;
            }

            var btnStr = "";
            var showBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-success btn-sm m-b-5' id='show' title='פרטים נוספים'><i class='fa fa-wpforms'></i></button>";
            var editBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-primary btn-sm m-b-5' id='edit' title='ערוך'><i class='ti-pencil'></i></button>";
            var deleteBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-danger btn-sm m-b-5' id='remove' title='הפוך ללא פעיל'><i class='fa fa-remove' ></i></button>";
            btnStr += showBtn + " " + editBtn + " " + deleteBtn;

            active = "פעיל";

            table.row.add([row.Id, row.First_name, row.Last_name, row.Phone_num, active, btnStr]).draw(false);
        });

        $('#datatable-buttons tbody').on('click', '#show', function () {
            var data = table.row($(this).parents('tr')).data();
            arr_details = { customerID: data[0], func: "show" };
            GENERAL.CUSTOMERS.setCustomersList(JSON.stringify(arr_details));
            location.href = "customerForm.html";
        });

        $('#datatable-buttons tbody').on('click', '#edit', function () {
            var data = table.row($(this).parents('tr')).data();
            arr_details = { customerID: data[0], func: "edit" };
            GENERAL.CUSTOMERS.setCustomersList(JSON.stringify(arr_details));
            location.href = "customerForm.html";
        });

        $('#datatable-buttons tbody').on('click', '#remove', function () {
            var data = table.row($(this).parents('tr')).data();
            swal({
                title: "אתה בטוח שברצונך להפוך את הלקוח ללא פעיל?",
                type: "warning",
                text: data[1] + " " + data[2],
                showCancelButton: true,
                cancelButtonText: "ביטול",
                confirmButtonClass: 'btn-warning',
                confirmButtonText: "אישור",
                closeOnConfirm: false
            }, function () {
                deactivateCustomer(data[0], 'N');
                swal({
                    title: "הלקוח הפך ללא פעיל",
                    timer: 1000,
                    type: "success",
                    showConfirmButton: false
                });
                setTimeout(function () { refreshPage() }, 1001);
            });
        });

        $('#datatable-buttons tbody').on('click', '#reactive', function () {
            var data = table.row($(this).parents('tr')).data();
            swal({
                title: "אתה בטוח שברצונך להפוך את הלקוח לפעיל?",
                type: "warning",
                text: data[1] + " " + data[2],
                showCancelButton: true,
                cancelButtonText: "ביטול",
                confirmButtonClass: 'btn-warning',
                confirmButtonText: "אישור",
                closeOnConfirm: false
            }, function () {
                deactivateCustomer(data[0], 'Y');
                swal({
                    title: "הלקוח הפך לפעיל",
                    timer: 1000,
                    type: "success",
                    showConfirmButton: false
                });
                setTimeout(function () { refreshPage() }, 1001);
            });
        });

        $('#activeCustomers').change(function () {
            refreshTable();
        }); 
    }

    function refreshPage() {
        location.href = "customers.html";
    }

    function refreshTable() {
        results = JSON.parse(GENERAL.CUSTOMERS.getCustomersList());
        var active = $("#activeCustomers").prop('checked');
        table.clear().draw();

        if (active == true) {
            $.each(results, function (i, row) {

                if (row.Active == "N") {
                    return true;
                }

                var btnStr = "";
                var showBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-success btn-sm m-b-5' id='show' title='פרטים נוספים'><i class='fa fa-wpforms'></i></button>";
                var editBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-primary btn-sm m-b-5' id='edit' title='ערוך'><i class='ti-pencil'></i></button>";
                var deleteBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-danger btn-sm m-b-5' id='remove' title='הפוך ללא פעיל'><i class='fa fa-remove' ></i></button>";
                btnStr += showBtn + " " + editBtn + " " + deleteBtn;

                active = "פעיל";

                table.row.add([row.Id, row.First_name, row.Last_name, row.Phone_num, active, btnStr]).draw(false);
            });
        }
        else {
            $.each(results, function (i, row) {

                if (row.Active == "Y") {
                    active = "פעיל";
                    var btnStr = "";
                    var showBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-success btn-sm m-b-5' id='show' title='פרטים נוספים'><i class='fa fa-wpforms'></i></button>";
                    var editBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-primary btn-sm m-b-5' id='edit' title='ערוך'><i class='ti-pencil'></i></button>";
                    var deleteBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-danger btn-sm m-b-5' id='remove' title='הפוך ללא פעיל'><i class='fa fa-remove' ></i></button>";
                    btnStr += showBtn + " " + editBtn + " " + deleteBtn;
                }
                else {
                    active = "לא פעיל";
                    var btnStr = "";
                    var showBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-success btn-sm m-b-5' id='show' title='פרטים נוספים'><i class='fa fa-wpforms'></i></button>";
                    var editBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-primary btn-sm m-b-5' id='edit' title='ערוך'><i class='ti-pencil'></i></button>";
                    var reactiveBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-warning btn-sm m-b-5' id='reactive' title='הפוך לפעיל'><i class='fa fa-undo' ></i></button>";
                    btnStr += showBtn + " " + editBtn + " " + reactiveBtn;
                }

                table.row.add([row.Id, row.First_name, row.Last_name, row.Phone_num, active, btnStr]).draw(false);
            });
        }
    }

    function deactivateCustomer(customerID, active) {
        var request = {
            customerID: customerID,
            active: active
        };
        DeactivateCustomer(request);
    }

});