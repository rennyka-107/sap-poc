sap.ui.define(
  ["sap/ui/core/UIComponent", "sap/ui/model/json/JSONModel"],
  function (UIComponent, JSONModel) {
    "use strict";

    return UIComponent.extend("sap-app.Component", {
      metadata: {
        manifest: "json",
      },

      init: function () {
        // call the init function of the parent
        UIComponent.prototype.init.apply(this, arguments);
        const accessToken = localStorage.getItem("accessToken");
        this.getRouter().initialize();
        // sap.ui.getCore().loadLibrary("it.designfuture.qrcode", "./node_modules/openui5-qrcode/src/it/designfuture/qrcode");
        if (accessToken !== "admin-token") {
          this.getRouter().navTo("login");
        }
        // create the views based on the url/hash
      },
    });
  }
);
