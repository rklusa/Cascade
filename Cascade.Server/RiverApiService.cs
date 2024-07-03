using Cascade.Server.Models;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using RestSharp;

namespace Cascade.Server
{
    public class RiverApiService
    {
        private string key;
        private string station;
        private string today;
        private string yesterday;
        private string type;

        public static List<RiverData> finalData;
        public RiverApiService()
        {
            key = "-O0ob3w88ZUm6O-tUQK2";
            station = "02FE015";
            today = "2024-07-01";
            yesterday = "2024-06-30";
            type = "history";

            finalData = new List<RiverData>();
        }

        public void FetchRiverData()
        {
            var client = new RestClient("https://vps267042.vps.ovh.ca/scrapi");
            var request = new RestRequest($"/station/{this.station}/primarylevel/?startDate={this.yesterday}&endDate={this.today}&resultType={this.type}&key={this.key}");
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

            foreach (var obj in data)
            {
                //"2024-06-30 00:00:00" format of date string coming in from api
                string min = obj.date.Split(':')[1];// split the string to get the minutes secion of time

                if (Convert.ToInt32(min) == 0)
                {
                    cleanList.Add(obj);
                }
            }
            return cleanList;
        }
    }
}
