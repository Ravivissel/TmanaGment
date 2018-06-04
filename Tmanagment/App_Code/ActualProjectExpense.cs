using System;
using System.Collections.Generic;
using System.Data;
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
        query = "insert into expenses values ('" + expense.Description + "','" + expense.Type + "','" + expense.Amount + "','" + expense.Created_by.Id + "','" + expense.Created_at + "','" + expense.Img_url + "','Y')";
        db.ExecuteQuery(query);

        //get the expense id
        string tableName = "expenses";
        string expenseId = db.Ga(tableName);

        //insert the new expense to the matchig project
        query = "insert into actual_expenses_project values ('" + Project.Id + "','" + expenseId + "','" + expense.Created_by.Id + "')";
        db2.ExecuteQuery(query);
        #endregion
    }

    public List<ActualProjectExpense> GetProjectExpensesList(int projectId)
    {
        #region DB functions
        string query = "select e.id, e.description, e.type, e.amount, e.created_by, e.created_at, emp.first_name, e.img_url, e.active, aep.project_id, p.title project_title from expenses as e " + 
                "inner join actual_expenses_project aep on e.id = aep.expense_id " +
                "inner join employees emp on e.created_by = emp.id " +
                "inner join projects p on aep.project_id = p.id " +
                "where aep.project_id = " + projectId + "";

        List<ActualProjectExpense> actualExpenseList = new List<ActualProjectExpense>();
        DbServices db = new DbServices();
        DataSet ds = db.GetDataSetByQuery(query);

        foreach (DataRow dr in ds.Tables[0].Rows)
        {
            try
            {
                ActualProjectExpense actual_project_expense_temp = new ActualProjectExpense();
                Expense expense = new Expense();
                Employee created_by = new Employee();
                Project project = new Project();

                expense.Id = Convert.ToInt32(dr["id"]);
                expense.Description = dr["description"].ToString();
                expense.Type = Convert.ToInt32(dr["type"]);
                expense.Amount = Convert.ToInt32(dr["amount"]);
                expense.Created_at = Convert.ToDateTime(dr["created_at"]);
                expense.Img_url = dr["img_url"].ToString();
                expense.Active = dr["active"].ToString();

                created_by.First_name = dr["first_name"].ToString();
                created_by.Id = Convert.ToInt32(dr["created_by"]);
                expense.Created_by = created_by;

                project.Title = dr["project_title"].ToString();

                actual_project_expense_temp.Expense = expense;
                actual_project_expense_temp.Project = project;

                actualExpenseList.Add(actual_project_expense_temp);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw ex;
            }
        }
        #endregion
        return actualExpenseList;
    }
}