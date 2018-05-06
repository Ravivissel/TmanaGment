//wait until the dom is loaded
$(document).ready(function () {

    if (JSON.parse(GENERAL.CUSTOMERS.getCustomersList()).length != 0) {
        arr_customer = JSON.parse(GENERAL.CUSTOMERS.getCustomersList());
        if (arr_customer.func == "edit" || arr_customer.func == "show") {
            uploadData(arr_customer.customerID);
            if (arr_customer.func == "show") {
                $("#first_name").attr('disabled', 'disabled');
                $("#last_name").attr('disabled', 'disabled');
                $("#phone_num").attr('disabled', 'disabled');
                $("#saveCustomer").attr('disabled', 'disabled');
            }
        }
    }

});

//function to fill form for edit
function uploadData(customerID) {

    var request = {
        customerID: customerID
    };

    GetCustomer(request, getCustomerCB, getCustomerErrorCB);
}

function getCustomerCB(CustomerData) {

    var customer = JSON.parse(CustomerData.d);
    GENERAL.CUSTOMERS.setCustomersList(customer);

    $("#first_name").val(customer.First_name);
    $("#last_name").val(customer.Last_name);
    $("#phone_num").val(customer.Phone_num);
}

function getCustomerErrorCB(error) {
    console.log(error);
}

