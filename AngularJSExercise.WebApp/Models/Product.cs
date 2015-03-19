using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularJSExercise.WebApp.Models
{
    public class Product
    {
        private int id;
        private int categoryId;
        private string name;
        private string description;
        private double price;

        public int Id
        {
            get { return id; }
            set { id = value; }
        }

        public int CategoryId
        {
            get { return categoryId; }
            set { categoryId = value; }
        }

        public double Price
        {
            get { return price; }
            set { price = value; }
        }

        public string Description
        {
            get { return description; }
            set { description = value; }
        }

        public string Name
        {
            get { return name; }
            set { name = value; }
        }

        public Product() { }

        public Product(int id, string name, string description, double price)
        {
            this.id = id;
            this.name = name;
            this.description = description;
            this.price = price;
        }
    }
}