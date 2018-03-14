$(document).ready(function () {

    //Need to change to be dynamic from the user login session
    const userId = 65;

    var groupid = userId;
    var request = {
        employeeId: groupid
    };

    getProjects(request, getOpenedProjectsCB, getOpenedProjectsErrorCB);

    function getOpenedProjectsCB(result) {
        renderActiveProjectsPage(result);
    }

    function getOpenedProjectsErrorCB(error) {
        console.log(error);
    }

    function renderActiveProjectsPage(openedProjectsData) {
        results = $.parseJSON(openedProjectsData.d);
        //for the projectForm page
        localStorage.openedProjectsList = results;
        $("#openedProjects").empty();
        $.each(results, function (i, row) {
            dynamicLi = '<div class="col-sm-4 col-lg-4 col-xs-12" style="text-align:right"><div class="card m-b-20"><div class="card-body" id="' + row.Id + '"><h2 class="card-title">' + row.Title + '</h2><p class="card-text">' + row.Project_manager.First_name + '</p><p class="card-text">' + row.End_date + '</p><p class="card-text">' + row.Contact_name + '</p><button type="button" id="show" class="btn btn-primary">כניסה</button></div></div></div>';
            $('#openedProjects').append(dynamicLi);
        });

    }

});











