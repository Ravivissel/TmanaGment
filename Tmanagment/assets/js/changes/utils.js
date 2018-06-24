$(document).ready(function () {
    checkCookie();
    var user = getFromLocalStorage(localStorageConstants.employees.user);
    if (user.User_type === "A") {
        $("#masterPageContext").load("/pages/Masters/AdminMasterPage.html");
    }
    else $("#masterPageContext").load("/pages/Masters/RegMasterPage.html");
});

$(document).on('click', '#logOut', function () {
    deleteCookie();
});

function setToLocalStorage(operation, data) {

    var stringData = JSON.stringify(data);
    localStorage.setItem(operation, stringData);
}

function getFromLocalStorage(operation) {

    return JSON.parse(localStorage.getItem(operation));

}


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



$(document).on('click', '#newRequestForm', function () {
    var requestID = -1;
    var arr_details = {requestID: requestID, func: "new"};
    setToLocalStorage(localStorageConstants.requests.RequestsList);
    //location.href = "requestsForm.html";
});

$(document).on('click', '#newTaskForm', function () {
    var taskID = -1;
    var arr_details = {taskID: taskID, func: "new"};
    setToLocalStorage(localStorageConstants.projects.ProjectsTasksList, arr_details);
    setToLocalStorage(localStorageConstants.requests.RequestsTasksList, arr_details);
    //location.href = "taskForm.html";
});

$(document).on('click', '#newCustomerForm', function () {
    var customerID = -1;
    var arr_details = {customerID: customerID, func: "new"};
    setToLocalStorage(localStorageConstants.customers.customersList, arr_details);
    //location.href = "customerForm.html";
});

$(document).on('click', '#newUserForm', function () {
    var userID = -1;
    var arr_details = {userID: userID, func: "new"};
    setToLocalStorage(localStorageConstants.employees.user, arr_details);
});

$(document).on('click', '#profile', function () {

    var user = getFromLocalStorage(localStorageConstants.employees.user);
    var arr_details = {userID: user.Id, func: "edit"};
    setToLocalStorage(localStorageConstants.employees.user, arr_details);
    location.href = "../../../pages/userForm.html";
});

