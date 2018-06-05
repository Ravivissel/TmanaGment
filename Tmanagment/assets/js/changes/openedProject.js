var resizefunc = [];
//wait until the dom is loaded
$(document).ready(function () {
    
    //generate select options
    generateProjectManagerList();
    generateCustomersList();

    //Assign to employee
    function generateProjectManagerList() {
        GetAssignToList(generateProjectManagerListCB, generateProjectManagerListErrorCB);
    }

    function generateProjectManagerListCB(ProjectManagerListData) {
        var arr_ProjectManager = $.parseJSON(ProjectManagerListData.d);
        $select = $("#project_manager");
        $('<option>', { value: -1, text: 'בחר' }).attr({ 'selected': '', 'disabled': '' }).appendTo($select);
        for (i in arr_ProjectManager) {
            $('<option>', { value: arr_ProjectManager[i].Id, text: arr_ProjectManager[i].First_name }).appendTo($select);
        }
    }

    function generateProjectManagerListErrorCB(error) {
        console.log(error);
    }

    function generateCustomersList() {
        getCustomers(generateCustomersListCB, generateCustomersListErrorCB);
    }

    function generateCustomersListCB(customerData) {
        var arr_customer = $.parseJSON(customerData.d);
        $select = $("#project_customer");
        $('<option>', { value: -1, text: 'בחר' }).attr({ 'selected': '', 'disabled': '' }).appendTo($select);
        for (i in arr_customer) {
            $('<option>', { value: arr_customer[i].Id, text: arr_customer[i].First_name + " " + arr_customer[i].Last_name }).appendTo($select);
        }
    }

    function generateCustomersListErrorCB(error) {
        console.log(error);
    }

    try {
        var projectId = JSON.parse(GENERAL.PROJECTS.getOpenProjectClicked());
        if (projectId) {
            getProjectFromServer(projectId);
        }
    }
    catch (err) {
        console.log(err);
        throw err;
    }

    //function to fill form for edit
    function getProjectFromServer(projectId) {
        try {
            var request = {
                projectId: projectId
            };
            GetProject(request, getProjectCB, getProjectError);
            getProjectTasksList(request, getProjectTasksListCB, getProjectTasksListErrorCB);
            getProjectExpenses(request, getProjectExpensesCB, getProjectExpensesErrorCB);
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }

    function getProjectCB(projectResult) {
        try {
            var projects = JSON.parse(projectResult.d);
            GENERAL.PROJECTS.setOpenedProjectsList(JSON.stringify(projects));
            renderPage(projects[0]);
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }

    function renderPage(project) {
        try {

            var s_date = new Date(moment(project.Start_date).format());
            s_date = s_date.toLocaleDateString("he-IL");

            var e_date = new Date(moment(project.End_date).format());
            e_date = e_date.toLocaleDateString("he-IL");

            //DatePicker end_date
            $('#start_date').datepicker({
                toggleActive: true,
                clearBtn: true,
                autoclose: true,
                format: 'dd.mm.yyyy'
            });

            //DatePicker end_date
            $('#end_date').datepicker({
                toggleActive: true,
                clearBtn: true,
                autoclose: true,
                format: 'dd.mm.yyyy'
            });

            $("#project_title").val(project.Title);
            $("#project_id").val(project.Id);
            $("#project_priority_num").val(project.Priority_key);
            $("#project_manager").val(project.Project_manager.Id);
            $("#project_customer").val(project.Customer_id.Id);
            $("#end_date").datepicker('setDate', e_date);
            $("#start_date").datepicker('setDate', s_date);
            $("#contact_name").val(project.Contact_name);
            $("#contact_phone").val(project.Contact_phone);
            $("#status").val(project.Status.Id);
            $("#description").val(project.Description);
            $("#timeline" + project.Status.Id).click();
            $(".state").addClass("isDisabled");
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    $(".state").on('click', function (event) {
        {
            if ($(".state").hasClass("isDisabled")) {
                event.stopImmediatePropagation();
                event.preventDefault();
            }
            else {
                $("#status").val($(event.target).attr('id').replace("timeline",""));
            }
        }
    });
    $("#status").on('change', function(){
        var statusId = $("#status").val();
        $("#timeline" + statusId).click();
    });

    $(document).on('click', '#editButton', function () {
        var hidden = false;
        changeFormState(hidden);
        $("#editButton").hide();
        $("#BackButton").hide();
    });

    $(document).on('click', '#cancelButton', function () {
        var hidden = true;
        changeFormState(hidden);
        $("#editButton").show();
        $("#BackButton").show();
    });

    $("#projectForm").submit(function (e) {
        e.preventDefault();
    }).validate({
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        // Rules for form validation
        rules: {
            project_title: {
                required: true
            },
            project_manager: {
                required: true
            },
            project_priority_num: {
                required: true
            },
            project_customer: {
                required: true
            },
            end_date: {
                required: true,
                greaterThan: ["#start_date", "תאריך התחלת הפרוייקט"]
            },
            start_date: {
                required: true
            },
            status: {
                required: true
            }
        },

        submitHandler: function (form, event) {
            event.preventDefault();
            var projects = JSON.parse(GENERAL.PROJECTS.getOpenedProjectsList());
            var project = projects[0];

            project.Title = $("#project_title").val();
            project.Project_manager.Id = $("#project_manager").val();
            project.Priority_key = $("#project_priority_num").val();
            project.Customer_id.Id = $("#project_customer").val();
            project.End_date = moment($("#end_date").datepicker('getDate')).format();
            project.Start_date = moment($("#start_date").datepicker('getDate')).format();
            project.Contact_name = $("#contact_name").val();
            project.Contact_phone = $("#contact_phone").val();
            project.Status.Id = $("#status").val();
            project.Description = $("#description").val();

            projects[0] = project;

            var projectsString = JSON.stringify(projects);

            var request = {
                projects: projectsString
            };
            UpdateProject(request, UpdateProjectCB, UpdateProjectError);

        },
        // Messages for form validation
        messages: {
            project_title: {
                required: "אנא הזן שם פרוייקט"
            },
            project_manager: {
                required: "אנא בחר מנהל פרוייקט"
            },
            project_priority_num: {
                required: "אנא הזן מספר פרוייקט מהפריוריטי"
            },
            project_customer: {
                required: "אנא הזן לקוח"
            },
            end_date: {
                required: "אנא בחר תאריך סיום"
            },
            start_date: {
                required: "אנא בחר תאריך התחלה"
            },
            status: {
                required: "אנא בחר סטטוס פרוייקט"
            }
      
        }

    });

    jQuery.validator.addMethod("greaterThan", function () {
        var End_date = $("#end_date").datepicker('getDate');
        var Start_date = $("#start_date").datepicker('getDate');

        return End_date >= Start_date;
    
    }, 'תאריך יעד הפרוייקט חייב להיות מוגדר לאחר או באותו תאריך ההתחלה');

    function UpdateProjectCB(result) {
        sweetAlertSuccess();
        setTimeout(function () { returnToProjectsPage(); }, 1001);
    }

    function UpdateProjectError(err) {
        sweetAlertError();
        console.log(err);
    }

    function sweetAlertSuccess() {
        swal({
            title: "נשמר",
            type: "success",
            timer: 1000,
            showConfirmButton: false
        });
    }

    function sweetAlertError() {
        swal({
            title: "שמירת הפרוייקט נכשלה",
            type: "warning",
            timer: 1000,
            showConfirmButton: false
        });
    }

    function changeFormState(state) {
        $("#project_title").prop('disabled', state);
        $("#project_manager").prop('disabled', state);
        $("#project_priority_num").prop('disabled', state);
        $("#project_customer").prop('disabled', state);
        $("#end_date").prop('disabled', state);
        $("#start_date").prop('disabled', state);
        $("#contact_name").prop('disabled', state);
        $("#contact_phone").prop('disabled', state);
        $("#status").prop('disabled', state);
        $("#description").prop('disabled', state);
        $("#saveButton").prop('hidden', state);
        $("#editButton").hide();
        $("#cancelButton").prop('hidden', state);

        if (state == false) {
            $(".state").removeClass("isDisabled");
        }
        else {

            $(".state").addClass("isDisabled");
        }
    }

    function getProjectError(error) {
        console.log(err);
        throw error;
    }

    function returnToProjectsPage() {
        location.href = "openedProjects.html";
    }

    function getProjectTasksListCB(results) {
        allProjectsTasks = $.parseJSON(results.d);
        GENERAL.TASKS.setProjectsTasksList(JSON.stringify(allProjectsTasks));
        renderAllProjectsTaskTable(allProjectsTasks);
    }

    function getProjectTasksListErrorCB(error) {
        console.log(error);
    }

    function renderAllProjectsTaskTable(allProjectsTasks) {

        ProjectsTaskTable = $('#datatable-buttons').DataTable({
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

        $('#datatable-buttons_filter').find('label').css({ "float": "left" });

        //Buttons examples
        $.each(allProjectsTasks, function (index, row) {

            if (row.Actual_task.Status.Title == "סגורה") {
                return true;
            }

            var s_date = new Date(parseInt(row.Actual_task.Start_date.replace('/Date(', '')));
            s_date = s_date.toLocaleDateString("he-IL");

            var e_date = new Date(parseInt(row.Actual_task.End_date.replace('/Date(', '')));
            e_date = e_date.toLocaleDateString("he-IL");

            var btnStr = "";
            var showBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-success btn-sm m-b-5' id='show' title='פרטים נוספים'><i class='fa fa-wpforms'></i></button>";
            var editBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-primary btn-sm m-b-5' id='edit' title='עריכה'><i class='ti-pencil'></i></button>";
            btnStr += showBtn + " " + editBtn;

            ProjectsTaskTable.row.add([row.Actual_task.Id, row.Actual_task.Title, row.Project.Title, row.Actual_task.Created_by.First_name, row.Actual_task.Assign_to.First_name, s_date, e_date, row.Actual_task.Status.Title, btnStr]).draw("false");
        });

        $('#datatable-buttons tbody').on('click', '#show', function () {
            var data = ProjectsTaskTable.row($(this).parents('tr')).data();
            arr_details = { taskID: data[0], func: "show", proj: "proj" };
            GENERAL.TASKS.setProjectsTasksList(JSON.stringify(arr_details));
            location.href = "taskForm.html";
        });

        $('#datatable-buttons tbody').on('click', '#edit', function () {
            var data = ProjectsTaskTable.row($(this).parents('tr')).data();
            arr_details = { taskID: data[0], func: "edit", proj: "proj" };
            GENERAL.TASKS.setProjectsTasksList(JSON.stringify(arr_details));
            location.href = "taskForm.html";
        });

        $('#activeProjectsTasks').change(function () {
            refreshProjectsTaskTable();
        });

        ProjectsTaskTable.buttons().container()
            .appendTo('#datatable-buttons_wrapper .col-md-6:eq(0)');
    }

    function refreshProjectsTaskTable() {
        allProjectsTasks = JSON.parse(GENERAL.TASKS.getProjectsTasksList());
        var active = $("#activeProjectsTasks").prop('checked');
        ProjectsTaskTable.clear().draw();

        if (active == true) {
            $.each(allProjectsTasks, function (index, row) {

                if (row.Actual_task.Status.Title == "סגורה") {
                    return true;
                }

                var s_date = new Date(parseInt(row.Actual_task.Start_date.replace('/Date(', '')));
                s_date = s_date.toLocaleDateString("he-IL");

                var e_date = new Date(parseInt(row.Actual_task.End_date.replace('/Date(', '')));
                e_date = e_date.toLocaleDateString("he-IL");

                var btnStr = "";
                var showBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-success btn-sm m-b-5' id='show' title='פרטים נוספים'><i class='fa fa-wpforms'></i></button>";
                var editBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-primary btn-sm m-b-5' id='edit' title='עריכה'><i class='ti-pencil'></i></button>";
                btnStr += showBtn + " " + editBtn;

                ProjectsTaskTable.row.add([row.Actual_task.Id, row.Actual_task.Title, row.Project.Title, row.Actual_task.Created_by.First_name, row.Actual_task.Assign_to.First_name, s_date, e_date, row.Actual_task.Status.Title, btnStr]).draw("false");
            });
        }
        else {
            $.each(allProjectsTasks, function (index, row) {

                var s_date = new Date(parseInt(row.Actual_task.Start_date.replace('/Date(', '')));
                s_date = s_date.toLocaleDateString("he-IL");

                var e_date = new Date(parseInt(row.Actual_task.End_date.replace('/Date(', '')));
                e_date = e_date.toLocaleDateString("he-IL");

                var btnStr = "";
                var showBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-success btn-sm m-b-5' id='show' title='פרטים נוספים'><i class='fa fa-wpforms'></i></button>";
                var editBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-primary btn-sm m-b-5' id='edit' title='עריכה'><i class='ti-pencil'></i></button>";
                btnStr += showBtn + " " + editBtn;

                ProjectsTaskTable.row.add([row.Actual_task.Id, row.Actual_task.Title, row.Project.Title, row.Actual_task.Created_by.First_name, row.Actual_task.Assign_to.First_name, s_date, e_date, row.Actual_task.Status.Title, btnStr]).draw("false");
            });
        }
    }

    $(document).on('click', '#newExpense', function () {
        $("#expense_assign_to").val($("#project_title").val());
    });

    $("#expenseForm").submit(function (e) {
        e.preventDefault();
    }).validate({
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        },

        // Rules for form validation
        rules: {
            expense_desc: {
                required: true
            },
            expense_type: {
                required: true
            },
            expense_amount: {
                required: true,
                number: true
            }
        },

        submitHandler: function (form, event) {
            event.preventDefault();

            var expense_desc = $("#expense_desc").val();
            var expense_assign_to = $("#project_id").val();
            var expense_type = $("#expense_type option:selected").val();
            var expense_amount = $("#expense_amount").val();
            var expense_img_name = ""; /*$("#expense_img").val();*/
            //get the user id from session
            user = JSON.parse(GENERAL.EMPLOYEES.getEmployee());
            var created_by = user.Id;           
            var request = { expense_desc: expense_desc, expense_assign_to: expense_assign_to, expense_type: expense_type, expense_amount: expense_amount, expense_img_name: expense_img_name, created_by: created_by };
            //call the ajax func
            setExpense(request, setExpenseCB, setExpenseCBError);

        },

        // Messages for form validation
        messages: {
            expense_desc: {
                required: "אנא הזן תיאור הוצאה"
            },
            expense_type: {
                required: "אנא בחר סוג הוצאה"
            },
            expense_amount: {
                required: "אנא הזן סכום",
                number: "הכנס רק ספרות"
            }
        }

    });

    function setExpenseCB(result) {
        sweetAlertSuccess();
        setTimeout(function () { returnToOpenProjectPage(); }, 1001);
    }

    function setExpenseCBError(err) {
        sweetAlertExpenseError();
        console.log(err);
    }

    function sweetAlertExpenseError() {
        swal({
            title: "שמירת ההוצאה נכשלה",
            type: "warning",
            timer: 1000,
            showConfirmButton: false
        });
    }

    function returnToOpenProjectPage() {
        location.href = "openedProject.html";
    }

    function getProjectExpensesCB(results) {
        allProjectsExpenses = $.parseJSON(results.d);
        renderAllProjectsExpensesTable(allProjectsExpenses);
    }

    function getProjectExpensesErrorCB(error) {
        console.log(error);
    }

    function renderAllProjectsExpensesTable(allProjectsExpenses) {

        ProjectsExpensesTable = $('#datatable-buttons2').DataTable({
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

        $('#datatable-buttons2_filter').find('label').css({ "float": "left" });

        total_expenses = 0;

        //Buttons examples
        $.each(allProjectsExpenses, function (index, row) {

            var btnStr = "";
            if (row.Expense.Active == "Y") {
                var deleteBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-danger btn-sm m-b-5' id='remove' title='מחק'><i class='fa fa-remove' ></i></button>";
                btnStr += deleteBtn;
                total_expenses += row.Expense.Amount;
            }
            else {
                var reactiveBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-warning btn-sm m-b-5' id='reactive' title='שחזר'><i class='fa fa-undo' ></i></button>";
                btnStr += reactiveBtn;
            }

            var created_date = new Date(parseInt(row.Expense.Created_at.replace('/Date(', '')));
            created_date = created_date.toLocaleDateString("he-IL");

            if (row.Expense.Type == 1) {
                typeName = "תקורה";
            }
            else if (row.Expense.Type == 2) {
                typeName = "חנייה";
            }
            else if (row.Expense.Type == 3) {
                typeName = "דלק";
            }
            else typeName = "אחר";

            ProjectsExpensesTable.row.add([row.Expense.Id, row.Expense.Description, row.Project.Title, row.Expense.Created_by.First_name, created_date, typeName, row.Expense.Amount, btnStr]).draw("false");
        });

        $('#datatable-buttons2 tbody').on('click', '#remove', function () {
            var data = ProjectsExpensesTable.row($(this).parents('tr')).data();
            swal({
                title: "אתה בטוח שברצונך למחוק את ההוצאה?",
                type: "warning",
                text: data[1],
                showCancelButton: true,
                cancelButtonText: "ביטול",
                confirmButtonClass: 'btn-warning',
                confirmButtonText: "אישור",
                closeOnConfirm: false
            }, function () {
                deactivateExpense(data[0], 'N');
                swal({
                    title: "ההוצאה נמחקה",
                    timer: 1000,
                    type: "success",
                    showConfirmButton: false
                });
                setTimeout(function () { refreshPage(); }, 1001);
            });
        });

        $('#datatable-buttons2 tbody').on('click', '#reactive', function () {
            var data = ProjectsExpensesTable.row($(this).parents('tr')).data();
            swal({
                title: "אתה בטוח שברצונך לשחזר את ההוצאה?",
                type: "warning",
                text: data[1],
                showCancelButton: true,
                cancelButtonText: "ביטול",
                confirmButtonClass: 'btn-warning',
                confirmButtonText: "אישור",
                closeOnConfirm: false
            }, function () {
                deactivateExpense(data[0], 'Y');
                swal({
                    title: "ההוצאה שוחזרה",
                    timer: 1000,
                    type: "success",
                    showConfirmButton: false
                });
                setTimeout(function () { refreshPage(); }, 1001);
            });
        });

        ProjectsExpensesTable.buttons().container()
            .appendTo('#datatable-buttons2_wrapper .col-md-6:eq(0)');

        $("#total_expenses").val(total_expenses);
    }

    function refreshPage() {
        location.href = "openedProject.html";
    }

    function deactivateExpense(expenseID, active) {
        var request = {
            expenseID: expenseID,
            active: active
        };
        DeactivateExpense(request);
    }

});

function returnToProjectsPage() {
    location.href = "openedProjects.html";
}

