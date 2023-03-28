sap.ui.define(
  ["sap-app/controllers/BaseController", "sap/ui/model/json/JSONModel"],
  function (BaseController, JSONModel) {
    "use strict";
    return BaseController.extend("sap-app.controllers.Employee.index", {
      // onShowHello: function () {
      //   this.getRouter().navTo("listItems");
      // },
      onInit: function () {
        // this.getRouter().navTo("employeesList");
      },
      // onAfterRendering: function () {
      //   console.log("before rendering");
      // },
    });
  }
);
