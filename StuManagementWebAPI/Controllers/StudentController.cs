using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using StuManagementWebAPI.Models;

namespace StuManagementWebAPI.Controllers
{
    public class StudentController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/Student
        public System.Object GetStudents()
        {
            var result = (from a in db.Students
                          join b in db.Grades on a.GradeID equals b.GradeID
                          select new
                          {
                              a.StudentID,
                              a.RegNo,
                              Grade = b.Name,
                              a.FirstName,
                              a.LastName,
                              a.TMarks
                          }).ToList();

            return result;
        }

        // GET: api/Student/5
        [ResponseType(typeof(Student))]
        public IHttpActionResult GetStudent(int id)
        {
            var student = (from a in db.Students
                           where a.StudentID == id
                           select new
                           {
                               a.StudentID,
                               a.RegNo,
                               a.GradeID,
                               a.FirstName,
                               a.LastName,
                               a.TMarks,
                               DeletedStudentSubjectIDs=""

                           }).FirstOrDefault();

            var studentDetials = (from a in db.StudentSubjects
                                  join b in db.Subjects on a.SubjectID equals b.SubjectID
                                  where a.StudentID == id
                                  select new
                                  {
                                      a.StudentID,
                                   
                                      a.StudentSubjectID,
                                      a.SubjectID,
                                      SubjectName = b.Name,
                                      a.Marks


                                  }).ToList();
            return Ok(new { student, studentDetials });
        }

        // PUT: api/Student/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutStudent(int id, Student student)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != student.StudentID)
            {
                return BadRequest();
            }

            db.Entry(student).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Student
        [ResponseType(typeof(Student))]
        public IHttpActionResult PostStudent(Student student)
        {
            try {

                if (student.StudentID == 0)
                    db.Students.Add(student);
                else
                    db.Entry(student).State = EntityState.Modified;

                foreach (var item in student.StudentSubjects)
                {
                    if (item.StudentSubjectID == 0)
                        db.StudentSubjects.Add(item);
                    else
                        db.Entry(item).State = EntityState.Modified;
                }
                //delete operation
                foreach (var id in student.DeletedStudentSubjectIDs.Split(',').Where(x => x!=""))
                {
                    StudentSubject x = db.StudentSubjects.Find(Convert.ToInt64(id));
                    db.StudentSubjects.Remove(x);
                }
                db.SaveChanges();

                return Ok();

            } catch(Exception e) {
                throw e;
            }

        }

        // DELETE: api/Student/5
        [ResponseType(typeof(Student))]
        public IHttpActionResult DeleteStudent(int id)
        {
            Student student = db.Students.Include(y=> y.StudentSubjects)
                .SingleOrDefault(x => x.StudentID == id);

            foreach (var item in student.StudentSubjects.ToList())
            {
                db.StudentSubjects.Remove(item);
            }

            db.Students.Remove(student);
            db.SaveChanges();

            return Ok(student);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool StudentExists(int id)
        {
            return db.Students.Count(e => e.StudentID == id) > 0;
        }
    }
}