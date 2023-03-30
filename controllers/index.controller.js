sap.ui.define(
  ["sap-app/controllers/BaseController", "sap/ui/model/json/JSONModel"],
  function (BaseController, JSONModel) {
    "use strict";
    return BaseController.extend("sap-app.controllers.index", {
      onInit: function () {
        fetch("/proxy/sap/opu/odata/sap/ZGW_SAESB_DEPT_SRV/SCORESet?$format=json", {
          method: "GET",
          headers: {
            Authorization: "Basic dnVvbmc6dHVlbWluaDQ="
          }
        }).then(res => res.json()).then(res => console.log(res, "res"))
      },
      onAfterRendering: function () {
        this.getRouter().navTo("employeesList");
      },
    });
  }
);
