$(document).ready(function () {

    generateProjectManagerList();

});

//Assign to employee
function generateProjectManagerList() {
    GetAssignToList(generateProjectManagerListCB, generateProjectManagerListErrorCB);
}

function generateProjectManagerListCB(AssignToListData) {
    var arr_AssignTo = $.parseJSON(AssignToListData.d);
    $select = $("#project_manager");
    $('<option>', { value: -1, text: 'בחר' }).attr({ 'selected': '', 'disabled': '' }).appendTo($select);
    for (i in arr_AssignTo) {
        $('<option>', { value: arr_AssignTo[i].Id, text: arr_AssignTo[i].First_name }).appendTo($select);
    }
}

function generateProjectManagerListErrorCB(error) {
    console.log(error);
}

//DatePicker end_date
jQuery('#end_date').datepicker({
    toggleActive: true,
    clearBtn: true,
    autoclose: true,
    format: 'dd/mm/yyyy'
});

$(document).on('click', '#createNCButton', function () {
    var hidden = false;
    changeState(hidden);
    $("#createNCButton").hide();
    $("#customer").hide();
    $("#customerCB").hide();
});

$(document).on('click', '#cancelButton', function () {
    var hidden = true;
    changeState(hidden);
    $("#createNCButton").show();
    $("#customer").show();
    $("#customerCB").show();
});

function changeState(state) {

    $("#customer_name").prop('hidden', state);
    $("#customer_nameCB").prop('hidden', state);
    $("#customer_phone").prop('hidden', state);
    $("#customer_phoneCB").prop('hidden', state);
    $("#cancelButton").prop('hidden', state);

}