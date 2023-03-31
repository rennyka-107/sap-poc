sap.ui.define(
  [
    "sap/uxap/BlockBase",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/BindingMode",
  ],
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

      }
    );
    return BlockEmpDetailPart1;
  }
);
