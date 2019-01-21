﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using InventoryBusinessLogic;
using InventoryBusinessLogic.Entity;

namespace InventoryWeb.Controllers
{
    public class CollectionPointController : Controller
    {
        [Authorize(Roles = "DeptRep")]
        //public object UserId { get; private set; }
       
        // GET: CollectionPoint/Edit
        public ActionResult Edit()
        {
            ChangeCollectionPointBusinessLogic ch = new ChangeCollectionPointBusinessLogic();
            Department dep = new Department();
            //dep= ch.getDeptByID("1001");
            //ViewBag.Department = dep.DepartmentName;
            ViewBag.DeptList = ch.getDeptByID(User.Identity.Name);

            return View();
        }

        ChangeCollectionPointBusinessLogic CP = new ChangeCollectionPointBusinessLogic();
        //ManageRequestBusinessLogic req = new ManageRequestBusinessLogic();
        // GET: DepManager

        public ActionResult saveNewCollectionPoint(string CollectionPoint)
        {
           
            CP.ChangeCollectionPoint(CollectionPoint, User.Identity.Name);
            // return View("Edit");
            return RedirectToAction("Edit");
        }


    }
}