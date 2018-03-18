using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Globalization;

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
        try
        {
            ActualTask actualTask = new ActualTask();
            List<ActualTask> allTasksList = actualTask.GetAllTasksList();
            string allTasksListJson = JsonConvert.SerializeObject(allTasksList, new IsoDateTimeConverter());
            return allTasksListJson;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return ex.ToString();
        }

    }

    [WebMethod]
    public void SetActualProjectTask(string task_title, string end_date, int assign_to, int assign_to_project, string description, int created_by)
    {
        DateTime task_end_date;
        if (end_date.Contains("."))
        {
            task_end_date = DateTime.Parse(end_date);
        }
        else
        {
            task_end_date = DateTime.ParseExact(end_date, "dd/MM/yyyy", CultureInfo.InvariantCulture);
        }

        DateTime created_at = DateTime.Now; //REMOVE after updating the db!!
        Employee emp_creator = new Employee();
        emp_creator.Id = created_by;
        Employee emp_assign_to = new Employee();
        emp_assign_to.Id = assign_to;

        Project project = new Project();
        project.Id = assign_to_project;
        ActualTask actualTask = new ActualTask(description, task_title, created_at, task_end_date, emp_creator, emp_assign_to);
        ActualProjectTask actualProjectTask = new ActualProjectTask(project, actualTask);
        actualProjectTask.SetTask();
    }
}
