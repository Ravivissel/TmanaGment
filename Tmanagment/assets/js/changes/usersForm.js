$(document).on('click', '#submit', function () {

    var employee = getEmployeeFromUserInput();
    SetEmployee(employee, setEmployeeCB, setEmployeeError);


});

function sweetAlertError() {
    swal({
        title: "שמירת המשתמש נכשלה",
        type: "error",
        timer: 1000,
        showConfirmButton: false
    });
}
function sweetAlertSuccess () {
    swal({
        title: "נשמר",
        type: "success",
        timer: 1000,
        showConfirmButton: false
    });
}
function getEmployeeFromUserInput() {
    var tmpEmployee = {};

    tmpEmployee.firstName = $("#firstName").val();
    tmpEmployee.lastName = $("#lastName").val();
    tmpEmployee.phoneNumber = $("#phoneNumber").val();
    tmpEmployee.password = $("#pass1").val();
    return tmpEmployee;
}
function setEmployeeCB(result) {
    sweetAlertSuccess();
}
function setEmployeeError(err) {

    sweetAlertError();
}

