using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Project
/// </summary>
public class Project
{

    private int id;
    private string title;
    private string description;
    private Customer customer_id;
    private int priority_key;
    private int request_id;
    private Employee project_manager;
    private DateTime start_date;
    private DateTime end_date;
    private string contact_name;
    private int contact_phone;
    private DateTime modified_at;
    private DateTime created_at;
    private Employee created_by;


    public Project()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public Project(int id, string title, string description, Customer customer_id, int priority_key, int request_id, Employee project_manager, DateTime start_date, DateTime end_date, string contact_name, int contact_phone, DateTime modified_at, DateTime created_at, Employee created_by)
    {
        this.Id = id;
        this.Title = title;
        this.Description = description;
        this.Customer_id = customer_id;
        this.Priority_key = priority_key;
        this.Request_id = request_id;
        this.Project_manager = project_manager;
        this.Start_date = start_date;
        this.End_date = end_date;
        this.Contact_name = contact_name;
        this.Contact_phone = contact_phone;
        this.Modified_at = modified_at;
        this.Created_at = created_at;
        this.Created_by = created_by;
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

    public Customer Customer_id
    {
        get
        {
            return customer_id;
        }

        set
        {
            customer_id = value;
        }
    }

    public int Priority_key
    {
        get
        {
            return priority_key;
        }

        set
        {
            priority_key = value;
        }
    }

    public int Request_id
    {
        get
        {
            return request_id;
        }

        set
        {
            request_id = value;
        }
    }

    public Employee Project_manager
    {
        get
        {
            return project_manager;
        }

        set
        {
            project_manager = value;
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

    public string Contact_name
    {
        get
        {
            return contact_name;
        }

        set
        {
            contact_name = value;
        }
    }

    public int Contact_phone
    {
        get
        {
            return contact_phone;
        }

        set
        {
            contact_phone = value;
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

    public DateTime Created_at
    {
        get
        {
            return created_at;
        }

        set
        {
            created_at = value;
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
}