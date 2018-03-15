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
    }


}