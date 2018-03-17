$(document).ready(function () {

    $("#masterPageContext").load("MasterPage.html");
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

