$(document).ready(function () {
    checkCookie();
    user = JSON.parse(GENERAL.EMPLOYEES.getEmployee());
    if (user.User_type == "A") {
        $("#masterPageContext").load("AdminMasterPage.html");
    }
    else $("#masterPageContext").load("RegMasterPage.html");
});

$(document).on('click', '#newRequestForm', function () {
    var requestID = -1;
    var arr_details = { requestID: requestID, func: "new" };
    localStorage.requestList = JSON.stringify(arr_details);
    //location.href = "requestsForm.html";
});

$(document).on('click', '#newTaskForm', function () {
    var taskID = -1;
    var arr_details = { taskID: taskID, func: "new" };
    localStorage.arr_project_task = JSON.stringify(arr_details);
    localStorage.arr_request_task = JSON.stringify(arr_details);
    //location.href = "taskForm.html";
});

$(document).on('click', '#newCustomerForm', function () {
    var customerID = -1;
    var arr_details = { customerID: customerID, func: "new" };
    localStorage.customerList = JSON.stringify(arr_details);
    //location.href = "customerForm.html";
});

$(document).on('click', '#newUserForm', function () {
    var userID = -1;
    var arr_details = { userID: userID, func: "new" };
    GENERAL.USERS.setUser(JSON.stringify(arr_details));
    //location.href = "userForm.html";
});

$(document).on('click', '#profile', function () {
    user = JSON.parse(GENERAL.EMPLOYEES.getEmployee());
    var arr_details = { userID: user.Id, func: "edit", profile: true };
    GENERAL.USERS.setUser(JSON.stringify(arr_details));
    location.href = "userForm.html";
});

$(document).on('click', '#logOut', function () {
    deleteCookie();
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
        getProjectsTasksList: function () {
            return localStorage.projectsTaskList;
        },
        setProjectsTasksList: function (projectsTaskList) {
            localStorage.projectsTaskList = projectsTaskList;
        },
        getRequestsTasksList: function () {
            return localStorage.requestsTaskList;
        },
        setRequestsTasksList: function (requestsTaskList) {
            localStorage.requestsTaskList = requestsTaskList;
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
    },

    EMPLOYEES: {
        getEmployee: function () {
            return localStorage.employee;
        },
        setEmployee: function (employee) {
            localStorage.employee = employee;
        }
    }
};




