﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using System.Web.Script.Serialization;
using Microsoft.AspNet.Identity;
using InventoryBusinessLogic;
using InventoryBusinessLogic.Entity;
using Newtonsoft.Json;


namespace InventoryWeb.Controllers
{
    [Authorize(Roles = "StoreClerk")]
    public class StoreClerkController : Controller
    {
        CatalogueBusinessLogic catalogueBusinessLogic = new CatalogueBusinessLogic();
        SupplierBusinessLogic supplierBusinessLogic = new SupplierBusinessLogic();
        PurchaseOrderBusinessLogic purchaseOrderBusinessLogic = new PurchaseOrderBusinessLogic();
        PurchaseItemBusinessLogic purchaseItemBusinessLogic = new PurchaseItemBusinessLogic();
        EmailBusinessLogic emailBusinessLogic = new EmailBusinessLogic();
        AdjustmentBusinessLogic adjustmentBusinessLogic = new AdjustmentBusinessLogic();
        AdjustmentItemBusinessLogic adjustmentItemBusinessLogic = new AdjustmentItemBusinessLogic();
        UserBusinessLogic userBusinessLogic = new UserBusinessLogic();
        public static List<Request> reqBackup = new List<Request>();
        public static List<Request> requestBackup = new List<Request>();
        ManageRequestBusinessLogic manageRequests = new ManageRequestBusinessLogic();

        static List<RetrievalList> retrievals = new List<RetrievalList>();
        static List<orderlist> orders = new List<orderlist>();
        static List<Department> disbursementList = new List<Department>();
        static List<Department> disbursementListBackup = new List<Department>();
        static List<Request> req = new List<Request>();
        OrderBusinessLogic orderbusinesslogic = new OrderBusinessLogic();
        static bool retrivalRequest = false;
        List<String> disbursedList = new List<string>();
        public static List<int> updateRequest = new List<int>();

        public ActionResult RaiseRequest()
        {
            return View();
        }

        public ActionResult PurchaseOrder()
        {
            return View();
        }

        public ActionResult AdjustmentVoucher()
        {
            return View();
        }

        public ActionResult ManageInventory()
        {
            return View();
        }
        [HttpPost]
        public string SaveImage()
        {
            //int bookid = id;
            //int plenth = Request.Properties.Count;
            MemoryStream m = new MemoryStream();
            HttpContext.Request.InputStream.CopyTo(m);
            byte[] v = m.ToArray();
            var s = HttpContext.Request.QueryString;
            int i = s.Count;
            for(int j = 0; j < i; j++)
            {
                orderbusinesslogic.updateSignture(s.Get(j), v);
               
            }
            
            return "success";
        }

        [HttpGet]
        public string GetImage(string orderid)
        {
            byte[] b = orderbusinesslogic.getSignature(orderid);
            Response.BinaryWrite(b);
            return b.ToString();
        }

        public ActionResult UpdateInventoryBinNumber(string ItemID, string binNumber)
        {

            catalogueBusinessLogic.UpdateInventory(ItemID, binNumber);


            return View("ManageInventory");
        }

        public ActionResult generateChargeBack()
        {
            return View();
        }

        public ActionResult Reports()
        {
            return View();
        }

        public ActionResult ChargeBackReport(DateTime Date1, DateTime Date2)
        {

            
            List<Department> dep = catalogueBusinessLogic.getDepartments();
            ReportsController depManager = new ReportsController();
           

            foreach (Department d in dep)
            {
               depManager.spendingHistorytwo(Date1, Date2, d.DepartmentID);
            }

            ViewBag.dataSCI = JsonConvert.SerializeObject(depManager.dataSCI);
            ViewBag.dataCOMM = JsonConvert.SerializeObject(depManager.dataCOMM);
            ViewBag.dataCPSC = JsonConvert.SerializeObject(depManager.dataCPSC);
            ViewBag.dataENGL = JsonConvert.SerializeObject(depManager.dataENGL);
            ViewBag.dataREGR = JsonConvert.SerializeObject(depManager.dataREGR);
            ViewBag.dataSTORE = JsonConvert.SerializeObject(depManager.dataSTORE);
            ViewBag.dataZOOL = JsonConvert.SerializeObject(depManager.dataZOOL);
            ViewBag.months = JsonConvert.SerializeObject(depManager.datamonths);
            return View("generateChargeBack");
        }

