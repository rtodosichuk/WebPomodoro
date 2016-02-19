using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebPomodoro.Models
{
    public class Activity
    {
        public int ID { get; set; }
        public string Description { get; set; }
        public string Place { get; set; }
        public int Type { get; set; }  // Unplanned Urgent 
        public DateTime ActivityDate { get; set; }
        public DateTime DueDate { get; set; }
    }
}
