$(document).ready(function () {

    $('a[href$="#next"]').text('הבא');
    $('a[href$="#previous"]').text('הקודם');
    $('a[href$="#finish"]').text('סיום');

    var user = getFromLocalStorage(localStorageConstants.employees.user);

    if (user.User_type === "B") {
        location.href = "../../../pages/index.html";
    }

    //generate select options
    generateAssignToRequestList();
    generateProjectManagerList();
    generateCustomersList();
    generateConstTasks();

    function generateConstTasks() {

        GetConstActualTasks(GetConstActualTasksCB, GetConstActualTasksErrorCB);

        function GetConstActualTasksCB(results) {

            var results = $.parseJSON(results.d);
            var tasks = JSON.stringify(results);

            var constTasks = $('#constTasks');
            $.each(results, function (val, result) {
                var dynamicLi = "<li class='dd-item' id={id} data-id={data-id}><div class='dd-handle'>{title}</div></li>";
                dynamicLi = dynamicLi.replace("{data-id}", result.Id);
                dynamicLi = dynamicLi.replace("{title}", result.Title);
                dynamicLi = dynamicLi.replace("{id}", "task" + result.Id);
                constTasks.append(
                    dynamicLi
                );
                $("#task" + result.Id).data("task", result);
            });

        }

        function GetConstActualTasksErrorCB(err) {
            console.log(err);
        }
    }

    //Assign to Request                      
    function generateAssignToRequestList() {
        var user = getFromLocalStorage(localStorageConstants.employees.user);
        var userId = user.Id;
        var userType = user.User_type;
        var request = {
            employeeId: userId,
            userType: userType
        };
        getRequests(request, getAssignToRequestListCB, getAssignToRequestListErrorCB);
    }

    function getAssignToRequestListCB(AssignToRequestListData) {
        var arr_AssignToRequest = $.parseJSON(AssignToRequestListData.d);
        setToLocalStorage(localStorageConstants.requests.RequestsList,arr_AssignToRequest);

        $select = $("#assign_to_request");
        $('<option>', {value: -1, text: 'בחר'}).attr({'selected': '', 'disabled': ''}).appendTo($select);
        for (i in arr_AssignToRequest) {
            if (arr_AssignToRequest[i].Status.Title != "סגורה") {
                $('<option>', {value: arr_AssignToRequest[i].Id, text: arr_AssignToRequest[i].Title}).appendTo($select);
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
        $('<option>', {value: -1, text: 'בחר'}).attr({'selected': '', 'disabled': ''}).appendTo($select);
        for (i in arr_AssignTo) {
            $('<option>', {value: arr_AssignTo[i].Id, text: arr_AssignTo[i].First_name}).appendTo($select);
        }
    }

    function generateProjectManagerListErrorCB(error) {
        console.log(error);
    }

    //Assign to customer
    function generateCustomersList() {
        getCustomers(generateCustomersListCB, generateCustomersListErrorCB);
    }

    function generateCustomersListCB(customerData) {
        var arr_customer = $.parseJSON(customerData.d);
        $select = $("#customerCB");
        $('<option>', {value: -1, text: 'בחר'}).attr({'selected': '', 'disabled': ''}).appendTo($select);
        for (i in arr_customer) {
            $('<option>', {
                value: arr_customer[i].Id,
                text: arr_customer[i].First_name + " " + arr_customer[i].Last_name
            }).appendTo($select);
        }
    }

    function generateCustomersListErrorCB(error) {
        console.log(error);
    }

    //DatePicker start_date
    jQuery('#start_date').datepicker({
        toggleActive: true,
        clearBtn: true,
        autoclose: true,
        format: 'dd.mm.yyyy'
    });

    //DatePicker end_date
    jQuery('#end_date').datepicker({
        toggleActive: true,
        clearBtn: true,
        autoclose: true,
        format: 'dd.mm.yyyy'
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

        var arr_request = getFromLocalStorage(localStorageConstants.requests.RequestsList);
        var request = $('#assign_to_request').find('option:selected').val();

        for (i in arr_request) {
            if (arr_request[i].Id == request) {
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
    $('#start_date').change(function () {
        $('#start_date2').val($(this).val());
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
    $('.dd').on('change', function () {
        $("#finish_tasks").html('');
        $('#finish_tasks').append($('#nestable_list_2').prop('outerHTML'));
    });

    $('#wizard-validation-form').find('a[href="#finish"]').click(function () {
        var project_title = $("#project_title").val();
        var project_manager = $("#project_manager").find("option:selected").val();
        var project_priority_num = $("#project_priority_num").val();
        var start_date = moment($("#start_date").datepicker('getDate')).format();
        var end_date = moment($("#end_date").datepicker('getDate')).format();
        var contact_name = $("#contact_name").val();
        var contact_phone = $("#contact_phone").val();
        var request_id = $("#request_id").val();
        var description = $("#description").val();
        var finish_tasks_list = $("#nestable_list_2").children().children();
        var tasks_array = [];

        finish_tasks_list.each(function (i, v) {
            // push in tasks array, an array of data-tasks
            tasks_array.push($(v).data('task'));
            tasks_array[i].Created_by = getFromLocalStorage(localStorageConstants.employees.user);
        });
        var string_tasks = JSON.stringify(tasks_array);

        //get the user id from session
        user = getFromLocalStorage(localStorageConstants.employees.user);
        var created_by = user.Id;

        if ($("#customerCB").find("option:selected").val() != -1) {
            var customer_id = $("#customerCB").find("option:selected").val();
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

        var request = {
            project_title: project_title,
            project_manager: project_manager,
            project_priority_num: project_priority_num,
            start_date: start_date,
            end_date: end_date,
            contact_name: contact_name,
            contact_phone: contact_phone,
            request_id: request_id,
            description: description,
            created_by: created_by,
            customer_id: customer_id,
            customer_name: customer_name,
            customer_f_name: customer_f_name,
            customer_phone: customer_phone,
            actual_tasks: string_tasks
        };
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
        setTimeout(function () {
            returnToOpenProjectsPage();
        }, 1001);
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
        location.href = "../../../pages/openedProjects.html";
    }

});

