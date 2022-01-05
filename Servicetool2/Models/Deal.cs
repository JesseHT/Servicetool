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

        public Deal(string dealnaam, string email)
        {
            DealNaam = dealnaam;
            Email = email;

        }
        public string DealNaam { get; set; }
        public string Email { get; set; }


    }
}