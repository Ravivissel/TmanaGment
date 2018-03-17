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
        renderPage(projects[0]);
    }
    catch (err) {
        console.log(err);
        throw err
    }

}

function renderPage(project) {

    try {

        $("#project_title").text(project.Title);
        $("#project_id").text(project.Id);
        $("#project_manager").text(project.Project_manager.First_name);
        $("#end_date").text(project.End_date);
        $("#start_date").text(project.Start_date);
        $("#contact_name").text(project.Contact_name);
        $("#contact_phone").text(project.Contact_phone);
        $("#description").text(project.Description);
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
