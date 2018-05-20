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
    private Employee created_by;
    private Employee assign_to;
    private Status status;

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
}