using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Linq.Mapping;
using System.Linq;
using System.Text;
using System.Web;

/// <summary>
/// Summary description for Employee
/// </summary>
///

public class Employee
{
    private int id;
    private string first_name;
    private string last_name;
    private int phone_number;
    private string title;
    private string user_name;
    private string password;
    private string user_type;

    public Employee()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public Employee(int id, string first_name, string last_name, int phone_number, string title, string user_name, string password, string user_type)
    {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone_number = phone_number;
        this.title = title;
        this.user_name = user_name;
        this.password = password;
        this.user_type = user_type;
    }

    public Employee(string user_name, string password)
    {
        this.User_name = user_name;
        this.Password = password;
    }

    public Employee(string user_name)
    {
        this.User_name = user_name;
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

    public string User_name
    {
        get
        {
            return user_name;
        }

        set
        {
            user_name = value;
        }
    }

    public string Password
    {
        get
        {
            return password;
        }

        set
        {
            password = value;
        }
    }

    public string User_type
    {
        get
        {
            return user_type;
        }

        set
        {
            user_type = value;
        }
    }

    public List<Employee> GetAssignToList()
    {
        #region DB functions
        string query = "select e.id emp_id, e.first_name from employees as e ";

        List<Employee> AssignToList = new List<Employee>();
        DbServices db = new DbServices();
        DataSet ds = db.GetDataSetByQuery(query);

        foreach (DataRow dr in ds.Tables[0].Rows)
        {
            try
            {
                Employee assign_to = new Employee()
                {
                    Id = (int)dr["emp_id"],
                    First_name = dr["first_name"].ToString()
                };
                AssignToList.Add(assign_to);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw ex;

            }
        }
        #endregion
        return AssignToList;
    }

    public bool CheckLoginDetails()
    {
        #region DB functions
        string query = "select * from employees where user_name = '" + user_name + "'";

        DbServices db = new DbServices();
        DataSet ds = db.GetDataSetByQuery(query);
        DataTable dt = ds.Tables[0];
        bool userInDB = false;

        if (dt != null && dt.Rows.Count > 0)
        {
            DataRow dr = dt.Rows[0];
            if (dr["Password"].ToString() == Password)
            {
                userInDB = true;
            }
        }

        #endregion
        return userInDB;
    }

    public DataTable getEmployeesTable()
    {
        #region DB functions
        DbServices dbs = new DbServices();
        DataTable employeesTable = dbs.getFullTable("employees");
        #endregion
        return employeesTable;
    }

    public Employee GetEmployee(DataRow dr)
    {
        #region DB functions
        Employee tmpEmployee = new Employee();
        tmpEmployee.First_name = dr["first_name"].ToString();
        tmpEmployee.Last_name = dr["last_name"].ToString();
        tmpEmployee.Phone_number = Convert.ToInt32(dr["phone_num"]);
        tmpEmployee.Id = Convert.ToInt32(dr["id"]);
        tmpEmployee.Title = dr["title"].ToString();
        tmpEmployee.User_name = dr["user_name"].ToString();
        tmpEmployee.User_type = dr["user_type"].ToString();
        #endregion
        return tmpEmployee;
    }

    public string GetUserName()
    {
        #region DB functions
        string query = "select * from employees where user_name ='" + user_name + "'";

        DbServices db = new DbServices();
        DataSet ds = db.GetDataSetByQuery(query);
        DataTable dt = ds.Tables[0];
        string userName = "";

        if (dt != null && dt.Rows.Count > 0)
        {
            DataRow dr = dt.Rows[0];
            userName = dr["first_name"].ToString();
        }

        #endregion
        return userName;
    }

    public List<Employee> GetEmployees(Int32? id=null)
    {
        #region DB functions
        string query = "select * from employees ";
        string condition;

        if (id != null)
        {
            condition = "where id = '" + id + "'";
            query += condition;
        }

        List<Employee> employees = new List<Employee>();

        DbServices db = new DbServices();
        DataSet ds = db.GetDataSetByQuery(query);

        foreach (DataRow dr in ds.Tables[0].Rows)
        {
            Employee employee = new Employee();

            try
            {
                employee.First_name = dr["first_name"].ToString();
                employee.Last_name = dr["last_name"].ToString();
                employee.Phone_number = Convert.ToInt32(dr["phone_num"]);
                employee.Id = Convert.ToInt32(dr["id"]);
                employee.Title = dr["title"].ToString();
                employee.User_name = dr["user_name"].ToString();
                employee.User_type = dr["user_type"].ToString();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw ex;
            }
            employees.Add(employee);
        }
        #endregion
        return employees;
    }
    public int InsertEmployee(Employee emp)
    {
        #region DB functions
        DbServices dbs = new DbServices();
        StringBuilder query = new StringBuilder();
        query.AppendFormat("insert into employees (first_name,last_name,phone_num,title,user_name,password) ");
        query.AppendFormat("values ('{0}','{1}','{2}','{3}','{4}','{5}')", emp.First_name.ToString(), emp.Last_name.ToString(), emp.Phone_number, emp.Title.ToString(), emp.User_name.ToString(),emp.Password);

        int row_affected = dbs.ExecuteQuery(query.ToString());
        #endregion
        return row_affected;
    }

    public int UpdateEmployee(Employee emp)
    {
        #region DB functions

        DbServices dbs = new DbServices();
        StringBuilder query = new StringBuilder();
        query.AppendFormat("update employees ");
        query.AppendFormat("set first_name='{0}',last_name='{1}',phone_num='{2}',title='{3}',user_name='{4}' ", emp.First_name.ToString(), emp.Last_name.ToString(), emp.Phone_number, emp.Title.ToString(), emp.User_name.ToString(), emp.Password.ToString());

        if (emp.Password != null && emp.Password != "")
            query.AppendFormat("password='{0}' ", emp.Password);
        query.AppendFormat("where id={0}", emp.Id);

        int row_affected = dbs.ExecuteQuery(query.ToString());
        #endregion
        return row_affected;
    }

}