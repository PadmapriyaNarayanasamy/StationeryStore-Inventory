﻿var totalPrice = 0;
function selectItem(obj) {
    var ItemAddedTable = document.getElementById("ItemAddedTable");
    var SearchItemTable = document.getElementById("SearchItemTable");
    var node = ItemAddedTable.rows[1];
    if (node && node.cells[0].innerHTML === "No matching records found") {
        node.parentNode.removeChild(node);
    }
    var rows = obj.parentNode.parentNode.rowIndex;
    var objQuantity = SearchItemTable.getElementsByClassName("quantity");
    var quantity = objQuantity[rows - 1].value;
    var objReason = SearchItemTable.getElementsByClassName("reason");
    var reason = objReason[rows - 1].value;
    if (reason === "" || quantity === "" || quantity > 999 || quantity < -999 || quantity %1 !=0) {
        alert("Please input valid reason and quantity!");
    } else {
        var itemCode = SearchItemTable.rows[rows].cells[0].innerHTML;
        var Description = SearchItemTable.rows[rows].cells[1].innerHTML;
        var price = SearchItemTable.rows[rows].cells[2].innerHTML;
        $("#ItemAddedTable").append("<tr align='center'><td>" + itemCode + "</td><td>" + Description + "</td><td>" + price + "</td><td>" + quantity + "</td><td>" + reason + "</td><td><input type='button'  value='remove' class='btn btn-danger' onclick='remove(this)'/></td></tr>");
        $(obj).parents("tr").remove();
        $("#saveAdjustment").attr("disabled", false);
        totalPrice += Math.abs(quantity) * parseFloat(price.substr(1, price.length));
        document.getElementById("totalPrice").innerHTML = 'Total Price:$' + totalPrice+".00";
    }
}
function remove(obj) {
    var rows = obj.parentNode.parentNode.rowIndex;
    var ItemAddedTable = document.getElementById("ItemAddedTable");
    var itemCode = ItemAddedTable.rows[rows].cells[0].innerHTML;
    var Description = ItemAddedTable.rows[rows].cells[1].innerHTML;
    var Price = ItemAddedTable.rows[rows].cells[2].innerHTML;
    var quantity = ItemAddedTable.rows[rows].cells[3].innerHTML;
    if (!hasItemAlreadyExist(itemCode)) {
        $("#SearchItemTable").append("<tr align='center'><td>" + itemCode + "</td><td>" + Description + "</td><td>" + Price + "</td><td><input type='number' class='form-control quantity' placeholder='Quantity'></td><td><input type='text' class='form-control reason' placeholder='Reason'></td><td><input type='button'  value='Select' class='btn btn-primary' onclick='selectItem(this)'/></td></tr>");
        }
    $(obj).parents("tr").remove();
    var tab = document.getElementById("ItemAddedTable");
    var rows = tab.rows;
 
    if (rows.length == 1) {
        $("#saveAdjustment").attr("disabled", true);
    }
    totalPrice -= Math.abs(quantity) * parseFloat(Price.substr(1, Price.length));
    document.getElementById("totalPrice").innerHTML = 'Total Price:$' + totalPrice+".00";
}
function hasItemAlreadyExist(itemDescription) {
  
    var tab = document.getElementById("SearchItemTable");
    var rows = tab.rows;
    for (var i = 0; i < rows.length; i++) {
        if (rows[i].cells[0].innerHTML == itemDescription) {
            return true;
        }
    }
    return false;
}
var json;
function confirm() {
    $("#saveAdjustment").attr("disabled", true);
    var tab = document.getElementById("ItemAddedTable");
    var rows = tab.rows;
    var node = tab.rows[1];
    if (node && node.cells[0].innerHTML === "No matching records found") {
        alert("Please select item!");
        $("#saveAdjustment").attr("disabled", false);
    } else {
        var jsonlist = new Array();
        for (var i = 0; i < rows.length - 1; i++) {
              var jsonObj = { "itemID": rows[i + 1].cells[0].innerHTML, "quantity": rows[i + 1].cells[3].innerHTML, "price": rows[i + 1].cells[2].innerHTML, "reason": rows[i + 1].cells[4].innerHTML };
              jsonlist.push(jsonObj);
            }           
    }
  
    if (hasDuplicated(jsonlist)) {
        alert('Cannot select duplicated item!');
        $("#saveAdjustment").attr("disabled", false);
        return;
    } else {
        $.ajax({
            url: "/StoreClerk/SaveAdjustmentVoucher",
            type: "post",
            dataType: "text",
            async: true,
            data: JSON.stringify(jsonlist),
            success: function (data) {
                var result = JSON.parse(data);
                if (result === 'success') {
                    $('#successModal').modal('show');
                } else {
                    $('#failModal').modal('show');
                }
                $("#saveAdjustment").attr("disabled", false);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            }
        });
    }
   
    }
   
//function hasDuplicated(arr) {
//    for (var i = 0; i + 1 < arr.length; i++) {
//        if (arr[i].itemID === arr[i + 1].itemID) {
//            return true;
//        }
//    }
//    return false;
//}

function hasDuplicated(arr) {

    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = 0; j < arr.length; j++) {
            if (i != j) {
                if (arr[i].itemID == arr[j].itemID) {
                    return true;
                }
            }
        }

    }
    return false;
}




