using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

/// <summary>
/// Summary description for ExpenseWS
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class ExpenseWS : System.Web.Services.WebService
{

    public ExpenseWS()
    {
        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string GetProjectExpenses(int projectId)
    {
        try
        {
            JavaScriptSerializer j = new JavaScriptSerializer();
            ActualProjectExpense actualProjectExpense = new ActualProjectExpense();
            List<ActualProjectExpense> allProjectsExpensesList = actualProjectExpense.GetProjectExpensesList(projectId);
            //string allProjectsTasksListJson = JsonConvert.SerializeObject(allProjectsTasksList, new IsoDateTimeConverter());
            //return allProjectsTasksListJson;
            return j.Serialize(allProjectsExpensesList);

        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return ex.ToString();
        }

    }

    [WebMethod]
    public void SetActualProjectExpense(string expense_desc, int expense_assign_to, int expense_type, int expense_amount, string expense_img_name, int created_by)
    {
        DateTime created_at = DateTime.Now; //REMOVE after updating the db!!
        Employee emp_creator = new Employee();
        emp_creator.Id = created_by;

        //string path = Server.MapPath("."); //Path to the current directory
        //imageUpload.SaveAs(path + "/images/" + expense_img_name); // Must provide a full path
        string imgUrl = "assets/images/" + expense_img_name;

        Project project = new Project();
        project.Id = expense_assign_to;

        Expense expense = new Expense(expense_desc, expense_type, expense_amount, imgUrl, emp_creator, created_at);
        ActualProjectExpense actualProjectExpense = new ActualProjectExpense(project, expense);
        actualProjectExpense.SetExpense();
    }

    [WebMethod]
    public void DeactivateExpense(int expenseID, string active)
    {
        Expense expense = new Expense
        {
            Id = expenseID
        };
        expense.DeactivateExpense(active);
    }

}
