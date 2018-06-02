using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Expense
/// </summary>
public class Expense
{

    private int id;
    private string description;
    private int type;
    private int amount;
    private string img_url;
    private Employee created_by;
    private DateTime created_at;

    public Expense()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public Expense(int id, string description, int type, int amount, string img_url, Employee created_by, DateTime created_at)
    {
        this.Id = id;
        this.Description = description;
        this.Type = type;
        this.Amount = amount;
        this.Img_url = img_url;
        this.Created_by = created_by;
        this.Created_at = created_at;
    }

    public Expense(string description, int type, int amount, string img_url, Employee created_by, DateTime created_at)
    {
        this.Description = description;
        this.Type = type;
        this.Amount = amount;
        this.Img_url = img_url;
        this.Created_by = created_by;
        this.Created_at = created_at;
    }

    public int Id
    {
        get
        {
            return id;
        }

        set
        {
            id = value;
        }
    }

    public string Description
    {
        get
        {
            return description;
        }

        set
        {
            description = value;
        }
    }

    public int Type
    {
        get
        {
            return type;
        }

        set
        {
            type = value;
        }
    }

    public int Amount
    {
        get
        {
            return amount;
        }

        set
        {
            amount = value;
        }
    }

    public string Img_url
    {
        get
        {
            return img_url;
        }

        set
        {
            img_url = value;
        }
    }

    public Employee Created_by
    {
        get
        {
            return created_by;
        }

        set
        {
            created_by = value;
        }
    }

    public DateTime Created_at
    {
        get
        {
            return created_at;
        }

        set
        {
            created_at = value;
        }
    }
}