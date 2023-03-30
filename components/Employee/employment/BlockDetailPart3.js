sap.ui.define(
  ["sap/uxap/BlockBase", "sap/ui/model/json/JSONModel"],
  function (BlockBase, JSONModel) {
    "use strict";

    var BlockEmpDetailPart1 = BlockBase.extend(
      "sap-app.components.Employee.employment.BlockDetailPart3",
      {
        metadata: {
          views: {
            Collapsed: {
              viewName:
                "sap-app.components.Employee.employment.BlockDetailPart3",
              type: "XML",
            },
            Expanded: {
              viewName:
                "sap-app.components.Employee.employment.BlockDetailPart3",
              type: "XML",
            },
          },
        },
     
        init: function () {
          BlockBase.prototype.init.apply(this, arguments);
          const model = new JSONModel({
            number: 68688,
            time: 112,
            amount: 12,
            salary: 10000,
          });
          this.setModel(model);
        },

        handleClose: function (oEvent) {
          console.log(oEvent);
        },
        handleSubmit: function () {
          console.log(this.getModel());
        },
      }
    );
    return BlockEmpDetailPart1;
  }
);
