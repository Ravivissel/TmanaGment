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

    public void SetTask(string func)
    {
        DbServices db = new DbServices();
        string query = "";
        if (func == "edit")
        {
            query = "UPDATE actual_tasks SET description = '" + actual_task.Description + "', title = '" + actual_task.Title + "', end_date = '" + actual_task.End_date + "', created_by = '" + actual_task.Created_by.Id + "', assign_to = '" + actual_task.Assign_to.Id + "' WHERE id = " + actual_task.Id;
        }
        else if (func == "new")
        {
            query = "insert into actual_tasks values ('" + actual_task.Description + "','" + actual_task.Title + "','" + actual_task.Start_date + "','" + actual_task.End_date + "','" + actual_task.Created_by.Id + "','" + actual_task.Assign_to.Id + "')";
        }     
        db.ExecuteQuery(query);
    }
}