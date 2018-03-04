using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for MyTasks
/// </summary>
public class MyTasks
{

    private ActualTask actual_task;
    private Project project;
    private Status status;

    public MyTasks()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public MyTasks(ActualTask actual_task, Project project, Status status)
    {
        this.Actual_task = actual_task;
        this.Project = project;
        this.Status = status;
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


    public List<MyTasks> getMyTasksList()
    {


        #region DB functions
        string query = "select p.title project_title, emp.first_name, at.end_date,at.title task_title, s.title status from projects p inner join actual_project_task apt on apt.project_id = p.id inner join actual_tasks at on at.id = apt.actual_tasks_id inner join actual_tasks_statuses ats on ats.task_id = at.id inner join employees emp on emp.id = at.assign_to inner join statuses s on s.id = ats.status_id where emp.id = 75  and ats.is_current = 1 and s.title = 'Mr';";

        List<MyTasks> myTaskList =  new List<MyTasks>();
        DbServices db = new DbServices();
        DataSet ds = db.GetDataSetByQuery(query);

        foreach (DataRow dr in ds.Tables[0].Rows)
        {

            Project proj = new Project();
            ActualTask at = new ActualTask();
            Status s = new Status();
            Employee emp = new Employee();

            proj.Title = dr["project_title"].ToString();
            at.End_date = (DateTime)dr["end_date"];
            at.Title = dr["task_title"].ToString();
            emp.First_name = dr["first_name"].ToString();
            at.Assign_to = emp;
            s.Title = dr["status"].ToString();

            proj.Title = dr["project_title"].ToString();
            MyTasks tmpMyTask = new MyTasks(at,proj,status);

            myTaskList.Add(tmpMyTask);
        }
        #endregion
        return myTaskList;

    }

}