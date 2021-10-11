using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Servicetool2.Models
{
    public class Product
    {
        public Product(string merkEnType, string type)
        {
            MerkEnType = merkEnType;
            Type = type;

        }

        public string MerkEnType { get; set; }
        public string Type { get; set; }
    }
}