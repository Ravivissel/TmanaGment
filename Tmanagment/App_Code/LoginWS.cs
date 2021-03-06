﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Serialization;

/// <summary>
/// Summary description for LoginWS
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class LoginWS : System.Web.Services.WebService
{

    public LoginWS()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string LoginUser(string userName, string password)
    {
        JavaScriptSerializer j = new JavaScriptSerializer();
        Employee u = new Employee(userName, password);
        bool userInDB = u.CheckLoginDetails();
        return j.Serialize(userInDB);
    }

}
