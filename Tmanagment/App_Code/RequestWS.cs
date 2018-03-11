using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

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

}
