﻿//wait until the dom is loaded
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

            var s_date = new Date(parseInt(project.Start_date.replace('/Date(', '')));
            s_date = s_date.toLocaleDateString("he-IL");

            var e_date = new Date(parseInt(project.End_date.replace('/Date(', '')));
            e_date = e_date.toLocaleDateString("he-IL");

            $("#project_title").val(project.Title);
            $("#project_id").val(project.Id);
            $("#project_priority_num").val(project.Priority_key);
            $("#project_manager").val(project.Project_manager.Id);
            $("#project_customer").val(project.Customer_id.Id);
            $("#end_date").val(e_date);
            $("#start_date").val(s_date);
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

    $(document).on('click', '#saveButton', function () {
        var projects = JSON.parse(GENERAL.PROJECTS.getOpenedProjectsList());
        var project = projects[0];

        project.Title = $("#project_title").val();
        project.Project_manager.Id = $("#project_manager").val();
        project.Priority_key = $("#project_priority_num").val();
        project.Customer_id.Id = $("#project_customer").val();
        project.End_date = $("#end_date").val();
        project.Start_date = $("#start_date").val();
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
    });

    function UpdateProjectCB(result) {
        swal({
            title: "נשמר",
            type: "success",
            timer: 1000,
            showConfirmButton: false
        });
        setTimeout(function () { returnToProjectsPage() }, 1001);
    }

    function UpdateProjectError(err) {
        console.log(err);
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

    //DatePicker end_date
    jQuery('#start_date').datepicker({
        toggleActive: true,
        clearBtn: true,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });

    //DatePicker end_date
    jQuery('#end_date').datepicker({
        toggleActive: true,
        clearBtn: true,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });
});

function returnToProjectsPage() {
    location.href = "openedProjects.html";
}
