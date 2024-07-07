using Cascade.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Cascade.Server;


namespace Cascade.Server.Controllers
{
    [ApiController]
    //[Route("[controller]")]
    public class RiverDataController : ControllerBase
    {
        private readonly ILogger<RiverDataController> _logger;

        public RiverDataController(ILogger<RiverDataController> logger)
        {
            _logger = logger;
        }

        [HttpGet()]
        [Route("GetRiverData")]
        public IEnumerable<RiverData> GetRiverData(string station)
        {
            //RiverApiService.station = station;
            RiverApiService.FetchRiverData(station);

            return RiverApiService.finalData.ToArray();
        }

        [HttpGet()]
        [Route("GetStationName")]

        public ActionResult<string> GetStationName(string station)
        {
            string name = RiverApiService.FetchRiverInfo(station);
            
            return name;
        }
    }
}
