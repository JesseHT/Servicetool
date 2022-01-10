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
using System.Net.Http;

namespace Servicetool2.Controllers
{
    public class StoringController : Controller
    {
        private static readonly HttpClient clientHTTP = new HttpClient();
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
                */
                ZCRMRestClient.Initialize(config);
            ZohoOAuthClient client = ZohoOAuthClient.GetInstance();
            string refreshToken = "1000.7a1cb8e41921248cfa17a1e453ca63c7.d47b3a532efbef58fc48e1f982f13c1e";
            string userMailId = "interesse@heattransformers.com";
                ZCRMRestClient.SetCurrentUser(userMailId);
            try
            {
                ZohoOAuthTokens tokens = client.GenerateAccessTokenFromRefreshToken(refreshToken, userMailId);

                /*Debug.WriteLine("dit is de acces code: " + tokens.AccessToken);*/
                zohotoken = tokens.AccessToken;
                /*            Debug.WriteLine("De mail: " + ZCRMRestClient.GetCurrentUserEmail());
                */
                
                
                    object test = GetDeals();
                    Debug.WriteLine(test.GetType());

                    List<ZCRMRecord> records = (List<ZCRMRecord>)test;

                    List<Deal> deals = new List<Deal>();
                    foreach (ZCRMRecord record in records)
                    {
                        Deal deal = new Deal(record.GetFieldValue("Deal_Name").ToString(), record.GetFieldValue("E_mail").ToString());
                        deals.Add(deal);
                    }

                    
                
                return View(deals);
            }
            catch (Exception ex)
            {
                ViewData["Error"] = ex.Message;
                ViewData["Refresh"] = refreshToken;
                ViewData["mail"] = userMailId;
                return View("Error");
            }
        }

        public object GetDeals()
        {
            ZCRMModule moduleIns = ZCRMModule.GetInstance("Deals");
            BulkAPIResponse<ZCRMRecord> response = moduleIns.SearchByCriteria("Deal_Name:starts_with:HWP");
            List<ZCRMRecord> records = response.BulkData;
            return records;
        }

        public ActionResult StoringtoolEersteKeuze()
        {
            try
            {
                object test = GetRecords();
                Debug.WriteLine(test.GetType());

                List<ZCRMRecord> records = (List<ZCRMRecord>)test;

                List<Product> producten = new List<Product>();
                foreach (ZCRMRecord record in records)
                {
                    Product product = new Product(record.GetFieldValue("Product_Name").ToString(), record.GetFieldValue("Partner").ToString());
                    producten.Add(product);
                }

                return View(producten);
            }
            catch (Exception ex)
            {
                ViewData["Error"] = ex;
                ViewData["Token"] = zohotoken;
                return View("Error");
            }
        }



        [HttpPost]
        public ActionResult DealKeuzePagina()
        {
            var deal = Request.Form["deal"];
            var input = "HWP | " + deal;
            ZCRMModule moduleIns = ZCRMModule.GetInstance("Deals"); // api naam
            Debug.WriteLine(zohotoken);
            Debug.WriteLine(moduleIns.Properties.Count);
            BulkAPIResponse<ZCRMRecord> response = moduleIns.SearchByCriteria("(Deal_Name:starts_with:" + input+")");
            List<ZCRMRecord> records = response.BulkData;

            List<ZCRMRecord> records2 = (List<ZCRMRecord>)records;

            List<Deal> deals = new List<Deal>();
            foreach (ZCRMRecord record in records2)
            {
                Deal newDeal = new Deal(record.GetFieldValue("Deal_Name").ToString(), record.EntityId.ToString());
                deals.Add(newDeal);
            }

            return View(deals);
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
/*            record.SetFieldValue("Postcode", Request.Form["Postcode"]);
 *            
*/            record.SetFieldValue("Priority", Request.Form["prioriteit"]);
            record.SetFieldValue("Deal_Name", Request.Form["Deal"]);
            record.SetFieldValue("Reported_By", "Storingstool");
            record.SetFieldValue("Case_Origin", "Storingstool");
            record.SetFieldValue("Status", "Nieuw(e)");
            listRecord.Add(record);

            ZCRMModule moduleIns = ZCRMModule.GetInstance("Cases");

            BulkAPIResponse<ZCRMRecord> responseIn = moduleIns.CreateRecords(listRecord);

            foreach (EntityResponse response in responseIn.BulkEntitiesResponse)
            {
                Debug.WriteLine("Status:" + response.Status); //To get create record response status
                Debug.WriteLine("Message:" + response.Message); //To get create record response message
                Debug.WriteLine("Details:" + response.ResponseJSON); //To get create record response details
                ZCRMRecord record1 = (ZCRMRecord)response.Data;
                Debug.WriteLine(record1.EntityId); //To get inserted record id
                Debug.WriteLine(record1.CreatedTime);
                Debug.WriteLine(record1.ModifiedTime);
            }
            return View("TicketGestuurd");
         }
        public ActionResult StoringtoolProbleemKeuze()
        {
            return View();
        }

        public ActionResult StoringtoolExtraVragen()
        {
            var dealTicket = Request.Cookies["deal"].Value;
            ZCRMModule moduleIns = ZCRMModule.GetInstance("Cases"); // api naam
            Debug.WriteLine(zohotoken);
            Debug.WriteLine(moduleIns.Properties.Count);
            BulkAPIResponse<ZCRMRecord> response = moduleIns.SearchByCriteria("(Deal_Name:equals:" + dealTicket + ")");
            List<ZCRMRecord> records = response.BulkData;

            List<ZCRMRecord> records2 = (List<ZCRMRecord>)records;

            List<dealTicket> tickets = new List<dealTicket>();
            foreach (ZCRMRecord record in records)
            {
                dealTicket ticket = new dealTicket(record.GetFieldValue("Subject").ToString(), record.GetFieldValue("Status").ToString());
                tickets.Add(ticket);
            }
            return View(tickets);
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