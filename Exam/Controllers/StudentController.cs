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
    public class StudentController : Controller
    {
        private ApplicationDBContext _db;

        public StudentController(ApplicationDBContext db)
        {
            _db = db;
        }

        [HttpGet("getStudentsByGroupId/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var data = await _db.Students.Where(s => s.GroupId == id).ToListAsync();
            return Json(new { data });
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Student body)
        {
            Student student = new Student();
            student.Name = body.Name;
            student.StudentCard = body.StudentCard;
            student.GroupId = body.GroupId;

            _db.Students.Add(student);

            await _db.SaveChangesAsync();

            return Ok(student);
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> Patch (int id, [FromBody]Student body)
        {
            Student student = await _db.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            student.Name = body.Name;
            student.StudentCard = body.StudentCard;

            await _db.SaveChangesAsync();

            return Ok(student);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            Student student = await _db.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            _db.Students.Remove(student);
            await _db.SaveChangesAsync();

            return Ok(student);
        }
    }
}
