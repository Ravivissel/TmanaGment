//wait until the dom is loaded
$(document).ready(function () {

    //generate select options
    generateAssignToList();

    var arr_request = getFromLocalStorage(localStorageConstants.requests.RequestsList);
    if (arr_request.length !== 0) {

        if (arr_request.func === "edit" || arr_request.func === "show") {
            $("#statusDiv").prop('hidden', false);
            uploadData(arr_request.requestID);
            if (arr_request.func === "show") {
                $("#request_title").attr('disabled', 'disabled');
                $("#assign_to").attr('disabled', 'disabled');
                $("#contact_name").attr('disabled', 'disabled');
                $("#contact_phone").attr('disabled', 'disabled');
                $("#status").attr('disabled', 'disabled');
                $("#description").attr('disabled', 'disabled');
                $("#saveRequest").prop('hidden', true);
            }
        }
        else $("#backButton").prop('hidden', true);
    }

    function generateAssignToList() {
        GetAssignToList(getAssignToListCB, getAssignToListErrorCB);
    }

    function getAssignToListCB(AssignToListData) {
        var arr_AssignTo = $.parseJSON(AssignToListData.d);
        $select = $("#assign_to");
        $('<option>', {value: -1, text: 'בחר'}).attr({'selected': '', 'disabled': ''}).appendTo($select);
        for (i in arr_AssignTo) {
            $('<option>', {value: arr_AssignTo[i].Id, text: arr_AssignTo[i].First_name}).appendTo($select);
        }
    }

    function getAssignToListErrorCB(error) {
        console.log(error);
    }

    //function to fill form for edit
    function uploadData(requestID) {

        var request = {
            requestID: requestID
        };

        GetRequest(request, getRequestCB, getRequestErrorCB);
    }

    function getRequestCB(RequestData) {
        var request = JSON.parse(RequestData.d);
        setToLocalStorage(localStorageConstants.requests.RequestsList, request);

        $("#request_title").val(request.Title);
        $("#assign_to").val(request.Assign_to.Id); //needs to be changed
        $("#project_id").val(request.Id);
        $("#status").val(request.Status.Id);
        $("#contact_name").val(request.Contact_name);
        $("#contact_phone").val(request.Contact_phone);
        $("#description").val(request.Description);
    }

    function getRequestErrorCB(error) {
        console.log(error);
    }

});




