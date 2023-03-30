sap.ui.define(
  ["sap/uxap/BlockBase", "sap/ui/model/json/JSONModel","sap/ui/model/BindingMode"],
  function (BlockBase, JSONModel, BindingMode) {
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
            username: "admin",
            password: "admin"
          });
          
          this.setModel(model);
        },

        handleClose: function (oEvent) {
          console.log(oEvent);
        },
        handleSubmit: function () {
          console.log(this.getModel());
        },
        onLogin:function(){
          console.log("form login now", this.getModel().getData());
        }
      }
    );
    return BlockEmpDetailPart1;
  }
);
