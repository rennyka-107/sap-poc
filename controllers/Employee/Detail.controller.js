sap.ui.define(
  [
    "sap/base/Log",
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/core/format/DateFormat",
    "sap/ui/thirdparty/jquery",
  ],
  function (Log, Controller, JSONModel, MessageToast, DateFormat, jQuery) {
    "use strict";

    return Controller.extend("sap.ui.table.sample.Basic.Controller", {
      onInit: function () {
        // set explored app's demo model on this sample


        var oJSONModel = this.initSampleDataModel();
        this.getOwnerComponent().setModel(oJSONModel, "DetailEmployee");
      },

      initSampleDataModel: function () {
        var oModel = new JSONModel();
        let data = {
          number: 68688,
          dialogMode: true,
          listLayout: true,
          time: 112,
          amount: 12,
          salary: 13000,
          isEditing: false,
        };

        var oDateFormat = DateFormat.getDateInstance({
          source: { pattern: "timestamp" },
          pattern: "dd/MM/yyyy",
        });

        jQuery.ajax(sap.ui.require.toUrl("sap/ui/demo/mock/products.json"), {
          dataType: "json",
          success: function (oData) {
            var aTemp1 = [];
            var aTemp2 = [];
            var aSuppliersData = [];
            var aCategoryData = [];
            for (var i = 0; i < oData.ProductCollection.length; i++) {
              var oProduct = oData.ProductCollection[i];
              if (
                oProduct.SupplierName &&
                aTemp1.indexOf(oProduct.SupplierName) < 0
              ) {
                aTemp1.push(oProduct.SupplierName);
                aSuppliersData.push({ Name: oProduct.SupplierName });
              }
              if (oProduct.Category && aTemp2.indexOf(oProduct.Category) < 0) {
                aTemp2.push(oProduct.Category);
                aCategoryData.push({ Name: oProduct.Category });
              }
              oProduct.DeliveryDate =
                new Date().getTime() - (i % 10) * 4 * 24 * 60 * 60 * 1000;
              oProduct.DeliveryDateStr = oDateFormat.format(
                new Date(oProduct.DeliveryDate)
              );
              oProduct.Heavy = oProduct.WeightMeasure > 1000 ? "true" : "false";
              oProduct.Available =
                oProduct.Status == "Available" ? true : false;
            }

            oData.Suppliers = aSuppliersData;
            oData.Categories = aCategoryData;

            oModel.setData(oData);
          },
          error: function () {
            Log.error("failed to load json");
          },
        });
        oModel.setData(data);
        return oModel;
      },
      editActive: function () {
        let data = new JSONModel({
          number: 60000,
          dialogMode: true,
          listLayout: true,
          time: 112,
          amount: 12,
          salary: 13000,
          isEditing: true,
        });
        const hasEditing = this.getOwnerComponent()
          .getModel("DetailEmployee")
          .getData().isEditing;
        if (hasEditing) return;
        this.getOwnerComponent().setModel(data, "DetailEmployee");
      },
      handleSubmit: function () {
        const oDataModel = this.getOwnerComponent()
          .getModel("DetailEmployee")
          .getData();
        console.log("form submit", oDataModel);
        var data = Object.assign({}, { ...oDataModel, isEditing: false });
        this.getOwnerComponent().setModel(
          new JSONModel(data),
          "DetailEmployee"
        );
        MessageToast.show("Update Success");
      },
      updateMultipleSelection: function (oEvent) {
        var oMultiInput = oEvent.getSource(),
          sTokensPath =
            oMultiInput.getBinding("tokens").getContext().getPath() +
            "/" +
            oMultiInput.getBindingPath("tokens"),
          aRemovedTokensKeys = oEvent
            .getParameter("removedTokens")
            .map(function (oToken) {
              return oToken.getKey();
            }),
          aCurrentTokensData = oMultiInput.getTokens().map(function (oToken) {
            return { Key: oToken.getKey(), Name: oToken.getText() };
          });

        aCurrentTokensData = aCurrentTokensData.filter(function (oToken) {
          return aRemovedTokensKeys.indexOf(oToken.Key) === -1;
        });

        oMultiInput.getModel().setProperty(sTokensPath, aCurrentTokensData);
      },

      formatAvailableToObjectState: function (bAvailable) {
        return bAvailable ? "Success" : "Error";
      },

      formatAvailableToIcon: function (bAvailable) {
        return bAvailable ? "sap-icon://accept" : "sap-icon://decline";
      },

      handleDetailsPress: function (oEvent) {
        MessageToast.show(
          "Details for product with id " +
            this.getView()
              .getModel()
              .getProperty("ProductId", oEvent.getSource().getBindingContext())
        );
      },
      onAfterRendering: function () {
        const { employeeId } = this.getCurrentParams(
          this.getOwnerComponent().getRouter()
        );
        this.getView().bindElement({
          path: "/ProductCollection/" + employeeId,
          model: "products",
        });
        console.log(employeeId, "id");
      },
      getCurrentParams: function (
        router = this.getOwnerComponent().getRouter()
      ) {
        const currentHash = router.getHashChanger().getHash();
        return router.getRouteInfoByHash(currentHash)?.arguments;
      },
      onPaste: function (oEvent) {
        var aData = oEvent.getParameter("data");
        MessageToast.show("Pasted Data: " + aData);
      },
    });
  }
);
