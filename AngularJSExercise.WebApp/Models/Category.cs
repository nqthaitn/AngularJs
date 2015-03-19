using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularJSExercise.WebApp.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public Category() { }

        public Category(int id, string name)
        {
            this.Id = id;
            this.Name = name;
        }
    }
}