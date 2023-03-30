sap.ui.define(
  ["sap-app/controllers/BaseController", "sap/ui/model/json/JSONModel"],
  function (BaseController, JSONModel) {
    "use strict";
    return BaseController.extend("sap-app.controllers.Login", {
      onInit: function () {
        console.log(this.getRouter());
        let dataLogin = {
          username: "admin",
          password: "admin",
        };
        let model = new JSONModel(dataLogin);
        this.getView().setModel(model);
      },
      onAfterRendering: function () {
        //   console.log("before rendering");
      },
      onLogin: function () {
        console.log("form login now", this.getView().getModel().getData());
        const { username, password } = this.getView().getModel().getData();
        if (username === "admin" && password === "admin") {
          localStorage.setItem("accessToken", "admin-token");
          this.getRouter().navTo("home");
        }
      },
    });
  }
);
