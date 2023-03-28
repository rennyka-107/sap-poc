sap.ui.define(["sap/uxap/BlockBase"], function (BlockBase) {
  "use strict";

  var BlockEmpDetailPart1 = BlockBase.extend(
    "sap-app.components.Employee.employment.BlockDetailPart3",
    {
      metadata: {
        views: {
          Collapsed: {
            viewName: "sap-app.components.Employee.employment.BlockDetailPart3",
            type: "XML",
          },
          Expanded: {
            viewName: "sap-app.components.Employee.employment.BlockDetailPart3",
            type: "XML",
          },
        },
      },
      handleClose: function (oEvent) {
        console.log(oEvent);
      },
    }
  );
  return BlockEmpDetailPart1;
});
