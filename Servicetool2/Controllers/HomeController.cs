using System.Collections.Generic;
using System.Configuration;
using System.Web.Mvc;
using ZCRMSDK.CRM.Library.Api.Response;
using ZCRMSDK.CRM.Library.CRUD;

namespace Servicetool2.Controllers
{
    public class HomeController : Controller
    {
        public static Dictionary<string, string> config = new Dictionary<string, string>()
{
    {"client_id",ConfigurationManager.AppSettings["client_id"]},
    {"client_secret",ConfigurationManager.AppSettings["client_secret"]},
    {"redirect_uri",ConfigurationManager.AppSettings["redirect_uri"]},
    {"access_type",ConfigurationManager.AppSettings["access_type"]},
    {"loginAuthClass", "ZCRMSDK.CRM.Library.Common.ZCRMConfigUtil, ZCRMSDK"},
    {"persistence_handler_class","ZCRMSDK.OAuth.ClientApp.ZohoOAuthFilePersistence, ZCRMSDK"},
    {"oauth_tokens_file_path",""},
    {"apiBaseUrl","https://www.zohoapis.eu"},
    {"iamURL","https://accounts.zoho.eu"},
    {"photoUrl","https://profile.zoho.eu/api/v1/user/self/photo"},
    {"apiVersion","v2"},
    {"logFilePath","" },
    {"timeout",""},
    {"minLogLevel",""},
    {"domainSuffix",""},
    {"currentUserEmail",ConfigurationManager.AppSettings["currentUserEmail"]},
    {"Scopes",ConfigurationManager.AppSettings["Scopes"]},
    {"response_type","code"},
};

        public static string zohotoken = "";

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Algemeen()
        {
            ViewBag.Message = "Je algemene vragenpagina.";

            return View();
        }

        public ActionResult VraagToevoegen()
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

        public ActionResult Dashboard(string id)
        {
            if (id != "")
            {
                ViewBag.id = id;
            }
            else
            {
                ViewBag.id = 0;
            }

            return View();
        }

        public object GetRecords()
        {
            ZCRMModule moduleIns = ZCRMModule.GetInstance("Producten"); // api naam
            BulkAPIResponse<ZCRMRecord> response = moduleIns.SearchByCriteria("(Partner:equals:Ketel)");
            List<ZCRMRecord> records = response.BulkData;
            return records;

        }

        public ActionResult Overig()
        {
            ViewBag.Message = "Je overige vragenpagina.";

            return View();
        }

        public ActionResult Overzicht()
        {
            return View();
        }

        public ActionResult VraagBewerken()
        {
            return View();
        }

    }
}