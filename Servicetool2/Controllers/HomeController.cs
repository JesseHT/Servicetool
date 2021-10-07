using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ServiceTool2.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Algemeen()
        {
            ViewBag.Message = "Je algemene vragenpagina.";

            return View();
        }

        public ActionResult Financieel()
        {
            ViewBag.Message = "Je financiele vragenpagina.";

            return View();
        }

        public ActionResult Afspraken()
        {
            ViewBag.Message = "Je afspraken vragenpagina.";

            return View();
        }

        public ActionResult Technisch()
        {
            ViewBag.Message = "Je technische vragenpagina.";

            return View();
        }

        public ActionResult Overig()
        {
            ViewBag.Message = "Je overige vragenpagina.";

            return View();
        }
    }
}