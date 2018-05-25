using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Globalization;
using System.Web.Script.Serialization;

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
    public string GetTasksNum(string status)
    {
        int counter = 0;
        JavaScriptSerializer j = new JavaScriptSerializer();
        ActualTask actualTask = new ActualTask();
        try
        {
            counter = actualTask.GetTasksNum(status);
            return j.Serialize(counter);

        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return ex.ToString();
        }
    }

    [WebMethod]
    public string GetAllProjectsTasksList()
    {
        try
        {
            JavaScriptSerializer j = new JavaScriptSerializer();
            ActualProjectTask actualProjectTask = new ActualProjectTask();
            List<ActualProjectTask> allProjectsTasksList = actualProjectTask.GetAllProjectsTasksList();
            //string allProjectsTasksListJson = JsonConvert.SerializeObject(allProjectsTasksList, new IsoDateTimeConverter());
            //return allProjectsTasksListJson;
            return j.Serialize(allProjectsTasksList);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return ex.ToString();
        }
    }

    [WebMethod]
    public string GetAllRequestsTasksList()
    {
        try
        {
            JavaScriptSerializer j = new JavaScriptSerializer();
            ActualRequestTask actualRequestTask = new ActualRequestTask();
            List<ActualRequestTask> allRequestsTasksList = actualRequestTask.GetAllRequestsTasksList();
            //string allRequestsTasksListJson = JsonConvert.SerializeObject(allRequestsTasksList, new IsoDateTimeConverter());
            //return allRequestsTasksListJson;
            return j.Serialize(allRequestsTasksList);

        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return ex.ToString();
        }
    }

    [WebMethod]
    public void SetActualProjectTask(int taskID, string task_title, string end_date, int assign_to, int assign_to_project, string description, int created_by, int status, string func)
    {
        DateTime task_end_date;
        task_end_date = DateTime.Parse(end_date);
        DateTime created_at = DateTime.Now; //REMOVE after updating the db!!
        Employee emp_creator = new Employee();
        emp_creator.Id = created_by;
        Employee emp_assign_to = new Employee();
        emp_assign_to.Id = assign_to;
        Status taskStatus = new Status();
        taskStatus.Id = status;

        Project project = new Project();
        project.Id = assign_to_project;
        ActualTask actualTask = new ActualTask(taskID, description, task_title, created_at, task_end_date, emp_creator, emp_assign_to, taskStatus);
        ActualProjectTask actualProjectTask = new ActualProjectTask(project, actualTask);
        actualProjectTask.SetTask(func);
    }

    [WebMethod]
    public string GetProjectTask(int taskID)
    {
        JavaScriptSerializer j = new JavaScriptSerializer();
        ActualProjectTask apt = new ActualProjectTask();
        ActualTask t = new ActualTask();
        t.Id = taskID;
        apt.Actual_task = t;
        ActualProjectTask actualProjectTask = apt.GetProjectTask();
        return j.Serialize(actualProjectTask);
    }

    [WebMethod]
    public string GetRequestTask(int taskID)
    {
        JavaScriptSerializer j = new JavaScriptSerializer();
        ActualRequestTask art = new ActualRequestTask();
        ActualTask t = new ActualTask();
        t.Id = taskID;
        art.Actual_task = t;
        ActualRequestTask ActualRequestTask = art.GetRequestTask();
        return j.Serialize(ActualRequestTask);
    }

    [WebMethod]
    public void SetActualRequestTask(int taskID, string task_title, string end_date, int assign_to, int assign_to_request, string description, int created_by, int status, string func)
    {
        DateTime task_end_date;
        task_end_date = DateTime.Parse(end_date);
        DateTime created_at = DateTime.Now; //REMOVE after updating the db!!
        Employee emp_creator = new Employee();
        emp_creator.Id = created_by;
        Employee emp_assign_to = new Employee();
        emp_assign_to.Id = assign_to;
        Status taskStatus = new Status();
        taskStatus.Id = status;

        Request request = new Request();
        request.Id = assign_to_request;

        ActualTask actualTask = new ActualTask(taskID, description, task_title, created_at, task_end_date, emp_creator, emp_assign_to, taskStatus);
        ActualRequestTask actualRequestTask = new ActualRequestTask(request, actualTask);
        actualRequestTask.SetTask(func);
    }

    [WebMethod]
    public string GetAlmostLateTasksNum()
    {
        int counter = 0;
        JavaScriptSerializer j = new JavaScriptSerializer();
        ActualTask actualTask = new ActualTask();
        try
        {
            counter = actualTask.GetAlmostLateTasksNum();
            return j.Serialize(counter);

        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return ex.ToString();
        }
    }

    [WebMethod]
    public string GetProjectTasksList(int projectId)
    {
        try
        {
            JavaScriptSerializer j = new JavaScriptSerializer();
            ActualProjectTask actualProjectTask = new ActualProjectTask();
            List<ActualProjectTask> allProjectsTasksList = actualProjectTask.GetProjectTasksList(projectId);
            //string allProjectsTasksListJson = JsonConvert.SerializeObject(allProjectsTasksList, new IsoDateTimeConverter());
            //return allProjectsTasksListJson;
            return j.Serialize(allProjectsTasksList);
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
            ActualTask tasks = new ActualTask();
            string statistics = tasks.GetStatistics();
            return statistics;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return ex.ToString();
        }
    }
}
