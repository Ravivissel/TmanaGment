using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Northwind
/// </summary>
public partial class Northwind : DataContext
{
    public Table<Project> Projects;
    public Table<Employee> Employees;
    public Northwind(string connection) : base(connection) { }
}