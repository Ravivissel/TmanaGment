using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Serialization;

/// <summary>
/// Summary description for RequestWS
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class RequestWS : System.Web.Services.WebService
{
    public RequestWS()
    {
        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string GetRequestsList(int employeeId)
    {

        Employee employee = new Employee();
        employee.Id = Convert.ToInt32(employeeId);

        Request requests = new Request();
        try
        {
            List<Request> requests_list = requests.GetRequestsList();
            string RequestsListJson = JsonConvert.SerializeObject(requests_list, new IsoDateTimeConverter());
            return RequestsListJson;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return ex.ToString();
        }

    }

    [WebMethod]
    public void SetRequest(string request_title, int assign_to, string contact_name, int contact_phone, string description, int created_by)
    {
        DateTime created_at = DateTime.Now; //REMOVE after updating the db!!
        Employee emp_creator = new Employee();
        emp_creator.Id = created_by;
        Employee emp_assign_to = new Employee();
        emp_assign_to.Id = assign_to;

        Request r = new Request(request_title, description, contact_name, contact_phone, created_at, emp_creator, emp_assign_to);
        r.SetRequest();
    }

    [WebMethod]
    public string GetRequest(int requestID)
    {
        JavaScriptSerializer j = new JavaScriptSerializer();
        Request r = new Request();
        r.Id = requestID;
        Request request = r.GetRequest();
        return j.Serialize(request);
    }

}
