$(document).ready(function () {

    //generate select options
    generateAssignToRequestList();
    generateProjectManagerList();
    generateCustomersList();

    //Assign to Request                      
    function generateAssignToRequestList() {
        //Need to change! no need for request here
        const userId = 65;
        var groupid = userId;
        var request = {
            employeeId: groupid
        };
        getRequests(request, getAssignToRequestListCB, getAssignToRequestListErrorCB);
    }

    function getAssignToRequestListCB(AssignToRequestListData) {
        var arr_AssignToRequest = $.parseJSON(AssignToRequestListData.d);
        GENERAL.REQUESTS.setRequestsList(JSON.stringify(arr_AssignToRequest));
        $select = $("#assign_to_request");
        $('<option>', { value: -1, text: 'בחר' }).attr({ 'selected': '', 'disabled': '' }).appendTo($select);
        for (i in arr_AssignToRequest) {
            if (arr_AssignToRequest[i].Status.Title != "סגורה") {
                $('<option>', { value: arr_AssignToRequest[i].Id, text: arr_AssignToRequest[i].Title }).appendTo($select);
            }
        }
    }

    function getAssignToRequestListErrorCB(error) {
        console.log(error);
    }

    //Assign to employee
    function generateProjectManagerList() {
        GetAssignToList(generateProjectManagerListCB, generateProjectManagerListErrorCB);
    }

    function generateProjectManagerListCB(AssignToListData) {
        var arr_AssignTo = $.parseJSON(AssignToListData.d);
        $select = $("#project_manager");
        $('<option>', { value: -1, text: 'בחר' }).attr({ 'selected': '', 'disabled': '' }).appendTo($select);
        for (i in arr_AssignTo) {
            $('<option>', { value: arr_AssignTo[i].Id, text: arr_AssignTo[i].First_name }).appendTo($select);
        }
    }

    function generateProjectManagerListErrorCB(error) {
        console.log(error);
    }

    //Assign to customer
    function generateCustomersList() {

        //Need to change to be dynamic from the user login session
        const userId = 85;

        var groupid = userId;
        var request = {
            employeeId: groupid
        };
        getCustomers(request, generateCustomersListCB, generateCustomersListErrorCB);
    }

    function generateCustomersListCB(customerData) {
        var arr_customer = $.parseJSON(customerData.d);
        $select = $("#customerCB");
        $('<option>', { value: -1, text: 'בחר' }).attr({ 'selected': '', 'disabled': '' }).appendTo($select);
        for (i in arr_customer) {
            $('<option>', { value: arr_customer[i].Id, text: arr_customer[i].First_name + " " + arr_customer[i].Last_name }).appendTo($select);
        }
    }

    function generateCustomersListErrorCB(error) {
        console.log(error);
    }

    //DatePicker end_date
    jQuery('#end_date').datepicker({
        toggleActive: true,
        clearBtn: true,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });

    $(document).on('click', '#createNCButton', function () {
        var hidden = false;
        changeState(hidden);
        $("#createNCButton").hide();
        $("#customer").hide();
        $("#customerCB").hide();
    });

    $(document).on('click', '#cancelButton', function () {
        var hidden = true;
        changeState(hidden);
        $("#createNCButton").show();
        $("#customer").show();
        $("#customerCB").show();
    });

    function changeState(state) {

        $("#customer_name").prop('hidden', state);
        $("#customer_nameCB").prop('hidden', state);
        $("#customer_f_name").prop('hidden', state);
        $("#customer_f_nameCB").prop('hidden', state);
        $("#customer_phone").prop('hidden', state);
        $("#customer_phoneCB").prop('hidden', state);
        $("#cancelButton").prop('hidden', state);
    }

    //fill the project name, contact name and contact phone if a request was choosen
    $('#assign_to_request').change(function () {
        arr_request = JSON.parse(GENERAL.REQUESTS.getRequestsList());
        request = $('#assign_to_request option:selected').val();
        $("#project_title").val(arr_request[request-1].Title);
        $("#contact_name").val(arr_request[request-1].Contact_name);
        $("#contact_phone").val(arr_request[request-1].Contact_phone);
        $("#request_id").val(arr_request[request-1].Id);
    });


});

