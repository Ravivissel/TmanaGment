using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Task
/// </summary>
public class ActualTask
{
    private int id;
    private string description;
    private string title;
    private DateTime start_date;
    private DateTime end_date;
    private DateTime created_at;
    private Employee created_by;
    private Employee assign_to;
    private Status status;
    private bool is_const;
    private int estimate_time;


    public ActualTask()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public ActualTask(int id, string description, string title, DateTime start_date, DateTime end_date, Employee created_by, Employee assign_to)
    {
        this.id = id;
        this.description = description;
        this.title = title;
        this.start_date = start_date;
        this.end_date = end_date;
        this.created_by = created_by;
        this.assign_to = assign_to;
    }

    public ActualTask(string description, string title, DateTime start_date, DateTime end_date, Employee created_by, Employee assign_to)
    {
        this.description = description;
        this.title = title;
        this.start_date = start_date;
        this.end_date = end_date;
        this.created_by = created_by;
        this.assign_to = assign_to;
    }

    public ActualTask(int id, string description, string title, DateTime start_date, DateTime end_date, Employee created_by, Employee assign_to, Status status)
    {
        this.id = id;
        this.description = description;
        this.title = title;
        this.start_date = start_date;
        this.end_date = end_date;
        this.created_by = created_by;
        this.assign_to = assign_to;
        this.status = status;
    }
    public ActualTask(int id, string description, string title, DateTime start_date, DateTime end_date, Employee created_by, Employee assign_to, Status status,int estimate_time,bool is_const)
    {
        this.id = id;
        this.description = description;
        this.title = title;
        this.start_date = start_date;
        this.end_date = end_date;
        this.created_by = created_by;
        this.assign_to = assign_to;
        this.status = status;
        this.Is_const = is_const;
        this.Estimate_time = estimate_time;
    }

