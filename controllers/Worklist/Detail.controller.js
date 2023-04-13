sap.ui.define([
	"../BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (
	BaseController, JSONModel,  History, Filter, FilterOperator) {
	"use strict";

	return BaseController.extend("sap-app.controllers.Worklist.Detail", {

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit : function () {
			// Model used to manipulate control states. The chosen values make sure,
			// detail page is busy indication immediately so there is no break in
			// between the busy indication for loading the view's meta data
			var oViewModel;
			oViewModel = new JSONModel({
				worklistTableTitle:"Worklist Table",
				shareOnJamTitle: "worklistTitle",
				shareSendEmailSubject: "shareSendEmailWorklistSubject",
				shareSendEmailMessage: "shareSendEmailWorklistMessage",
				tableNoDataText: "tableNoDataText",
				tableBusyDelay: 0,
				inStock: 0,
				shortage: 0,
				outOfStock: 0,
				countAll: 0
			});
				const { objectId } = this.getCurrentParams(
						this.getOwnerComponent().getRouter()
				  );
				  console.log(this.getOwnerComponent().getModel("productList"))
				var oProductDetail =this.getOwnerComponent().getModel("productList").getData().ProductCollection[objectId]
				console.log(oProductDetail,"oProductDetail")
				var oModel =new JSONModel(oProductDetail);
				this.getView().setModel(oModel)
				this.getView().setModel(oViewModel, "worklistView");
		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

				},
				
		/**
		 * Event handler  for navigating back.
		 * It there is a history entry we go one step back in the browser history
		 * If not, it will replace the current entry of the browser history with the worklist route.
		 */
		onNavBack : function() {
			var sPreviousHash = History.getInstance().getPreviousHash();

			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.getRouter().navTo("worklist", {}, true);
			}
		},
		getCurrentParams: function (
			router = this.getOwnerComponent().getRouter()
		  ) {
			const currentHash = router.getHashChanger().getHash();
			return router.getRouteInfoByHash(currentHash)?.arguments;
		  },
		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */

		/**
		 * Binds the view to the object path.
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
		 * @private
		 */
		_onObjectMatched : function (oEvent) {
			// const { objectId } = this.getCurrentParams(
			// 	this.getOwnerComponent().getRouter()
			//   );
			//   console.log(objectId)
			// this.getModel().metadataLoaded().then( function() {
			// 	var sObjectPath = this.getModel().createKey("products", {
			// 		ProductID :  objectId
			// 	});
			// 	this._bindView("/" + sObjectPath);
			// }.bind(this));
			// console.log(this.getModel())
		},

		/**
		 * Binds the view to the object path.
		 * @function
		 * @param {string} sObjectPath path to the object to be bound
		 * @private
		 */
		_bindView : function (sObjectPath) {
			var oViewModel = this.getModel("objectView"),
				oDataModel = this.getModel();

			this.getView().bindElement({
				path: sObjectPath,
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function () {
						oDataModel.metadataLoaded().then(function () {
							// Busy indicator on view should only be set if metadata is loaded,
							// otherwise there may be two busy indications next to each other on the
							// screen. This happens because route matched handler already calls '_bindView'
							// while metadata is loaded.
							oViewModel.setProperty("/busy", true);
						});
					},
					dataReceived: function () {
						oViewModel.setProperty("/busy", false);
					}
				}
			});
		},
		onAfterRendering: function () {
			const { objectId } = this.getCurrentParams(
			  this.getOwnerComponent().getRouter()
			);
			console.log(objectId)
			this.getView().bindElement({
			  path: "/ProductCollection/" + objectId,
			  model: "products",
			});
			
		  },
		_onBindingChange : function () {
			var oView = this.getView(),
				oViewModel = this.getModel("objectView"),
				oElementBinding = oView.getElementBinding();

			// No data for the binding
			if (!oElementBinding.getBoundContext()) {
				this.getRouter().getTargets().display("objectNotFound");
				return;
			}

			var oResourceBundle = this.getResourceBundle(),
				oObject = oView.getBindingContext().getObject(),
				sObjectId = oObject.ProductID,
				sObjectName = oObject.ProductName;

			oViewModel.setProperty("/busy", false);
			oViewModel.setProperty("/shareSendEmailSubject",
			oResourceBundle.getText("shareSendEmailObjectSubject", [sObjectId]));
			oViewModel.setProperty("/shareSendEmailMessage",
			oResourceBundle.getText("shareSendEmailObjectMessage", [sObjectName, sObjectId, location.href]));

			// Update the comments in the list
			var oList = this.byId("idCommentsList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(new Filter("productID", FilterOperator.EQ, sObjectId));
		},

		/**
		 * Updates the model with the user comments on Products.
		 * @function
		 * @param {sap.ui.base.Event} oEvent object of the user input
		 */
		onPost: function (oEvent) {
			var oFormat = DateFormat.getDateTimeInstance({style: "medium"});
			var sDate = oFormat.format(UI5Date.getInstance());
			var oObject = this.getView().getBindingContext().getObject();
			var sValue = oEvent.getParameter("value");
			var oEntry = {
				productID: oObject.ProductID,
				type: "Comment",
				date: sDate,
				comment: sValue
			};
			// update model
			var oFeedbackModel = this.getModel("productFeedback");
			var aEntries = oFeedbackModel.getData().productComments;
			aEntries.push(oEntry);
			oFeedbackModel.setData({
				productComments : aEntries
			});
		}

	});

});