using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using AngularJSExercise.WebApp.Models;

namespace AngularJSExercise.WebApp.Controllers
{
    public class HomeController : Controller
    {
        private const int ItemsPerGage = 5;

        public ActionResult Index()
        {
            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your app description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        private static List<Category> categories = new List<Category>
        {
            new Category{Id = 1, Name = "Laptop"},
            new Category{Id = 2, Name = "PC"},
            new Category{Id = 3, Name = "Mobile"},
            new Category{Id = 4, Name = "Tablet"},
        };

        private static List<Product> products = new List<Product>
            {
                new Product{ Id=1, CategoryId = 1, Name= "Macbook Pro 2015", Description= "Macbook Pro 2015 Core i7", Price= 2000 },
                new Product{ Id=2, CategoryId = 1, Name= "Asus U80V", Description= "Asus U80V Core 2 Duo", Price= 200 },
                new Product{ Id=3, CategoryId = 2, Name= "Dell AIO", Description= "Dell All in one Core i7", Price= 200 },
                new Product{ Id=4, CategoryId = 3, Name= "Iphone 6", Description= "Iphone 6 128GB Gold", Price= 1000 },
                new Product{ Id=5, CategoryId = 3, Name= "Note 4", Description= "Samsung Galaxy Note 4 32GB", Price= 800 },
                new Product{ Id=6, CategoryId = 3, Name= "Lumia 1520", Description= "Nokia Lumia 1520 32GB White", Price= 400 },
                new Product{ Id=7, CategoryId = 3, Name= "Lumia 620", Description= "Nokia Lumia 1520 32GB White", Price= 350 },
                new Product{ Id=8, CategoryId = 4, Name= "Nexus 7", Description= "Google nexus 7 32Gb", Price= 350 },
                new Product{ Id=9, CategoryId = 4, Name= "Ipad mini 2", Description= "Ipad mini 2 16Gb", Price= 350 },
                new Product{ Id=10, CategoryId = 4, Name= "Ipad Air 2", Description= "Ipad Air 2 32Gb", Price= 550 }
                
            };

        public JsonResult GetAllProduct()
        {
            return Json(products, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetProductByCategory(int id)
        {
            return Json(products.Where(p => p.CategoryId == id).ToList(),JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllCategory()
        {
            return Json(categories, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Add(Product product)
        {
            try
            {
                product.Id = products.Count + 1;
                products.Add(product);
                return Json(new { success = true, Id = product.Id });

            }
            catch (Exception ex)
            {
                return Json(new { success= false, errorMessage = ex.Message });
            }

        }

        [HttpPost]
        public JsonResult Edit(Product product)
        {
            try
            {
                var productEdit = products.Single(p => p.Id == product.Id);
                productEdit.Name = product.Name;
                productEdit.Description = product.Description;
                productEdit.Price = product.Price;
                return Json(new { success = true });


            }
            catch (Exception ex)
            {
                return Json(new { success = false, errorMessage = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult Delete(int id)
        {
            try
            {
                products.Remove(products.Single(p => p.Id == id));
                return Json(new { success = true });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, errorMessage = ex.Message });
            }
        }
    }
}
