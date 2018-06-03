//wait until the dom is loaded
$(document).ready(function () {

    try {
        var projectId = JSON.parse(GENERAL.PROJECTS.getClosedProjectClicked());
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
            throw err;
        }

    }

    function getProjectError(error) {
        console.log(err);
        throw error;
    }

    function renderPage(project) {

        try {

            var s_date = new Date(parseInt(project.Start_date.replace('/Date(', '')));
            s_date = s_date.toLocaleDateString("he-IL");

            var e_date = new Date(parseInt(project.End_date.replace('/Date(', '')));
            e_date = e_date.toLocaleDateString("he-IL");

            $("#project_title").val(project.Title);
            $("#project_id").val(project.Id);
            $("#project_priority_num").val(project.Priority_key);
            $("#project_manager").val(project.Project_manager.First_name);
            $("#project_customer").val(project.Customer_id.First_name + " " + project.Customer_id.Last_name);
            $("#end_date").val(e_date);
            $("#start_date").val(s_date);
            $("#contact_name").val(project.Contact_name);
            $("#contact_phone").val(project.Contact_phone);
            $("#status").val(project.Status.Id);
            $("#description").val(project.Description);
        }
        catch (err) {
            console.log(err);
            throw err;
        }
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

            var s_date = new Date(parseInt(row.Actual_task.Start_date.replace('/Date(', '')));
            s_date = s_date.toLocaleDateString("he-IL");

            var e_date = new Date(parseInt(row.Actual_task.End_date.replace('/Date(', '')));
            e_date = e_date.toLocaleDateString("he-IL");

            var btnStr = "";
            var showBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-success btn-sm m-b-5' id='show' title='פרטים נוספים'><i class='fa fa-wpforms'></i></button>";
            btnStr += showBtn;

            ProjectsTaskTable.row.add([row.Actual_task.Id, row.Actual_task.Title, row.Project.Title, row.Actual_task.Created_by.First_name, row.Actual_task.Assign_to.First_name, s_date, e_date, row.Actual_task.Status.Title, btnStr]).draw("false");
        });

        $('#datatable-buttons tbody').on('click', '#show', function () {
            var data = ProjectsTaskTable.row($(this).parents('tr')).data();
            arr_details = { taskID: data[0], func: "show", proj: "proj" };
            GENERAL.TASKS.setProjectsTasksList(JSON.stringify(arr_details));
            location.href = "taskForm.html";
        });

        ProjectsTaskTable.buttons().container()
            .appendTo('#datatable-buttons_wrapper .col-md-6:eq(0)');
    }

});

$(document).on('click', '#returnButton', function () {
    location.href = "closedProjects.html";
});



