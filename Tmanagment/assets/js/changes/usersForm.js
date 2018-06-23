$(document).ready(function () {
    if (JSON.parse(GENERAL.USERS.getUser())) {
        arr_user = JSON.parse(GENERAL.USERS.getUser());
        if (arr_user.func == "edit") {
            user = JSON.parse(GENERAL.EMPLOYEES.getEmployee());
            if (user.User_type == "B") {
                $("#userType").attr('disabled', 'disabled');
                $("#back").attr('hidden', 'hidden');
            }
            updateUserRoute(arr_user.userID);
        }
        else newUserRoute();
    }
    else {
        newUserRoute();
    }

});

function newUserRoute() {
    $("#back").prop('hidden', true);
    setNewUserFromForm();

    function setNewUserFromForm() {
        var $serviceForm = $('#form').validate({

            highlight: function (element) {
                $(element).closest('.form-group').addClass('has-error');
            },
            unhighlight: function (element) {
                $(element).closest('.form-group').removeClass('has-error');
            },
            // Rules for form validation
            rules: {
                firstName: {
                    required: true
                },
                lastName: {
                    required: true
                },
                title: {
                    required: true
                },
                phoneNumber: {
                    required: true,
                    telVal: true
                },
                userName: {
                    required: true
                },
                userType: {
                    required: true,
                    typeVal: true
                },
                password: {
                    required: true
                },
                confirm_password: {
                    required: true,
                    equalTo: "#password"

                }
            },

            submitHandler: function (form, event) {
                event.preventDefault();

                var request = {};
                var employee = getEmployeeFromUserInput();
                var employeeString = JSON.stringify(employee);
                request.employee = employeeString;

                SetEmployee(request, setEmployeeCB, setEmployeeError);

            },
            // Messages for form validation
            messages: {
                firstName: {
                    required: "אנא הזן שם פרטי"
                },
                lastName: {
                    required: "אנא הזן שם משפחה"
                },
                title: {
                    required: "אנא הזן תפקיד"
                },
                phoneNumber: {
                    required: "אנא הזן מספר טלפון"
                },
                userName: {
                    required: "אנא הזן שם משתמש"
                },
                userType: {
                    required: "אנא הזן סוג משתמש"
                },
                password: {
                    required: "אנא הזן סיסמא"
                },
                confirm_password: {
                    equalTo: "הסיסמאות שהוזנו לא תאומות "
                }
            }

        });
        $.validator.addMethod("telVal", function (phone_number, element) {
            return phone_number.match("[0-9]{4}[0-9]{3}[0-9]{3}");
        }, "אנא הזן מספר טלפון תקין");
        $.validator.addMethod("typeVal", function (user_type, element) {
            return user_type.match(/^(רגיל|מנהל)$/);
        }, "אנא הזן מנהל או רגיל");

    }
    function setEmployeeCB(result) {
        var resultObj = JSON.parse(result.d);
        if (resultObj != null && resultObj.success) {
            sweetAlertSuccess();
            setTimeout(function () { returnToEmployeesPage(); }, 1001);
        } else {
            setEmployeeError(result);
        }

    }
    function setEmployeeError(err) {

        sweetAlertError();
        console.log(err);
    }

}
function updateUserRoute(userID) {

    var request = {
        id: userID
    };

    GetEmployees(request, getCustomerCB, getCustomerErrorCB);
    updateExistingUserFromForm(userID);

    function getCustomerCB(result) {
        var resultObj = $.parseJSON(result.d);
        setEmployeeToForm(resultObj[0]);
    }

    function getCustomerErrorCB(err) {

    }

    function setEmployeeToForm(employee) {
        $("#firstName").val(employee.First_name);
        $("#lastName").val(employee.Last_name);
        $("#userName").val(employee.User_name);
        $("#title").val(employee.Title);
        $("#phoneNumber").val(employee.Phone_number);
        if (employee.User_type == "A") {
            userType = "מנהל";
        }
        else userType = "רגיל";
        $("#userType").val(userType);
    }

    function updateEmployeeCB(result) {
        var resultObj = JSON.parse(result.d);
        if (resultObj != null && resultObj.success) {
            sweetAlertSuccess();
            setTimeout(function () { returnToEmployeesPage(); }, 1001);
        } else {
            updateEmployeeError(result);
        }
        GENERAL.USERS.setUser(null);
    }

    function updateEmployeeError(err) {
        sweetAlertError();
        console.log(err);
    }

    function updateExistingUserFromForm(userId) {
        var $serviceForm = $('#form').validate({

            highlight: function (element) {
                $(element).closest('.form-group').addClass('has-error');
            },
            unhighlight: function (element) {
                $(element).closest('.form-group').removeClass('has-error');
            },
            // Rules for form validation
            rules: {
                firstName: {
                    required: true
                },
                lastName: {
                    required: true
                },
                title: {
                    required: true
                },
                phoneNumber: {
                    required: true,
                    telVal: true
                },
                userName: {
                    required: true
                },
                userType: {
                    required: true,
                    typeVal: true
                }
            },

            submitHandler: function (form, event) {
                event.preventDefault();

                var request = {};
                var employee = getEmployeeFromUserInput();
                employee.id = userId;
                var employeeString = JSON.stringify(employee);
                request.employee = employeeString;

                UpdateEmployee(request, updateEmployeeCB, updateEmployeeError);

            },
            // Messages for form validation
            messages: {
                firstName: {
                    required: "אנא הזן שם פרטי"
                },
                lastName: {
                    required: "אנא הזן שם משפחה"
                },
                title: {
                    required: "אנא הזן תפקיד"
                },
                phoneNumber: {
                    required: "אנא הזן מספר טלפון"
                },
                userName: {
                    required: "אנא הזן שם משתמש"
                },
                userType: {
                    required: "אנא הזן סוג משתמש"
                }
            }

        });
        $.validator.addMethod("telVal", function (phone_number, element) {
            return phone_number.match("[0-9]{4}[0-9]{3}[0-9]{3}");
        }, "אנא הזן מספר טלפון תקין");
        $.validator.addMethod("typeVal", function (user_type, element) {
            return user_type.match(/^(רגיל|מנהל)$/);
        }, "אנא הזן מנהל או רגיל");
    }
}

function getEmployeeFromUserInput() {
    var tmpEmployee = {};

    tmpEmployee.first_name = $("#firstName").val();
    tmpEmployee.last_name = $("#lastName").val();
    tmpEmployee.user_name = $("#userName").val();
    if ($("#userType").val() == "מנהל") {
        tmpEmployee.user_type = "A";
    }
    else tmpEmployee.user_type = "B";
    tmpEmployee.title = $("#title").val();
    tmpEmployee.phone_number = $("#phoneNumber").val();
    tmpEmployee.password = $("#password").val();
    return tmpEmployee;
}

function sweetAlertError() {
    swal({
        title: "שמירת המשתמש נכשלה",
        type: "warning",
        timer: 1000,
        showConfirmButton: false
    });
}

function sweetAlertSuccess() {
    swal({
        title: "נשמר",
        type: "success",
        timer: 1000,
        showConfirmButton: false
    });
}

function returnToEmployeesPage() {
    location.href = "../../../pages/users.html";
}

$(document).on('click', '#back', function () {
    location.href = "../../../pages/users.html";
});


