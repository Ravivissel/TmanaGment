var GENERAL = {

    PROJECTS: {
        getOpenedProjectsList: function () {
            return localStorage.openedProjectsList;
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