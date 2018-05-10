using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Text;

/// <summary>
/// Summary description for DbService
/// </summary>
public class DbServices
{
    SqlTransaction tran;
    SqlCommand cmd;
    SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["db"].ConnectionString);

    SqlDataAdapter adp;

    public DbServices()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public DataSet GetDataSetByQuery(string sqlQuery, CommandType cmdType = CommandType.Text, params SqlParameter[] parametersArray)
    {
        cmd = new SqlCommand(sqlQuery, con);
        cmd.CommandType = cmdType;
        DataSet ds = new DataSet();
        adp = new SqlDataAdapter(cmd);
        try
        {
            adp.Fill(ds);
        }
        catch (Exception e)
        {
            //do something with the error
            ds = null;
        }

        return ds;
    }

    public int ExecuteQuery(string sqlQuery, CommandType cmdType = CommandType.Text, params SqlParameter[] parametersArray)
    {
        int row_affected = 0;
        using (con)
        {
            if (con.State != ConnectionState.Open)
            {
                con.Open();
            }     
            tran = con.BeginTransaction();

            cmd = new SqlCommand(sqlQuery, con, tran);
            cmd.CommandType = cmdType;

            foreach (SqlParameter s in parametersArray)
            {
                cmd.Parameters.AddWithValue(s.ParameterName, s.Value);
            }

            try
            {
                row_affected = cmd.ExecuteNonQuery();
                tran.Commit();
                con.Close();
            }
            catch (Exception e)
            {
                tran.Rollback();
            }
        }

        return row_affected;
    }

    public DataTable getFullTable(string table)
    {
        #region DB functions
        StringBuilder sb = new StringBuilder();

        string query = sb.AppendFormat("select * from {0} p;", table).ToString();
        DbServices db = new DbServices();
        DataSet ds = db.GetDataSetByQuery(query);
        return ds.Tables[0];
        #endregion

    }

    //public Northwind GetLinqDb()
    //{

    //    Northwind db = new Northwind("Data Source=Media.ruppin.ac.il;Initial Catalog=igroup82_test2;User ID=igroup82;Password=igroup82_18350");

    //    return db;
    //}

    public int GetLastIdInserted(string tableName)
    {
        Int32 lastValue = 0;
        string sqlQuery = "SELECT IDENT_CURRENT('" + tableName + "')";

        try
        {
            cmd = new SqlCommand(sqlQuery, con);
            lastValue = Convert.ToInt32(cmd.ExecuteScalar());
            cmd.Dispose();
        }
        catch (Exception e)
        {
            //do something with the error            
        }
        
        return lastValue;
    }

    public string Ga(string tableName)
    {
        SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["db"].ConnectionString);
        SqlCommand command = new SqlCommand("SELECT TOP(1) id FROM "+ tableName +" ORDER BY 1 DESC", connection);

        connection.Open();
        SqlDataReader reader = command.ExecuteReader();

        //won't need a while, since it will only retrieve one row
        reader.Read();

        //here is your data
        string data = reader["id"].ToString();

        reader.Close();
        connection.Close();

        return data;

    }
}