var GENERAL = {

    PROJECTS: {
        getOpenedProjectsList: function () {
            return localStorage.openedProjectsList;
        },
        setOpenedProjectsList: function (openedProjectsList) {
            localStorage.openedProjectsList = openedProjectsList;
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
        }
    }

}