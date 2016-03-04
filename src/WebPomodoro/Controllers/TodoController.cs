using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebPomodoro.Models;

namespace WebPomodoro.Controllers
{
    public class TodoController : Controller
    {
        private ApplicationDbContext db;

        public TodoController(ApplicationDbContext context)
        {
            db = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult tasks()
        {
            var activities = from a in db.Activity
                             where a.Type == 0
                             select a;

            return Json(activities);
        }

        [HttpPost]
        public JsonResult Save(Activity task)
        {
            System.Diagnostics.Debug.Write(task.Description);

            //if (ModelState.IsValid)
            //{
            var act = (from a in db.Activity
                       where a.ID == task.ID
                       select a).SingleOrDefault();

            if (act != null)
            {
                act.Description = task.Description;
                act.Interrupted = task.Interrupted;
                act.Completed = task.Completed;
                act.Abandoned = task.Abandoned;
                act.IsDone = task.IsDone;
                
                db.Entry(act).Property(p => p.Description).IsModified = true;
                db.Entry(act).Property(p => p.Interrupted).IsModified = true;
                db.Entry(act).Property(p => p.Completed).IsModified = true;
                db.Entry(act).Property(p => p.Completed).IsModified = true;
                db.Entry(act).Property(p => p.IsDone).IsModified = true;
            }
            else
            {
                act = new Activity()
                {
                    Description = task.Description,
                    ActivityDate = task.ActivityDate,
                    Place = "Work",
                    Interrupted = task.Interrupted,
                    Completed = task.Completed,
                    Abandoned = task.Abandoned,
                    IsDone = task.IsDone

            };
                db.Add(act);
            }

            db.SaveChanges();

            return Json(new { id = act.ID });
            //}
            //return null;
        }

        public JsonResult Delete(Activity task)
        {
            var act = (from a in db.Activity
                       where a.ID == task.ID
                       select a).SingleOrDefault();

            if (act != null)
            {
                db.Remove(act);
                db.SaveChanges();

                return Json(new { id = act.ID });
            }
            else
            {
                return null;
            }
        }
    }
}
