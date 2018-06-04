using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

/// <summary>
/// Summary description for ProjectWS
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class ProjectWS : System.Web.Services.WebService
{

    public ProjectWS()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string GetProjectsList(int employeeId)
    {

        Employee employee = new Employee();
        employee.Id = Convert.ToInt32(employeeId);

        Project projects = new Project();
        try
        {
            JavaScriptSerializer j = new JavaScriptSerializer();
            List<Project> projects_list = projects.GetAllProjectsList();
            //string ProjectsListJson = JsonConvert.SerializeObject(projects_list, new IsoDateTimeConverter());
            //return ProjectsListJson;
            return j.Serialize(projects_list);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return ex.ToString();
        }

    }

    [WebMethod]
    public string GetProject(int projectId)
    {
        Project project = new Project();
        try
        {
            JavaScriptSerializer j = new JavaScriptSerializer();
            List<Project> projectList = project.GetProjectsList(projectId);
            //string ProjectJson = JsonConvert.SerializeObject(projectList);
            //return ProjectJson;
            return j.Serialize(projectList);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return ex.ToString();
        }
    }

    [WebMethod]
    public string UpdateProjects(string projects)
    {
        try
        {
            int total_rows_affected = 0;
            List<Project> ProjectList = JsonConvert.DeserializeObject<List<Project>>(projects);

            foreach (var p in ProjectList)
            {
                Project updatedProject = p;
                total_rows_affected += p.UpdateProject(updatedProject);
                
            }
            if (total_rows_affected == ProjectList.Count())
            {
                string rows_affected_json = JsonConvert.SerializeObject(total_rows_affected);
                return rows_affected_json;
            }
            return "rows affected not equal to the list count";
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return ex.ToString();
        }   
    }

    [WebMethod]
    public void InsertNewProject(string project_title, int project_manager, string project_priority_num, string start_date, string end_date, string contact_name, string contact_phone, int request_id, string description, int created_by, int customer_id, string customer_name, string customer_f_name, string customer_phone, string actual_tasks)
    {
        List<ActualTask> actualTasksList = JsonConvert.DeserializeObject<List<ActualTask>>(actual_tasks);

        DateTime project_start_date;
        project_start_date = DateTime.Parse(start_date);
        DateTime project_end_date;
        project_end_date = DateTime.Parse(end_date);
        DateTime created_at = DateTime.Now; //REMOVE after updating the db!!
        Employee emp_creator = new Employee();
        emp_creator.Id = created_by;
        Employee emp_project_manager = new Employee();
        emp_project_manager.Id = project_manager;
        Customer project_customer = new Customer();

        if (customer_id != -1)
        {
            project_customer.Id = customer_id;
        }
        else
        {
            project_customer.Id = customer_id;
            project_customer.First_name = customer_name;
            project_customer.Last_name = customer_f_name;
            project_customer.Phone_num = customer_phone;
        }

        Project p = new Project(project_title, description, project_customer, project_priority_num, request_id, emp_project_manager, project_start_date, project_end_date, contact_name, contact_phone, created_at, created_at, emp_creator);
        List<ActualProjectTask> actualProjectTasksList = new List<ActualProjectTask>();

        foreach (ActualTask at in actualTasksList)
        {
            ActualProjectTask apt = new ActualProjectTask();
            apt.Actual_task = at;
            apt.Actual_task.Start_date = project_start_date;
            apt.Actual_task.End_date = project_start_date.AddDays(apt.Actual_task.Estimate_time);
            apt.Actual_task.Created_by = emp_creator;
            apt.Actual_task.Assign_to = emp_project_manager;
            apt.Project = p;
            actualProjectTasksList.Add(apt);
<<<<<<< HEAD
        }
        p.SetProject(actualProjectTasksList);
    }

    [WebMethod]
    public void ActivateProject(int projectID)
    {
        Project project = new Project
        {
            Id = projectID
        };
        project.ActivateProject();
    }

    [WebMethod]
    public string GetCustomerProjects(int customerID)
    {
        Customer customer = new Customer
        {
            Id = customerID
        };
        Project projects = new Project();
        try
        {
            JavaScriptSerializer j = new JavaScriptSerializer();
            List<Project> projects_list = projects.GetAllCustomerProjectsList(customer.Id);
            return j.Serialize(projects_list);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return ex.ToString();
        }

=======
        }
        p.SetProject(actualProjectTasksList);
>>>>>>> wizardFinal3
    }
}
