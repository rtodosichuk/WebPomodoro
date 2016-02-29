using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebPomodoro.Controllers
{
    public class TodoController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public JsonResult tasks()
        {
            return Json(new
            {
                task1 = new { isDone = false, description = "First Task", interrupted = 0, abandoned = 0, complete = 3 },
                task2 = new { isDone = true, description = "Second Task", interrupted = 2, abandoned = 1, complete = 5 },
                task3 = new { isDone = false, description = "Third Task", interrupted = 4, abandoned = 2, complete = 3 },
                task4 = new { isDone = false, description = "forth Task", interrupted = 4, abandoned = 2, complete = 3 },
                task5 = new { isDone = false, description = "fifth Task", interrupted = 4, abandoned = 2, complete = 3 },
            });
        }
    }
}
