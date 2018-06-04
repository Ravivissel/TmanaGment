$(document).ready(function () {

    var table = $('#datatable-buttons').DataTable({
        lengthChange: false,
        buttons: ['copy', 'excel', 'pdf'],
        "oLanguage": {
            "sSearch": "<span>חיפוש:</span> _INPUT_", //search
            "sProcessing": "מעבד...",
            "sLengthMenu": "הצג _MENU_ פריטים",
            "sZeroRecords": "לא נמצאו רשומות מתאימות",
            "sInfo": "_START_ עד _END_ מתוך _TOTAL_ רשומות",
            "sInfoEmpty": "0 עד 0 מתוך 0 רשומות",
            "sInfoFiltered": "(מסונן מסך _MAX_  רשומות)",
            "sInfoPostFix": "",
            "sUrl": "",
            "oPaginate": {
                "sFirst": "ראשון",
                "sPrevious": "הקודם",
                "sNext": "הבא",
                "sLast": "אחרון"
            }
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
        user = JSON.parse(GENERAL.EMPLOYEES.getEmployee());
        $.each(results, function (i, row) {
            if (user.User_type == "B") {
                if (row.Status.Title == "סגור" && user.First_name == row.Project_manager.First_name) {
                    var s_date = new Date(parseInt(row.Start_date.replace('/Date(', '')));
                    s_date = s_date.toLocaleDateString("he-IL");

                    var e_date = new Date(parseInt(row.End_date.replace('/Date(', '')));
                    e_date = e_date.toLocaleDateString("he-IL");

                    var btnStr = "";
                    var showBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-success btn-sm m-b-5' id='show' title='פרטים נוספים'><i class='fa fa-wpforms'></i></button>";
                    var reactiveBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-warning btn-sm m-b-5' id='reactive' title='הפוך לפעיל'><i class='fa fa-undo' ></i></button>";
                    btnStr += showBtn + " " + reactiveBtn;

                    table.row.add([row.Id, row.Title, row.Project_manager.First_name, row.Priority_key, s_date, e_date, btnStr]).draw("false");
                }
            }
            else {
                if (row.Status.Title == "סגור") {
                    var s_date = new Date(parseInt(row.Start_date.replace('/Date(', '')));
                    s_date = s_date.toLocaleDateString("he-IL");

                    var e_date = new Date(parseInt(row.End_date.replace('/Date(', '')));
                    e_date = e_date.toLocaleDateString("he-IL");

                    var btnStr = "";
                    var showBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-success btn-sm m-b-5' id='show' title='פרטים נוספים'><i class='fa fa-wpforms'></i></button>";
                    var reactiveBtn = "<button type='button' class='btn btn-icon waves-effect waves-light btn-warning btn-sm m-b-5' id='reactive' title='הפוך לפעיל'><i class='fa fa-undo' ></i></button>";
                    btnStr += showBtn + " " + reactiveBtn;

                    table.row.add([row.Id, row.Title, row.Project_manager.First_name, row.Priority_key, s_date, e_date, btnStr]).draw("false");
                }
            }

        });
    }

    $('#datatable-buttons tbody').on('click', '#show', function () {
        var data = table.row($(this).parents('tr')).data();
        GENERAL.PROJECTS.setClosedProjectClicked(data[0]);
        location.href = "closedProject.html";
        console.log(data[0]); 
    });

    $('#datatable-buttons tbody').on('click', '#reactive', function () {
        var data = table.row($(this).parents('tr')).data();
        swal({
            title: "אתה בטוח שברצונך להפוך את הפרוייקט לפעיל?",
            type: "warning",
            text: data[1],
            showCancelButton: true,
            cancelButtonText: "ביטול",
            confirmButtonClass: 'btn-warning',
            confirmButtonText: "אישור",
            closeOnConfirm: false
        }, function () {
            activateProject(data[0]);
            swal({
                title: "הפרוייקט הפך לפעיל",
                timer: 1000,
                type: "success",
                showConfirmButton: false
            });
            setTimeout(function () { refreshPage(); }, 1001);
        });
    });

    function refreshPage() {
        location.href = "openedProjects.html";
    }

    function activateProject(projectID) {
        var request = {
            projectID: projectID
        };
        ActivateProject(request);
    }

});
