using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Employee
/// </summary>
public class Employee
{
    private int id;
    private string first_name;
    private string last_name;
    private int phone_number;
    private string title;


    public Employee()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public Employee(int id, string first_name, string last_name, int phone_number, string title)
    {
        this.Id = id;
        this.First_name = first_name;
        this.Last_name = last_name;
        this.Phone_number = phone_number;
        this.Title = title;
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

    public string First_name
    {
        get
        {
            return first_name;
        }

        set
        {
            first_name = value;
        }
    }

    public string Last_name
    {
        get
        {
            return last_name;
        }

        set
        {
            last_name = value;
        }
    }

    public int Phone_number
    {
        get
        {
            return phone_number;
        }

        set
        {
            phone_number = value;
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



    public DataTable getEmployeesTable()
    {
        DbServices dbs = new DbServices();
        DataTable employeesTable = dbs.getFullTable("employees");
        return employeesTable;

    }

    public Employee GetEmployee(DataRow dr)
    {
        Employee tmpEmployee = new Employee();

        tmpEmployee.First_name = dr["first_name"].ToString();
        tmpEmployee.Last_name = dr["last_name"].ToString();
        tmpEmployee.Phone_number = Convert.ToInt32(dr["phone_num"]);
        tmpEmployee.Id = Convert.ToInt32(dr["id"]);
        tmpEmployee.Title = dr["title"].ToString();

        return tmpEmployee;

    }
}