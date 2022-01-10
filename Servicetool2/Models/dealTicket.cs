using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Servicetool2.Models
{
    public class dealTicket
    {
        public dealTicket()
        {
        }

        public dealTicket(string ticketOnderwerp, string status)
        {
            TicketOnderwerp = ticketOnderwerp;
            Status = status;

        }
        public string TicketOnderwerp { get; set; }
        public string Status { get; set; }


    }
}