    public ActualTask(int id, string description, string title, DateTime start_date, DateTime end_date, DateTime created_at, Employee created_by, Employee assign_to, Status status)
    {
        this.id = id;
        this.description = description;
        this.title = title;
        this.start_date = start_date;
        this.end_date = end_date;
        this.created_at = created_at;
        this.created_by = created_by;
        this.assign_to = assign_to;
        this.status = status;
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

    public Employee Assign_to
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

    public bool Is_const
    {
        get
        {
            return is_const;
        }

        set
        {
            is_const = value;
        }
    }

    public int Estimate_time
    {
        get
        {
            return estimate_time;
        }

        set
        {
            estimate_time = value;
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

    public int GetTasksNum(string status)
    {
        #region DB functions
        string query = "select s.title status_title from actual_tasks as at " +
            "inner join employees e_assign_to on at.assign_to = e_assign_to.id " +
            "inner join employees e_created_by on e_created_by.id = at.created_by " +
            "inner join actual_tasks_statuses ats on at.id = ats.task_id " +
            "inner join statuses s on ats.status_id = s.id ";

        int counter = 0;
        DbServices db = new DbServices();
        DataSet ds = db.GetDataSetByQuery(query);

        foreach (DataRow dr in ds.Tables[0].Rows)
        {
            try
            {
                ActualTask actual_task = new ActualTask();
                Status s = new Status();

                s.Title = dr["status_title"].ToString();
                actual_task.Status = s;

                if (actual_task.Status.Title == "פתוחה" && status == "פתוחה")
                    counter++;
                else if (actual_task.Status.Title == "בתהליך" && status == "בתהליך")
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

    public int GetTodaysTasksNum()
    {
        #region DB functions
        string query = "select at.end_date from actual_tasks as at";

        int counter = 0;
        DbServices db = new DbServices();
        DataSet ds = db.GetDataSetByQuery(query);

        foreach (DataRow dr in ds.Tables[0].Rows)
        {
            try
            {
                ActualTask actual_task = new ActualTask();
                actual_task.End_date = (DateTime)dr["end_date"];

                string taskDate = actual_task.End_date.ToString("dd/MM/yyyy");
                string TodaysDate = DateTime.Now.ToString("dd/MM/yyyy");

                if (taskDate == TodaysDate)
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

    public int GetLateTasksNum()
    {
        #region DB functions
        string query = "select at.end_date from actual_tasks as at";

        int counter = 0;
        DbServices db = new DbServices();
        DataSet ds = db.GetDataSetByQuery(query);

        foreach (DataRow dr in ds.Tables[0].Rows)
        {
            try
            {
                ActualTask actual_task = new ActualTask();
                actual_task.End_date = (DateTime)dr["end_date"];
                DateTime TodaysDate = DateTime.Now;

                int result = DateTime.Compare(actual_task.End_date, TodaysDate);

                if (result < 0)
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

    public int GetAlmostLateTasksNum()
    {
        #region DB functions
        string query = "select at.end_date from actual_tasks as at";

        int counter = 0;
        DbServices db = new DbServices();
        DataSet ds = db.GetDataSetByQuery(query);

        foreach (DataRow dr in ds.Tables[0].Rows)
        {
            try
            {
                ActualTask actual_task = new ActualTask();
                actual_task.End_date = (DateTime)dr["end_date"];
                DateTime TodaysDate = DateTime.Now;
                TodaysDate = DateTime.Today.AddDays(2); //almost late is two days from now

                int result = DateTime.Compare(actual_task.End_date, TodaysDate);

                if (result == 0)
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


    public string GetStatistics()
    {
        #region DB functions
        #region query 
        // BuildMyString.com generated code. Please enjoy your string responsibly.

        // BuildMyString.com generated code. Please enjoy your string responsibly.

        string query = "declare @almost_late_date datetime " +
        "declare @today datetime " +
        "declare @open_tasks int " +
        "declare @late_tasks int  " +
        "declare @tasks_in_progress int " +
        "declare @almost_late_tasks int  " +
        "declare @open_tasks_percent int  " +
        "declare @tasks_in_progress_percent int  " +
        "declare @late_tasks_percent int " +
        "declare @almost_late_tasks_percent int " +
        "declare @total_actual_tasks int " +
        "set @today = getdate() " +
        "set @almost_late_date = dateadd(day,+2,@today) " +
        "set @almost_late_tasks = (select count(*) as almost_late_tasks " +
        "from actual_tasks as at " +
        "where at.end_date > @today and at.end_date <= @almost_late_date) " +
        "set @late_tasks = (select count(*) as late_tasks " +
        "from actual_tasks as at " +
        "where at.end_date < @today) " +
        "set @open_tasks = ( " +
        "select count(*) as open_tasks " +
        "from actual_tasks as at " +
        "join actual_tasks_statuses ats on ats.task_id = at.id " +
        "join  statuses s on s.id = ats.status_id " +
        "where s.title ='פתוחה' " +
        ") " +
        "set @tasks_in_progress =( " +
        "select count(*) as tasks_in_progress " +
        "from actual_tasks as at " +
        "join actual_tasks_statuses ats on ats.task_id = at.id " +
        "join  statuses s on s.id = ats.status_id " +
        "where s.title = 'בתהליך' " +
        ") " +
        "set @total_actual_tasks =(select count(*) as total_actual_tasks from actual_tasks) " +
        "set @almost_late_tasks_percent = (round((cast(@almost_late_tasks as float) / cast (@total_actual_tasks as float))*100,0)) " +
        "set @late_tasks_percent = (round((cast(@late_tasks as float) / cast (@total_actual_tasks as float))*100,0)) " +
        "set @open_tasks_percent = (round((cast(@open_tasks as float) / cast (@total_actual_tasks as float))*100,0)) " +
        "set @tasks_in_progress_percent = (round((cast(@tasks_in_progress as float) / cast (@total_actual_tasks as float))*100,0)) " +
        "select @open_tasks open_tasks, @late_tasks late_tasks, @tasks_in_progress tasks_in_progress, @almost_late_tasks almost_late_tasks, @almost_late_tasks_percent almost_late_tasks_percent, @late_tasks_percent late_tasks_percent, @open_tasks_percent open_tasks_percent , @tasks_in_progress_percent tasks_in_progress_percent ";
        #endregion
        DbServices db = new DbServices();
        DataSet ds = db.GetDataSetByQuery(query);
        string statistics = JsonConvert.SerializeObject(ds.Tables[0]);
        return statistics;
        #endregion
    }

    public List<ActualTask> GetConstActualTasks()
    {
        #region DB functions
        #region query 
        // BuildMyString.com generated code. Please enjoy your string responsibly.
        string query = "select * from actual_tasks where is_const = 'True'";
        #endregion
        try
        {
            DbServices db = new DbServices();
            DataSet ds = db.GetDataSetByQuery(query);
            List<ActualTask> actList = new List<ActualTask>();

            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                try
<<<<<<< HEAD
                {   
=======

                {
                  
>>>>>>> wizardFinal3
                    ActualTask at = new ActualTask();
                    at.Id = Convert.ToInt32(dr["id"]);
                    at.Title = dr["title"].ToString();
                    at.Description = dr["description"].ToString();
                    at.Estimate_time = Convert.ToInt32(dr["estimated_time"]);
                    actList.Add(at);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                    throw ex;
                }
            }         
            return actList;
        }
        catch(Exception e)
        {
            throw (e);
        }     
        #endregion
    }
}