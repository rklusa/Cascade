using Cascade.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Cascade.Server;


namespace Cascade.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RiverDataController : ControllerBase
    {
        private static List<RiverData> _data = new List<RiverData>();

        private readonly ILogger<RiverDataController> _logger;

        public RiverDataController(ILogger<RiverDataController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetRiverData")]
        public IEnumerable<RiverData> Get()
        {

            RiverApiService.FetchRiverData();

            foreach (var data in RiverApiService.finalData)
            {
                _data.Add(data);
            }

            return _data.ToArray();
        }

    }
}
