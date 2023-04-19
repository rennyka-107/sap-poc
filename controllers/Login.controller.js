sap.ui.define(
  ["sap-app/controllers/BaseController", "sap/ui/model/json/JSONModel"],
  function (BaseController, JSONModel) {
    "use strict";
    return BaseController.extend("sap-app.controllers.Login", {
      onInit: function () {
        let dataLogin = {
          username: "admin",
          password: "admin",
        };
        let model = new JSONModel(dataLogin);
        this.getView().setModel(model);
      },
      onAfterRendering: function () {},
      onLogin: function () {
        const { username, password } = this.getView().getModel().getData();
        if (username === "admin" && password === "admin") {
          localStorage.setItem("accessToken", "admin-token");
          this.getRouter().navTo("home");
        }
      },
    });
  }
);
