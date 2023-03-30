sap.ui.define(
  ["sap-app/controllers/BaseController", "sap/ui/model/json/JSONModel"],
  function (BaseController, JSONModel) {
    "use strict";
    return BaseController.extend("sap-app.controllers.ListItem", {
      onInit: function () {
        fetch("../models/data.json")
          .then((res) => res.json())
          .then((res) => {
            const model = new JSONModel({
              users: res.data,
              user: {
                name: "Long",
                age: "123",
              },
            });
            this.getView().setModel(model);
            console.log(res, "res");
          });
      },
      onAfterRendering: function () {
        console.log("after rendering");
      },
    });
  }
);
