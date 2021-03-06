﻿$(document).ready(function () {
	var oTableInit = new TableInit();
	oTableInit.Init();

	var oButtonInit = new ButtonInit();
	oButtonInit.Init();

});
var orderid = "";
var requestedDate = "";
var reqesterName = "";
var requeststatus = "";
var TableInit = function () {
	var oTableInit = new Object();
	var userid = document.getElementById('userid').textContent;

	oTableInit.Init = function () {
		$('#SearchItemTable').bootstrapTable({
			method: 'get',
			url: 'https://inventorywebapi2019.azurewebsites.net/api/RequestItems/' + userid,
			//toolbar: '#toolbar',                
			striped: true,
			cache: false,
			pagination: true,
			sortable: true,
			sortOrder: "asc",
			queryParams: oTableInit.queryParams,
			sidePagination: "client",
			pageNumber: 1,
			pageSize: 5,
			pageList: [10, 25, 50, 100],
			search: true,
			strictSearch: false,
			queryParamsType: "",
			showRefresh: true,
			minimumCountColumns: 2,
			clickToSelect: false,
			height: 500,
			// uniqueId: "ID", 
			showToggle: true,
			cardView: false,
			detailView: false,
			showExport: false,
			exportDataType: "basic",              //basic', 'all', 'selected'.
			showColumns: true,
			columns: [{
				align: "center",
				title: 'OrderID',
				sortable: true,

				field: 'OrderID'
			}, {
				align: "center",
				title: 'Requested Date',
				sortable: true,
				field: 'RequestDate'
				//events: operateEvents,
				// formatter: InputTextBox
			}, {
				align: "center",
				title: 'Request Status',
				sortable: true,
				field: 'RequestStatus'
				//events: operateEvents,
				// formatter: InputTextBox
			},
			{
				align: "center",
				title: 'Action',
				sortable: true,

				//field : 'ID',
				events: operateEvents,
				formatter: selectItem
			}
			],
			formatLoadingMessage: function () {
				return "loading...";
			}
		});

	};


	// params
	oTableInit.queryParams = function (params) {

		var temp = {
			courseid: $("#courseid").val()
		};
		return temp;
	};

	function selectItem() {
		return [
			'<input type="button" id="view" value="View Details"  class="btn btn-primary" />',
		].join('');
	}

	function openPopup() {
		$("#ApproveRequestModal").modal('show');
	}

	operateEvents = {
		'click #view': function (e, value, row, index) {

			$("#ApproveRequestModal").modal('show');
			orderid = row.OrderID;
			requestedDate = row.RequestDate;
			requeststatus = row.RequestStatus;
			
			document.getElementById('requestDate').innerHTML = requestedDate;
			


			var oTableInit = new TableInit1();
			oTableInit.Init();

			
			$('#requests').bootstrapTable('refreshOptions', { url: 'https://inventorywebapi2019.azurewebsites.net/api/StationaryItems/' + orderid + '/' + userid + '/' + requeststatus});
			$('#requests').bootstrapTable('refresh', { url: 'https://inventorywebapi2019.azurewebsites.net/api/StationaryItems/' + orderid + '/' + userid + '/' + requeststatus});
			

		}
	};


	return oTableInit;
};

var ButtonInit = function () {
	var oInit = new Object();
	var postdata = {};

	oInit.Init = function () {
		// button


	};

	return oInit;
};


var TableInit1 = function () {
	var oTableInit = new Object();

	oTableInit.Init = function () {
		$('#requests').bootstrapTable({
			method: 'get',
			url: 'https://inventorywebapi2019.azurewebsites.net/api/StationaryItems/' + orderid +'/' + userid,
			//toolbar: '#toolbar',                
			striped: true,
			cache: false,
			pagination: true,
			sortable: true,
			sortOrder: "asc",
			queryParams: oTableInit.queryParams,
			sidePagination: "client",
			pageNumber: 1,
			pageSize: 5,
			pageList: [10, 25, 50, 100],
			search: true,
			strictSearch: false,
			queryParamsType: "",
			showRefresh: true,
			minimumCountColumns: 2,
			clickToSelect: false,
			height: 500,
			// uniqueId: "ID", 
			showToggle: true,
			cardView: false,
			detailView: false,
			showExport: false,
			exportDataType: "basic",              //basic', 'all', 'selected'.
			showColumns: true,
			columns: [{
				align: "center",
				title: 'Item Name',
				sortable: true,

				field: 'Catalogue.Description'
			},
			{
				align: "center",
				title: 'Quantity',
				sortable: true,
				field: 'Needed'
			},
			{
				align: "center",
				title: 'Price',
				sortable: true,
				field: 'Catalogue.Price'
			},

			],
			formatLoadingMessage: function () {
				return "loading...";
			}
		});

	};

	oTableInit.queryParams = function (params) {

		var id = {
			id: $("#RequestID").val()
		};
		return id;
	};

	selectItem = function (e, value, row, index) {

		return row.Price;

	}


	operateEvents = {
		'click #view': function (e, value, row, index) {
			$("#ApproveRequestModal").modal('show');
		}
	};


	return oTableInit;
};