        public ActionResult trenAnalysisByItems()
        {
            UserBusinessLogic BL = new UserBusinessLogic();
            ViewBag.catalogue = BL.getAllCatalogue();
            return View();
        }

        public ActionResult trenAnalysis(string dropDown1, DateTime date1, DateTime date2)
        {

            List<Department> dep = catalogueBusinessLogic.getDepartments();
            ViewBag.catItem= catalogueBusinessLogic.getCatalogueById(dropDown1);
            ReportsController depManager = new ReportsController();


            foreach (Department d in dep)
            {
                depManager.itemsDepSpendings(date1, date2, d.DepartmentID,dropDown1);
            }

            ViewBag.dataSCI = JsonConvert.SerializeObject(depManager.dataSCI);
            ViewBag.dataCOMM = JsonConvert.SerializeObject(depManager.dataCOMM);
            ViewBag.dataCPSC = JsonConvert.SerializeObject(depManager.dataCPSC);
            ViewBag.dataENGL = JsonConvert.SerializeObject(depManager.dataENGL);
            ViewBag.dataREGR = JsonConvert.SerializeObject(depManager.dataREGR);
            ViewBag.dataSTORE = JsonConvert.SerializeObject(depManager.dataSTORE);
            ViewBag.dataZOOL = JsonConvert.SerializeObject(depManager.dataZOOL);
            ViewBag.months = JsonConvert.SerializeObject(depManager.datamonths);
            return View("ChargeBackReport");
            
        }

        public ActionResult trenAnalysisByExpenditure()
        {
            return View();
        }

        public ActionResult trendExpenditureReport(DateTime date1, DateTime date2)
        {

            List<Department> dep = catalogueBusinessLogic.getDepartments();
            ReportsController depManager = new ReportsController();


            foreach (Department d in dep)
            {
                depManager.spendingHistorytwo(date1, date2, d.DepartmentID);
            }

            ViewBag.dataSCI = JsonConvert.SerializeObject(depManager.dataSCI);
            ViewBag.dataCOMM = JsonConvert.SerializeObject(depManager.dataCOMM);
            ViewBag.dataCPSC = JsonConvert.SerializeObject(depManager.dataCPSC);
            ViewBag.dataENGL = JsonConvert.SerializeObject(depManager.dataENGL);
            ViewBag.dataREGR = JsonConvert.SerializeObject(depManager.dataREGR);
            ViewBag.dataSTORE = JsonConvert.SerializeObject(depManager.dataSTORE);
            ViewBag.dataZOOL = JsonConvert.SerializeObject(depManager.dataZOOL);
            ViewBag.months = JsonConvert.SerializeObject(depManager.datamonths);
            return View("trenAnalysisByExpenditure");
        }
        public ActionResult ListDept()
        {
            return View();
        }
        public ActionResult ViewOrders()
        {
            return View();
        }


