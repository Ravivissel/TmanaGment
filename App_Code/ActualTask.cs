using System;
using System.Collections.Generic;
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
}