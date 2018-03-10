using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for TasksWS
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]

public class TasksWS : System.Web.Services.WebService
{

    [WebMethod]
    public string GetAllTasksList()
    {
        ActualTask actualTask = new ActualTask();
        List<ActualTask> allTasksList = actualTask.GetAllTasksList();
        string allTasksListJson = JsonConvert.SerializeObject(allTasksList, new IsoDateTimeConverter());
        return allTasksListJson;

    }


 
    [WebMethod]
    public string HelloWorld()
    {
        return "Hello World";
    }

}
