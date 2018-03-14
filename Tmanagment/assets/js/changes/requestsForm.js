//wait until the dom is loaded
$(document).ready(function () {

    if (JSON.parse(GENERAL.REQUESTS.getRequestsList()).length != 0) {
        arr_request = JSON.parse(GENERAL.REQUESTS.getRequestsList());
        if (arr_request.func == "edit" || arr_request.func == "show") {
            uploadData(arr_request.requestID);
            if (arr_request.func == "show") {
                $("#request_title").attr('disabled', 'disabled');
                $("#assign_to").attr('disabled', 'disabled');
                $("#contact_name").attr('disabled', 'disabled');
                $("#contact_phone").attr('disabled', 'disabled');
                $("#description").attr('disabled', 'disabled');
                $("#saveRequest").attr('disabled', 'disabled');
            }
        }
        //else {
        //    $("#activeTrucks").prop('checked', 'checked');
        //}
    }
});

//function to fill form for edit
function uploadData(requestID) {

    var request = {
        requestID: requestID
    };

    GetRequest(request, getRequestCB, getRequestErrorCB);
}

function getRequestCB(RequestData) {

    var request = JSON.parse(RequestData.d);
    GENERAL.REQUESTS.setRequestsList(request);

    $("#request_title").val(request.Title);
    $("#assign_to").text(request.Assign_to.First_name); //needs to be changed
    $("#contact_name").val(request.Contact_name);
    $("#contact_phone").val(request.Contact_phone);
    $("#description").val(request.Description);
}

function getRequestErrorCB(error) {
    console.log(error);
}
