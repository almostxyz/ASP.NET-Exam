using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Exam.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exam.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GroupController : Controller
    {

        private ApplicationDBContext _db;

        public GroupController(ApplicationDBContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Json(new { data = await _db.Groups.ToListAsync() });
        }
    }
}
