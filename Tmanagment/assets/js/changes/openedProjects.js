$(document).ready(function () {

    user = JSON.parse(GENERAL.EMPLOYEES.getEmployee());
    var userId = user.Id;
    var request = {
        employeeId: userId
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
        user = JSON.parse(GENERAL.EMPLOYEES.getEmployee());
        $("#openedProjects").empty();
        $.each(results, function (i, row) {
            if (user.User_type == "B") {
                if (row.Status.Title != "סגור" && user.First_name == row.Project_manager.First_name) {

                    var e_date = new Date(parseInt(row.End_date.replace('/Date(', '')));
                    e_date = e_date.toLocaleDateString("he-IL");

                    dynamicLi = '<div class="col-sm-4 col-lg-4 col-xs-12" style="text-align:right"><div class="card m-b-20"><div class="card-body" id="' + row.Id + '"><h2 class="card-title">' + row.Title + '</h2><p class="card-text"><b>מנהל הפרוייקט: </b>' + row.Project_manager.First_name + '</p><p class="card-text"><b>תאריך סיום: </b>' + e_date + '</p><p class="card-text"><b>איש קשר: </b>' + row.Contact_name + '</p><p class="card-text"><b>סטטוס: </b>' + row.Status.Title + '</p><button type="button" id="show" class="btn btn-primary">כניסה</button></div></div></div>';
                    $('#openedProjects').append(dynamicLi);
                }
            }
            else {
                if (row.Status.Title != "סגור") {

                    var e_date = new Date(parseInt(row.End_date.replace('/Date(', '')));
                    e_date = e_date.toLocaleDateString("he-IL");

                    dynamicLi = '<div class="col-sm-4 col-lg-4 col-xs-12" style="text-align:right"><div class="card m-b-20"><div class="card-body" id="' + row.Id + '"><h2 class="card-title">' + row.Title + '</h2><p class="card-text"><b>מנהל הפרוייקט: </b>' + row.Project_manager.First_name + '</p><p class="card-text"><b>תאריך סיום: </b>' + e_date + '</p><p class="card-text"><b>איש קשר: </b>' + row.Contact_name + '</p><p class="card-text"><b>סטטוס: </b>' + row.Status.Title + '</p><button type="button" id="show" class="btn btn-primary">כניסה</button></div></div></div>';
                    $('#openedProjects').append(dynamicLi);
                }
            }

        });
    }

    $('#openedProjects').on('click', '#show', function () {
        var projectCardId = $(this).parent().attr('id');
        GENERAL.PROJECTS.setOpenProjectClicked(projectCardId);
        location.href = "../../../pages/openedProject.html";
        console.log(projectCardId);
    });
});











