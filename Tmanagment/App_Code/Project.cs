using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

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
        this.Id = id;
        this.Title = title;
        this.Description = description;
        this.Customer_id = customer_id;
        this.Priority_key = priority_key;
        this.Request_id = request_id;
        this.Project_manager = project_manager;
        this.Start_date = start_date;
        this.End_date = end_date;
        this.Contact_name = contact_name;
        this.Contact_phone = contact_phone;
        this.Modified_at = modified_at;
        this.Created_at = created_at;
        this.Created_by = created_by;
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
                Employee emp = new Employee();

                project.Id = (int)dr["id"];
                project.Title = dr["project_title"].ToString();
                project.Start_date = (DateTime)dr["start_date"];
                project.End_date = (DateTime)dr["end_date"];
                emp.First_name = dr["project_manager"].ToString();
                project.Project_manager = emp;
                project.Contact_name = dr["contact_name"].ToString();
                project.Priority_key = dr["priority_key"].ToString();

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

    public void setProjectByID(int projectID) //for the "all projects page", only the active projects
    {

        #region DB functions
        string query = "select * from projects p where p.id =" + projectID ; // TODO: add a project status - active or not and change the query

        DbServices db = new DbServices();
        DataSet ds = db.GetDataSetByQuery(query);

        
        foreach (DataRow dr in ds.Tables[0].Rows)
        {
          
            try
            {
                Employee emp = new Employee();
                this.Title = dr["project_title"].ToString();
                this.Start_date = (DateTime)dr["start_date"];
                this.End_date = (DateTime)dr["end_date"];
                emp.First_name = dr["project_manager"].ToString();
                this.Project_manager = emp;
                this.Contact_name = dr["contact_name"].ToString();
                this.Priority_key = dr["priority_key"].ToString();

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw ex;

            }
        }
        #endregion

    }
   
}