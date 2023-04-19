sap.ui.define(
  ["sap/uxap/BlockBase", "sap/ui/model/json/JSONModel"],
  function (BlockBase, JSONModel) {
    "use strict";

    var BlockEmpDetailPart1 = BlockBase.extend(
      "sap-app.components.Employee.goals.BlockDetailPart1",
      {
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
        init: function () {
          BlockBase.prototype.init.apply(this, arguments);
          var oModel = new JSONModel();
          // set explored app's demo model on this sample
          fetch("/proxy/sphinx/api_get_emp2?sap-client=800", {
            method: "GET",
            headers: {
              Authorization: "Basic dnVvbmc6dHVlbWluaDQ=",
            },
          })
            .then((res) => res.json())
            .then((res) => {
              oModel.setData(...res.SAP_DATA);
              this.setModel(oModel);
            });
        },
        handleClose: function (oEvent) {},
        handleChange: function (oEvent) {
          var state = oEvent.getParameter("state");
          const oData = this.getModel().getData();
          const model = new JSONModel({
            ...oData,
            health: state,
          });

          this.setModel(model);
        },
        handleChangeSavings: function (oEvent) {
          var state = oEvent.getParameter("state");
          const model = new JSONModel({
            savings: state,
          });
          this.setModel(model);
        },
        handleChangeRetirement: function (oEvent) {
          var state = oEvent.getParameter("state");
          const model = new JSONModel({
            retirement: state,
          });
          this.setModel(model);
        },
        textClick: function (event) {},
      }
    );
    return BlockEmpDetailPart1;
  }
);
