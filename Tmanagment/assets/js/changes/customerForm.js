//wait until the dom is loaded
$(document).ready(function () {


    var arr_customer = getFromLocalStorage(localStorageConstants.customers.customersList);
    if (arr_customer != 0) {
       var  arr_customer = getFromLocalStorage(localStorageConstants.customers.customersList);
        if (arr_customer.func == "edit" || arr_customer.func == "show") {
            uploadData(arr_customer.customerID);
            if (arr_customer.func == "show") {
                $("#first_name").attr('disabled', 'disabled');
                $("#last_name").attr('disabled', 'disabled');
                $("#phone_num").attr('disabled', 'disabled');
                $("#saveCustomer").prop('hidden', true);
            }
        }
        else {
            $("#backButton").prop('hidden', true);
            $("#projectTableDiv").prop('hidden', true);
        }
    }

    //function to fill form for edit
    function uploadData(customerID) {

        var request = {
            customerID: customerID
        };

        GetCustomer(request, getCustomerCB, getCustomerErrorCB);
        getCustomerProjects(request, getCustomerProjectsCB, getCustomerProjectsErrorCB);
    }

    function getCustomerCB(CustomerData) {

        var customerList = JSON.parse(CustomerData.d);
        setToLocalStorage(localStorageConstants.customers.customersList,customerList);

        $("#first_name").val(customer.First_name);
        $("#last_name").val(customer.Last_name);
        $("#phone_num").val(customer.Phone_num);
    }

    function getCustomerErrorCB(error) {
        console.log(error);
    }

    function getCustomerProjectsCB(results) {
        var customerProjectsData = $.parseJSON(results.d);
        renderCustomerProjects(customerProjectsData);
    }

    function getCustomerProjectsErrorCB(error) {
        console.log(error);
    }

    function renderCustomerProjects(customerProjectsData) {

        var table = $('#datatable-buttons').DataTable({
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

        $('#datatable-buttons_filter').find('label').css({ "float": "left" });

        $.each(customerProjectsData, function (i, row) {
            var s_date = new Date(parseInt(row.Start_date.replace('/Date(', '')));
            s_date = s_date.toLocaleDateString("he-IL");

            var e_date = new Date(parseInt(row.End_date.replace('/Date(', '')));
            e_date = e_date.toLocaleDateString("he-IL");

            table.row.add([row.Id, row.Title, row.Customer_id.First_name + " " + row.Customer_id.Last_name, row.Priority_key, s_date, e_date, row.Status.Title]).draw("false");
        });
    }

});





