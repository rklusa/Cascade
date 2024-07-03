using Cascade.Server.Models;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using RestSharp;

namespace Cascade.Server
{
    public static class RiverApiService
    {
        // bayfield river at varna 02FF007
        // maitland river at ben miller 02FE015
        private static string key = ApiKeys.key1;
        private static string station = "02FE015";
        private static string startDate = "2024-06-30";
        private static string EndDate = "2024-07-02";
        private static string type = "history";

        public static List<RiverData> finalData = new List<RiverData>();

        public static void FetchRiverData()
        {
            var client = new RestClient("https://vps267042.vps.ovh.ca/scrapi");
            var request = new RestRequest($"/station/{station}/primarylevel/?startDate={startDate}&endDate={EndDate}&resultType={type}&key={key}");
            var response = client.ExecuteAsync(request);

            if (response.Result.StatusCode == System.Net.HttpStatusCode.OK)
            {
                string rawResponse = response.Result.Content;

                var x = JsonConvert.DeserializeObject<JObject>(rawResponse);

                List<RiverData> returnedList = x.Value<JObject>("message").Value<JArray>("history").ToObject<List<RiverData>>();

                finalData = FilterDates(returnedList);
            }
        }

        public static List<RiverData> FilterDates(List<RiverData> data)
        {
            List<RiverData> cleanList = new List<RiverData>();
            int i = 0;

            foreach (var obj in data)
            {
                //"2024-06-30 00:00:00" format of date string coming in from api
                string min = obj.date.Split(':')[1];// split the string to get the minutes section of time
                
                if (Convert.ToInt32(min) == 0)// only grab 1 entry for each day
                {
                    cleanList.Add(obj);
                }
            }

            
            return cleanList;
        }
    }
}
