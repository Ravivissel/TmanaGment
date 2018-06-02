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
    private string contact_phone;
    private DateTime modified_at;
    private DateTime created_at;
    private Employee created_by;
    private Status status;

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

    public Project(int id, string title, Employee project_manager, DateTime start_date, DateTime end_date, string contact_name, string priority_key, Status status)
    {
        this.id = id;
        this.Title = title;
        this.Project_manager = project_manager;
        this.Start_date = start_date;
        this.End_date = end_date;
        this.Contact_name = contact_name;
        this.Priority_key = priority_key;
        this.status = status;
    }

    public Project(int id, string title, string description, Customer customer_id, string priority_key, int request_id, Employee project_manager, DateTime start_date, DateTime end_date, string contact_name, string contact_phone, DateTime modified_at, DateTime created_at, Employee created_by)
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

    public Project(int id, string title, string description, Customer customer_id, string priority_key, int request_id, Employee project_manager, DateTime start_date, DateTime end_date, string contact_name, string contact_phone, DateTime modified_at, DateTime created_at, Employee created_by, Status status)
    {
        this.id = id;
        this.title = title;
        this.description = description;
        this.customer_id = customer_id;
        this.priority_key = priority_key;
        this.request_id = request_id;
        this.project_manager = project_manager;
        this.start_date = start_date;
        this.end_date = end_date;
        this.contact_name = contact_name;
        this.contact_phone = contact_phone;
        this.modified_at = modified_at;
        this.created_at = created_at;
        this.created_by = created_by;
        this.status = status;
    }

    public Project(string title, string description, Customer customer_id, string priority_key, int request_id, Employee project_manager, DateTime start_date, DateTime end_date, string contact_name, string contact_phone, DateTime modified_at, DateTime created_at, Employee created_by)
    {
        this.title = title;
        this.description = description;
        this.customer_id = customer_id;
        this.priority_key = priority_key;
        this.request_id = request_id;
        this.project_manager = project_manager;
        this.start_date = start_date;
        this.end_date = end_date;
        this.contact_name = contact_name;
        this.contact_phone = contact_phone;
        this.modified_at = modified_at;
        this.created_at = created_at;
        this.created_by = created_by;
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

    public string Contact_phone
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

    public Status Status
    {
        get
        {
            return status;
        }

        set
        {
            status = value;
        }
    }

    public List<Project> GetAllProjectsList() //for the "all projects page", only the active projects
    {
        #region DB functions
        string query = "select s.title project_status, p.id, p.title project_title, p.project_manager, p.start_date, p.end_date, p.contact_name, p.priority_key from projects p " +
            "inner join projects_statuses ps on p.id = ps.project_id " +
            "inner join statuses s on ps.status_id = s.id";

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
                Status status = new Status();

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
                status.Title = dr["project_status"].ToString();
                project.Status = status;

                Project proj = new Project(project.Id, project.Title, project.Project_manager, project.Start_date, project.End_date, project.Contact_name, project.Priority_key, project.Status);

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
        #region DB functions
        DbServices dbs = new DbServices();
        Employee emp = new Employee();
        Customer cus = new Customer();
        Status status = new Status();
        DataTable projectStatusesTable = status.getProjectsStatusesTable();
        DataTable customersTable = cus.getCustomersTable();
        DataTable employeesTable = emp.getEmployeesTable();
        DataTable projectsTable = dbs.getFullTable("projects");

        var results = (from p
                       in projectsTable.AsEnumerable()
                       join pm in employeesTable.AsEnumerable()
                       on p.Field<int>("project_manager") equals pm.Field<int>("id")
                       join cb in employeesTable.AsEnumerable()
                       on p.Field<int>("created_by") equals cb.Field<int>("id")
                       join ci in customersTable.AsEnumerable()
                       on p.Field<int>("customer_id") equals ci.Field<int>("id")
                       join ps in projectStatusesTable.AsEnumerable()
                       on p.Field<int>("id") equals ps.Field<int>("project_id")
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
                           Contact_phone = p["contact_phone"].ToString(),
                           Created_by = emp.GetEmployee(cb),
                           Project_manager = emp.GetEmployee(pm),
                           Customer_id = cus.GetCustomer(ci),
                           Status = status.GetProjectStatus(ps)
                       });
        #endregion
        return results.ToList();
    }

    public int UpdateProject(Project project)
    {
        #region DB functions
        StringBuilder query = new StringBuilder();

        query.AppendFormat("BEGIN transaction; ");

        //Update Projects
        query.AppendFormat("Update Projects set ");
        query.AppendFormat("contact_name = '{0}',", project.Contact_name);
        query.AppendFormat("contact_phone = '{0}',", project.Contact_phone);
        query.AppendFormat("start_date = '{0}',", project.Start_date.ToString());
        query.AppendFormat("end_date = '{0}',", project.End_date.ToString());
        query.AppendFormat("description = '{0}',", project.Description);
        query.AppendFormat("priority_key = '{0}',", project.Priority_key);
        query.AppendFormat("project_manager = {0},", project.Project_manager.Id);
        query.AppendFormat("customer_id = {0},", project.Customer_id.Id);
        query.AppendFormat("title = '{0}' ", project.Title);
        query.AppendFormat("where  id={0};", project.Id);

        //Update projects_statuses
        query.AppendFormat("UPDATE projects_statuses set ");
        query.AppendFormat("status_id = '{0}' ", project.Status.Id);
        query.AppendFormat("where project_id = '{0}'; ", project.Id);

        //Need to handle modified_by field or add it to the project_statuses_history table

        query.AppendFormat("COMMIT");




        DbServices dbs = new DbServices();
        int rows_affected = dbs.ExecuteQuery(query.ToString());
        #endregion
        return rows_affected;
    }

    public int GetOpenProjectsNum()
    {
        #region DB functions
        string query = "select s.title status_title from projects p " +
            "inner join projects_statuses ps on p.id = ps.project_id " +
            "inner join statuses s on ps.status_id = s.id " +
            "where " +
            "s.title != 'סגור';"; // TODO: should be change to the required status

        int counter = 0;
        DbServices db = new DbServices();
        DataSet ds = db.GetDataSetByQuery(query);

        foreach (DataRow dr in ds.Tables[0].Rows)
        {
            try
            {
                Project proj = new Project();
                Status status = new Status();

                status.Title = dr["status_title"].ToString();
                proj.Status = status;

                if (proj.Status.Title != "סגורה")
                    counter++;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw ex;

            }
        }
        #endregion
        return counter;
    }

    public void SetProject(List<ActualProjectTask> actualProjectTasksList)
    {
        #region DB functions
        DbServices db = new DbServices();

        string query = "";
        const int status_done = 3;
        string project_query;
        string customer_query;

        query = "Begin TRANSACTION DECLARE @output_projects TABLE (ID INT) DECLARE @output_customers TABLE(ID INT) ";

        if (customer_id.Id == -1)
        {

            customer_query = "insert into customers INSERTED.ID into @output_projects(id) values ('" + customer_id.First_name + "','" + customer_id.Last_name + "','" + customer_id.Phone_num + "','Y') ";
            project_query = "insert into projects OUTPUT INSERTED.ID into @output_projects(id) values ('" + title + "','" + description + "','" + "(select id from @output_customers)" + "','" + Priority_key + "','" + Request_id + "','" + Project_manager.Id + "','" + Start_date + "','" + End_date + "','" + Contact_name + "','" + Contact_phone + "','" + Modified_at + "','" + Created_at + "','" + Created_by.Id + "') ";

        }
        else
        {
            customer_query = "";
            project_query = "insert into projects OUTPUT INSERTED.ID into @output_projects(id) values ('" + title + "','" + description + "','" + Customer_id.Id + "','" + Priority_key + "','" + Request_id + "','" + Project_manager.Id + "','" + Start_date + "','" + End_date + "','" + Contact_name + "','" + Contact_phone + "','" + Modified_at + "','" + Created_at + "','" + Created_by.Id + "') ";


        }
        string project_statuses_query = "INSERT into projects_statuses(project_id, status_id, modified_by) values((select id from @output_projects)," + 3 + "," + Created_by.Id + ") ";
        string update_requests_statuses_query = "UPDATE requests_statuses SET status_id = '" + status_done + "', modified_by = '" + Created_by.Id + "' WHERE request_id = " + Request_id + " ";
       
        query += customer_query + project_query + project_statuses_query + update_requests_statuses_query;
        query += "COMMIT";

        db.ExecuteQuery(query);

        foreach(ActualProjectTask apt in actualProjectTasksList)
        {

            apt.SetTask("new");

        }

        #endregion
    }
}