//wait until the dom is loaded
$(document).ready(function () {

 var projetID = JSON.parse(GENERAL.PROJECTS.getOpenProjectClicked());
    if (projetID) {
        getProjectFromServer(projetID);
    }
});

//function to fill form for edit
function uploadData(projetID) {

    var request = {
        projetID: projetID
    };

    getProject(request, getProjectCB, getProjectError);
}

function getRequestCB(projectResult) {

    var project = JSON.parse(projectResult);
    $("#request_title").val(request.Title);
    $("#assign_to").text(request.Assign_to.First_name); //needs to be changed
    $("#contact_name").val(request.Contact_name);
    $("#contact_phone").val(request.Contact_phone);
    $("#description").val(request.Description);
}

function getRequestErrorCB(error) {
    console.log(error);
}
