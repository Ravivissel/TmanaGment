﻿$(document).ready(function () {

    var table = $('#datatable-buttons').DataTable({
        lengthChange: false,
        buttons: ['copy', 'excel', 'pdf'],
        "oLanguage": {
            "sSearch": "<span>חיפוש:</span> _INPUT_" //search
        }
    });

    table.buttons().container()
        .appendTo('#datatable-buttons_wrapper .col-md-6:eq(0)');

    addDataToTable();


    function addDataToTable() {
    table.clear().draw();

    //Need to change to be dynamic from the user login session
    const userId = 85;

    var groupid = userId;
    var request = {
        employeeId: groupid
    };

    getProjects(request, getProjectsCB, getProjectsErrorCB);
    }

    function getProjectsCB(result) {
        renderClosedProjectsPage(result);
    }

    function getProjectsErrorCB(error) {
        console.log(error);
    }

    function renderClosedProjectsPage(closedProjectsData) {
        results = $.parseJSON(closedProjectsData.d);
        $.each(results, function (i, row) {

            var btnStr = "";
            var showBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-success btn-sm m-b-5' id='show' title='פרטים נוספים'><i class='fa fa-wpforms'></i></button>";
            btnStr += showBtn;

            table.row.add([row.Id ,row.Title, row.Priority_key, row.Project_manager.First_name, row.Start_date, row.End_date, btnStr]).draw("false");
        });
    }

    $('#datatable-buttons tbody').on('click', '#show', function () {
        var data = table.row($(this).parents('tr')).data();
        GENERAL.PROJECTS.setClosedProjectClicked(data[0]);
        location.href = "closedProject.html";
        console.log(data[0]); 
    });

});
