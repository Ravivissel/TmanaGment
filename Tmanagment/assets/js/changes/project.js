



//wait until the dom is loaded
$(document).ready(function () {

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
});

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

        $("#project_title").val(project.Title);
        $("#project_id").val(project.Id);
        $("#project_manager").val(project.Project_manager.First_name);
        $("#end_date").val(project.End_date);
        $("#start_date").val(project.Start_date);
        $("#contact_name").val(project.Contact_name);
        $("#contact_phone").val(project.Contact_phone);
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


});
$(document).on('click', '#cancelButton', function () {
    var hidden = true;
    changeFormState(hidden);
    $("#editButton").show();
});
$(document).on('click', '#saveButton', function () {

    var projects = JSON.parse(GENERAL.PROJECTS.getOpenedProjectsList());
    var project = projects[0];

    project.Title = $("#project_title").val();
    project.Project_manager.First_name = $("#project_manager").val();
    project.End_date = $("#end_date").val();
    project.Start_date = $("#start_date").val();
    project.Contact_name=$("#contact_name").val();
    project.Contact_phone= $("#contact_phone").val();
    project.Description= $("#description").val();

    
    var request= {

        project: project

    }

    UpdateProject(request, setProjectCB, setProjectError);

    function setProjectCB(result)
    {

    }
    function setProjectError(err)
    {
        console.log(err);
    }

});

function changeFormState(state) {


    $("#project_title").prop('disabled', state);
    $("#project_manager").prop('disabled', state);
    $("#end_date").prop('disabled', state);
    $("#start_date").prop('disabled', state);
    $("#contact_name").prop('disabled', state);
    $("#contact_phone").prop('disabled', state);
    $("#description").prop('disabled', state);
    $("#saveButton").prop('hidden', state);
    $("#editButton").hide();
    $("#cancelButton").prop('hidden', state);


}




function getProjectError(error) {
    console.log(err);
    throw error;
}
