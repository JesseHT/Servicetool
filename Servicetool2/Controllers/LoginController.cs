using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Servicetool2.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Login(string url)
        {
            Debug.WriteLine("JAjA " + url);
            ViewBag.redirectURL = url;
            return View();
        }
    }
}