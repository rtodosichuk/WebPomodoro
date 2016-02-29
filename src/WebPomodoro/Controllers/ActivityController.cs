using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using WebPomodoro.Models;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace WebPomodoro.Controllers
{
    public class ActivityController : Controller
    {
        private ApplicationDbContext db;

        public ActivityController(ApplicationDbContext context)
        {
            db = context;
        }

        // GET: /<controller>/
        public IActionResult Index()
        {
            var activities = from a in db.Activity
                             select a;
            
            return View(activities);
        }

        // GET: /<controller>/Edit
        public IActionResult Edit(int id)
        {
            ViewData["Title"] = "Edit Activity";
            var activity = (from a in db.Activity
                           where a.ID == id
                           select a).SingleOrDefault();

            if (activity == null)
            {
                ViewData["Title"] = "Add Activity";
                activity = new Activity()
                {
                    Description = "New",
                    ActivityDate = DateTime.Now,
                    Place = "Work"
                };
            }

            return PartialView(activity);
        }

        public IActionResult StartTimer(int id)
        {
            ViewData["title"] = "Start Timer";
            var activity = (from a in db.Activity
                            where a.ID == id
                            select a).SingleOrDefault();

            return PartialView(activity);
        }

        [HttpPost]
        public IActionResult Edit(Activity activity)
        {
            if (ModelState.IsValid)
            {
                var act = (from a in db.Activity
                           where a.ID == activity.ID
                           select a).SingleOrDefault();

                if (act != null)
                {
                    act.Description = activity.Description;
                    act.ActivityDate = activity.ActivityDate;
                    act.Place = activity.Place;

                    db.Entry(act).Property(p => p.Description).IsModified = true;
                    db.Entry(act).Property(p => p.ActivityDate).IsModified = true;
                    db.Entry(act).Property(p => p.Place).IsModified = true;
                }
                else
                {
                    act = new Activity()
                    {
                        Description = activity.Description,
                        ActivityDate = activity.ActivityDate,
                        Place = activity.Place
                    };
                    db.Add(act);
                }

                db.SaveChanges();

                return Json(new { result = "valid" });
            }
            else
            {
                return PartialView(activity);
            }
        }


        public IActionResult Delete(int id)
        {
            var activity = (from a in db.Activity
                            where a.ID == id
                            select a).SingleOrDefault();

            return PartialView(activity);
        }

        [HttpPost]
        public IActionResult Delete(Activity activity)
        {
            var act = (from a in db.Activity
                            where a.ID == activity.ID
                            select a).SingleOrDefault();

            if (act != null)
            {
                db.Remove(act);
                db.SaveChanges();

                return Json(new { result = "valid" });
            }
            else
            {
                return PartialView(activity);
            }
        }

        public JsonResult tasks()
        {
            return Json(new {
                task1 = new { isDone = false, description = "First Task" },
                task2 = new { isDone = true, description = "Second Task" },
                task3 = new { isDone = false, description = "Third Task" },
            });
        }
    }
}
