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
        $("#customerCB").prop('disabled', true);
        $("#createNCButton").hide();
        $("#customer").hide();
        $("#customerCB").hide();
    });

    $(document).on('click', '#cancelButton', function () {
        var hidden = true;
        changeState(hidden);
        $("#customerCB").prop('disabled', false);
        $("#createNCButton").show();
        $("#customer").show();
        $("#customerCB").show();
    });

    function changeState(state) {
        $("#customer_name").prop('hidden', state);
        $("#customer_nameCB").prop('hidden', state);
        $("#customer_nameCB").prop('disabled', state);
        $("#customer_f_name").prop('hidden', state);
        $("#customer_f_nameCB").prop('hidden', state);
        $("#customer_f_nameCB").prop('disabled', state);
        $("#customer_phone").prop('hidden', state);
        $("#customer_phoneCB").prop('hidden', state);
        $("#customer_phoneCB").prop('disabled', state);
        $("#cancelButton").prop('hidden', state);
    }

    //fill the project name, contact name and contact phone after the request was choosen
    $('#assign_to_request').change(function () {
        arr_request = JSON.parse(GENERAL.REQUESTS.getRequestsList());
        request = $('#assign_to_request option:selected').val();
        for (i in arr_request) {
            if (arr_request[i].Id == request)
            {
                $("#project_title").val(arr_request[i].Title);
                $("#contact_name").val(arr_request[i].Contact_name);
                $("#contact_phone").val(arr_request[i].Contact_phone);
                $("#request_id").val(arr_request[i].Id);
            }
        }
    });

    //fill the finish section starts here
    $('#assign_to_request').change(function () {
        $('#project_title2').val($('#project_title').val());
        $('#contact_name2').val($('#contact_name').val());
        $('#contact_phone2').val($('#contact_phone').val());
    });
    $('#project_title').change(function () {
        $('#project_title2').val($(this).val());
    });
    $('#contact_name').change(function () {
        $('#contact_name2').val($(this).val());
    });
    $('#contact_phone').change(function () {
        $('#contact_phone2').val($(this).val());
    });
    $('#project_manager').change(function () {
        $('#project_manager2').val($(this).find(":selected").text());
    });
    $('#project_priority_num').change(function () {
        $('#project_priority_num2').val($(this).val());
    });
    $('#end_date').change(function () {
        $('#end_date2').val($(this).val());
    });
    $('#description').change(function () {
        $('#description2').val($(this).val());
    });
    $('#customerCB').change(function () {
        $('#customer2').val($(this).find(":selected").text());
    });
    $('#customer_f_nameCB').change(function () {
        $('#customer2').val($('#customer_nameCB').val() + " " + $(this).val());
    });

    $('#wizard-validation-form').find('a[href="#finish"]').click(function () {
        var project_title = $("#project_title").val();
        var project_manager = $("#project_manager option:selected").val();
        var project_priority_num = $("#project_priority_num").val();
        var end_date = $("#end_date").val();
        var contact_name = $("#contact_name").val();
        var contact_phone = $("#contact_phone").val();
        var request_id = $("#request_id").val();
        var description = $("#description").val();
        var created_by = "1"; // change to be the actual user

        if ($("#customerCB option:selected").val() != -1) {
            var customer_id = $("#customerCB option:selected").val();
            var customer_name = -1;
            var customer_f_name = -1;
            var customer_phone = -1;
        }
        else {
            var customer_name = $("#customer_nameCB").val();
            var customer_f_name = $("#customer_f_nameCB").val();
            var customer_phone = $("#customer_phoneCB").val();
            var customer_id = -1;
        }

        var request = { project_title: project_title, project_manager: project_manager, project_priority_num: project_priority_num, end_date: end_date, contact_name: contact_name, contact_phone: contact_phone, request_id: request_id, description: description, created_by: created_by, customer_id: customer_id, customer_name: customer_name, customer_f_name: customer_f_name, customer_phone: customer_phone };
        //call the ajax func
        insertNewProject(request, insertNewProjectCB, insertNewProjectErrorCB);
    });

    function insertNewProjectCB(result) {
        swal({
            title: "נשמר",
            type: "success",
            timer: 1000,
            showConfirmButton: false
        });
        // send user to openProjects page
        setTimeout(function () { returnToOpenProjectsPage(); }, 1001);
    }

    function insertNewProjectErrorCB(error) {
        sweetAlertError();
        console.log(error);
    }

    function sweetAlertError() {
        swal({
            title: "שמירת הפרוייקט נכשלה",
            type: "warning",
            timer: 1000,
            showConfirmButton: false
        });
    }

    function returnToOpenProjectsPage() {
        location.href = "openedProjects.html";
    }

});

