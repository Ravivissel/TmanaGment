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
    [WebMethod]
    public string getMyTasksList(int employeeId)
    {

        Employee employee = new Employee();
        employee.Id = Convert.ToInt32(employeeId);

        MyTasks my_tasks = new MyTasks();
        try
        {
            List<MyTasks> my_task_list = my_tasks.getMyTasksList(employee);
            string myTaskListJson = JsonConvert.SerializeObject(my_task_list, new IsoDateTimeConverter());
            return myTaskListJson;
        }
        catch(Exception ex)
        {
            Console.WriteLine(ex);
            return ex.ToString();
        }
        
    }


    public DashboardWS()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string HelloWorld()
    {
        return "Hello World";
    }

}
