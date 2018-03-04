using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;

/// <summary>
/// Summary description for Request
/// </summary>
public class Request
{
    private int id;
    private string title;
    private string description;
    private string contact_name;
    private int contact_phone;
    private DateTime created_at;
    private Employee created_by;
    private Employee assign_to;


    public Request()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public Request(int id, string title, string description, string contact_name, int contact_phone, DateTime created_at, Employee created_by, Employee assign_to)
    {
        this.id = id;
        this.title = title;
        this.description = description;
        this.contact_name = contact_name;
        this.contact_phone = contact_phone;
        this.created_at = created_at;
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

    public List<Request> getRequestList()
    {
        #region DB functions
        string query = "select * from requests r inner join requests_statuses rs on r.id = rs.request_id where is_current = 'True' and rs.";

        List<Request> list = new List<Request>();
        DbServices db = new DbServices();
        DataSet ds = db.GetDataSetByQuery(query);

        foreach (DataRow dr in ds.Tables[0].Rows)
        {
            Request tmp = new Request();
            tmp.Title = dr["title"].ToString();
            tmp.Contact_name = dr["contact_name"].ToString();
            tmp.Contact_phone = (int)dr["contact_phone"];

            list.Add(tmp);
        }
        #endregion

        return list;

    }
}