using System;
using System.Collections.Generic;
using System.Data;
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
    private string phone_num;
    private string active;

    public Customer()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public Customer(int id, string first_name, string last_name, string phone_num)
    {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone_num = phone_num;
    }

    public Customer(int id, string first_name, string last_name, string phone_num, string active)
    {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone_num = phone_num;
        this.active = active;
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

    public string Phone_num
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

    public string Active
    {
        get
        {
            return active;
        }

        set
        {
            active = value;
        }
    }

    public List<Customer> GetCustomersList()
    {
        #region DB functions
        string query = "select * from customers"; 

        List<Customer> CustomersList = new List<Customer>();
        DbServices db = new DbServices();
        DataSet ds = db.GetDataSetByQuery(query);

        foreach (DataRow dr in ds.Tables[0].Rows)
        {
            try
            {
                Customer cus = new Customer
                {
                    Id = (int)dr["id"],
                    First_name = dr["first_name"].ToString(),
                    Last_name = dr["last_name"].ToString(),
                    Phone_num = dr["phone_num"].ToString(),
                    Active = dr["active"].ToString()
                };

                Customer cusList = new Customer(cus.Id, cus.First_name, cus.Last_name, cus.Phone_num, cus.Active);

                CustomersList.Add(cusList);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw ex;
            }
        }
        #endregion
        return CustomersList;
    }

    public void SetCustomer(string func)
    {
        #region DB functions
        DbServices db = new DbServices();
        string query = "";
        if (func == "edit")
        {
            query = "UPDATE customers SET first_name = '" + first_name + "', last_name = '" + last_name + "', phone_num = '" + phone_num + "' WHERE id = " + id;
        }
        else if (func == "new")
        {
            query = "insert into customers values ('" + first_name + "','" + last_name + "','" + phone_num + "','Y')";
        }
        db.ExecuteQuery(query);
        #endregion
    }

    public Customer GetCustomer()
    {
        #region DB functions
        string query = "select * from customers c where c.id =" + Id + "";

        Customer cus = new Customer();
        DbServices db = new DbServices();
        DataSet ds = db.GetDataSetByQuery(query);

        foreach (DataRow dr in ds.Tables[0].Rows)
        {
            try
            {               
                cus.Id = (int)dr["id"];
                cus.First_name = dr["first_name"].ToString();
                cus.Last_name = dr["last_name"].ToString();
                cus.Phone_num = dr["phone_num"].ToString();

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw ex;

            }
        }
        #endregion
        return cus;
    }

    public void DeactivateCustomer(string active)
    {
        #region DB functions
        DbServices db = new DbServices();
        db.ExecuteQuery("UPDATE customers SET active='" + active + "' WHERE id=" + Id);
        #endregion
    }

    public DataTable getCustomersTable()
    {
        #region DB functions
        DbServices dbs = new DbServices();
        DataTable customersTable = dbs.getFullTable("customers");
        #endregion
        return customersTable;
    }

    public Customer GetCustomer(DataRow dr)
    {
        #region DB functions
        Customer tmpCustomer = new Customer();
        tmpCustomer.First_name = dr["first_name"].ToString();
        tmpCustomer.Last_name = dr["last_name"].ToString();
        tmpCustomer.Phone_num = dr["phone_num"].ToString();
        tmpCustomer.Id = Convert.ToInt32(dr["id"]);
        tmpCustomer.Active = dr["active"].ToString();
        #endregion
        return tmpCustomer;
    }
}