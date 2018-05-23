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
            JavaScriptSerializer j = new JavaScriptSerializer();

            List<Request> requests_list = requests.GetRequestsList();
            //string RequestsListJson = JsonConvert.SerializeObject(requests_list, new IsoDateTimeConverter());
            //return RequestsListJson;
            return j.Serialize(requests_list);

        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return ex.ToString();
        }

    }

    [WebMethod]
    public void SetRequest(int requestID, string request_title, int assign_to, string contact_name, string contact_phone, string description, int created_by, int status, string func)
    {
        DateTime created_at = DateTime.Now; //REMOVE after updating the db!!
        Employee emp_creator = new Employee();
        emp_creator.Id = created_by;
        Employee emp_assign_to = new Employee();
        emp_assign_to.Id = assign_to;
        Status reguestStatus = new Status();
        reguestStatus.Id = status;

        Request r = new Request(requestID, request_title, description, contact_name, contact_phone, created_at, emp_creator, emp_assign_to, reguestStatus);
        r.SetRequest(func);
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
