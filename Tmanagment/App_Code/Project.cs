using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Text;

/// <summary>
/// Summary description for Project
/// </summary>
public class Project
{

    private int id;
    private string title;
    private string description;
    private Customer customer_id;
    private string priority_key; //TODO: change if necessary
    private int request_id;
    private Employee project_manager;
    private DateTime start_date;
    private DateTime end_date;
    private string contact_name;
    private int contact_phone;
    private DateTime modified_at;
    private DateTime created_at;
    private Employee created_by;

    public Project()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public Project(int id, string title, Employee project_manager, DateTime start_date, DateTime end_date, string contact_name, string priority_key)
    {
        this.id = id;
        this.Title = title;
        this.Project_manager = project_manager;
        this.Start_date = start_date;
        this.End_date = end_date;
        this.Contact_name = contact_name;
        this.Priority_key = priority_key;
    }

    public Project(int id, string title, string description, Customer customer_id, string priority_key, int request_id, Employee project_manager, DateTime start_date, DateTime end_date, string contact_name, int contact_phone, DateTime modified_at, DateTime created_at, Employee created_by)
    {
        Id = id;
        Title = title;
        Description = description;
        Customer_id = customer_id;
        Priority_key = priority_key;
        Request_id = request_id;
        Project_manager = project_manager;
        Start_date = start_date;
        End_date = end_date;
        Contact_name = contact_name;
        Contact_phone = contact_phone;
        Modified_at = modified_at;
        Created_at = created_at;
        Created_by = created_by;
    }

  

    public int Id
    {
        get
        {
            return id;
        }

        set
        {
            id = value;
        }
    }

    public string Title
    {
        get
        {
            return title;
        }

        set
        {
            title = value;
        }
    }

    public string Description
    {
        get
        {
            return description;
        }

        set
        {
            description = value;
        }
    }

    public Customer Customer_id
    {
        get
        {
            return customer_id;
        }

        set
        {
            customer_id = value;
        }
    }

    public string Priority_key
    {
        get
        {
            return priority_key;
        }

        set
        {
            priority_key = value;
        }
    }

    public int Request_id
    {
        get
        {
            return request_id;
        }

        set
        {
            request_id = value;
        }
    }

    public Employee Project_manager
    {
        get
        {
            return project_manager;
        }

        set
        {
            project_manager = value;
        }
    }

    public DateTime Start_date
    {
        get
        {
            return start_date;
        }

        set
        {
            start_date = value;
        }
    }

    public DateTime End_date
    {
        get
        {
            return end_date;
        }

        set
        {
            end_date = value;
        }
    }

    public string Contact_name
    {
        get
        {
            return contact_name;
        }

        set
        {
            contact_name = value;
        }
    }

    public int Contact_phone
    {
        get
        {
            return contact_phone;
        }

        set
        {
            contact_phone = value;
        }
    }

    public DateTime Modified_at
    {
        get
        {
            return modified_at;
        }

        set
        {
            modified_at = value;
        }
    }

    public DateTime Created_at
    {
        get
        {
            return created_at;
        }

        set
        {
            created_at = value;
        }
    }

    public Employee Created_by
    {
        get
        {
            return created_by;
        }

        set
        {
            created_by = value;
        }
    }

    public List<Project> GetAllProjectsList() //for the "all projects page", only the active projects
    {

        #region DB functions
        string query = "select p.id, p.title project_title, p.project_manager, p.start_date, p.end_date, p.contact_name, p.priority_key from projects p"; // TODO: add a project status - active or not and change the query

        List<Project> ProjectsList = new List<Project>();
        DbServices db = new DbServices();
        DataSet ds = db.GetDataSetByQuery(query);

        foreach (DataRow dr in ds.Tables[0].Rows)
        {

            try
            {
                Project project = new Project();
                List<Employee> employees = new List<Employee>();
                Employee emp = new Employee();

                project.Id = (int)dr["id"];
                project.Title = dr["project_title"].ToString();
                project.Start_date = (DateTime)dr["start_date"];
                project.End_date = (DateTime)dr["end_date"];
                project.Contact_name = dr["contact_name"].ToString();
                project.Priority_key = dr["priority_key"].ToString();
                int project_manager_id = (int)dr["project_manager"];
                employees = emp.GetEmployees(project_manager_id); //call the func from employee to get employee details
                emp = employees.First();
                project.Project_manager = emp;

                Project proj = new Project(project.Id, project.Title, project.Project_manager, project.Start_date, project.End_date, project.Contact_name, project.Priority_key);

                ProjectsList.Add(proj);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw ex;

            }
        }
        #endregion
        return ProjectsList;

    }

