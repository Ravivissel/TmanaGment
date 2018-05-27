using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Script.Serialization;
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
        Dashboard my_tasks = new Dashboard();
        try
        {
            JavaScriptSerializer j = new JavaScriptSerializer();
            List<Dashboard> my_task_list = my_tasks.GetMyTasksList(employee);
            //string myTaskListJson = JsonConvert.SerializeObject(my_task_list, new IsoDateTimeConverter());
            //return myTaskListJson;
            return j.Serialize(my_task_list);
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
        Employee employee = new Employee();
        employee.Id = Convert.ToInt32(employeeId);
        Dashboard my_requests = new Dashboard();
        try
        {
            List<Dashboard> my_request_list = my_requests.GetMyRequestsList(employee);
            string myRequestsListJson = JsonConvert.SerializeObject(my_request_list, new IsoDateTimeConverter());
            return myRequestsListJson;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return ex.ToString();
        }

    }

    [WebMethod]
    public string GetUserDetails(string userName)
    {
        JavaScriptSerializer j = new JavaScriptSerializer();
        Employee e = new Employee(userName);
        e = e.GetUserDetails();
        return j.Serialize(e);
    }

    [WebMethod]
    public string GetOpenRequestsNum()
    {
        int counter = 0;
        JavaScriptSerializer j = new JavaScriptSerializer();
        Request request = new Request();
        try
        {
            counter = request.GetOpenRequestsNum();
            return j.Serialize(counter);

        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return ex.ToString();
        }

    }

    [WebMethod]
    public string GetOpenProjectsNum()
    {
        int counter = 0;
        JavaScriptSerializer j = new JavaScriptSerializer();
        Project project = new Project();
        try
        {
            counter = project.GetOpenProjectsNum();
            return j.Serialize(counter);

        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return ex.ToString();
        }

    }

    [WebMethod]
    public string GetTodaysTasksNum()
    {
        int counter = 0;
        JavaScriptSerializer j = new JavaScriptSerializer();
        ActualTask actualTask = new ActualTask();
        try
        {
            counter = actualTask.GetTodaysTasksNum();
            return j.Serialize(counter);

        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return ex.ToString();
        }
    }

    [WebMethod]
    public string GetLateTasksNum()
    {
        int counter = 0;
        JavaScriptSerializer j = new JavaScriptSerializer();
        ActualTask actualTask = new ActualTask();
        try
        {
            counter = actualTask.GetLateTasksNum();
            return j.Serialize(counter);

        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return ex.ToString();
        }
    }

    [WebMethod]
    public string GetStatistics()
    {
        try
        {
            Dashboard dashboard = new Dashboard();
            string statistics = dashboard.GetStatistics();
            return statistics;
        }
        catch(Exception ex)
        {
            Console.WriteLine(ex);
            return ex.ToString();
        }
    }

}
