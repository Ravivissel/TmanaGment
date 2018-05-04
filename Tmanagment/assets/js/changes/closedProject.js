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
        throw err;
    }

}

function getProjectError(error) {
    console.log(err);
    throw error;
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
        throw err;
    }
}

$(document).on('click', '#returnButton', function () {

    location.href = "closedProjects.html";
});




