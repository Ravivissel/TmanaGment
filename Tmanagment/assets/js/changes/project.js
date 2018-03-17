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
        var project = JSON.parse(projectResult);
        renderPage(project);
    }
    catch (err) {
        console.log(err);
        throw err
    }

}

function renderPage(project) {

    try {

        $("#project_title").val(project.Title);
        $("#project_id").val(project.id);
        $("#project_manager").val(project.project_manager);
        $("#end_date").val(project.end_date);
        $("#start_date").val(project.start_date);
        $("#contact_name").val(project.contact_name);
        $("#contact_phone").val(project.contact_phone);
    }
    catch (err) {
        console.log(err);
        throw err
    }
}

function getProjectError(error) {
    console.log(err);
    throw error;
}
