function initProjectsPage() {

    //Need to change to be dynamic from the user login session
    const userId = 85;

    var groupid = userId;
    var request = {
        employeeId: groupid
    };

    getOpenedProjects(request, getOpenedProjectsCB, getOpenedProjectsErrorCB);
}

function getOpenedProjectsCB(result) {
    renderActiveProjectsPage(result);
}

function getOpenedProjectsErrorCB(error) {
    console.log(error);
}

//function renderActiveProjectsPage(openedProjectsData) {
//    results = $.parseJSON(openedProjectsData.d);
//    //$("#myRequestsTableBody").empty();
//    $.each(results, function (i, row) {
//        dynamicLi = '<tr id=""><td>1</td><td>' + row.Title + '</td><td>' + row.Contact_name + '</td><td>' + row.Contact_phone + '</td></tr>';
//        $('#openedProjects').append(dynamicLi);
//    });
//}

function renderActiveProjectsPage(openedProjectsData) {
    results = $.parseJSON(openedProjectsData.d);
    $("#openedProjects").empty();
    $.each(results, function (i, row) {
        dynamicLi = '<div class="col-sm-4 col-lg-4 col-xs-12" style="text-align:right"><div class="card m-b-20"><div class="card-body"><h2 class="card-title">' + row.Title + '</h2><p class="card-text">' + row.Project_manager.First_name + '</p><p class="card-text">' + row.End_date + '</p><p class="card-text">' + row.Contact_name + '</p><a href="#" class="btn btn-primary">כניסה</a></div></div></div>';
        $('#openedProjects').append(dynamicLi);
    });
}