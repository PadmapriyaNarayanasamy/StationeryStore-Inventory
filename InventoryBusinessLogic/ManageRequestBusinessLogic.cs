﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using InventoryBusinessLogic.Entity;
namespace InventoryBusinessLogic
{
    public class ManageRequestBusinessLogic
    {
        Inventory inventory = new Inventory();

        public void ApproveOrRejectRequest(string RequestId, string RequestStatus,string remarks)
        {
            var request = inventory.Request.Where(x => x.OrderID == RequestId).ToList();
            foreach (var req in request)
            {
                req.RequestStatus = RequestStatus;
                req.Remarks = remarks;
                inventory.SaveChanges();
            }
            var order = inventory.Order.Where(x => x.OrderID == RequestId).First();
            order.OrderStatus = RequestStatus;
            inventory.SaveChanges();
        }

        public List<Request> GetAllRequests()
        {
            List<Request> req = inventory.Request.ToList();
            List<Request> orders = new List<Request>();

            foreach(Request req1 in req)
            {
                if(!orders.Any(x=>x.OrderID==req1.OrderID && x.UserID==req1.UserID))
                {
                    orders.Add(req1);
                }
            }
            return orders;
            //return inventory.Request.ToList();

        }
        public Request GetRequestById(int requestId)
        {
            try
            {
                return inventory.Request.Where(x => x.RequestID == requestId).First();
            } catch (Exception)
            {
                return null;
            }
        }

        public List<Request> GetRequestByOrderId(string OrderId)
        {
            try
            {
                return inventory.Request.Where(x => x.OrderID == OrderId).ToList();
            }
            catch (Exception)
            {
                return null;
            }
        }


        public void addRequest(Request request)
        {
            inventory.Request.Add(request);
            inventory.SaveChanges();
        }

        public Request GetRequestsByOrderAndItem(string orderId, string itemId)
        {
            try
            {
                return inventory.Request.Where(x => x.OrderID == orderId && x.ItemID == itemId).First();
            } catch (Exception)
            {
                return null;
            }
        }

        public void UpdateRequest(Request request)
        {
            Request update = inventory.Request.Where(x => x.RequestID == request.RequestID).First();
            update.Actual = request.Actual;
            update.ItemID = request.ItemID;
            update.OrderID = request.OrderID;
            update.Remarks = request.Remarks;
            update.RequestDate = request.RequestDate;
            update.RequestStatus = request.RequestStatus;
            update.Needed = request.Needed;
            inventory.SaveChanges();
        }

    }
}

