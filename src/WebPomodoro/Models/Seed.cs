using System;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebPomodoro.Models
{
    public static class Seed
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetService<ApplicationDbContext>();

            if (context.Database == null)
            {
                throw new Exception("DB is null");
            }

            if (context.Activity.Any())
            {
                return;
            }

            context.Activity.AddRange(
                new Activity
                {
                    Description = "Write a blog entry",
                    Place = "Home",
                    ActivityDate = DateTime.Now
                },
                new Activity
                {
                    Description = "Create Status Report",
                    Place = "Work",
                    ActivityDate = DateTime.Now
                }
             );

            context.SaveChanges();
        }
    }
}
