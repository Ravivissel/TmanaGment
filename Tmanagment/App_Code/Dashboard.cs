using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
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
        string query = "select at.id task_id, p.title project_title, emp.first_name, at.end_date,at.title task_title, s.title status from projects p " +
            "inner join actual_project_task apt on apt.project_id = p.id " +
            "inner join actual_tasks at on at.id = apt.actual_tasks_id " +
            "inner join actual_tasks_statuses ats on ats.task_id = at.id " +
            "inner join employees emp on emp.id = at.assign_to " +
            "inner join statuses s on s.id = ats.status_id " +
            "where " +
            "emp.id =" + employee.Id +
            "and " +
            "s.title != 'סגורה';"; // TODO: should be change to the required status

        List<Dashboard> myTaskList = new List<Dashboard>();
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
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw ex;

            }
        }
        #endregion
        return myTaskList;
    }

    public List<Dashboard> GetMyRequestsList(Employee employee)
    {
        #region DB functions
        string query2 = "select at.id task_id, p.title project_title, emp.first_name, at.end_date,at.title task_title, s.title status from projects p " +
            "inner join actual_project_task apt on apt.project_id = p.id " +
            "inner join actual_tasks at on at.id = apt.actual_tasks_id " +
            "inner join actual_tasks_statuses ats on ats.task_id = at.id " +
            "inner join employees emp on emp.id = at.assign_to " +
            "inner join statuses s on s.id = ats.status_id " +
            "where " +
            "emp.id =" + employee.Id +
            "and " +
            "s.title != 'סגורה';"; // TODO: should be change to the required status

        string query = "select r.id request_id, r.title request_title, r.contact_name, r.contact_phone from requests r " +
            "inner join requests_statuses rs on r.id = rs.request_id " +
            "inner join statuses s on rs.status_id = s.id " +
            "inner join employees emp on emp.id = r.assign_to " +
            "where " +
            "emp.id =" + employee.Id +
            "and " +
            "s.title != 'סגורה';"; // TODO: should be shange to the required status

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

    public string GetStatistics()
    {
        #region DB functions
        #region query 

        // BuildMyString.com generated code. Please enjoy your string responsibly.
        string query = "declare @almost_late_date datetime " +
        "declare @today datetime " +
        "declare @late_tasks int  " +
        "declare @almost_late_tasks int  " +
        "declare @tasks_for_today int  " +
        "declare @open_requests int  " +
        "declare @projects_in_progress int  " +
        "declare @total_projects int  " +
        "declare @total_actual_tasks int " +
        "declare @total_requests int " +
        "declare @late_tasks_percent int  " +
        "declare @open_requests_percent int  " +
        "declare @projects_in_progress_percent int  " +
        "declare @tasks_for_today_percent int " +
        "set @today = getdate() " +
        "set @almost_late_date = dateadd(day,+2,@today) " +
        "set @late_tasks = (select count(*) as late_tasks " +
        "from actual_tasks as at " +
        "where at.end_date < @today) " +
        "set @almost_late_tasks = (select count(*) as almost_late_tasks " +
        "from actual_tasks as at " +
        "where at.end_date > @today and at.end_date <= @almost_late_date) " +
        "set @tasks_for_today = (select count(*) as tasks_for_today " +
        "from actual_tasks as at " +
        "where at.end_date = @today) " +
        "set @open_requests = ( " +
        "select count(*) as open_requests " +
        "from requests as r " +
        "join requests_statuses rs on rs.request_id = r.id " +
        "join  statuses s on s.id = rs.status_id " +
        "where s.title ='פתוחה' " +
        ") " +
        "set @projects_in_progress =( " +
        "select count(*) as projects_in_progress " +
        "from projects p  " +
        "join projects_statuses ps on p.id = ps.project_id " +
        "join statuses s on s.id = ps.status_id " +
        "where s.title != 'סגור' " +
        ") " +
        "set @total_projects = (select count(*) as total_projects  from projects) " +
        "set @total_actual_tasks =(select count(*) as total_actual_tasks from actual_tasks) " +
        "set @total_requests = (select count(*) as total_requests from requests) " +
        "set @open_requests_percent = (round((cast(@open_requests as float) / cast (@total_requests as float))*100,0)) " +
        "set @late_tasks_percent = (round((cast(@late_tasks as float) / cast (@total_actual_tasks as float))*100,0)) " +
        "set @projects_in_progress_percent = (round((cast(@projects_in_progress as float) / cast (@total_projects as float))*100,0)) " +
        "set @tasks_for_today_percent = (round((cast(@tasks_for_today as float) / cast (@total_actual_tasks as float))*100,0)) " +
        "select @late_tasks late_tasks, @projects_in_progress projects_in_progress, @tasks_for_today tasks_for_today, @open_requests open_requests, @projects_in_progress_percent projects_in_progress_percent, @late_tasks_percent late_tasks_percent, @tasks_for_today_percent tasks_for_today_percent , @open_requests_percent open_requests_percent ";
        #endregion

        DbServices db = new DbServices();
        DataSet ds = db.GetDataSetByQuery(query);
        string statistics = JsonConvert.SerializeObject(ds.Tables[0]);

        return statistics;
        #endregion
    }
}