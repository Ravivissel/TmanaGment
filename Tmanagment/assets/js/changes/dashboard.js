function init() {

    //Need to change to be dynamic from the user login session
    const userId = 75;

    var groupid = userId;
    var request = {
        employeeId: groupid
    }
    getMyTasks(request, getMyTaskCB, getMyTaskErrorCB);
}


function getMyTaskCB(result) {
    var myTasksArray = JSON.parse(result.d);
    var myTasksData = myTasksArray[0];




    function renderMyTaskTable(myTaskData) {

        var counter = 0;
        var str = "";


        //TODO: render a table with all myTaskData
        /*
           <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>כותרת</th>
                                                <th>מבצע</th>
                                                <th>תאריך יעד</th>
                                                <th>סטטוס</th>
                                                <th>פרוייקט</th>
                                            </tr>
                                            </thead>
                                            <tbody id="myTasksTableBody">
                                            <tr>
                                                <td>1</td>
                                                <td>הוצאת כתב כמויות למלון</td>
                                                <td>01/01/2017</td>
                                                <td>26/04/2017</td>
                                                <td><button class="button badge badge-info">בביצוע</button></td>
                                                <th></th>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>הוצאת כתב כמויות למלון</td>
                                                <td>01/01/2017</td>
                                                <td>26/04/2017</td>
                                                <td><button class="badge badge-danger">מאחרת</button></td>
                                                <th></th>
                                            </tr><tr>
                                                <td>1</td>
                                                <td>הוצאת כתב כמויות למלון</td>
                                                <td>01/01/2017</td>
                                                <td>26/04/2017</td>
                                                <td><button class="badge badge-warning">קרוב לאיחור</button></td>
                                                <th></th>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>הוצאת כתב כמויות למלון</td>
                                                <td>01/01/2017</td>
                                                <td>26/04/2017</td>
                                                <td><button class="badge badge-info">בביצוע</button></td>
                                                <th></th>
                                            </tr>

                                            </tbody>
        */

    }

}
function getMyTaskErrorCB(error) {
    console.log(error);

}