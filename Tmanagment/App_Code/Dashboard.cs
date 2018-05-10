using System;
using System.Collections.Generic;
using System.Data;
using System.Web;

/// <summary>
/// Summary description for MyTasks
/// </summary>
public class Dashboard
{
    private int task_id;
    private string project_title;
    private DateTime end_date;
    private string task_title;
    private string assign_to;
    private string status;

    private int request_id;
    private string request_title;
    private string contact_name;
    private int contact_phone;

    public Dashboard()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public Dashboard(int request_id, string request_title, string contact_name, int contact_phone)
    {
        this.request_id = request_id;
        this.request_title = request_title;
        this.contact_name = contact_name;
        this.contact_phone = contact_phone;
    }

    public Dashboard(int task_id, string project_title, DateTime end_date, string task_title, string assign_to, string status)
    {
        this.task_id = task_id;
        this.project_title = project_title;
        this.end_date = end_date;
        this.task_title = task_title;
        this.assign_to = assign_to;
        this.status = status;
    }

    public string Project_title
    {
        get
        {
            return project_title;
        }

        set
        {
            project_title = value;
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

    public string Task_title
    {
        get
        {
            return task_title;
        }

        set
        {
            task_title = value;
        }
    }

    public string Assign_to
    {
        get
        {
            return assign_to;
        }

        set
        {
            assign_to = value;
        }
    }

    public string Status
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

    public int Task_id
    {
        get
        {
            return task_id;
        }

        set
        {
            task_id = value;
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

    public string Request_title
    {
        get
        {
            return request_title;
        }

        set
        {
            request_title = value;
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

    public List<Dashboard> GetMyTasksList(Employee employee)
    {
    
        #region DB functions
        string query = "select at.id task_id, p.title project_title, emp.first_name, at.end_date,at.title task_title, s.title status from projects p inner join actual_project_task apt on apt.project_id = p.id inner join actual_tasks at on at.id = apt.actual_tasks_id inner join actual_tasks_statuses ats on ats.task_id = at.id inner join employees emp on emp.id = at.assign_to inner join statuses s on s.id = ats.status_id " +
            "where " +
            "emp.id =" + employee.Id +
            "and " +
            "ats.is_current = 1 " +
            "and " +
            "s.title = 'Mr';"; // TODO: should be change to the required status

        List<Dashboard> myTaskList =  new List<Dashboard>();
        DbServices db = new DbServices();
        DataSet ds = db.GetDataSetByQuery(query);

        foreach (DataRow dr in ds.Tables[0].Rows)
        {
            try
            {
                Project project = new Project();
                ActualTask actual_task = new ActualTask();
                Status status = new Status();

                project.Title = dr["project_title"].ToString();
                actual_task.Id = (int)dr["task_id"];
                actual_task.End_date = (DateTime)dr["end_date"];
                actual_task.Title = dr["task_title"].ToString();
                employee.First_name = dr["first_name"].ToString(); 
                actual_task.Assign_to = employee;
                status.Title = dr["status"].ToString();

                Dashboard tmpMyTask = new Dashboard(actual_task.Id, project.Title, actual_task.End_date, actual_task.Title, actual_task.Assign_to.First_name, status.Title);

                myTaskList.Add(tmpMyTask);
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw ex;

            }
        }
        #endregion
        return myTaskList;
  
    }

    public List<Dashboard> GetMyRequestsList()
    {
        #region DB functions
        string query = "select r.id request_id, r.title request_title, r.contact_name, r.contact_phone from requests r inner join requests_statuses rs on r.id = rs.request_id inner join statuses s on rs.status_id = s.id " +
            "where " +
            "rs.is_current = 1 " +
            "and " +
            "s.title = 'פתוחה';"; // TODO: should be shange to the required status

        List<Dashboard> myReqList = new List<Dashboard>();
        DbServices db = new DbServices();
        DataSet ds = db.GetDataSetByQuery(query);

        foreach (DataRow dr in ds.Tables[0].Rows)
        {
            try
            {
                Request req = new Request();

                req.Id = (int)dr["request_id"];
                req.Title = dr["request_title"].ToString();
                req.Contact_name = dr["contact_name"].ToString();
                req.Contact_phone = (int)dr["contact_phone"];

                Dashboard tmpMyTask = new Dashboard(req.Id, req.Title, req.Contact_name, req.Contact_phone);

                myReqList.Add(tmpMyTask);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw ex;

            }
        }
        #endregion

        return myReqList;

    }
}