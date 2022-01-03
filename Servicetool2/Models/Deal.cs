using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Servicetool2.Models
{
    public class Deal
    {
        public Deal()
        {
        }

        public Deal(string naam, string postcode)
        {
            Naam = naam;
            Postcode = postcode;

        }
        public string Id { get; set; }
        public string Naam { get; set; }
        public string Postcode { get; set; }

        internal Dictionary<string, object> GetKeyValues()
        {
            throw new NotImplementedException();
        }
    }
}