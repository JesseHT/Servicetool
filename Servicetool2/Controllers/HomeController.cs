﻿using Newtonsoft.Json.Linq;
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
            /*string path = Server.MapPath("~/ZohoTokenfile");
            string filePath = Server.MapPath("~/ZohoTokenfile") + "\\" + "Zohotokenfile.txt";

            config["oauth_tokens_file_path"] = filePath;
            Debug.WriteLine("configureer nu maar");
            ZCRMRestClient.Initialize(config);
            ZohoOAuthClient client = ZohoOAuthClient.GetInstance();
            string refreshToken = "1000.7a1cb8e41921248cfa17a1e453ca63c7.d47b3a532efbef58fc48e1f982f13c1e";
            string userMailId = "interesse@heattransformers.com";
            ZCRMRestClient.SetCurrentUser(userMailId);


            *//*                System.IO.StreamWriter file = new System.IO.StreamWriter(filePath);
            */
            /*            System.Threading.Thread.Sleep(5000);
            *//*
            ZohoOAuthTokens tokens = client.GenerateAccessTokenFromRefreshToken(refreshToken, userMailId);
            *//*
                        file.WriteLine("Lijn 1");
                        file.WriteLine("Lijn 2");*//*

            Debug.WriteLine("dit is de acces code: " + tokens.AccessToken);
            zohotoken = tokens.AccessToken;
            Debug.WriteLine("De mail: " + ZCRMRestClient.GetCurrentUserEmail());*/
            return View();
        }

        public ActionResult Algemeen()
        {
            ViewBag.Message = "Je algemene vragenpagina.";

            return View();
        }

        public ActionResult vraagToevoegen()
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

        public object getRecords()
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

        public ActionResult vraagBewerken()
        {
            return View();
        }

    }
}