using System;
using System.Collections.Generic;
using System.Data;
using System.Web;

/// <summary>
/// Summary description for MyTasks
/// </summary>
public class MyTasks
{
    private string project_name;
    private DateTime end_date;
    private string task_title;
    private string assign_to;
    private string status;

    public MyTasks()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public MyTasks(string project_name, DateTime end_date, string task_title, string assign_to, string status)
    {
        this.project_name = project_name;
        this.end_date = end_date;
        this.task_title = task_title;
        this.assign_to = assign_to;
        this.status = status;
    }

    public string Project_name
    {
        get
        {
            return project_name;
        }

        set
        {
            project_name = value;
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


    public List<MyTasks> GetMyTasksList(Employee employee)
    {
    
        #region DB functions
        string query = "select p.title project_title, emp.first_name, at.end_date,at.title task_title, s.title status from projects p inner join actual_project_task apt on apt.project_id = p.id inner join actual_tasks at on at.id = apt.actual_tasks_id inner join actual_tasks_statuses ats on ats.task_id = at.id inner join employees emp on emp.id = at.assign_to inner join statuses s on s.id = ats.status_id " +
            "where " +
            "emp.id =" + employee.Id +
            "and " +
            "ats.is_current = 1 " +
            "and " +
            "s.title = 'Mr';"; // TODO: should be shange to the required status

        List<MyTasks> myTaskList =  new List<MyTasks>();
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
                actual_task.End_date = (DateTime)dr["end_date"];
                actual_task.Title = dr["task_title"].ToString();
                employee.First_name = dr["first_name"].ToString(); 
                actual_task.Assign_to = employee;
                status.Title = dr["status"].ToString();

                MyTasks tmpMyTask = new MyTasks(project.Title, actual_task.End_date, actual_task.Title, actual_task.Assign_to.First_name, status.Title);

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

}