$(document).ready(function () {

    checkCookie();
    $("#masterPageContext").load("MasterPage.html");

});

$(document).on('click', '#newRequestForm', function () {
    var requestID = -1;
    var arr_details = { requestID: requestID, func: "new" };
    localStorage.requestList = JSON.stringify(arr_details);
    location.href = "requestsForm.html";
});
$(document).on('click', '#newTaskForm', function () {
    var taskID = -1;
    var arr_details = { taskID: taskID, func: "new" };
    localStorage.taskList = JSON.stringify(arr_details);
    location.href = "taskForm.html";
});
$(document).on('click', '#newCustomerForm', function () {
    var customerID = -1;
    var arr_details = { customerID: customerID, func: "new" };
    localStorage.customerList = JSON.stringify(arr_details);
    location.href = "customerForm.html";
});

var GENERAL = {

    PROJECTS: {
        getOpenedProjectsList: function () {
            return localStorage.openedProjectsList;
        },
        setOpenedProjectsList: function (openedProjectsList) {
            localStorage.openedProjectsList = openedProjectsList;
        },
        setOpenProjectClicked: function (openProjectID) {
            localStorage.openProjectClickd = openProjectID;
        },
        getOpenProjectClicked: function (openProjectID) {
            return localStorage.openProjectClickd;
        },
        setClosedProjectClicked: function (closedProjectID) {
            localStorage.closedProjectClickd = closedProjectID;
        },
        getClosedProjectClicked: function (closedProjectID) {
            return localStorage.closedProjectClickd;
        }

    },

    REQUESTS: {
        getRequestsList: function () {
            return localStorage.requestList;
        },
        setRequestsList: function (requestList) {
            localStorage.requestList = requestList;
        }
    },

    TASKS: {
        getTasksList: function () {
            return localStorage.taskList;
        },
        setTasksList: function (taskList) {
            localStorage.taskList = taskList;
        }
    },

    USERS: {
        getUserName: function () {
            return localStorage.userName;
        },
        setUserName: function (userName) {
            localStorage.userName = userName;
        },
        getUser: function () {
            return localStorage.user;
        },
        setUser: function (user) {
            localStorage.user = user;
        }
    },

    CUSTOMERS: {
        getCustomersList: function () {
            return localStorage.customerList;
        },
        setCustomersList: function (customerList) {
            localStorage.customerList = customerList;
        }
    }

};




