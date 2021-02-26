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
    public class GradeController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/Grade
        public IQueryable<Grade> GetGrades()
        {
            return db.Grades;
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

    }
}