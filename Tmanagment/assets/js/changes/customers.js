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
        localStorage.customerList = results;
        $.each(results, function (i, row) {

            var btnStr = "";
            var showBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-success btn-sm m-b-5' id='show' title='פרטים נוספים'><i class='fa fa-wpforms'></i></button>";
            var editBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-primary btn-sm m-b-5' id='edit' title='ערוך'><i class='ti-pencil'></i></button>";
            btnStr += showBtn + " " + editBtn;

            table.row.add([row.Id, row.First_name, row.Last_name, row.Phone_num , btnStr]).draw(false);
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
    }
});