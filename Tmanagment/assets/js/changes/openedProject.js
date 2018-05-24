
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
            throw err
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
        }
        catch (err) {
            console.log(err);
            throw err
        }
    }

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
                required: true,
            },
            end_date: {
                required: true,
                greaterThan: ["#start_date", "תאריך התחלת הפרוייקט"]
            },
            start_date: {
                required: true
            },
            status: {
                required: true,

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
            project.End_date = moment($("#end_date").datepicker('getDate')).format();;
            project.Start_date = moment($("#start_date").datepicker('getDate')).format();;
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
                required: "אנא בחר תאריך סיום",
            },
            start_date: {
                required: "אנא בחר תאריך התחלה"
            },
            status: {
                required: "אנא בחר סטטוס פרוייקט",
            }
      
        }

        });

    jQuery.validator.addMethod("greaterThan", function () {
        var End_date = $("#end_date").datepicker('getDate');
        var Start_date = $("#start_date").datepicker('getDate');

        return End_date >= Start_date;
    
    }, 'תאריך היעד הפרוייקט חייב להיות מוגדר לאחר או באותו תאריך ההתחלה');

    function UpdateProjectCB(result) {
        sweetAlertSuccess();
        setTimeout(function () { returnToProjectsPage() }, 1001);
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
            var editBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-primary btn-sm m-b-5' id='edit' title='ערוך'><i class='ti-pencil'></i></button>";
            btnStr += showBtn + " " + editBtn;

            ProjectsTaskTable.row.add([row.Actual_task.Id, row.Actual_task.Title, row.Project.Title, row.Actual_task.Created_by.First_name, row.Actual_task.Assign_to.First_name, s_date, e_date, row.Actual_task.Status.Title, btnStr]).draw("false");
        });

        $('#datatable-buttons tbody').on('click', '#show', function () {
            var data = ProjectsTaskTable.row($(this).parents('tr')).data();
            arr_details = { taskID: data[0], func: "show", status: data[7] };
            GENERAL.TASKS.setProjectsTasksList(JSON.stringify(arr_details));
            location.href = "taskForm.html";
        });

        $('#datatable-buttons tbody').on('click', '#edit', function () {
            var data = ProjectsTaskTable.row($(this).parents('tr')).data();
            arr_details = { taskID: data[0], func: "edit", status: data[7] };
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
                var editBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-primary btn-sm m-b-5' id='edit' title='ערוך'><i class='ti-pencil'></i></button>";
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
                var editBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-primary btn-sm m-b-5' id='edit' title='ערוך'><i class='ti-pencil'></i></button>";
                btnStr += showBtn + " " + editBtn;

                ProjectsTaskTable.row.add([row.Actual_task.Id, row.Actual_task.Title, row.Project.Title, row.Actual_task.Created_by.First_name, row.Actual_task.Assign_to.First_name, s_date, e_date, row.Actual_task.Status.Title, btnStr]).draw("false");
            });
        }
    }

});

function returnToProjectsPage() {
    location.href = "openedProjects.html";
}

