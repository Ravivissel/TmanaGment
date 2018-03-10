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


    public List<ActualTask> GetAllTasksList()
    {
        #region DB functions
        string query = "select at.*,e_assign_to.first_name as assign_to_fn, e_created_by.first_name created_by_fn from actual_tasks as at inner join employees e_assign_to on at.assign_to = e_assign_to.id  inner join employees e_created_by on e_created_by.id = at.created_by;";

        List<ActualTask> actualTasksList = new List<ActualTask>();
        DbServices db = new DbServices();
        DataSet ds = db.GetDataSetByQuery(query);

        foreach (DataRow dr in ds.Tables[0].Rows)
        {
            try
            {
                ActualTask actual_task_temp = new ActualTask();
                Employee created_by = new Employee();
                Employee assign_to = new Employee();

                created_by.First_name = dr["created_by_fn"].ToString();
                created_by.Id = Convert.ToInt32(dr["created_by"]);

                assign_to.First_name = dr["assign_to_fn"].ToString();
                assign_to.Id = Convert.ToInt32(dr["assign_to"]);

                actual_task_temp.Title = dr["title"].ToString();
                actual_task_temp.Description = dr["description"].ToString();
                actual_task_temp.Id = Convert.ToInt32(dr["id"]);
                actual_task_temp.Start_date = Convert.ToDateTime(dr["start_date"]);
                actual_task_temp.End_date = Convert.ToDateTime(dr["end_date"]);
                actual_task_temp.Created_by = created_by;
                actual_task_temp.Assign_to = assign_to;

                actualTasksList.Add(actual_task_temp);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw ex;

            }
        }
        #endregion

        return actualTasksList;




    }
}