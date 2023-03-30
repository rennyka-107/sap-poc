sap.ui.define(
  ["sap-app/controllers/BaseController", "sap/ui/model/json/JSONModel"],
  function (BaseController, JSONModel) {
    "use strict";
    return BaseController.extend("sap-app.controllers.components.BlockDetailPart3", {
      onInit: function () {
        console.log("init")
        let dataLogin = {
          number: 68688,
            time: 112,
            amount: 12,
            salary: 10000,
        };
        let model = new JSONModel(dataLogin);
        this.getView().setModel(model);
      },
      onAfterRendering: function () {
        //   console.log("before rendering");
      },
      handleSubmit: function () {
        console.log("form submit", this.getView().getModel().getData());
        // const { username, password } = this.getView().getModel().getData();
        // if (username === "admin" && password === "admin") {
        //   localStorage.setItem("accessToken", "admin-token");
        //   this.getRouter().navTo("home");
        // }
      },
    });
  }
);
