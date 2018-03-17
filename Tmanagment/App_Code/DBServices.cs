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

            con.Open();
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

}