    public List<Project> GetProjectsList(int id)
    {
        DbServices dbs = new DbServices();
        Employee emp = new Employee();
        DataTable employeesTable = emp.getEmployeesTable();
        DataTable projectsTable = dbs.getFullTable("projects");

        var results = (from p
                       in projectsTable.AsEnumerable()
                       join pm in employeesTable.AsEnumerable()
                       on p.Field<int>("project_manager") equals pm.Field<int>("id")
                       join cb in employeesTable.AsEnumerable()
                       on p.Field<int>("created_by") equals cb.Field<int>("id")
                       where p.Field<int>("id") == id
                       select new Project
                       {
                           Title = p["title"].ToString(),
                           Start_date = (DateTime)p["start_date"],
                           Contact_name = p["contact_name"].ToString(),
                           Description = p["description"].ToString(),
                           End_date = (DateTime)p["end_date"],
                           Id = Convert.ToInt32(p["id"]),
                           Priority_key = p["priority_key"].ToString(),
                           Contact_phone = Convert.ToInt32(p["contact_phone"]),
                           Created_by = emp.GetEmployee(cb),
                           Project_manager = emp.GetEmployee(pm)

                       });

        return results.ToList(); ;
       
    }

    public int UpdateProject(Project project)
    {
        #region DB functions

        StringBuilder query = new StringBuilder();
        query.AppendFormat("Update Projects set ");
        query.AppendFormat("contact_name = '{0}',", project.Contact_name);
        query.AppendFormat("contact_phone = {0},", project.Contact_phone);
        query.AppendFormat("start_date = '{0}',", project.Start_date.ToString());
        query.AppendFormat("end_date = '{0}',", project.End_date.ToString());
        query.AppendFormat("description = '{0}',", project.Description);
        query.AppendFormat("priority_key = '{0}',", project.Priority_key);
        query.AppendFormat("project_manager = {0},", project.Project_manager.Id);
        query.AppendFormat("title = '{0}' ", project.Title);
        query.AppendFormat("where  id={0};", project.Id);

        DbServices dbs = new DbServices();
        int rows_affected = dbs.ExecuteQuery(query.ToString());

        return rows_affected;
        #endregion


    }


    //public List<Project> GetProjectsList(int id)
    //{
    //    Northwind db = new Northwind("Data Source=Media.ruppin.ac.il;Initial Catalog=igroup82_test2");

    //    DbServices dbs = new DbServices();
    //    Employee emp = new Employee();

    //    DataTable employeesTable = emp.getEmployeesTable();
    //    DataTable projectsTable = dbs.getFullTable("projects");

    //    var results = (from p in db.Projects
    //                   join pm in db.Employees
    //                   on p.Project_manager.Id equals pm.Id
    //                   join cb in db.Employees
    //                   on p.Created_by.Id equals cb.Id
    //                   where p.Id == id
    //                   select new Project
    //                   {
    //                       Title = p.Title,
    //                       Start_date = p.Start_date,
    //                       Contact_name = p.Contact_name,
    //                       Description = p.Description,
    //                       End_date = p.End_date,
    //                       Id = p.Id,
    //                       Priority_key = p.Priority_key,
    //                       Contact_phone = p.Contact_phone,
    //                       Created_by = cb,
    //                       Project_manager = pm

    //                   });

    //    return results.ToList(); ;

    //}

}