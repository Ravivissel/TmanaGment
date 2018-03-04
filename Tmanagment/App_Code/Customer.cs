using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Customer
/// </summary>
public class Customer
{

    private int id;
    private string first_name;
    private string last_name;
    private int phone_num;

    public Customer()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public Customer(int id, string first_name, string last_name, int phone_num)
    {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone_num = phone_num;
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

    public int Phone_num
    {
        get
        {
            return phone_num;
        }

        set
        {
            phone_num = value;
        }
    }
}