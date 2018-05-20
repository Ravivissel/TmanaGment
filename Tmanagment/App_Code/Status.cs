using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for statuses
/// </summary>
public class Status
{
    private int id;
    private string title;

    public Status()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public Status(int id, string title)
    {
        this.id = id;
        this.title = title;
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

    public DataTable getProjectsStatusesTable()
    {
        #region DB functions
        DbServices dbs = new DbServices();
        DataTable projectsStatusesTable = dbs.getFullTable("projects_statuses");
        #endregion
        return projectsStatusesTable;
    }

    public Status GetProjectStatus(DataRow dr)
    {
        #region DB functions
        Status tmpStatus = new Status();
        tmpStatus.Id = Convert.ToInt32(dr["status_id"]);
        #endregion
        return tmpStatus;
    }
}