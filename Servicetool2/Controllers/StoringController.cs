using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ZCRMSDK.CRM.Library.Api.Response;
using ZCRMSDK.CRM.Library.Common;
using ZCRMSDK.CRM.Library.CRMException;
using ZCRMSDK.CRM.Library.CRUD;
using ZCRMSDK.CRM.Library.Setup.RestClient;
using ZCRMSDK.CRM.Library.Setup.Users;
using ZCRMSDK.OAuth.Client;
using ZCRMSDK.OAuth.Contract;
using Google.Cloud.Firestore;
using Microsoft.Ajax.Utilities;
using Servicetool2.Models;
using System.Threading.Tasks;
using System.Text;

namespace Servicetool2.Controllers
{
    public class StoringController : Controller
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
            /*string path = Server.MapPath("~/ZohoTokenfile");*/
            string filePath = Server.MapPath("~/ZohoTokenfile") + "\\" + "Zohotokenfile.txt";

            config["oauth_tokens_file_path"] = filePath;
/*            Debug.WriteLine("configureer nu maar");
*/            ZCRMRestClient.Initialize(config);
            ZohoOAuthClient client = ZohoOAuthClient.GetInstance();
            string refreshToken = "1000.7a1cb8e41921248cfa17a1e453ca63c7.d47b3a532efbef58fc48e1f982f13c1e";
            string userMailId = "interesse@heattransformers.com";
            ZCRMRestClient.SetCurrentUser(userMailId);

            ZohoOAuthTokens tokens = client.GenerateAccessTokenFromRefreshToken(refreshToken, userMailId);

            /*Debug.WriteLine("dit is de acces code: " + tokens.AccessToken);*/
            zohotoken = tokens.AccessToken;
/*            Debug.WriteLine("De mail: " + ZCRMRestClient.GetCurrentUserEmail());
*/            return View();
        }


        public ActionResult StoringtoolEersteKeuze()
        {
            object test = GetRecords();
            Debug.WriteLine(test.GetType());

            List<ZCRMRecord> records = (List<ZCRMRecord>)test;

            List<Product> producten = new List<Product>();
            foreach(ZCRMRecord record in records)
            {
                Product product = new Product(record.GetFieldValue("Product_Name").ToString(), record.GetFieldValue("Partner").ToString());
                producten.Add(product);
            }

            return View(producten);
        }

        public object GetRecords()
        {
            ZCRMModule moduleIns = ZCRMModule.GetInstance("Products"); // api naam
            Debug.WriteLine(zohotoken);
            Debug.WriteLine(moduleIns.Properties.Count);
            BulkAPIResponse<ZCRMRecord> response = moduleIns.SearchByCriteria("((Partner:equals:Ketel)or(Partner:equals:Thermostaat)or((Partner:equals:HeatTransformers)and(Product_Name:starts_with:Remeha)or(Product_Name:starts_with:Daikin)))");
            List<ZCRMRecord> records = response.BulkData;
            return records;
        }
        [HttpPost]
        public async Task<ViewResult> CreateTicket()
        {
            Debug.WriteLine(Request.Form["Warmtepomp"]);
            Debug.WriteLine("Dit is een test");
            StringBuilder s = new StringBuilder();
            foreach (string key in Request.Form.Keys)
            {
                if (Request.Form[key] == "on")
                {
                    s.AppendLine(key + ": Waar");
                }
                else
                {
                    s.AppendLine(key + ": " + Request.Form[key]);
                }
            }
            string formData = s.ToString();
            Debug.WriteLine(formData);


            List<ZCRMRecord> listRecord = new List<ZCRMRecord>();
            ZCRMRecord record;
            record = ZCRMRecord.GetInstance("Cases", null);
            record.SetFieldValue("Subject", Request.Form["Probleem"]);
            record.SetFieldValue("Description", formData);
            record.SetFieldValue("Postcode", Request.Form["Postcode"]);
            record.SetFieldValue("Priority", Request.Form["prioriteit"]);
            record.SetFieldValue("Reported_By", "Storingstool");
            record.SetFieldValue("Case_Origin", "Storingstool");
            record.SetFieldValue("Status", "Nieuw(e)");
            listRecord.Add(record);

            ZCRMModule moduleIns = ZCRMModule.GetInstance("Cases");

            BulkAPIResponse<ZCRMRecord> responseIn = moduleIns.CreateRecords(listRecord);

            foreach (EntityResponse response in responseIn.BulkEntitiesResponse)
            {
                Console.WriteLine("Status:" + response.Status); //To get create record response status
                Console.WriteLine("Message:" + response.Message); //To get create record response message
                Console.WriteLine("Details:" + response.ResponseJSON); //To get create record response details
                ZCRMRecord record1 = (ZCRMRecord)response.Data;
                Console.WriteLine(record1.EntityId); //To get inserted record id
                Console.WriteLine(record1.CreatedTime);
                Console.WriteLine(record1.ModifiedTime);
            }
            return View("TicketGestuurd");
         }
        public ActionResult StoringtoolProbleemKeuze()
        {
            return View();
        }

        public ActionResult StoringtoolExtraVragen()
        {
            return View();
        }


        public ActionResult StoringtoolToevoegen()
        {
            return View();
        }

        public ActionResult VraagBewerken()
        {
            return View();
        }

    }
}