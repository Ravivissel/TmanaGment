using System;
using System.Collections.Generic;
using System.Data;
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

    public List<ActualProjectTask> GetAllProjectsTasksList(Employee emp)
    {
        #region DB functions
        string query = "";
        if (emp.User_type == "A")
        {
            query = "select at.*, e_assign_to.first_name as assign_to_fn, e_created_by.first_name created_by_fn, s.title status_title, p.title project_name " +
                "from actual_tasks as at inner join employees e_assign_to on at.assign_to = e_assign_to.id " +
                "inner join employees e_created_by on e_created_by.id = at.created_by " +
                "inner join actual_tasks_statuses ats on at.id = ats.task_id " +
                "inner join statuses s on ats.status_id = s.id " +
                "inner join actual_project_task apt on at.id = apt.actual_tasks_id " +
                "inner join projects p on apt.project_id = p.id";
        }
        else
        {
            query = "select at.*, e_assign_to.first_name as assign_to_fn, e_created_by.first_name created_by_fn, s.title status_title, p.title project_name " +
                "from actual_tasks as at inner join employees e_assign_to on at.assign_to = e_assign_to.id " +
                "inner join employees e_created_by on e_created_by.id = at.created_by " +
                "inner join actual_tasks_statuses ats on at.id = ats.task_id " +
                "inner join statuses s on ats.status_id = s.id " +
                "inner join actual_project_task apt on at.id = apt.actual_tasks_id " +
                "inner join projects p on apt.project_id = p.id " +
                "where at.assign_to = " + emp.Id + "";
        }

        List<ActualProjectTask> actualTasksList = new List<ActualProjectTask>();
        DbServices db = new DbServices();
        DataSet ds = db.GetDataSetByQuery(query);

        foreach (DataRow dr in ds.Tables[0].Rows)
        {
            try
            {
                ActualProjectTask actual_project_task_temp = new ActualProjectTask();
                ActualTask act_task = new ActualTask();
                Employee created_by = new Employee();
                Employee assign_to = new Employee();
                Project project = new Project();
                Status status = new Status();

                created_by.First_name = dr["created_by_fn"].ToString();
                created_by.Id = Convert.ToInt32(dr["created_by"]);

                assign_to.First_name = dr["assign_to_fn"].ToString();
                assign_to.Id = Convert.ToInt32(dr["assign_to"]);

                status.Title = dr["status_title"].ToString();

                act_task.Title = dr["title"].ToString();
                //act_task.Description = dr["description"].ToString();
                act_task.Id = Convert.ToInt32(dr["id"]);
                act_task.Start_date = Convert.ToDateTime(dr["start_date"]);
                act_task.End_date = Convert.ToDateTime(dr["end_date"]);
                act_task.Created_by = created_by;
                act_task.Assign_to = assign_to;
                act_task.Status = status;

                actual_project_task_temp.Actual_task = act_task;

                project.Title = dr["project_name"].ToString();
                actual_project_task_temp.Project = project;

                actualTasksList.Add(actual_project_task_temp);
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

    public ActualProjectTask GetProjectTask()
    {
        #region DB functions
        string query = "select ats.status_id, at.id, at.title, at.description, at.end_date, at.assign_to, e.first_name, apt.project_id project_id from actual_tasks at " +
            "inner join employees e on at.assign_to = e.id " +
            "inner join actual_project_task apt on at.id = actual_tasks_id " +
            "inner join actual_tasks_statuses ats on at.id = ats.task_id " +
            "where at.id =" + Actual_task.Id + "";

        ActualProjectTask actualProjectTask = new ActualProjectTask(); 
        ActualTask task = new ActualTask();
        DbServices db = new DbServices();
        DataSet ds = db.GetDataSetByQuery(query);

        foreach (DataRow dr in ds.Tables[0].Rows)
        {
            try
            {
                Employee emp = new Employee();
                Project project = new Project();
                Status status = new Status();

                project.Id = (int)dr["project_id"];
                actualProjectTask.Project = project;

                task.Id = (int)dr["id"];
                task.Title = dr["title"].ToString();
                task.Description = dr["description"].ToString();
                task.End_date = (DateTime)dr["end_date"];
                emp.First_name = dr["first_name"].ToString();
                emp.Id = (int)dr["assign_to"];
                task.Assign_to = emp;
                status.Id = (int)dr["status_id"];
                task.Status = status;
                actualProjectTask.Actual_task = task;
                
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw ex;
            }
        }
        #endregion
        return actualProjectTask;
    }

    public void SetTask(string func)
    {
        #region DB functions
        DbServices db = new DbServices();
        DbServices db2 = new DbServices();
        DbServices db3 = new DbServices();
        string query = "";
        if (func == "edit")
        {
            //update the task
            query = "UPDATE actual_tasks SET description = '" + actual_task.Description + "', title = '" + actual_task.Title + "', end_date = '" + actual_task.End_date + "', created_by = '" + actual_task.Created_by.Id + "', assign_to = '" + actual_task.Assign_to.Id + "' WHERE id = " + actual_task.Id;
            db.ExecuteQuery(query);

            //update the matching project task
            query = "UPDATE actual_project_task SET project_id = '" + Project.Id + "' WHERE actual_tasks_id = " + actual_task.Id;
            db2.ExecuteQuery(query);

            //update the task status
            query = "UPDATE actual_tasks_statuses SET status_id = '" + actual_task.Status.Id + "', modified_by = '" + actual_task.Created_by.Id + "' WHERE task_id = " + actual_task.Id;
            db3.ExecuteQuery(query);
        }
        else if (func == "new")
        {       
            //insert a new task
            query = "insert into actual_tasks values ('" + actual_task.Description + "','" + actual_task.Title + "','" + actual_task.Start_date + "','" + actual_task.End_date + "','" + actual_task.Created_by.Id + "','" + actual_task.Assign_to.Id + "')";
            db.ExecuteQuery(query);

            //get the task id
            string tableName = "actual_tasks";
            string actualTaskId = db.Ga(tableName);

            //insert the new task to the matchig project
            query = "insert into actual_project_task values ('" + Project.Id + "','" + actualTaskId + "')";
            db2.ExecuteQuery(query);

            //insert the new task a status
            string statusId = "1";
            query = "insert into actual_tasks_statuses values ('" + actualTaskId + "','" + statusId + "','" + actual_task.Created_by.Id + "')";
            db3.ExecuteQuery(query);
        }
        #endregion
    }

    public List<ActualProjectTask> GetProjectTasksList(int projectId)
    {
        #region DB functions
        string query = "select at.*, e_assign_to.first_name as assign_to_fn, e_created_by.first_name created_by_fn, s.title status_title, p.title project_name " +
            "from actual_tasks as at inner join employees e_assign_to on at.assign_to = e_assign_to.id " +
            "inner join employees e_created_by on e_created_by.id = at.created_by " +
            "inner join actual_tasks_statuses ats on at.id = ats.task_id " +
            "inner join statuses s on ats.status_id = s.id " +
            "inner join actual_project_task apt on at.id = apt.actual_tasks_id " +
            "inner join projects p on apt.project_id = p.id " +
            "where p.id = " + projectId + "";

        List<ActualProjectTask> actualTasksList = new List<ActualProjectTask>();
        DbServices db = new DbServices();
        DataSet ds = db.GetDataSetByQuery(query);

        foreach (DataRow dr in ds.Tables[0].Rows)
        {
            try
            {
                ActualProjectTask actual_project_task_temp = new ActualProjectTask();
                ActualTask act_task = new ActualTask();
                Employee created_by = new Employee();
                Employee assign_to = new Employee();
                Project project = new Project();
                Status status = new Status();

                created_by.First_name = dr["created_by_fn"].ToString();
                created_by.Id = Convert.ToInt32(dr["created_by"]);

                assign_to.First_name = dr["assign_to_fn"].ToString();
                assign_to.Id = Convert.ToInt32(dr["assign_to"]);

                status.Title = dr["status_title"].ToString();

                act_task.Title = dr["title"].ToString();
                //act_task.Description = dr["description"].ToString();
                act_task.Id = Convert.ToInt32(dr["id"]);
                act_task.Start_date = Convert.ToDateTime(dr["start_date"]);
                act_task.End_date = Convert.ToDateTime(dr["end_date"]);
                act_task.Created_by = created_by;
                act_task.Assign_to = assign_to;
                act_task.Status = status;

                actual_project_task_temp.Actual_task = act_task;

                project.Title = dr["project_name"].ToString();
                actual_project_task_temp.Project = project;

                actualTasksList.Add(actual_project_task_temp);
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