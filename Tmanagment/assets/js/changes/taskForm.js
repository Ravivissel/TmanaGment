//wait until the dom is loaded
$(document).ready(function () {

    if (JSON.parse(GENERAL.TASKS.getTasksList()).length != 0) {
        arr_task = JSON.parse(GENERAL.TASKS.getTasksList());
        if (arr_task.func == "edit" || arr_task.func == "show") {
            uploadData(arr_task.taskID);
            if (arr_task.func == "show") {
                $("#task_title").attr('disabled', 'disabled');
                $("#end_date").attr('disabled', 'disabled');
                $("#assign_to_p_or_r").attr('disabled', 'disabled');
                $("#assign_to").attr('disabled', 'disabled');
                $("#assign_to_project").attr('disabled', 'disabled');
                $("#assign_to_request").attr('disabled', 'disabled');
                $("#description").attr('disabled', 'disabled');
                $("#saveTask").attr('disabled', 'disabled');
            }
        }
    }

});

//function to fill form for edit
function uploadData(taskID) {

    var request = {
        taskID: taskID
    };

    GetTask(request, getTaskCB, getTaskErrorCB);
}

function getTaskCB(TaskData) {

    var task = JSON.parse(TaskData.d);
    GENERAL.TASKS.setTasksList(task);

    var e_date = new Date(parseInt(task.End_date.replace('/Date(', '')));
    e_date = e_date.toLocaleDateString("he-IL");

    $("#task_title").val(task.Title);
    //$("#assign_to").text(task.Assign_to.First_name);
    //$("#assign_to").val(task.Assign_to.Id); //needs to be changed
    $("#end_date").val(e_date);
    $("#description").val(task.Description);
}

function getTaskErrorCB(error) {
    console.log(error);
}

