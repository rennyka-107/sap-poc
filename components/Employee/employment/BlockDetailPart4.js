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
          const model = new JSONModel({
            retirement: false,
            savings: false,
            health: false,
          });
          this.setModel(model);
        },
        handleClose: function (oEvent) {
          console.log(oEvent);
        },
        handleChange: function (oEvent) {
          var state = oEvent.getParameter("state");
          const model = new JSONModel({
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
      }
    );
    return BlockEmpDetailPart1;
  }
);
