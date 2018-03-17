using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
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
            List<Project> projects_list = projects.GetAllProjectsList();
            string ProjectsListJson = JsonConvert.SerializeObject(projects_list, new IsoDateTimeConverter());
            return ProjectsListJson;
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
          List<Project> projectList = project.GetProjectsList(projectId);
            string ProjectJson = JsonConvert.SerializeObject(projectList);
            return ProjectJson;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return ex.ToString();
        }




    }
}
