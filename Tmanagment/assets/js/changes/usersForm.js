﻿
$(document).on('click', '#submit', function () {

    var password = $('#password');
    var confirm_password = $('#confirm_password');

    if (password.val() != confirm_password.val()) 
        confirm_password.get(0).setCustomValidity('Passwords do not match');
    else
        confirm_password.get(0).setCustomValidity('');


    var request = {}
    var employee = getEmployeeFromUserInput();
    var employeeString = JSON.stringify(employee);
    request.employee = employeeString;
 

    SetEmployee(request, setEmployeeCB, setEmployeeError);

});

function sweetAlertError() {
    swal({
        title: "שמירת המשתמש נכשלה",
        type: "warning",
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

    tmpEmployee.first_name = $("#firstName").val();
    tmpEmployee.last_name = $("#lastName").val();
    tmpEmployee.user_name = $("#userName").val();
    tmpEmployee.title = $("#title").val();
    tmpEmployee.phone_number = $("#phoneNumber").val();
    tmpEmployee.password = $("#password").val();
    return tmpEmployee;
}
function setEmployeeCB(result) {
    //sweetAlertSuccess();
}
function setEmployeeError(err) {

    sweetAlertError();
    console.log(err);
}

function confirmPassword() {


}