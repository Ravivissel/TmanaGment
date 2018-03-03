using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for ActualTaskStatus
/// </summary>
public class ActualTaskStatus
{
    private Status status;
    private ActualTask actual_task;
    private DateTime modified_at;
    private bool is_current;
    private Employee modified_by;



    public ActualTaskStatus()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public ActualTaskStatus(Status status, ActualTask actual_task, DateTime modified_at, bool is_current, Employee modified_by)
    {
        this.Status = status;
        this.Actual_task = actual_task;
        this.Modified_at = modified_at;
        this.Is_current = is_current;
        this.Modified_by = modified_by;
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

    public DateTime Modified_at
    {
        get
        {
            return modified_at;
        }

        set
        {
            modified_at = value;
        }
    }

    public bool Is_current
    {
        get
        {
            return is_current;
        }

        set
        {
            is_current = value;
        }
    }

    public Employee Modified_by
    {
        get
        {
            return modified_by;
        }

        set
        {
            modified_by = value;
        }
    }
}