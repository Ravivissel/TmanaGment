using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for WebService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class DashboardWS : System.Web.Services.WebService
{
    public DashboardWS()
    {
        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string GetMyTasksList(int employeeId)
    {

        Employee employee = new Employee();
        employee.Id = Convert.ToInt32(employeeId);

        MyTasks my_tasks = new MyTasks();
        try
        {
            List<MyTasks> my_task_list = my_tasks.GetMyTasksList(employee);
            string myTaskListJson = JsonConvert.SerializeObject(my_task_list, new IsoDateTimeConverter());
            return myTaskListJson;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return ex.ToString();
        }

    }

    [WebMethod]
    public string GetMyRequestsList(int employeeId)
    {
        Request my_requests = new Request();

        try
        {
            List<Request> my_request_list = my_requests.GetMyRequestsList();
            string myRequestsListJson = JsonConvert.SerializeObject(my_request_list, new IsoDateTimeConverter());
            return myRequestsListJson;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return ex.ToString();
        }

    }
}
