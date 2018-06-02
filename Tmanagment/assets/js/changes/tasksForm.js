//wait until the dom is loaded
$(document).ready(function () {

    //generate select options
    generateAssignToList();
    generateAssignToProjectList();
    generateAssignToRequestList();

    if (JSON.parse(GENERAL.TASKS.getProjectsTasksList()).length != 0) {
        arr_project_task = JSON.parse(GENERAL.TASKS.getProjectsTasksList());
        if (arr_project_task.func == "edit" || arr_project_task.func == "show") {
            var taskID = 1;
            var arr_details = { taskID: taskID, func: "new" };
            localStorage.arr_project_task = JSON.stringify(arr_details);
            $("#proj_req_assignDiv").prop('hidden', true);
            $("#proj_req_assign_label").prop('hidden', true);
            $("#statusDiv").prop('hidden', false);
            $("#projectDiv").prop('hidden', false);                 
            uploadProjectTaskData(arr_project_task.taskID);
            if (arr_project_task.func == "show") {
                $("#task_title").attr('disabled', 'disabled');
                $("#end_date").attr('disabled', 'disabled');
                $("#status").attr('disabled', 'disabled');
                $("#assign_to").attr('disabled', 'disabled');
                $("#assign_to_project").attr('disabled', 'disabled');
                $("#assign_to_request").attr('disabled', 'disabled');
                $("#description").attr('disabled', 'disabled');
                $("#saveTask").prop('hidden', true);
            }
        }
        else $("#backButton").prop('hidden', true);
    }

    if (JSON.parse(GENERAL.TASKS.getRequestsTasksList()).length != 0) {
        arr_request_task = JSON.parse(GENERAL.TASKS.getRequestsTasksList());
        if (arr_request_task.func == "edit" || arr_request_task.func == "show") {
            var taskID = 1;
            var arr_details = { taskID: taskID, func: "new" };
            localStorage.arr_request_task = JSON.stringify(arr_details);
            $("#proj_req_assignDiv").prop('hidden', true);
            $("#proj_req_assign_label").prop('hidden', true);
            $("#statusDiv").prop('hidden', false);
            $("#requestDiv").prop('hidden', false);   
            uploadRequestTaskData(arr_request_task.taskID);
            if (arr_request_task.func == "show") {
                $("#task_title").attr('disabled', 'disabled');
                $("#end_date").attr('disabled', 'disabled');
                $("#status").attr('disabled', 'disabled');
                $("#assign_to").attr('disabled', 'disabled');
                $("#assign_to_project").attr('disabled', 'disabled');
                $("#assign_to_request").attr('disabled', 'disabled');
                $("#description").attr('disabled', 'disabled');
                $("#saveTask").prop('hidden', true);
            }
        }
    }

    //all the select functions starts here

    //Assign to employee
    function generateAssignToList() {
        GetAssignToList(getAssignToListCB, getAssignToListErrorCB);
    }

    function getAssignToListCB(AssignToListData) {
        var arr_AssignTo = $.parseJSON(AssignToListData.d);
        $select = $("#assign_to");
        $('<option>', { value: -1, text: 'בחר' }).attr({ 'selected': '', 'disabled': '' }).appendTo($select);
        for (i in arr_AssignTo) {
            $('<option>', { value: arr_AssignTo[i].Id, text: arr_AssignTo[i].First_name }).appendTo($select);
        }
    }

    function getAssignToListErrorCB(error) {
        console.log(error);
    }

    //Assign to project
    function generateAssignToProjectList() {
        //Need to change! no need for request here
        const userId = 65;
        var groupid = userId;
        var request = {
            employeeId: groupid
        };
        getProjects(request, getAssignToProjectListCB, getAssignToProjectListErrorCB);
    }

    function getAssignToProjectListCB(AssignToProjectListData) {
        var arr_AssignToProject = $.parseJSON(AssignToProjectListData.d);
        $select = $("#assign_to_project");
        $('<option>', { value: -1, text: 'בחר' }).attr({ 'selected': '', 'disabled': '' }).appendTo($select);
        for (i in arr_AssignToProject) {
            if (arr_AssignToProject[i].Status.Title != "סגור") {
                $('<option>', { value: arr_AssignToProject[i].Id, text: arr_AssignToProject[i].Title }).appendTo($select);
            }
        }
    }

    function getAssignToProjectListErrorCB(error) {
        console.log(error);
    }

    //Assign to Request                      
    function generateAssignToRequestList() {
        user = JSON.parse(GENERAL.EMPLOYEES.getEmployee());
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

    //function to fill form for edit
    function uploadProjectTaskData(taskID) {

        var request = {
            taskID: taskID
        };
        GetProjectTask(request, getProjectTaskCB, getProjectTaskErrorCB);
    }

    function getProjectTaskCB(TaskData) {
        var projectTask = JSON.parse(TaskData.d);
        GENERAL.TASKS.setProjectsTasksList(projectTask);

        var e_date = new Date(moment(projectTask.Actual_task.End_date).format());
        e_date = e_date.toLocaleDateString("he-IL");

        selected = 1;
        $("#proj_req_assign").val(selected);
        $("#task_title").val(projectTask.Actual_task.Title);
        $("#end_date").datepicker('setDate', e_date);
        $("#task_id").val(projectTask.Actual_task.Id);
        $("#status").val(projectTask.Actual_task.Status.Id);
        $("#assign_to").val(projectTask.Actual_task.Assign_to.Id); //needs to be changed
        $("#assign_to_project").val(projectTask.Project.Id);
        $("#description").val(projectTask.Actual_task.Description);
    }

    function getProjectTaskErrorCB(error) {
        console.log(error);
    }

    //function to fill form for edit
    function uploadRequestTaskData(taskID) {

        var request = {
            taskID: taskID
        };
        GetRequestTask(request, getRequestTaskCB, getRequestTaskErrorCB);
    }

    function getRequestTaskCB(TaskData) {
        var requestTask = JSON.parse(TaskData.d);
        GENERAL.TASKS.setRequestsTasksList(requestTask);

        var e_date = new Date(moment(requestTask.Actual_task.End_date).format());
        e_date = e_date.toLocaleDateString("he-IL");

        selected = 2;
        $("#proj_req_assign").val(selected);
        $("#task_title").val(requestTask.Actual_task.Title);
        $("#end_date").datepicker('setDate', e_date);
        $("#task_id").val(requestTask.Actual_task.Id);
        $("#status").val(requestTask.Actual_task.Status.Id);
        $("#assign_to").val(requestTask.Actual_task.Assign_to.Id); //needs to be changed
        $("#assign_to_request").val(requestTask.Request.Id);
        $("#description").val(requestTask.Actual_task.Description);
    }

    function getRequestTaskErrorCB(error) {
        console.log(error);
    }

});