        public ActionResult GetRetrievalData(List<RetrievalList> jsonlist3, List<orderlist> orderlist2)
        {
            
            //orders = orderlist2;
            retrievals = jsonlist3;
            retrivalRequest = true;
            return Json(new { redirecturl = "RetrievalForm" }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetDisbursementList()
        {
            disbursementList = new List<Department>();          
            DisbursementList disbursement = new DisbursementList();
            CatalogueBusinessLogic catalogue = new CatalogueBusinessLogic();
            reqBackup = requestBackup;
            if (disbursementListBackup.Count != 0)
            {
                foreach (Department dep in disbursementListBackup)
                {
                    disbursementList.Add(dep);
                }
            }
            if (updateRequest.Count != 0)
            {
                
                foreach (int req1 in updateRequest)
                {
                    List<Department> dep = disbursement.GetDisbursements(req1);
                    disbursementList.AddRange(dep);
                    disbursementListBackup.AddRange(dep);

                }
            }
            if (disbursementList.Count != 0)
            {
                var data = disbursementList.Select(p => new
                {
                    departmentName = p.DepartmentName,
                    representative = p.AspNetUsers.UserName,
                    collectionPoint = p.CollectionPoint
                }).Distinct().ToList();

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            
            return new JsonResult();
        }

        public ActionResult SendGetDisbursement()
        {
           //EmailBusinessLogic emailBusinessLogic = new EmailBusinessLogic();

           // foreach (var dept in disbursementList.Select(p=> new { p.DepartmentID }).Distinct())
           // {
           //     string content = emailBusinessLogic.ReadyForCollectionPoint(dept.DepartmentID);

           //     List<string> toAddress = new List<string>();
           //     toAddress.Add("padmapriya.n026@gmail.com");
           //     emailBusinessLogic.SendEmail("Team3", content, toAddress);                 
           // }
            return RedirectToAction("RetrievalForm");
                }

        public ActionResult DeliveredItems(List<DepartmentList> department)
        {
            if (department.Count != 0)
            {
                foreach (DepartmentList str in department)
                {
                    foreach (var d in disbursementList)
                    {
                        if (str.deptName.Substring(0, 4) == d.DepartmentName.Substring(0, 4))
                        {
                            disbursementListBackup.Remove(d);
                        }
                    }
                }
            }
            //disbursementList = new List<Department>();
            updateRequest = new List<int>();
            reqBackup = new List<Request>();
            return RedirectToAction("RetrievalForm");
        }
        public ActionResult GetDisbursementItems(List<DepartmentList> department)
        {

            DisbursementList disbursement = new DisbursementList();
            req = new List<Request>();
            var orderslist = retrievals.Select(p => p.orderid).Distinct().ToList();
          // reqBackup = CatalogueBusinessLogic.requestBackup;
           
            foreach (int req1 in updateRequest)
            {
                req.AddRange(disbursement.GetDisbursementList(department[0].deptName, req1));
            }

          
            foreach(Request req1 in req)
            {
                Request request = reqBackup.Where(x => x.RequestID == req1.RequestID).First();
                req1.Needed = req1.Actual - request.Actual;
            }
            var data = req.Select(p => new { itemDescription = p.Catalogue.Description, quantity = p.Needed, uom = p.Catalogue.MeasureUnit, orderid = p.OrderID }).Distinct().ToList();

            JsonResult json =  Json(data, JsonRequestBehavior.AllowGet);
            return json;
            // var data  = req.Select(p => new { itemDescription = p.Catalogue.Description, quantity = p.Needed, uom=p.Catalogue.MeasureUnit });


            //return Json(data, JsonRequestBehavior.AllowGet);
            // return Json(new { redirecturl = "DisbursementList" }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetSignature()
        {
            var data = req.Select(p => new { signature = p.Order.Signature }).ToList();
            return Json(data[0], JsonRequestBehavior.AllowGet);
        }



        [HttpGet]
        public JsonResult GetRetrievals()
        {
            if (!retrivalRequest)
            {
               
                List<Request> allRequests = manageRequests.GetRetrievalItems();
                //List<Request> allRequests = manageRequests.GetAllRequests();
                List<RetrievalList> itemList = new List<RetrievalList>();
                bool alreadyexist = false;
                foreach (Request req in allRequests)
                {
                    foreach (RetrievalList items in itemList)
                    {
                        alreadyexist = false;
                        if (items.itemDescription.Trim() == req.Catalogue.Description.Trim())
                        {
                            int needed = Convert.ToInt32(items.neededQuantity);
                            needed += (Convert.ToInt32(req.Needed) - Convert.ToInt32(req.Actual));

                            items.neededQuantity = Convert.ToString(needed);
                            alreadyexist = true;

                            //if (Convert.ToInt32(items.neededQuantity) > req.Catalogue.Quantity)
                            //{
                            //    items.remarks = "Not enough Stock";
                            //}
                            break;
                        }



                    }
                    if (!alreadyexist)
                    {


                        itemList.Add(new RetrievalList { orderid = req.OrderID, itemDescription = req.Catalogue.Description, availableQuantity = Convert.ToString(req.Catalogue.Quantity), alreadyExisting = Convert.ToString(req.Actual), binNumber = req.Catalogue.BinNumber, neededQuantity = Convert.ToString(req.Needed-req.Actual), remarks = req.Remarks, requestId = Convert.ToString(req.RequestID) });
                        // alreadyexist = false;
                        // alreadyexist = false;
                    }


                }

                //foreach (var item in itemList)
                //{
                //    item.neededQuantity = Convert.ToString(Convert.ToInt32(item.neededQuantity) - Convert.ToInt32(item.alreadyExisting));

                //}
                //var notneeded = itemList.Where(x => x.neededQuantity == "0").ToList();
                //foreach (var item in notneeded)
                //{
                //    itemList.Remove(item);
                //}
                retrievals = itemList;
              
            }
            retrivalRequest = false;
            return Json(new { data = retrievals }, JsonRequestBehavior.AllowGet);

        }

        [HttpGet]
        public JsonResult GetDisbursements()
        {

            var data = req.Select(p => new { itemDescription = p.Catalogue.Description, quantity = p.Needed, uom = p.Catalogue.MeasureUnit,orderid = p.OrderID}).ToList();


            return Json(data, JsonRequestBehavior.AllowGet);
            // return Json(new { data = retrievals }, JsonRequestBehavior.AllowGet);
        }


        public ActionResult RetrievalForm()
        {

            return View();
        }

        public ActionResult DisbursementList()
        {

            return View();
        }


        public JsonResult ConfirmOrder()
        {
            var sr = new StreamReader(Request.InputStream);
            var stream = sr.ReadToEnd();
            JavaScriptSerializer js = new JavaScriptSerializer();
            var list = js.Deserialize<List<SelectedList>>(stream);
            JsonResult json = new JsonResult();
            confirmClass confirmClass = new confirmClass();
            confirmClass.tablelist = list;
            Supplier supplier = supplierBusinessLogic.FindSupplierById(list[0].supplier);
            confirmClass.supplierAddress = supplier.Address;
            confirmClass.attentionTo = supplier.SupplierName;
            json.Data = confirmClass;
            return json;
        }

        public ActionResult SavePurchaseOrder()
        {
            var sr = new StreamReader(Request.InputStream);
            var stream = sr.ReadToEnd();
            var confirm = JsonConvert.DeserializeObject<confirmClass>(stream);
            double totalPrice = 0;
            string supplierID = "";
            if (confirm != null)
            {
                var list = confirm.tablelist;
                PurchaseOrder purchaseOrder = new PurchaseOrder();
                purchaseOrder.SupplierID = confirm.tablelist.First().supplier;
                purchaseOrder.TotalPrice = 0;
                purchaseOrder.PurchaseDate = DateTime.Now;
                purchaseOrder.OrderBy = User.Identity.GetUserId();
                purchaseOrder.PurchaseOrderStatus = "Unfullfill";
                purchaseOrder.ExpectedDate = Convert.ToDateTime(confirm.dateToDeliver);
                purchaseOrder.DeliverAddress = confirm.delieverTo;
                purchaseOrder.PurchaseOrderID = purchaseOrderBusinessLogic.generatePurchaseOrderID();
                purchaseOrderBusinessLogic.addPurchaseOrder(purchaseOrder);
                //var list= confirms.First().tablelist;
                foreach (var item in list)
                {
                    Catalogue catalogue = catalogueBusinessLogic.getCatalogueById(item.itemID);
                    PurchaseItem purchaseItem = new PurchaseItem();
                    purchaseItem.ItemID = catalogue.ItemID;
                    purchaseItem.Quantity = Convert.ToInt32(item.quantity);
                    double price = Convert.ToDouble(item.totalPrice.Substring(1, item.totalPrice.Length - 1));
                    totalPrice += price;
                    purchaseItem.PurchaseOrderID = purchaseOrder.PurchaseOrderID;
                    supplierID = catalogue.Supplier1;
                    purchaseItemBusinessLogic.addPurchaseItem(purchaseItem);
                }
                purchaseOrder.TotalPrice = totalPrice;
                purchaseOrderBusinessLogic.updatePurchaseOrder(purchaseOrder);
                EmailBusinessLogic emailBusinessLogic = new EmailBusinessLogic();
                string content = emailBusinessLogic.SendPurchaseOrderNotification(purchaseOrder.PurchaseOrderID);

                List<string> toAddress = new List<string>();
                toAddress.Add("wangxiaoxiaoqiang@gmail.com");
                emailBusinessLogic.SendEmail("Team3", content, toAddress);
            }

            return new JsonResult();
        }
        public ActionResult AddItems()
        {
            return View();

        }
        public bool UpdateQuantity(List<orderIDList> purchaseIDList)
        {
            foreach (orderIDList oId in purchaseIDList)
            {

                int orderID = Convert.ToInt32(oId.orderid);
                 catalogueBusinessLogic.UpdateCataloguesByPurchaseID(orderID);
                
            }
            return true;
        }
        public JsonResult LowStock()
        {
            JsonResult json = new JsonResult();
            json.Data = catalogueBusinessLogic.GetLowStock();
            json.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            return json;
        }

        public ActionResult SaveAdjustmentVoucher()
        {
            var sr = new StreamReader(Request.InputStream);
            var stream = sr.ReadToEnd();
            JavaScriptSerializer js = new JavaScriptSerializer();
            var list = JsonConvert.DeserializeObject<List<SelectedList>>(stream);
            JsonResult json = new JsonResult();
            if (list.Any())
            {
                Adjustment adjustment = new Adjustment();
                adjustment.UserID = User.Identity.GetUserId();
                adjustment.TotalPrice = 0;
                adjustment.Date = DateTime.Now;
                adjustment.AdjustmentID = adjustmentBusinessLogic.generateAdjustmentID();
                adjustment.AdjustmentStatus = "Unapproved";
                adjustmentBusinessLogic.addAdjustment(adjustment);
                foreach (var item in list)
                {
                    Catalogue catalogue = catalogueBusinessLogic.getCatalogueById(item.itemID);
                    double quantity = Convert.ToDouble(item.quantity);
                    if (quantity < 0 && quantity < -catalogue.Quantity)
                    {
                        json.Data = "fail";
                        return json;
                    }
                    AdjustmentItem adjustmentItem = new AdjustmentItem();
                    adjustmentItem.ItemID = catalogue.ItemID;
                    adjustmentItem.Quantity = item.quantity;
                    adjustmentItem.Reason = item.reason;
                    adjustmentItem.AdjustmentID = adjustment.AdjustmentID;
                    adjustment.TotalPrice += Math.Abs(Convert.ToInt32(catalogue.Price * Convert.ToDouble(item.quantity)));
                    adjustmentItemBusinessLogic.addAdjustmentItem(adjustmentItem);
                }
                if (adjustment.TotalPrice >= 250)
                {
                    adjustment.Supervisor = userBusinessLogic.getStoreManager().Id;
                }
                else
                {
                    adjustment.Supervisor = userBusinessLogic.getStoreStoreSupervisor().Id;
                }
                adjustmentBusinessLogic.updateAdjustment(adjustment);

                EmailBusinessLogic emailBusinessLogic = new EmailBusinessLogic();
                string content = emailBusinessLogic.NewVoucherNotification(adjustment.AdjustmentID, adjustment.UserID);

                List<string> toAddress = new List<string>();
                toAddress.Add("wangxiaoxiaoqiang@gmail.com");
                emailBusinessLogic.SendEmail("Team3", content, toAddress);

            }

            json.Data = "success";
            return json;
        }

        public JsonResult ShowPurchasedetails()
        {
            string orderIDString = Request["purchaseID"];
            int orderID = Convert.ToInt32(orderIDString);
            JsonResult json = new JsonResult();
            List<PurchaseItem> purchaseItemList = purchaseItemBusinessLogic.getItemsByPurchaseOrderID(orderID);
            List<PurchaseItemList> list = new List<PurchaseItemList>();
            foreach (PurchaseItem purchaseItem in purchaseItemList)
            {
                PurchaseItemList purchaseItemListm = new PurchaseItemList();
                purchaseItemListm.itemID = purchaseItem.ItemID;
                Catalogue catalogue = catalogueBusinessLogic.getCatalogueById(purchaseItem.ItemID);
                purchaseItemListm.description = catalogue.Description;
                purchaseItemListm.quantity = "" + purchaseItem.Quantity;
                purchaseItemListm.price = "" + catalogue.Price;
                purchaseItemListm.amount = "" + purchaseItem.Quantity * catalogue.Price;
                list.Add(purchaseItemListm);
            }
            json.Data = list;
            return json;

        }

        public ActionResult ViewAllAdjustmentVoucherRaised()
        {
            string userId = User.Identity.GetUserId();
            ViewBag.userID = userId;
            new AdjustmentBusinessLogic().getAllAdjustmentList(userId);
            return View();
        }

        public ActionResult ViewRequest()
        {
            string userId = User.Identity.GetUserId();
            ViewBag.userID = userId;
            new ManageRequestBusinessLogic().getAllStationeryRequest(userId);
            return View();


        }

        //public ActionResult ViewAllStationeryRequisitionsByOrderId(string orderId)
        //{

        //    new ManageRequestBusinessLogic().getStationaryOrderByID(orderId);
        //    return View();
        //}

       
        public JsonResult UpdatePOStatusToCancel(List<CancelPOList> Po)
        {

            
            List<CancelPOList> list = Po;
            if (list.Any())
            {
                foreach (var item in list)
                {
                    
                    new PurchaseItemBusinessLogic().getPOByID(Convert.ToInt32(item.orderid));
                }
            }
            

            return new JsonResult();
        }


        [HttpPost]
        public ActionResult UpdateInventory()
        {
            var sr = new System.IO.StreamReader(Request.InputStream);
            var stream = sr.ReadToEnd();
            JavaScriptSerializer js = new JavaScriptSerializer();
            var list = js.Deserialize<List<InventoryList>>(stream);
            Inventory inventory = new Inventory();
            if (requestBackup.Count == 0)
            {
                requestBackup = inventory.Request.Where(x => x.RequestStatus.Trim().ToUpper() == "APPROVED").OrderBy(y => y.RequestDate).ToList();
            }
            if (list.Any())
            {
                foreach (var item in list)
                {
                    if (item != null)
                    {
                      updateRequest.AddRange(catalogueBusinessLogic.UpdateRetrievedQuantity(item.itemDescription, item.quantityPicked, item.remarks));
                    }
                }
            }
            EmailBusinessLogic emailBusinessLogic = new EmailBusinessLogic();
            string content = emailBusinessLogic.LowStockNotification();

            List<string> toAddress = new List<string>();
            toAddress.Add("wangxiaoxiaoqiang@gmail.com");
            emailBusinessLogic.SendEmail("Team3", content, toAddress);
            catalogueBusinessLogic.ValidateOrderStatus();

            return new JsonResult();

        }

        public ActionResult ViewLowStock()
        {
            return View();  
        }


    }

    

        class PurchaseItemList
        {
            public string itemID { get; set; }
            public string description { get; set; }
            public string quantity { get; set; }
            public string price { get; set; }
            public string amount { get; set; }
        }

        public class InventoryList
        {
            public string itemDescription { get; set; }
            public string quantityPicked { get; set; }
            public string remarks { get; set; }
        }


        public class SelectedList
        {
            public string itemID { get; set; }

            public string description { get; set; }

            public string quantity { get; set; }

            public string totalPrice { get; set; }

            public string supplier { get; set; }

            public string price { get; set; }

            public string reason { get; set; }
            public string requestStatus { get; set; }
            public string orderId { get; set; }
        }
        public class orderIDList
        {
            public string orderid { get; set; }
        }

        class confirmClass
        {
            public List<SelectedList> tablelist { get; set; }

            public string supplierAddress { get; set; }

            public string delieverTo { get; set; }

            public string attentionTo { get; set; }

            public string dateToDeliver { get; set; }

        }
        public class orderlist
        {
            public string orderid { get; set; }
        }

        public class RetrievalList
        {
            public string requestId { get; set; }
            public string itemDescription { get; set; }

            public string neededQuantity { get; set; }
            public string availableQuantity { get; set; }
        public string alreadyExisting { get; set; }

        public string binNumber { get; set; }
            public string remarks { get; set; }
            public string orderid { get; set; }
            //public string itemDescription { get; set; }

        }
        public class DepartmentList
        {
            public string deptName { get; set; }
        }

        public class DisbursementListItems
        {
            public string itemDescription { get; set; }
            public string quantity { get; set; }
            public string uom { get; set; }
            public string orderid { get; set; }

        }

        public class CancelPOList
        {
            public string orderid { get; set; }
            public string supplierID { get; set; }
            public string totalPrice { get; set; }
            public string purchaseDate { get; set; }
            public string deliverAddress { get; set; }
            public string orderBy { get; set; }
            public string expectedDate { get; set; }
            public string purchaseOrderStatus { get; set; }

        }


}







