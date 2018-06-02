using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for ActualProjectExpense
/// </summary>
public class ActualProjectExpense
{
    private Project project;
    private Expense expense;

    public ActualProjectExpense()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public ActualProjectExpense(Project project, Expense expense)
    {
        this.Project = project;
        this.Expense = expense;
    }

    public Project Project
    {
        get
        {
            return project;
        }

        set
        {
            project = value;
        }
    }

    public Expense Expense
    {
        get
        {
            return expense;
        }

        set
        {
            expense = value;
        }
    }

    public void SetExpense()
    {
        #region DB functions
        DbServices db = new DbServices();
        DbServices db2 = new DbServices();
        string query = "";

        //insert a new expense
        query = "insert into expenses values ('" + expense.Description + "','" + expense.Type + "','" + expense.Amount + "','" + expense.Created_by.Id + "','" + expense.Created_at + "','" + expense.Img_url + "')";
        db.ExecuteQuery(query);

        //get the expense id
        string tableName = "expenses";
        string expenseId = db.Ga(tableName);

        //insert the new expense to the matchig project
        query = "insert into actual_expenses_project values ('" + Project.Id + "','" + expenseId + "','" + expense.Created_by.Id + "')";
        db2.ExecuteQuery(query);
        #endregion
    }
}