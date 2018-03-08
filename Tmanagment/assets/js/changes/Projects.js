function init() {

    //Need to change to be dynamic from the user login session
    const userId = 75;

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

function renderActiveProjectsPage(openedProjectsData) {
    results = $.parseJSON(openedProjectsData.d);
    //$("#myRequestsTableBody").empty();
    $.each(results, function (i, row) {
        dynamicLi = '<tr id=""><td>1</td><td>' + row.Title + '</td><td>' + row.Contact_name + '</td><td>' + row.Contact_phone + '</td></tr>';
        $('#openedProjects').append(dynamicLi);
    });
}