using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Servicetool2.Models
{
    public class Ticket
    {
        public Ticket(string warmtePomp, string thermostaat, string ketel, string probleem, string extraVragen, string extraInfo, string klantPostcode, string klantNaam, string prioriteit, string klantMail)
        {
            Warmtepomp = warmtePomp;
            Thermostaat = thermostaat;
            Ketel = ketel;
            Probleem = probleem;
            ExtraVragen = extraVragen;
            ExtraInfo = extraInfo;
            KlantPostcode = klantPostcode;
            KlantNaam = klantNaam;
            Prioriteit = prioriteit;
            KlantMail = klantMail;
        }

        public string Warmtepomp { get; set; }
        public string Thermostaat { get; set; }
        public string Ketel { get; set; }
        public string Probleem { get; set; }
        public string ExtraVragen { get; set; }
        public string ExtraInfo { get; set; }
        public string KlantPostcode { get; set; }
        public string KlantNaam { get; set; }
        public string Prioriteit { get; set; }
        public string KlantMail { get; set; }
        
    }
}