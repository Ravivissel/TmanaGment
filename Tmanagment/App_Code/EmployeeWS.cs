using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;


/// <summary>
/// Summary description for EmployeeWS
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class EmployeeWS : System.Web.Services.WebService
{

    public EmployeeWS()
    {
        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string GetAssignToList()
    {
        try
        {
            Employee emp = new Employee();
            List<Employee> assignToList = emp.GetAssignToList();
            string allTasksListJson = JsonConvert.SerializeObject(assignToList, new IsoDateTimeConverter());
            return allTasksListJson;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return ex.ToString();
        }

    }

    [WebMethod]
    public string SetEmployee(string employee)
    {
        try
        {
            Employee emp = JsonConvert.DeserializeObject<Employee>(employee);
            int rows_affected = emp.InsertEmployee(emp);
            if (rows_affected != 0)
                return JsonConvert.SerializeObject(new { success = true, description = "the new user has been saved" });
            return JsonConvert.SerializeObject(new { success = false, description = "The number of rows affected is zero, the user didn't saved" });
         
        }
        catch (Exception ex)
        { 
            return JsonConvert.SerializeObject(new { success = false, description = ex.Message});

        }

    }

    [WebMethod]
    public string GetEmployees(int? id = null)
    {
        try
        {
            Employee emp = new Employee();
            List<Employee> employeesList = emp.GetEmployees(id);
            string employeesJson = JsonConvert.SerializeObject(employeesList, new IsoDateTimeConverter());
            return employeesJson;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            throw ex;
        }
    }

    [WebMethod]
    public string UpdateEmployee(string employee)
    {
        try
        {
            Employee emp = JsonConvert.DeserializeObject<Employee>(employee);
            int rows_affected = emp.UpdateEmployee (emp);
            if (rows_affected != 0)
                return JsonConvert.SerializeObject(new { success = true, description = "The user details has been updated" });
            return JsonConvert.SerializeObject(new { success = false, description = "The number of rows affected is zero, the user didn't saved" });

        }
        catch (Exception ex)
        {
            return JsonConvert.SerializeObject(new { success = false, description = ex.Message });

        }

    }
}
