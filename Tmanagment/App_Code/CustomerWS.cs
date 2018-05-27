using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

/// <summary>
/// Summary description for CustomerWS
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class CustomerWS : System.Web.Services.WebService
{

    public CustomerWS()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string GetCustomersList()
    {
        Customer customers = new Customer();
        try
        {
            List<Customer> customers_list = customers.GetCustomersList();
            string CustomersListJson = JsonConvert.SerializeObject(customers_list, new IsoDateTimeConverter());
            return CustomersListJson;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return ex.ToString();
        }

    }

    [WebMethod]
    public void SetCustomer(int customerID, string first_name, string last_name, string phone_num, string func)
    {
        Customer c = new Customer(customerID, first_name, last_name, phone_num);
        c.SetCustomer(func);
    }

    [WebMethod]
    public string GetCustomer(int customerID)
    {
        JavaScriptSerializer j = new JavaScriptSerializer();
        Customer c = new Customer();
        c.Id = customerID;
        Customer customer = c.GetCustomer();
        return j.Serialize(customer);
    }

    [WebMethod]
    public void DeactivateCustomer(int customerID, string active)
    {
        Customer c = new Customer
        {
            Id = customerID
        };
        c.DeactivateCustomer(active);
    }

}
