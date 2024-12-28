using Cascade.Server.Models;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using RestSharp;
using System.Diagnostics;

namespace Cascade.Server
{
    public static class RiverApiService
    {
        //private static string startDate = DateTime.Now.AddDays(-3).ToString("yyyy-MM-dd");
        //private static string endDate = DateTime.Now.AddDays(-1).ToString("yyyy-MM-dd");
        
        // notawasaga river at edenvale 02ED027
        // bayfield river at varna 02FF007
        // maitland river at ben miller 02FE015
        private static string key = ApiKeys.key2;
        private static string startDate = GetStartDate();
        private static string endDate = GetEndDate();
        private static string type = "history";

        public static List<RiverData> finalData = new List<RiverData>();
        public static string stationName = string.Empty;

        public static string FetchRiverInfo(string station)
        {
            var client = new RestClient("https://vps267042.vps.ovh.ca/scrapi");
            var request = new RestRequest($"/station/{station}?key={key}");
            var response = client.ExecuteAsync(request);
            
            string cleanName = string.Empty;

            if (response.Result.StatusCode == System.Net.HttpStatusCode.OK)
            {
                string rawResponse = response.Result.Content;

                dynamic x = JObject.Parse(rawResponse);
                string stationName = x["message"]["name"];

                cleanName = string.Join(" ", stationName.Split().SkipWhile(word => word != word.ToUpper()).TakeWhile(word => word == word.ToUpper()));

            }

            return cleanName;
        }
        public static void FetchRiverData(string station)
        {
            var client = new RestClient("https://api.weather.gc.ca/collections/hydrometric-realtime");
            var request = new RestRequest($"/items?f=json&lang=en-CA&limit=10000&additionalProp1=%7B%7D&skipGeometry=true&offset=0&datetime={startDate}%2F{endDate}&STATION_NUMBER={station}");
            var response = client.ExecuteAsync(request);

            if (response.Result.StatusCode == System.Net.HttpStatusCode.OK)
            {
                string rawResponse = response.Result.Content;

                JObject datesData = JObject.Parse(rawResponse);

                List<JToken> rawReturnedList = datesData["features"].Children().ToList();
                List<RiverData> returnedList = new List<RiverData>();

                foreach (JToken token in rawReturnedList)
                {
                    RiverData dataObj = token.Value<JToken>("properties").ToObject<RiverData>();
                    returnedList.Add(dataObj);
                }

                finalData = FilterDates(returnedList);
            }
        }

        public static List<RiverData> FilterDates(List<RiverData> data)
        {
            List<RiverData> cleanList = new List<RiverData>();

            foreach (var obj in data)
            {
                //"2024-06-30 00:00:00" format of date string coming in from api
                string min = obj.DATETIME.Split(':')[1];// split the string to get the minutes section of time
                
                if (Convert.ToInt32(min) == 0)// only grab 1 entry for each day
                {
                    cleanList.Add(obj);
                }
            }

            return cleanList;
        }

        public static string GetStartDate()
        {
            string date = DateTime.Now.AddDays(-2).ToString("yyyy-MM-dd");
            return date;
        }

        public static string GetEndDate()
        {
            string date = DateTime.Now.ToString("yyyy-MM-dd");
            return date;
        }


    }
}
