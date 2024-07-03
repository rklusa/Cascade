using Cascade.Server.Models;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using RestSharp;

namespace Cascade.Server
{
    public class RiverApiService
    {
        // bayfield river at varna 02FF007
        // maitland river at ben miller 02FE015
        private string key;
        private string station;
        private string startDate;
        private string EndDate;
        private string type;

        public static List<RiverData> finalData;
        public RiverApiService()
        {
            key = "-O0ob3w88ZUm6O-tUQK2";
            station = "02FF007";
            startDate = "2024-06-30";
            EndDate= "2024-07-02";
            type = "history";

            finalData = new List<RiverData>();
        }

        public void FetchRiverData()
        {
            var client = new RestClient("https://vps267042.vps.ovh.ca/scrapi");
            var request = new RestRequest($"/station/{this.station}/primarylevel/?startDate={this.startDate}&endDate={this.EndDate}&resultType={this.type}&key={this.key}");
            var response = client.ExecuteAsync(request);

            if (response.Result.StatusCode == System.Net.HttpStatusCode.OK)
            {
                string rawResponse = response.Result.Content;

                var x = JsonConvert.DeserializeObject<JObject>(rawResponse);

                List<RiverData> returnedList = x.Value<JObject>("message").Value<JArray>("history").ToObject<List<RiverData>>();

                finalData = FilterDates(returnedList);
            }
        }

        public List<RiverData> FilterDates(List<RiverData> data)
        {
            List<RiverData> cleanList = new List<RiverData>();
            int i = 0;

            foreach (var obj in data)
            {
                //"2024-06-30 00:00:00" format of date string coming in from api
                string min = obj.date.Split(':')[1];// split the string to get the minutes section of time
                
                if (Convert.ToInt32(min) == 0)// only grab 1 entry for each day
                {
                    if (i == 0) // to get every other day from the json string
                    {
                        cleanList.Add(obj);
                        i = 1;
                    }
                    else
                    {
                        i = 0;
                    }
                    
                }
            }

            
            return cleanList;
        }
    }
}
