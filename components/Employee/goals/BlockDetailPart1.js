sap.ui.define(
  ["sap/uxap/BlockBase", "sap/ui/model/json/JSONModel"],
  function (BlockBase, JSONModel) {
    "use strict";

    var BlockEmpDetailPart1 = BlockBase.extend(
      "sap-app.components.Employee.goals.BlockDetailPart1",
      {
        onInit: function () {
          var oModel = new JSONModel();
          let oProductsModel = new JSONModel(
            sap.ui.require.toUrl("sap-app/models/products.json")
          );
          console.log(oProductsModel);
          oProductsModel.setSizeLimit(1000);
          console.log("ss");
          // this.getView().setModel(oProductsModel, "products");
          fetch("/proxy/sphinx/api_get_emp2?sap-client=800", {
            method: "GET",
            headers: {
              Authorization: "Basic dnVvbmc6dHVlbWluaDQ=",
            },
          })
            .then((res) => res.json())
            .then((res) => {
              oModel.setData(res);
              console.log(res);
              this.getView().setModel(oModel, "products");
            });
          // this.getView().byId("html").setContent("<canvas id='signature-pad' width='400' height='200' class='signature-pad'></canvas>");
          this.oView = this.getView();
          this._bDescendingSort = false;
          this.oModel = this.oView.byId("productsTable");
          this.oRouter = this.getOwnerComponent().getRouter();
        },
        metadata: {
          views: {
            Collapsed: {
              viewName: "sap-app.components.Employee.goals.BlockDetailPart1",
              type: "XML",
            },
            Expanded: {
              viewName: "sap-app.components.Employee.goals.BlockDetailPart1",
              type: "XML",
            },
          },
        },
      }
    );
    return BlockEmpDetailPart1;
  }
);
