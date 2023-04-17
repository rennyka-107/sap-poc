sap.ui.define(
  ["sap/uxap/BlockBase", "sap/ui/model/json/JSONModel"],
  function (BlockBase, JSONModel) {
    "use strict";

    var BlockEmpDetailPart1 = BlockBase.extend(
      "sap-app.components.Employee.employment.BlockDetailPart4",
      {
        metadata: {
          views: {
            Collapsed: {
              viewName:
                "sap-app.components.Employee.employment.BlockDetailPart4",
              type: "XML",
            },
            Expanded: {
              viewName:
                "sap-app.components.Employee.employment.BlockDetailPart4",
              type: "XML",
            },
          },
        },
        init: function () {
          BlockBase.prototype.init.apply(this, arguments);
          var oModel = new JSONModel();
          
          // set explored app's demo model on this sample
          fetch("/proxy/sphinx/get_benefists?sap-client=800", {
            method: "GET",
            headers: {
              Authorization: "Basic dnVvbmc6dHVlbWluaDQ="
            }
          }).then(res => res.json()).then(res => {
            oModel.setData({
              ...res.SAP_BILL,
                retirement: false,
                savings: false,
                health: false,
              
            });
            this.setModel(oModel);
          })
        },
        handleClose: function (oEvent) {
          console.log(oEvent);
        },
        handleChange: function (oEvent) {
          var state = oEvent.getParameter("state");
          const oData =this.getModel().getData()
          const model = new JSONModel({
            ...oData,
            health: state,
          });
          console.log(this.getModel());
          console.log(state);
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
      }
    );
    return BlockEmpDetailPart1;
  }
);
