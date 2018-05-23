﻿using System;
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
    private string contact_phone;
    private DateTime created_at;
    private Employee created_by;
    private Employee assign_to;
    private Status status;

    public Request()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public Request(int id, string title, string description, string contact_name, string contact_phone, DateTime created_at, Employee created_by, Employee assign_to)
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

    public Request(string title, string description, string contact_name, string contact_phone, DateTime created_at, Employee created_by, Employee assign_to)
    {
        this.title = title;
        this.description = description;
        this.contact_name = contact_name;
        this.contact_phone = contact_phone;
        this.created_at = created_at;
        this.created_by = created_by;
        this.assign_to = assign_to;
    }

    public Request(int id, string title, string contact_name, string contact_phone)
    {
        this.id = id;
        this.title = title;
        this.contact_name = contact_name;
        this.contact_phone = contact_phone;
    }

    public Request(int id, string title, string contact_name, string contact_phone, Employee assign_to)
    {
        this.id = id;
        this.title = title;
        this.contact_name = contact_name;
        this.contact_phone = contact_phone;
        this.assign_to = assign_to;
    }

    public Request(int id, string title, string contact_name, string contact_phone, Employee assign_to, Status status)
    {
        this.id = id;
        this.title = title;
        this.contact_name = contact_name;
        this.contact_phone = contact_phone;
        this.assign_to = assign_to;
        this.status = status;
    }

    public Request(int id, string title, string description, string contact_name, string contact_phone, DateTime created_at, Employee created_by, Employee assign_to, Status status)
    {
        this.id = id;
        this.title = title;
        this.description = description;
        this.contact_name = contact_name;
        this.contact_phone = contact_phone;
        this.created_at = created_at;
        this.created_by = created_by;
        this.assign_to = assign_to;
        this.status = status;
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

    public string Contact_phone
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

    public List<Request> GetRequestsList()
    {
        #region DB functions
        string query = "select s.title status_title, r.id, r.title request_title, r.contact_name, r.contact_phone, r.assign_to from requests r " +
            "inner join requests_statuses rs on r.id = rs.request_id " +
            "inner join statuses s on rs.status_id = s.id ";

        List<Request> ReqList = new List<Request>();
        DbServices db = new DbServices();
        DataSet ds = db.GetDataSetByQuery(query);

        foreach (DataRow dr in ds.Tables[0].Rows)
        {
            try
            {
                Request req = new Request();
                List<Employee> employees = new List<Employee>();
                Employee emp = new Employee();
                Status status = new Status();

                req.Id = (int)dr["id"];
                req.Title = dr["request_title"].ToString();
                req.Contact_name = dr["contact_name"].ToString();
                req.Contact_phone = dr["contact_phone"].ToString();
                int assign_to_id = (int)dr["assign_to"];
                employees = emp.GetEmployees(assign_to_id); //call the func from employee to get employee details
                emp = employees.First();
                req.Assign_to = emp;
                status.Title = dr["status_title"].ToString();
                req.Status = status;

                Request reqList = new Request(req.Id, req.Title, req.Contact_name, req.Contact_phone, req.Assign_to, req.Status);

                ReqList.Add(reqList);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw ex;

            }
        }
        #endregion
        return ReqList;
    }

    public void SetRequest(string func)
    {
        #region DB functions
        DbServices db = new DbServices();
        DbServices db2 = new DbServices();
        string query = "";
        if (func == "edit")
        {
            //update the request
            query = "UPDATE requests SET title = '" + title + "', description = '" + description + "', contact_name = '" + contact_name + "', contact_phone = '" + contact_phone + "', created_by = '" + created_by.Id + "', assign_to = '" + assign_to.Id + "' WHERE id = " + id;
            db.ExecuteQuery(query);

            //update the request status
            query = "UPDATE requests_statuses SET status_id = '" + status.Id + "', modified_by = '" + created_by.Id + "' WHERE request_id = " + id; 
            db2.ExecuteQuery(query);

        }
        else if (func == "new")
        {
            //insert a new request
            query = "insert into requests values ('" + title + "','" + description + "','" + contact_name + "','" + contact_phone + "','" + created_at + "'," + created_by.Id + ",'" + assign_to.Id + "')";
            db.ExecuteQuery(query);

            //get the request id
            string statusId = "1";
            string tableName = "requests";
            string requestId = db.Ga(tableName);

            //insert the new request a status
            query = "insert into requests_statuses values ('" + requestId + "','" + statusId + "','" + created_by.Id + "')";
            db2.ExecuteQuery(query);
        }
        #endregion
    }

    public Request GetRequest()
    {
        #region DB functions
        string query = "select r.id, r.title, r.description, r.contact_name, r.contact_phone, r.assign_to, e.first_name from requests r " +
            "inner join employees e on r.assign_to = e.id where r.id =" + Id + "";

        Request req = new Request();
        DbServices db = new DbServices();
        DataSet ds = db.GetDataSetByQuery(query);

        foreach (DataRow dr in ds.Tables[0].Rows)
        {
            try
            {
                Employee emp = new Employee();

                req.Id = (int)dr["id"];
                req.Title = dr["title"].ToString();
                req.Description = dr["description"].ToString();
                req.Contact_name = dr["contact_name"].ToString();
                req.Contact_phone = dr["contact_phone"].ToString();
                emp.First_name = dr["first_name"].ToString();
                emp.Id = (int)dr["assign_to"];
                req.Assign_to = emp;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw ex;

            }
        }
        #endregion
        return req;
    }

    public int GetOpenRequestsNum()
    {
        #region DB functions
        string query = "select s.title status_title from requests r " +
            "inner join requests_statuses rs on r.id = rs.request_id " +
            "inner join statuses s on rs.status_id = s.id " +
            "where " +
            "s.title = 'פתוחה';"; // TODO: should be change to the required status

        int counter = 0;
        DbServices db = new DbServices();
        DataSet ds = db.GetDataSetByQuery(query);

        foreach (DataRow dr in ds.Tables[0].Rows)
        {
            try
            {
                Request req = new Request();
                Status status = new Status();

                status.Title = dr["status_title"].ToString();
                req.Status = status;

                if (req.Status.Title == "פתוחה")
                    counter++;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw ex;

            }
        }
        #endregion
        return counter;
    }
}