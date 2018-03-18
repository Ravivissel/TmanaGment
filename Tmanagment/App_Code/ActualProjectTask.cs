using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for ActualProjectTask
/// </summary>
public class ActualProjectTask
{
    private Project project;
    private ActualTask actual_task;


    public ActualProjectTask()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public ActualProjectTask(Project project, ActualTask actual_task)
    {
        this.Project = project;
        this.Actual_task = actual_task;
    }

    public Project Project
    {
        get
        {
            return project;
        }

        set
        {
            project = value;
        }
    }

    public ActualTask Actual_task
    {
        get
        {
            return actual_task;
        }

        set
        {
            actual_task = value;
        }
    }

    public void SetTask()
    {
        DbServices db = new DbServices();
        string query = "insert into actual_tasks values ('" + actual_task.Description + "','" + actual_task.Title + "','" + actual_task.Start_date + "','" + actual_task.End_date + "','" + actual_task.Created_by.Id + "','" + actual_task.Assign_to.Id + "')";
        db.ExecuteQuery(query);
    }
}