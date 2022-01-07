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

        public Deal(string dealnaam, string id)
        {
            DealNaam = dealnaam;
            Id = id;

        }
        public string DealNaam { get; set; }
        public string Id { get; set; }


    }
}